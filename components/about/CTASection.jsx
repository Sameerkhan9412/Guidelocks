// components/about/CTASection.jsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  MessageCircle,
  Clock,
} from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#111111] relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A227]/20 rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="inline-block bg-[#C9A227] text-[#111111] px-4 py-2 rounded-full text-sm font-bold mb-6"
            >
              Let's Connect
            </motion.span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Secure
              <br />
              <span className="text-[#C9A227]">Your World?</span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Whether you need a single lock or a complete security solution, 
              we're here to help. Get in touch with our experts today.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-4 text-gray-300 hover:text-[#C9A227] transition-colors group"
              >
                <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center group-hover:bg-[#C9A227] transition-colors">
                  <Phone className="w-5 h-5 text-[#C9A227] group-hover:text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call Us</p>
                  <p className="font-semibold">+91 98765 43210</p>
                </div>
              </a>

              <a
                href="mailto:info@lockshop.com"
                className="flex items-center gap-4 text-gray-300 hover:text-[#C9A227] transition-colors group"
              >
                <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center group-hover:bg-[#C9A227] transition-colors">
                  <Mail className="w-5 h-5 text-[#C9A227] group-hover:text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Us</p>
                  <p className="font-semibold">info@lockshop.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#C9A227]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Working Hours</p>
                  <p className="font-semibold">Mon - Sat: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(201, 162, 39, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#C9A227] text-[#111111] px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 shadow-xl"
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.a
                href="https://wa.me/919876543210"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 shadow-xl hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </motion.a>
            </div>
          </motion.div>

          {/* Right - Map/Location */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="bg-[#1E1E1E] rounded-3xl overflow-hidden border border-white/10">
              {/* Map Placeholder */}
              <div className="aspect-square md:aspect-[4/3] relative bg-[#2F2F2F]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-[#C9A227] mx-auto mb-4" />
                    <p className="text-white font-semibold text-lg">Our Location</p>
                    <p className="text-gray-400">Click to open in Maps</p>
                  </div>
                </div>
                
                {/* Overlay Button */}
                <a
                  href="https://maps.google.com/?q=LockShop+Mumbai"
                  target="_blank"
                  className="absolute inset-0"
                />
              </div>

              {/* Address */}
              <div className="p-6">
                <h4 className="text-white font-bold text-lg mb-2">
                  LockShop Headquarters
                </h4>
                <p className="text-gray-400">
                  123 Security Street, Industrial Area,
                  <br />
                  Mumbai, Maharashtra 400001, India
                </p>

                <div className="mt-4 flex gap-4">
                  <motion.a
                    href="https://maps.google.com/?q=LockShop+Mumbai"
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-[#C9A227] text-[#111111] py-3 rounded-xl font-semibold text-center"
                  >
                    Get Directions
                  </motion.a>
                  <motion.a
                    href="/dealers"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 border-2 border-white/20 text-white py-3 rounded-xl font-semibold text-center hover:border-[#C9A227] hover:text-[#C9A227] transition-colors"
                  >
                    Find Dealers
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl hidden lg:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#C9A227] rounded-xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#111111]">500+</p>
                  <p className="text-gray-500">Dealers Across India</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}