// app/contact/page.jsx

import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata = {
  title: "Contact Us | Vinayak International - Get in Touch",
  description:
    "Contact Vinayak International for all your security needs. Reach us via phone, email, WhatsApp, or visit our showroom. Our team is ready to help you 24/7.",
  openGraph: {
    title: "Contact Us | Vinayak International",
    description: "Get in touch with India's leading lock manufacturer",
    images: ["/images/contact/og-image.jpg"],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}