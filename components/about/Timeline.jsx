// components/about/Timeline.jsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { Calendar, Star, Award, Building, Users, Globe, Zap, Flag } from "lucide-react";

const timelineEvents = [
  {
    year: "1980",
    title: "The Beginning",
    description:
      "GuideLock was founded in a small workshop in Mumbai with just 5 employees and a vision to revolutionize security in India.",
    icon: Flag,
    image: "/images/about/timeline/1980.jpg",
  },
  {
    year: "2003",
    title: "First Factory",
    description:
      "Opened our first dedicated manufacturing facility in Thane, expanding production capacity to meet growing demand.",
    icon: Building,
    image: "/images/about/timeline/2003.jpg",
  },
  {
    year: "2008",
    title: "100 Dealer Network",
    description:
      "Reached a milestone of 100 authorized dealers across India, establishing a strong distribution network.",
    icon: Users,
    image: "/images/about/timeline/2008.jpg",
  },
  {
    year: "2012",
    title: "ISO Certification",
    description:
      "Achieved ISO 9001:2008 certification, affirming our commitment to quality management and continuous improvement.",
    icon: Award,
    image: "/images/about/timeline/2012.jpg",
  },
  {
    year: "2015",
    title: "Digital Innovation",
    description:
      "Launched our first line of smart digital locks, embracing technology to provide modern security solutions.",
    icon: Zap,
    image: "/images/about/timeline/2015.jpg",
  },
  {
    year: "2018",
    title: "20th Anniversary",
    description:
      "Celebrated 20 years of excellence with a new state-of-the-art manufacturing facility and 500+ employees.",
    icon: Star,
    image: "/images/about/timeline/2018.jpg",
  },
  {
    year: "2021",
    title: "Global Expansion",
    description:
      "Began exporting to international markets, bringing Indian craftsmanship to customers in 10+ countries.",
    icon: Globe,
    image: "/images/about/timeline/2021.jpg",
  },
  {
    year: "2024",
    title: "Industry Leader",
    description:
      "Recognized as one of India's top lock manufacturers with 50,000+ happy customers and counting.",
    icon: Award,
    image: "/images/about/timeline/2024.jpg",
  },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-[#111111] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l9.9-9.9h-2.83zM32 0l-3.486 3.485-1.414-1.414L30.586 0H32zM0 0c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm60 0c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zM0 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm60 0c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23C9A227' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calendar className="w-4 h-4" />
            Our Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            25+ Years of <span className="text-[#C9A227]">Excellence</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From a small workshop to an industry leader - explore the milestones 
            that shaped our journey
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-800 -translate-x-1/2 hidden md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-[#C9A227] to-[#A68520]"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-0">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#1E1E1E] rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-[#C9A227]/50 transition-all duration-300"
                  >
                    {/* Year Badge */}
                    <span className="inline-block bg-[#C9A227] text-[#111111] text-sm font-bold px-4 py-1 rounded-full mb-4">
                      {event.year}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Image */}
                    <div className="mt-4 rounded-xl overflow-hidden aspect-video relative">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/50 to-transparent" />
                    </div>
                  </motion.div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#C9A227] to-[#A68520] rounded-full flex items-center justify-center shadow-lg shadow-[#C9A227]/30 border-4 border-[#111111]"
                  >
                    <event.icon className="w-7 h-7 text-white" />
                  </motion.div>
                </div>

                {/* Empty space for the other side */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#C9A227]/10 to-transparent px-6 py-3 rounded-full border border-[#C9A227]/20">
            <div className="w-3 h-3 bg-[#C9A227] rounded-full animate-pulse" />
            <span className="text-[#C9A227] font-semibold">
              And the journey continues...
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}