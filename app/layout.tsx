import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalHeader from "./components/GlobalHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gweno Kipodi SDA Church - Worship & Community",
  description: "Welcome to Gweno Kipodi SDA Church. A place of worship, community, and spiritual growth. Watch sermons, explore hymns, and participate in church life.",
  keywords: "SDA Church, Adventist Church, Kenya, Worship, Sermons, Hymns, Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <GlobalHeader />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
