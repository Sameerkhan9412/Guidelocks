// components/about/AboutPageClient.jsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import HeroSection from "./HeroSection";
import StorySection from "./StorySection";
import MissionVision from "./MissionVision";
import CoreValues from "./CoreValues";
import Timeline from "./Timeline";
import StatsSection from "./StatsSection";
import TeamSection from "./TeamSection";
import ManufacturingSection from "./ManufacturingSection";
import CertificationsSection from "./CertificationsSection";
import WhyChooseUs from "./WhyChooseUs";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";

export default function AboutPageClient() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <HeroSection />
      <StorySection />
      <StatsSection />
      <MissionVision />
      <CoreValues />
      <Timeline />
      <ManufacturingSection />
      <TeamSection />
      <CertificationsSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}