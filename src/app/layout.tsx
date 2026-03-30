import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-jp",
});

export const metadata: Metadata = {
  title: "コネクトワールド | 梨花祭",
  description: "童話の世界へ繋がる扉が並ぶコネクトワールド",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSerifJp.variable} antialiased`}>
      <body className="min-h-full font-serif bg-fantasy-bg text-fantasy-text">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
