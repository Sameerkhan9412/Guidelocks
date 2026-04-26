// components/about/StorySection.jsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { Quote, ArrowRight } from "lucide-react";

export default function StorySection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#C9A227]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-1 gap-16 items-center">
          {/* Left - Images */}
        

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Section Label */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-0.5 bg-[#C9A227]" />
              <span className="text-[#C9A227] font-semibold uppercase tracking-wider text-sm">
                Our Story
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
              A Legacy of Trust,
              <br />
              <span className="text-[#C9A227]">Quality & Innovation</span>
            </h2>

            {/* Story Content */}
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                As a leading manufacturer, Vinayak International is committed to quality excellence, using advanced production technology and high-grade raw materials to ensure long-lasting performance. Our wide range of products includes designer door handles, mortise locks, and architectural hardware suitable for residential, commercial, and industrial applications.


              </p>
              <p>
               We focus on innovation, precision engineering, and strict quality control to meet international standards. Our products are highly demanded in domestic and global markets due to their superior finish, corrosion resistance, and robust construction.
              </p>
              <p>
               At Vinayak International, customer satisfaction is our top priority. We provide customized solutions, competitive pricing, and timely delivery, making us a reliable partner for distributors, wholesalers, and builders.

              </p>
            </div>


            {/* CTA */}
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-[#C9A227] font-semibold text-lg group"
            >
              Read Our Full Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}