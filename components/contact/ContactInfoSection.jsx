// components/contact/ContactInfoSection.jsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Globe,
  Headphones,
  Building,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: [
      { label: "Sales", value: "+91 98765 43210" },
      { label: "Support", value: "+91 98765 43211" },
      { label: "Toll Free", value: "1800-123-4567" },
    ],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Mail,
    title: "Email",
    details: [
      { label: "General", value: "info@lockshop.com" },
      { label: "Sales", value: "sales@lockshop.com" },
      { label: "Support", value: "support@lockshop.com" },
    ],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: MapPin,
    title: "Head Office",
    details: [
      { label: "Address", value: "123 Security Street" },
      { label: "City", value: "Mumbai, MH 400001" },
      { label: "Country", value: "India" },
    ],
    color: "from-[#C9A227] to-[#A68520]",
    bgColor: "bg-[#C9A227]/5",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: [
      { label: "Mon - Fri", value: "9:00 AM - 8:00 PM" },
      { label: "Saturday", value: "9:00 AM - 6:00 PM" },
      { label: "Sunday", value: "10:00 AM - 4:00 PM" },
    ],
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
  },
];

export default function ContactInfoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block bg-[#111111] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Contact Information
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            Multiple Ways to <span className="text-[#C9A227]">Reach Us</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the most convenient way to get in touch. Our team is ready to assist you.
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`${info.bgColor} rounded-2xl p-6 border border-transparent hover:border-[#C9A227]/20 transition-all duration-300 group`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <info.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#111111] mb-4">
                {info.title}
              </h3>

              {/* Details */}
              <div className="space-y-3">
                {info.details.map((detail, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{detail.label}</span>
                    <span className="text-[#111111] font-medium text-sm">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Contact Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-[#111111] rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#C9A227] rounded-full flex items-center justify-center animate-pulse">
                <Headphones className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">
                  Need Immediate Assistance?
                </h4>
                <p className="text-gray-400">
                  Our experts are standing by to help you
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="tel:+919876543210"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#C9A227] text-[#111111] px-6 py-3 rounded-full font-bold flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </motion.a>
              <motion.a
                href="https://wa.me/919876543210"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}