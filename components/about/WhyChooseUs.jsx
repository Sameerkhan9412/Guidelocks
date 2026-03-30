// components/about/WhyChooseUs.jsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Award,
  Truck,
  HeadphonesIcon,
  RefreshCw,
  Users,
  Wrench,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const reasons = [
  {
    icon: Shield,
    title: "Premium Quality",
    description:
      "Every lock is crafted using the finest materials and undergoes 20+ quality checks before leaving our facility.",
  },
  {
    icon: Award,
    title: "25+ Years Experience",
    description:
      "Decades of expertise in security solutions, serving millions of customers across India.",
  },
  {
    icon: Truck,
    title: "Pan India Delivery",
    description:
      "With 500+ authorized dealers, we deliver to every corner of India within 3-5 business days.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is always ready to help with installation, queries, or issues.",
  },
  {
    icon: RefreshCw,
    title: "5-Year Warranty",
    description:
      "Industry-leading warranty coverage on all our products, because we believe in what we make.",
  },
  {
    icon: Wrench,
    title: "Easy Installation",
    description:
      "Detailed guides and professional installation support make setup hassle-free.",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#111111] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23C9A227' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#C9A227]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#C9A227] text-[#111111] px-4 py-2 rounded-full text-sm font-bold mb-4">
            Why GuideLock?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why <span className="text-[#C9A227]">50,000+</span> Customers Trust Us
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Here's what sets us apart from the rest and makes us India's preferred 
            choice for security solutions
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#C9A227]/50 hover:bg-white/10 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A227] to-[#A68520] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-[#C9A227]/20">
                  <reason.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6">
            Ready to experience the GuideLock difference?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/categories">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#C9A227] text-[#111111] px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-[#C9A227]/30"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#111111] transition-colors"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}