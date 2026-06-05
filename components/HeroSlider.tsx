// components/HeroSlider.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  {
    image: "/hero/1.jpg",
    eyebrow: "New Collection 2024",
    title: "Premium Security",
    accent: "Locks",
    subtitle: "Engineered for strength, designed for elegance.",
    cta: "Shop Now",
    href: "/categories",
  },
  {
    image: "/hero/2.jpg",
    eyebrow: "Best Seller",
    title: "Mortise Lock",
    accent: "Excellence",
    subtitle: "Industry-leading mortise locks with superior craftsmanship.",
    cta: "Explore Mortise",
    href: "/categories",
  },
  {
    image: "/hero/3.jpg",
    eyebrow: "Smart Security",
    title: "Digital Smart",
    accent: "Systems",
    subtitle: "Step into the future with intelligent locking technology.",
    cta: "View Digital Locks",
    href: "/categories",
  },
  {
    image: "/hero/4.jpg",
    eyebrow: "Heavy Duty",
    title: "Industrial",
    accent: "Grade",
    subtitle: "Built for commercial applications where strength is everything.",
    cta: "Industrial Solutions",
    href: "/categories",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDir(1);
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = () => {
    setDir(-1);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const variants = {
    enter: (d:number) => ({ opacity: 0, scale: 1.06, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit: (d:number) => ({ opacity: 0, scale: 0.96, x: d < 0 ? 40 : -40 }),
  };

  return (
    <section
      className="relative h-[580px] sm:h-[680px] lg:h-screen min-h-[580px] max-h-[1000px] overflow-hidden bg-[#0a0a0a]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Images */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Red grid texture */}
      <div
        className="absolute inset-0 z-[3] opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#DC2626 1px, transparent 1px), linear-gradient(90deg, #DC2626 1px, transparent 1px)`,
          backgroundSize: "55px 55px",
        }}
      />

      {/* Red glow */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl z-[3] pointer-events-none"
      />

      {/* Text Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 bg-red-600/10 border border-red-600/25 text-red-400 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wide">
                {slides[current].eyebrow}
              </span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                {slides[current].title}
              </h1>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-red-500 leading-tight tracking-tight">
                {slides[current].accent}
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
              {slides[current].subtitle}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link href={slides[current].href}>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(220,38,38,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-black text-base flex items-center gap-2.5 shadow-xl shadow-red-900/40 transition-colors"
                >
                  {slides[current].cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/categories">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-white/20 text-white px-8 py-4 rounded-full font-bold text-base hover:border-red-500/60 hover:text-red-400 transition-all"
                >
                  View All
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrow Controls */}
      <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        {[{ fn: prev, icon: ChevronLeft }, { fn: next, icon: ChevronRight }].map(({ fn, icon: Icon }, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1, backgroundColor: "#DC2626" }}
            whileTap={{ scale: 0.9 }}
            onClick={fn}
            className="pointer-events-auto w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full flex items-center justify-center text-white hover:border-red-500 transition-all"
          >
            <Icon className="w-5 h-5" />
          </motion.button>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-sm border border-white/10 px-5 py-3 rounded-full">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2.5 bg-red-500" : "w-2.5 h-2.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-gradient-to-r from-red-600 to-red-400"
        />
      </div>
    </section>
  );
}