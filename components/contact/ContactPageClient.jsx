// components/contact/ContactPageClient.jsx
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import HeroSection from "./HeroSection";
import ContactFormSection from "./ContactFormSection";
import ContactInfoSection from "./ContactInfoSection";
import MapSection from "./MapSection";
import OfficeLocations from "./OfficeLocations";
import FAQSection from "./FAQSection";
import CTABanner from "./CTABanner";

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <HeroSection />
      <ContactInfoSection />
      <ContactFormSection />
      <MapSection />
      <OfficeLocations />
      <FAQSection />
      <CTABanner />
      <Footer />
    </div>
  );
}