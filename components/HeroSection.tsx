// components/HeroSection.jsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative h-screen min-h-[640px] max-h-[1000px] overflow-hidden bg-[#0a0a0a]">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-40" : "opacity-0"
        }`}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Fallback gradient bg */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a]" />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30 z-[1]" />

      {/* Red grid texture */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#DC2626 1px, transparent 1px), linear-gradient(90deg, #DC2626 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orb */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-3xl z-[2] pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl space-y-8">
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2.5 bg-red-600/10 border border-red-600/25 text-red-400 px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wide">
              Premium Security Hardware — Est. 1980
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight">
              Secure What
              <br />
              <span className="text-red-500">Matters Most</span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-xl sm:text-2xl text-gray-400 max-w-xl leading-relaxed"
          >
            Premium locks engineered for homes and businesses.
            Trusted by 50,000+ customers across India since 1980.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/categories">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 44px rgba(220,38,38,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="group bg-red-600 hover:bg-red-700 text-white px-9 py-4 rounded-full font-black text-lg flex items-center gap-2.5 shadow-xl shadow-red-900/40 transition-colors"
              >
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="border border-white/20 text-white px-9 py-4 rounded-full font-bold text-lg hover:border-red-500/60 hover:text-red-400 transition-all flex items-center gap-2.5"
              >
                <Play className="w-5 h-5" />
                Our Story
              </motion.button>
            </Link>
          </motion.div>

          {/* Quick trust stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-wrap gap-6 pt-4 border-t border-white/10"
          >
            {[
              { value: "50K+", label: "Locks Sold" },
              { value: "40+", label: "Years Experience" },
              { value: "500+", label: "Dealer Partners" },
              { value: "10+", label: "Export Countries" },
            ].map((s, i) => (
              <div key={i} className="text-center sm:text-left">
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-red-500 rounded-full" />
        </motion.div>
        <span className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
      </motion.div>
    </section>
  );
}