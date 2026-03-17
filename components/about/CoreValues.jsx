// components/about/CoreValues.jsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Shield,
  Heart,
  Zap,
  Users,
  Leaf,
  Award,
  Handshake,
  Target,
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    shortDesc: "Honest in every interaction",
    fullDesc:
      "We believe in transparent business practices and honest communication. Our word is our bond, and we stand behind every product we create.",
    color: "#3B82F6",
  },
  {
    icon: Award,
    title: "Excellence",
    shortDesc: "Quality without compromise",
    fullDesc:
      "We never settle for 'good enough'. Every lock we manufacture must meet our exacting standards before it reaches our customers.",
    color: "#C9A227",
  },
  {
    icon: Zap,
    title: "Innovation",
    shortDesc: "Always evolving, always improving",
    fullDesc:
      "We invest heavily in R&D to stay ahead of security challenges. Innovation is in our DNA, driving us to create better solutions.",
    color: "#8B5CF6",
  },
  {
    icon: Heart,
    title: "Customer First",
    shortDesc: "Your security is our priority",
    fullDesc:
      "Every decision we make starts with the customer. We listen, understand, and deliver solutions that truly meet their needs.",
    color: "#EF4444",
  },
  {
    icon: Users,
    title: "Teamwork",
    shortDesc: "Together we achieve more",
    fullDesc:
      "Our success is built on collaboration. Every team member, from factory floor to boardroom, contributes to our shared vision.",
    color: "#10B981",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    shortDesc: "Responsible manufacturing",
    fullDesc:
      "We're committed to environmentally responsible manufacturing processes and sustainable business practices for future generations.",
    color: "#22C55E",
  },
  {
    icon: Handshake,
    title: "Trust",
    shortDesc: "Earned through actions",
    fullDesc:
      "Trust is earned, not given. We work every day to maintain the trust our customers, partners, and employees place in us.",
    color: "#F59E0B",
  },
  {
    icon: Target,
    title: "Accountability",
    shortDesc: "We own our responsibilities",
    fullDesc:
      "We take full responsibility for our actions and outcomes. When we make a promise, we deliver. When we make a mistake, we fix it.",
    color: "#EC4899",
  },
];

export default function CoreValues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeValue, setActiveValue] = useState(null);

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#C9A227]/5 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#111111] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Foundation
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
            Core <span className="text-[#C9A227]">Values</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            These values are the foundation of everything we do. They shape our culture, 
            guide our decisions, and define who we are.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setActiveValue(index)}
              onMouseLeave={() => setActiveValue(null)}
              className="relative group cursor-pointer"
            >
              <div
                className={`bg-[#F5F5F5] rounded-2xl p-6 md:p-8 text-center transition-all duration-300 h-full ${
                  activeValue === index
                    ? "bg-[#111111] shadow-xl scale-105"
                    : "hover:shadow-lg"
                }`}
              >
                {/* Icon */}
                <motion.div
                  animate={{
                    scale: activeValue === index ? 1.1 : 1,
                    rotate: activeValue === index ? 360 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-colors"
                  style={{
                    backgroundColor:
                      activeValue === index ? value.color : `${value.color}20`,
                  }}
                >
                  <value.icon
                    className="w-8 h-8 transition-colors"
                    style={{
                      color: activeValue === index ? "#fff" : value.color,
                    }}
                  />
                </motion.div>

                {/* Title */}
                <h3
                  className={`text-xl font-bold mb-2 transition-colors ${
                    activeValue === index ? "text-white" : "text-[#111111]"
                  }`}
                >
                  {value.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm transition-colors ${
                    activeValue === index ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {activeValue === index ? value.fullDesc : value.shortDesc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}