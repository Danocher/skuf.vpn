import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
import YandexMetrika from "@/components/metrica";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "skuf.vpn",
  description: "VPN для безопасного доступа в Интернет",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://widget.cloudpayments.ru/bundles/cloudpayments.js"></script>
        <YandexMetrika />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#191919]`}
      >
        <Header />
        {children}
        <Toaster/>
        <Footer/>

      </body>
    </html>
  );
}
