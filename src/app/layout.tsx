import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arcade Lookup",
  description: "A centralized tool to view all your Arcade session data",
  icons: {
    icon: [
      {
        url: "favicon_light.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "favicon_dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
