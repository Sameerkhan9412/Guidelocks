import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://guidelock.com"), // change when deployed

  title: {
    default: "Vinayak International | Premium Door Locks & Security Solutions",
    template: "%s | Vinayak International",
  },

  description:
    "Vinayak International provides premium quality door locks, smart locks, and security hardware. Trusted by customers for safety, durability, and modern design.",

  keywords: [
    "door locks",
    "smart locks",
    "security locks",
    "lock hardware",
    "digital locks",
    "home security",
    "Godrej locks",
    "Yale locks",
    "Vinayak International",
  ],

  authors: [{ name: "Vinayak International" }],
  creator: "Vinayak International",

  openGraph: {
    title: "Vinayak International | Security You Can Trust",
    description:
      "Explore premium locks, smart locking systems, and modern security solutions with Vinayak International.",
    url: "https://guidelock.com",
    siteName: "Vinayak International",
    images: [
      {
        url: "/assets/logo1.png", // put your OG banner later
        width: 1200,
        height: 630,
        alt: "Vinayak International Security Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vinayak International | Premium Locks",
    description:
      "Secure your home with Vinayak International’s modern lock solutions.",
    images: ["/assets/logo1.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
