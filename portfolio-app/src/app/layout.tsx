import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nathan Yuen | AI Solutions Developer",
  description: "運用 AI 突破界限，重塑工作方式。專注開發 AI 驅動的高效能自動化工具，致力改善人們的工作流程。",
  keywords: ["AI", "自動化", "Portfolio", "Nathan Yuen", "信毅會", "教育科技"],
  authors: [{ name: "Nathan Yuen" }],
  openGraph: {
    title: "Nathan Yuen | AI Solutions Developer",
    description: "運用 AI 突破界限，重塑工作方式",
    type: "website",
    locale: "zh_TW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Noise overlay */}
        <div className="bg-noise" />

        {children}
      </body>
    </html>
  );
}
