// components/home/Brands.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import logo1 from "@/app/assets/logo1.png"
import logo2 from "@/app/assets/logo2.png"
import logo3 from "@/app/assets/logo3.png"
const brands = [
  { name: "Yale", logo: logo1 },
  { name: "Godrej", logo: logo2 },
  { name: "Dorset", logo: logo3},
  { name: "Harrison", logo: "/images/brands/harrison.png" },
  { name: "Link", logo: "/images/brands/link.png" },
  { name: "Spider", logo: "/images/brands/spider.png" },
  { name: "Ozone", logo: "/images/brands/ozone.png" },
];

export default function Brands() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#C9A227] font-semibold">Trusted Partners</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-2">
            Brands We Work With
          </h2>
        </motion.div>

        {/* Infinite Scroll Brands */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Scrolling Container */}
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            className="flex items-center gap-16"
          >
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 w-40 h-24 bg-[#F5F5F5] rounded-2xl flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200"
        >
          {[
            { value: "100+", label: "Brand Partners" },
            { value: "5000+", label: "Products Available" },
            { value: "99%", label: "Customer Satisfaction" },
            { value: "48h", label: "Fast Delivery" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#C9A227]">{stat.value}</div>
              <div className="text-gray-500 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}