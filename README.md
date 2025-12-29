# Ifeoluwa Osinuga — Portfolio Website

This repository contains the source code for my personal portfolio website, live at:  
🔗 https://ifee-xoxo.vercel.app

The portfolio showcases my projects, skills, and experience as a Frontend Engineer, and includes an **AI-powered RAG (Retrieval-Augmented Generation) chatbot** as an interactive feature.

---

## Features

- Personal portfolio website built with modern frontend tools
- Project showcase with live demos and GitHub links
- Responsive and accessible UI
- **RAG-based AI Chatbot** that answers questions about me and my work
- Clean component-based architecture

---

## RAG Chatbot (Key Feature)

One of the core features of this portfolio is an **embedded RAG chatbot**.

### What it does
- Allows visitors to ask questions about:
  - My background
  - My projects
  - My skills and experience
- Answers are generated using a **retrieval-augmented approach**, grounded in my own portfolio content rather than generic responses.

### How it works (high-level)
1. Relevant content (projects, bio, experience) is used as the knowledge source.
2. User queries are processed and matched against this content.
3. Retrieved context is passed to an LLM to generate accurate, contextual responses.

This feature demonstrates:
- Practical use of AI in a real user-facing product
- Integration of AI logic into a production frontend
- UX considerations for conversational interfaces

> The RAG chatbot logic lives within this codebase as part of the portfolio feature set, not as a standalone project.

---

## 🛠 Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **AI Feature:** Retrieval-Augmented Generation (RAG) chatbot integration

---


## Getting Started (Local Development)

Clone the repository:
```bash
git clone https://github.com/Nuga25/ifee_xoxo.git
cd ifee_xoxo
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

