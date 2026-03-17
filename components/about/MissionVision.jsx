// components/about/MissionVision.jsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Compass, Lightbulb } from "lucide-react";

export default function MissionVision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide every Indian home and business with world-class security solutions that are reliable, innovative, and accessible. We are committed to protecting what matters most to our customers through continuous innovation and unwavering quality standards.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To become India's most trusted and admired security solutions company, setting global benchmarks in quality and innovation. We envision a future where every door we secure represents a promise of safety and peace of mind.",
      color: "from-[#C9A227] to-[#A68520]",
      bgColor: "bg-[#C9A227]/5",
    },
    {
      icon: Compass,
      title: "Our Purpose",
      description:
        "We exist to empower people with the confidence that comes from knowing their loved ones and valuables are protected. Security is not just our business – it's our responsibility and our passion.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Lightbulb,
      title: "Our Promise",
      description:
        "Every product we create undergoes rigorous testing and quality checks. We promise uncompromising quality, transparent practices, and customer service that goes above and beyond expectations.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#F5F5F5] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#C9A227]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#111111]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            What Drives Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
            Mission, Vision & <span className="text-[#C9A227]">Values</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The principles that guide every decision we make and every product we create
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className={`${card.bgColor} rounded-3xl p-8 md:p-10 border border-transparent hover:border-[#C9A227]/20 transition-all duration-300 group`}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
              >
                <card.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-[#111111] mb-4">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                {card.description}
              </p>

              {/* Decorative Line */}
              <div className="mt-6 w-20 h-1 bg-gradient-to-r from-[#C9A227] to-transparent rounded-full group-hover:w-32 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}