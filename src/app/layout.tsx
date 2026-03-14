import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "AgriHeroes — The Operating System for Regenerative Campuses | SDI 2025",
  description:
    "AgriHeroes transforms school campuses into living laboratories through AI-powered learning, IoT monitoring, and regenerative agriculture. Built for Solar Decathlon India 2025.",
  keywords: [
    "AgriHeroes",
    "Solar Decathlon India",
    "regenerative agriculture",
    "campus sustainability",
    "AI education",
    "IoT dashboard",
    "net-zero campus",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
