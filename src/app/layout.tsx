import type { Metadata } from "next";
import { Fira_Code, Manrope } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import LoadingScreen from "@/components/LoadingScreen";

const firaCode = Fira_Code({ 
  subsets: ["latin"], 
  weight: ["300", "700"],
  variable: "--font-fira-code"
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Ifeoluwa Osinuga | Software Engineer",
  description:
    "Portfolio of Ifeoluwa Osinuga, a Frontend Focused Software Engineer skilled in React, Next.js, TypeScript, Node.js, Tailwind CSS, UI/UX and cloud-based integrations.",
  metadataBase: new URL("https://ifee-xoxo.vercel.app"),
  keywords: [
    "Ifeoluwa Osinuga",
    "Osinuga Ifeoluwa",
    "Ifeoluwa frontend developer",
    "React developer Nigeria",
    "Next.js portfolio",
    "Website developer",
    "Software Engineer",
  ],
  authors: [{ name: "Ifeoluwa Osinuga" }],
  openGraph: {
    title: "Ifeoluwa Osinuga | Frontend Engineer",
    description:
      "Showcasing projects in React, Next.js, TypeScript, and full-stack development.",
    url: "https://ifee-xoxo.vercel.app",
    siteName: "Ifeoluwa Osinuga Portfolio",
    images: ["/images/portfolio-project.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ifeoluwa Osinuga Portfolio",
    description:
      "Frontend Engineer | React | Next.js | TypeScript | Tailwind CSS",
    images: ["/images/portfolio-project.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${firaCode.variable} ${manrope.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="3tVbPHEteGqMaeFM55uziuPmeqEb7xkEACxbDzcUahE"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ifeoluwa Osinuga",
              jobTitle: "Frontend Engineer",
              description:
                "Frontend Engineer skilled in React, Next.js, TypeScript, UI/UX Design, and building modern web experiences.",
              url: "https://ifee-xoxo.vercel.app",
              sameAs: [
                "https://github.com/Nuga25",
                "https://www.linkedin.com/in/osinugaifeoluwa",
                "https://x.com/ifee_xoxo",
                "https://instagram.com/_osinugaifeoluwa_",
              ],
            }),
          }}
        />
        ;
      </head>
      <body className={manrope.className}>
        <LoadingScreen />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
