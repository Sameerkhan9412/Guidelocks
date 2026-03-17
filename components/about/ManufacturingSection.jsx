// components/about/ManufacturingSection.jsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Factory,
  Cog,
  Shield,
  CheckCircle,
  Play,
  X,
  Microscope,
  Wrench,
  Package,
  Truck,
} from "lucide-react";

const processes = [
  {
    icon: Cog,
    title: "Raw Material Selection",
    description:
      "We source only the highest quality stainless steel, brass, and zinc alloys from certified suppliers.",
    image: "/images/about/process/raw-material.jpg",
  },
  {
    icon: Factory,
    title: "Precision Manufacturing",
    description:
      "State-of-the-art CNC machines and automated production lines ensure consistency and precision.",
    image: "/images/about/process/manufacturing.jpg",
  },
  {
    icon: Microscope,
    title: "Quality Testing",
    description:
      "Every lock undergoes 20+ quality checks including durability, corrosion resistance, and security tests.",
    image: "/images/about/process/testing.jpg",
  },
  {
    icon: Wrench,
    title: "Assembly & Finishing",
    description:
      "Skilled craftsmen hand-assemble and finish each lock to meet our exacting standards.",
    image: "/images/about/process/assembly.jpg",
  },
  {
    icon: Package,
    title: "Packaging",
    description:
      "Secure, eco-friendly packaging ensures your lock arrives in perfect condition.",
    image: "/images/about/process/packaging.jpg",
  },
  {
    icon: Truck,
    title: "Delivery",
    description:
      "Nationwide distribution network ensures fast delivery to every corner of India.",
    image: "/images/about/process/delivery.jpg",
  },
];

const facilities = [
  { label: "Factory Area", value: "50,000 sq ft" },
  { label: "CNC Machines", value: "50+" },
  { label: "Daily Capacity", value: "5,000 units" },
  { label: "Employees", value: "500+" },
];

export default function ManufacturingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProcess, setActiveProcess] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F5F5F5] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Factory className="w-4 h-4" />
            Manufacturing Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
            How We <span className="text-[#C9A227]">Build</span> Quality
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Take a look inside our state-of-the-art manufacturing facility where 
            precision engineering meets traditional craftsmanship
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Process Image/Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProcess}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={processes[activeProcess].image}
                    alt={processes[activeProcess].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Play Button */}
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-[#C9A227] rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-[#C9A227]/50 transition-shadow"
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </motion.div>
              </button>

              {/* Current Process Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block bg-[#C9A227] text-[#111111] text-sm font-bold px-3 py-1 rounded-full mb-3">
                  Step {activeProcess + 1} of {processes.length}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {processes[activeProcess].title}
                </h3>
              </div>
            </div>

            {/* Facility Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-[#F5F5F5] rounded-xl p-4 text-center"
                >
                  <p className="text-2xl font-bold text-[#C9A227]">
                    {facility.value}
                  </p>
                  <p className="text-sm text-gray-600">{facility.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Process Steps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="space-y-4"
          >
            {processes.map((process, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveProcess(index)}
                whileHover={{ x: 10 }}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 flex items-start gap-4 ${
                  activeProcess === index
                    ? "bg-[#111111] shadow-xl"
                    : "bg-[#F5F5F5] hover:bg-[#EBEBEB]"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    activeProcess === index
                      ? "bg-[#C9A227]"
                      : "bg-[#C9A227]/10"
                  }`}
                >
                  <process.icon
                    className={`w-6 h-6 ${
                      activeProcess === index ? "text-white" : "text-[#C9A227]"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`font-bold text-lg ${
                        activeProcess === index ? "text-white" : "text-[#111111]"
                      }`}
                    >
                      {process.title}
                    </h4>
                    <span
                      className={`text-sm font-medium ${
                        activeProcess === index ? "text-[#C9A227]" : "text-gray-400"
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      activeProcess === index ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {process.description}
                  </p>
                </div>

                {/* Check */}
                {activeProcess === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-[#C9A227] rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              {/* Video placeholder */}
              <div className="w-full h-full flex items-center justify-center text-white">
                <p>Factory Tour Video</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}