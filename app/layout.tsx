import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-red-100 flex gap-4">
          <Link href={'/'}>메인</Link>
          <Link href={'/a'}>A</Link>
          <Link href={'/b'}>B</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
