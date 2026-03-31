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
    default: "GuideLock | Premium Door Locks & Security Solutions",
    template: "%s | GuideLock",
  },

  description:
    "GuideLock provides premium quality door locks, smart locks, and security hardware. Trusted by customers for safety, durability, and modern design.",

  keywords: [
    "door locks",
    "smart locks",
    "security locks",
    "lock hardware",
    "digital locks",
    "home security",
    "Godrej locks",
    "Yale locks",
    "GuideLock",
  ],

  authors: [{ name: "GuideLock" }],
  creator: "GuideLock",

  openGraph: {
    title: "GuideLock | Security You Can Trust",
    description:
      "Explore premium locks, smart locking systems, and modern security solutions with GuideLock.",
    url: "https://guidelock.com",
    siteName: "GuideLock",
    images: [
      {
        url: "/assets/logo1.png", // put your OG banner later
        width: 1200,
        height: 630,
        alt: "GuideLock Security Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GuideLock | Premium Locks",
    description:
      "Secure your home with GuideLock’s modern lock solutions.",
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
