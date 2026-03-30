// components/home/AboutUs.jsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Check, Award, Users, Building, Calendar } from "lucide-react";
import leftImg from "@/public/uploads/categories/1773655352943-Verti-Bolt-G111.png"
import Link from "next/link";

const stats = [
  { icon: Calendar, value: "25+", label: "Years Experience" },
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Building, value: "500+", label: "Dealers Nationwide" },
  { icon: Award, value: "100+", label: "Quality Awards" },
];

const highlights = [
  "High-quality door handles & mortise locks",
  "Modern & durable designs",
  "Competitive pricing for B2B buyers",
  "Bulk manufacturing & export capability",
  "On-time delivery & customer support",
];

export default function AboutUs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-24 bg-[#111111] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
        <motion.div
          style={{ y }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A227]/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(y, (v) => -v) }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A227]/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Images */}
          {/*<motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              {/* <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/about/factory.jpg"
                  alt="Our Factory"
                  width={600}
                  height={500}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/50 to-transparent" />
              </motion.div> */}

              {/* Floating Card */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-8 -right-8 bg-gradient-to-br from-[#C9A227] to-[#8B7019] p-6 rounded-2xl shadow-2xl z-20"
              >
                <div className="text-[#111111]">
                  <div className="text-5xl font-bold">25+</div>
                  <div className="text-sm font-semibold mt-1">Years of Excellence</div>
                </div>
              </motion.div> */}

              {/* Secondary Image */}
              {/* <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden border-4 border-[#C9A227] shadow-2xl"
              >
                <Image
                  src="/images/about/quality.jpg"
                  alt="Quality Check"
                  fill
                  className="object-cover"
                />
              </motion.div> */}
            {/* </div> */}
            {/* Decorative Elements */}
            {/* <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-[#C9A227]/20 rounded-full"
            /> */}
          {/* </motion.div> */}

          <Image src={leftImg} width={100} height={100} alt="left img" className="w-full h-full object-cover"/>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4"
              >
                About Us
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Trusted Security Solutions
                <span className="text-[#C9A227]"> Since 1980</span>
              </h2>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed">
             Vinayak Export is a trusted name in the manufacturing and export of premium-quality door handles and mortise locks, delivering strength, security, and modern design to customers worldwide. With years of industry experience, we specialize in crafting durable hardware solutions that combine functionality with elegant aesthetics.

            </p>

            <p className="text-gray-400 leading-relaxed">
              As a leading manufacturer, Vinayak Export is committed to quality excellence, using advanced production technology and high-grade raw materials to ensure long-lasting performance. Our wide range of products includes designer door handles, mortise locks, and architectural hardware suitable for residential, commercial, and industrial applications.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We focus on innovation, precision engineering, and strict quality control to meet international standards. Our products are highly demanded in domestic and global markets due to their superior finish, corrosion resistance, and robust construction.
            </p>
            <p className="text-gray-400 leading-relaxed">
              At Vinayak Export, customer satisfaction is our top priority. We provide customized solutions, competitive pricing, and timely delivery, making us a reliable partner for distributors, wholesalers, and builders.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-[#C9A227] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#111111]" />
                  </div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-800">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-[#C9A227] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link href={"./about"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#C9A227] to-[#A68520] text-[#111111] px-8 py-4 rounded-full font-bold shadow-xl shadow-[#C9A227]/20"
              >
                Learn More About Us
              </motion.button>
              </Link>
              <Link href={"./contact"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#C9A227] text-[#C9A227] px-8 py-4 rounded-full font-bold hover:bg-[#C9A227] hover:text-[#111111] transition-colors"
              >
                Contact Us
              </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}