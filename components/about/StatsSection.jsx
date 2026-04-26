"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Users, Building, MapPin, Globe, Heart, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Happy Customers",
    description: "Families & businesses secured",
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
    icon: Globe,
    value: 10,
    suffix: "+",
    label: "Export Countries",
    description: "Global footprint",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

function Counter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setCount(value);
      return;
    }

    let start = null;
    let animationFrame;
    const duration = 1800;

    const animate = (timestamp) => {
      if (!start) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const currentValue = Math.floor(value * eased);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, shouldReduceMotion]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#111111] py-14 sm:py-16 lg:py-24">
      {/* Background Pattern */}
      <div aria-hidden className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #C9A227 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div
        aria-hidden
        className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#C9A227]/10 blur-3xl sm:h-80 sm:w-80"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-[#C9A227]/10 blur-3xl sm:h-72 sm:w-72"
      />
      <div
        aria-hidden
        className="absolute right-0 top-1/3 h-52 w-52 rounded-full bg-white/5 blur-3xl sm:h-72 sm:w-72"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/20 bg-[#C9A227]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A227] sm:text-sm">
            <ShieldCheck className="h-4 w-4" />
            Our Impact
          </span>

          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Numbers That <span className="text-[#C9A227]">Speak</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base lg:text-lg">
            Over 25 years of dedication to security excellence, measured in
            milestones that matter across India and beyond.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group"
            >
              <div className="relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:border-[#C9A227]/40 hover:bg-white/[0.08] sm:p-6 lg:p-7">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Decorative Dot */}
                <div className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-[#C9A227] shadow-[0_0_16px_rgba(201,162,39,0.8)]" />

                <div className="relative z-10 flex h-full flex-col">
                  {/* Icon */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C9A227] to-[#A68520] shadow-lg shadow-[#C9A227]/20 sm:h-14 sm:w-14">
                    <stat.icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                  </div>

                  {/* Value */}
                  <div className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <h4 className="text-base font-semibold text-white sm:text-lg">
                    {stat.label}
                  </h4>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 sm:mt-12 lg:mt-16"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center text-sm text-gray-300 sm:flex-row sm:gap-4 sm:px-6 sm:text-base">
            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            <span>Trusted by families across India since 1980</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}