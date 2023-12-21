import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import ReactGA from 'react-ga';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GetGetty Downloader",
  description: "Website to download 2048px Getty Images for free",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  ReactGA.initialize('G-1MBYEL1SQK'); 
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-1MBYEL1SQK"
      />
    </html>
  );
}
