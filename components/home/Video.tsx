// components/home/VideoShowcase.jsx
"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function VideoShowcase() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#C9A227] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              <Play className="w-4 h-4" />
              Product Showcase
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] mb-4">
              See Our <span className="text-[#C9A227]">Products in Action</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the quality and craftsmanship that sets our products apart
            </p>
          </div>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            {/* Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#C9A227] to-[#D4B444] rounded-3xl opacity-20 blur-2xl" />
            
            {/* Video Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/R7MeJVyYQJA"
                  title="Product Showcase Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Bottom Accent */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#C9A227] via-[#D4B444] to-[#C9A227] rounded-full mt-2"
            />
          </motion.div>

          {/* Optional Stats or Features Below Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "500+", label: "Products" },
              { value: "100%", label: "Authentic" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-xl bg-white shadow-md"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#C9A227]">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}