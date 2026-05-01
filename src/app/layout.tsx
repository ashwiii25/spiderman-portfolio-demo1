import type { Metadata } from "next";
import { Bangers, Bebas_Neue, Poppins } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Spider-Verse Portfolio | Miles Morales",
  description: "A cinematic, multi-dimensional portfolio experience inspired by Across the Spider-Verse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${bangers.variable} ${bebasNeue.variable} ${poppins.variable} font-modern bg-spider-black text-white antialiased noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
