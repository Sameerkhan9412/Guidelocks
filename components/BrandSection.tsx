// components/BrandsSection.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  "/brands/1.png",
  "/brands/2.png",
  "/brands/3.png",
  "/brands/4.png",
];

// Duplicate for seamless scroll
const allBrands = [...brands, ...brands, ...brands];

export default function BrandsSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-red-600/8 text-red-600 border border-red-200 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            Trusted Brands
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Brands We <span className="text-red-600">Partner With</span>
          </h2>
          <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">
            We collaborate with India's most trusted names in security and hardware
          </p>
        </motion.div>

        {/* Scrolling track */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling row */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [0, `-${(brands.length * 200)}px`] }}
              transition={{ x: { duration: 18, repeat: Infinity, ease: "linear" } }}
              className="flex items-center gap-6 w-max"
            >
              {allBrands.map((b, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="flex-shrink-0 w-40 h-20 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center p-4 group hover:border-red-200 hover:bg-red-50/50 hover:shadow-lg hover:shadow-red-900/5 transition-all duration-300"
                >
                  <Image
                    src={b}
                    alt={`Brand ${i + 1}`}
                    width={120}
                    height={50}
                    className="object-contain h-10 w-auto grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-14 border-t border-gray-100"
        >
          {[
            { value: "100+", label: "Brand Partners" },
            { value: "5,000+", label: "SKUs Available" },
            { value: "99%", label: "Customer Satisfaction" },
            { value: "48h", label: "Express Delivery" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <p className="text-4xl sm:text-5xl font-black text-red-600 group-hover:scale-110 transition-transform inline-block">
                {s.value}
              </p>
              <p className="text-gray-500 text-sm mt-2 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}