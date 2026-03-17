// components/home/PromoBanner.jsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, Percent, Truck, Shield } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#C9A227] via-[#D4B444] to-[#C9A227] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0.1,
            }}
            animate={{
              y: [null, "-20%", null],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Lock className="w-12 h-12 text-[#111111]" />
          </motion.div>
        ))}
      </div>

      {/* Diagonal Lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, #111111 35px, #111111 70px)`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#111111] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              <Percent className="w-4 h-4" />
              Limited Time Offer
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight">
              Get Up To{" "}
              <span className="relative">
                <span className="relative z-10">30% OFF</span>
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-2 left-0 h-4 bg-white/30 -z-0"
                />
              </span>
            </h2>
            <p className="text-[#111111]/80 text-lg mt-4 max-w-lg">
              On your first order! Use code <span className="font-bold bg-white px-2 py-1 rounded">SECURE30</span> at checkout
            </p>
          </motion.div>

          {/* Right - Features & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-end gap-6"
          >
            {/* Mini Features */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Shield, text: "100% Original" },
                { icon: Truck, text: "Free Delivery" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-[#111111]/10 px-4 py-2 rounded-full"
                >
                  <item.icon className="w-5 h-5 text-[#111111]" />
                  <span className="text-[#111111] font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="group bg-[#111111] text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 shadow-2xl"
            >
              Shop Now
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </motion.button>

            {/* Timer (Optional) */}
            <div className="flex items-center gap-4 text-[#111111]">
              <span className="font-semibold">Offer Ends In:</span>
              <div className="flex gap-2">
                {["23", "14", "56"].map((time, i) => (
                  <div key={i} className="bg-[#111111] text-white px-3 py-2 rounded-lg font-mono font-bold">
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}