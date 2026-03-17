// components/home/Banner.jsx
"use client";

import { motion } from "framer-motion";
import { Shield, Truck, Award, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Secure",
    description: "Premium quality locks with warranty"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹5,000"
  },
  {
    icon: Award,
    title: "Best Quality",
    description: "ISI certified products"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer service"
  }
];

export default function Banner() {
  return (
    <section className="relative bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#111111] py-12 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A227' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Glowing Lines */}
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
      />
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group flex flex-col md:flex-row items-center gap-4 text-center md:text-left"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-[#C9A227] to-[#8B7019] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C9A227]/20 group-hover:shadow-[#C9A227]/40 transition-shadow"
              >
                <feature.icon className="w-8 h-8 text-[#111111]" />
              </motion.div>
              <div>
                <h3 className="text-white font-bold text-lg group-hover:text-[#C9A227] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}