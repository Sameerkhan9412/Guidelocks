// app/about/page.jsx

import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata = {
  title: "About Us | LockShop - Premium Security Solutions Since 1998",
  description:
    "Learn about LockShop's 25+ years journey of providing premium quality locks and security solutions across India. Discover our mission, values, and commitment to excellence.",
  openGraph: {
    title: "About Us | LockShop",
    description: "25+ years of trusted security solutions",
    images: ["/images/about/og-image.jpg"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}