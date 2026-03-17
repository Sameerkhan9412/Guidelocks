// components/about/StatsSection.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Users,
  ShoppingBag,
  Building,
  Award,
  MapPin,
  Globe,
  TrendingUp,
  Heart,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Happy Customers",
    description: "Families & businesses secured",
  },
  {
    icon: ShoppingBag,
    value: 100,
    suffix: "+",
    label: "Product Range",
    description: "Different lock varieties",
  },
  {
    icon: Building,
    value: 500,
    suffix: "+",
    label: "Dealers",
    description: "Authorized partners nationwide",
  },
  {
    icon: MapPin,
    value: 28,
    suffix: "",
    label: "States Covered",
    description: "Pan-India presence",
  },
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "Awards",
    description: "Industry recognition",
  },
  {
    icon: Globe,
    value: 10,
    suffix: "+",
    label: "Export Countries",
    description: "Global footprint",
  },
];

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="py-20 bg-[#111111] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C9A227 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Numbers That <span className="text-[#C9A227]">Speak</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Over 25 years of dedication to security excellence, measured in milestones that matter
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-[#C9A227]/50 hover:bg-white/10 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-[#C9A227] to-[#A68520] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#C9A227]/20">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>

                {/* Value */}
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h4 className="text-white font-semibold mb-1">{stat.label}</h4>
                <p className="text-gray-500 text-sm">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 text-gray-400">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span>Trusted by families across India since 1998</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}