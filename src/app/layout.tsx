import type { Metadata } from "next";
import { Syncopate } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-syncopate",
});

export const metadata: Metadata = {
  title: "Kagabo Irene Lucky - Backend & AI Engineer",
  description: "Backend Engineer, AI Engineer, and Technical Founder building intelligent software systems that solve real-world problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syncopate.variable} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
