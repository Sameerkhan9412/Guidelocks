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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <motion.div
              style={{ y: imageY }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/about/founder.jpg"
                alt="LockShop Founder"
                width={600}
                height={700}
                className="object-cover w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />
              
              {/* Founder Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h4 className="text-white text-2xl font-bold">Rajesh Kumar</h4>
                <p className="text-[#C9A227]">Founder & Chairman</p>
              </div>
            </motion.div>

            {/* Secondary Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-xl z-20"
            >
              <Image
                src="/images/about/factory-old.jpg"
                alt="First Factory 1998"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Year Badge */}
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={isInView ? { opacity: 1, rotate: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="absolute -top-8 -left-8 bg-[#C9A227] text-[#111111] rounded-2xl p-6 shadow-xl z-20"
            >
              <p className="text-sm font-semibold">Since</p>
              <p className="text-4xl font-bold">1998</p>
            </motion.div>

            {/* Decorative Circle */}
            <div className="absolute top-1/2 -left-20 w-40 h-40 border-2 border-[#C9A227]/30 rounded-full -z-10" />
          </motion.div>

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
                In 1998, in a small workshop in Mumbai, our founder Rajesh Kumar 
                started with a simple vision: to provide Indian homes and businesses 
                with security solutions they could truly trust.
              </p>
              <p>
                What began as a modest operation with just 5 employees has grown 
                into one of India's most respected lock manufacturing companies. 
                Today, we employ over 500 skilled craftsmen and engineers who 
                share our passion for excellence.
              </p>
              <p>
                Every lock we create carries forward our founding principle – 
                that true security comes from uncompromising quality and 
                continuous innovation.
              </p>
            </div>

            {/* Quote */}
            <div className="relative bg-[#F5F5F5] rounded-2xl p-8 border-l-4 border-[#C9A227]">
              <Quote className="absolute top-4 right-4 w-12 h-12 text-[#C9A227]/20" />
              <p className="text-[#111111] text-xl italic font-medium mb-4">
                "Our commitment to quality isn't just a business strategy – 
                it's a promise to every family that trusts us with their security."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/images/about/founder-thumb.jpg"
                    alt="Rajesh Kumar"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-[#111111]">Rajesh Kumar</p>
                  <p className="text-sm text-gray-500">Founder & Chairman</p>
                </div>
              </div>
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