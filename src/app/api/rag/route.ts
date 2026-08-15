import { NextResponse } from "next/server";
import ragData from "@/rag/rag-data.json";

interface RagDataItem {
  id: string;
  title: string;
  content: string;
}

interface GeminiStreamChunk {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body.query as string;

    if (!query) {
      return NextResponse.json({ answer: "Please ask a question!" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        answer: "API key is missing. Please check your environment variables.",
      });
    }

    // Search for relevant context in portfolio data
    const relevantContext = findRelevantContext(query);

    // Build the prompt
    const prompt = buildPrompt(query, relevantContext);

    // Gemini 2.5 Flash model with streaming
    const modelName = "gemini-2.5-flash";
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${modelName}:streamGenerateContent?alt=sse&key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return NextResponse.json({
        answer: `API Error: ${errorData.error?.message || "Unknown error"}`,
      });
    }

    // Create a ReadableStream to forward the SSE data
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              controller.close();
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const jsonStr = line.slice(6);

                if (jsonStr.trim() === "") continue;

                try {
                  const data = JSON.parse(jsonStr) as GeminiStreamChunk;
                  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

                  if (text) {
                    // Send only the text content
                    controller.enqueue(new TextEncoder().encode(text));
                  }
                } catch (parseError) {
                  console.error("Error parsing chunk:", parseError);
                }
              }
            }
          }
        } catch (error) {
          console.error("Stream reading error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    console.error("RAG API error:", err);
    return NextResponse.json({
      answer:
        "Sorry, I'm having trouble responding right now. Please try again!",
    });
  }
}

const STOPWORDS = new Set([
  "is", "her", "his", "the", "a", "an", "of", "to", "and", "or", "for",
  "in", "on", "at", "with", "she", "he", "they", "does", "do", "did",
  "what", "who", "how", "only", "just", "about", "tell", "me", "please",
]);

function findRelevantContext(query: string): string[] {
  const queryLower = query.toLowerCase();

  // Strip punctuation, split into words, drop stopwords and very short tokens
  const keywords = queryLower
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));

  const typedRagData = ragData as RagDataItem[];

  const scored = typedRagData.map((item) => {
    const contentLower = item.content.toLowerCase();
    const titleLower = item.title.toLowerCase();

    let score = 0;
    keywords.forEach((keyword) => {
      if (contentLower.includes(keyword)) score += 2;
      if (titleLower.includes(keyword)) score += 3;
    });

    // Boost all project entries when the query is generically about projects
    if (
      (queryLower.includes("project") || queryLower.includes("built") || queryLower.includes("app")) &&
      item.id.startsWith("project_")
    ) {
      score += 1;
    }

    return { item, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5) // widened from 3 to 5
    .map((s) => `${s.item.title}: ${s.item.content}`);
}

// Build the prompt for Gemini
function buildPrompt(query: string, context: string[]): string {
  if (context.length > 0) {
    return `You are the AI assistant on Ifeoluwa Osinuga's portfolio website. You answer questions about her background, skills, and projects clearly and confidently — like someone who actually knows her work, not a generic hype bot.

CONTEXT FROM PORTFOLIO:
${context.join("\n\n")}

USER QUESTION: ${query}

Instructions:
- Answer directly using the context provided. Don't pad with filler or over-the-top enthusiasm.
- Refer to Ifeoluwa as "she" or by name.
- Use markdown formatting where it helps readability: **bold** for project/technology names, bullet points for lists of skills or features.
- Keep responses under 100 words unless the question genuinely needs more detail.
- If she has a real, notable achievement relevant to the question, mention it plainly — no need to oversell it.

Answer:`;
  } else {
    return `You are the AI assistant on Ifeoluwa Osinuga's portfolio website. This question isn't about her — answer it directly and helpfully.

USER QUESTION: ${query}

Instructions:
- Answer clearly and concisely, no unnecessary fluff.
- Use markdown formatting (bold, lists) where it improves readability.
- Keep responses under 100 words unless the question needs more.
- If asked about Ifeoluwa and you don't have the info, say so plainly: "I don't have that info, but you can explore the site or reach out to her directly."

Answer:`;
  }
}