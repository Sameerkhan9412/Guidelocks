// components/contact/HeroSection.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  Headphones,
} from "lucide-react";

export default function HeroSection() {
  const quickActions = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
      color: "bg-blue-500",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Quick Response",
      href: "https://wa.me/919876543210",
      color: "bg-green-500",
    },
    {
      icon: Mail,
      label: "Email Us",
      value: "info@lockshop.com",
      href: "mailto:info@lockshop.com",
      color: "bg-purple-500",
    },
    {
      icon: Headphones,
      label: "Live Chat",
      value: "Online Now",
      href: "#chat",
      color: "bg-[#C9A227]",
    },
  ];

  return (
    <section className="relative bg-[#111111] pt-8 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A227' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated Orbs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 right-20 w-64 h-64 bg-[#C9A227]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-0 left-20 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-400 mb-8"
        >
          <Link href="/" className="hover:text-[#C9A227] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#C9A227]">Contact Us</span>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/30 px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[#C9A227] text-sm font-semibold">
                We're Online - Available 24/7
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Get in{" "}
              <span className="text-[#C9A227] relative">
                Touch
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 150 15"
                  fill="none"
                >
                  <motion.path
                    d="M0 12 Q 75 0, 150 12"
                    stroke="#C9A227"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.svg>
              </span>
              <br />
              With Us
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Have questions about our products or need expert advice? Our dedicated 
              team is here to help you find the perfect security solution.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#C9A227]" />
                </div>
                <div>
                  <p className="text-white font-semibold">Response Time</p>
                  <p className="text-gray-400 text-sm">Within 2 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#C9A227]" />
                </div>
                <div>
                  <p className="text-white font-semibold">Pan India</p>
                  <p className="text-gray-400 text-sm">500+ Dealers</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {quickActions.map((action, index) => (
              <motion.a
                key={index}
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#C9A227]/50 hover:bg-white/10 transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  {action.label}
                </h3>
                <p className="text-gray-400 text-sm">{action.value}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>
    </section>
  );
}