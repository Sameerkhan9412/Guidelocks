// components/home/HeroSection.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// YouTube Video Configuration
const YOUTUBE_VIDEO_ID = "R7MeJVyYQJA"; // Replace with your YouTube video ID

const heroSlides = [
  {
    id: 1,
    title: "Premium Door",
    subtitle: "Handles",
    description:
      "Enhancing Security with Style – High-Quality Architectural Hardware for Residential & Commercial Spaces.",
    cta: "Explore Collection",
  },
  {
    id: 2,
    title: "Mortise Locks",
    subtitle: "Excellence",
    description:
      "Industry-leading mortise locks with superior craftsmanship and unmatched durability.",
    cta: "View Mortise Locks",
  },
  {
    id: 3,
    title: "Digital Smart",
    subtitle: "Locks",
    description:
      "Step into the future with our advanced digital locking systems and smart security.",
    cta: "Discover Smart Locks",
  },
  {
    id: 4,
    title: "Furniture",
    subtitle: "Hardware",
    description:
      "Elegant furniture locks that blend seamlessly with your interior design aesthetic.",
    cta: "Browse Furniture Locks",
  },
  {
    id: 5,
    title: "Industrial",
    subtitle: "Grade Security",
    description:
      "Heavy-duty locks built for commercial and industrial applications.",
    cta: "Industrial Solutions",
  },
];

const stats = [
  { icon: Shield, value: "50K+", label: "Locks Sold" },
  { icon: Award, value: "25+", label: "Years Experience" },
  { icon: Clock, value: "24/7", label: "Support" },
];
// https://www.youtube.com/watch?v=R7MeJVyYQJA

// YouTube Background Video Component
const YouTubeBackground = ({ videoId }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&cc_load_policy=0&start=0`;
  const router=useRouter();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#111111] flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#C9A227]/30 border-t-[#C9A227] rounded-full animate-spin" />
            <span className="text-gray-400 text-sm">Loading video...</span>
          </div>
        </div>
      )}

      {/* YouTube iframe container */}
      <div className="absolute inset-0 pointer-events-none">
        <iframe
          src={embedUrl}
          title="Background Video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300vw] h-[300vh] md:w-[177.77vh] md:h-[100vh] min-w-full min-h-full"
          style={{
            border: "none",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Dark overlays for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/70 to-transparent z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/30 z-[2]" />
    </div>
  );
};

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden bg-[#111111]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Single YouTube Video Background */}
      {isMounted && <YouTubeBackground videoId={YOUTUBE_VIDEO_ID} />}

      {/* Animated Background Particles */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#C9A227]/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text Content - Slides */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] px-4 py-2 rounded-full"
              >
                <span className="w-2 h-2 bg-[#C9A227] rounded-full animate-pulse" />
                <span className="text-sm font-medium">Premium Quality Locks</span>
              </motion.div>

              {/* Title */}
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-[#C9A227] to-[#E8C547] bg-clip-text text-transparent"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.h2>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed"
              >
                {heroSlides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(201, 162, 39, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-[#C9A227] to-[#A68520] text-[#111111] px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 shadow-2xl shadow-[#C9A227]/30"
                >
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <Link href={"/categories"}>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(201, 162, 39, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#C9A227] text-[#C9A227] px-8 py-4 rounded-full font-bold text-lg hover:text-white transition-colors"
                >
                  View Catalog
                </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="bg-[#2F2F2F]/60 backdrop-blur-xl border border-[#C9A227]/20 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/5 rounded-2xl flex items-center justify-center mb-4 border border-[#C9A227]/30">
                      <stat.icon className="w-8 h-8 text-[#C9A227]" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#C9A227" }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="pointer-events-auto w-14 h-14 bg-[#2F2F2F]/80 backdrop-blur-sm border border-[#C9A227]/30 rounded-full flex items-center justify-center text-white hover:text-[#111111] transition-colors shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#C9A227" }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="pointer-events-auto w-14 h-14 bg-[#2F2F2F]/80 backdrop-blur-sm border border-[#C9A227]/30 rounded-full flex items-center justify-center text-white hover:text-[#111111] transition-colors shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-3 bg-[#2F2F2F]/60 backdrop-blur-sm px-6 py-3 rounded-full border border-[#C9A227]/20">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[#C9A227] scale-125"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
              />
              {index === currentSlide && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 w-3 h-3 rounded-full ring-2 ring-[#C9A227] ring-offset-2 ring-offset-[#111111]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2F2F2F] z-20">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-gradient-to-r from-[#C9A227] to-[#E8C547]"
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs uppercase tracking-widest">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#C9A227] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}