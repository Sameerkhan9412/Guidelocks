// components/contact/MapSection.jsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  ExternalLink,
  Car,
  Train,
  Plane,
} from "lucide-react";

export default function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("map");

  const directions = [
    {
      icon: Car,
      title: "By Car",
      description:
        "Take the Western Express Highway and exit at Andheri. Follow signs to Industrial Area. Free parking available.",
    },
    {
      icon: Train,
      title: "By Train",
      description:
        "Nearest station is Andheri (Western Line). Take auto/taxi from there (10 min ride).",
    },
    {
      icon: Plane,
      title: "By Air",
      description:
        "Mumbai International Airport is 5 km away. Taxi services available at terminal.",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <MapPin className="w-4 h-4" />
            Visit Our Showroom
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            Find Us <span className="text-[#C9A227]">Here</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit our showroom to experience our products firsthand. Our experts 
            are available to assist you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                {[
                  { id: "map", label: "Map View" },
                  { id: "satellite", label: "Satellite" },
                  { id: "street", label: "Street View" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? "text-[#C9A227] border-b-2 border-[#C9A227]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Map Container */}
              <div className="relative aspect-[16/9] bg-gray-200">
                {/* Placeholder for actual map integration */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-[#C9A227] mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-[#111111] mb-2">
                      LockShop Showroom
                    </h4>
                    <p className="text-gray-600 mb-4">
                      123 Security Street, Mumbai
                    </p>
                    <motion.a
                      href="https://maps.google.com/?q=LockShop+Mumbai"
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-[#C9A227] text-[#111111] px-6 py-3 rounded-full font-semibold"
                    >
                      <Navigation className="w-4 h-4" />
                      Open in Google Maps
                    </motion.a>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
                    +
                  </button>
                  <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
                    -
                  </button>
                </div>
              </div>

              {/* Map Footer */}
              <div className="p-6 bg-[#111111]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white font-bold mb-1">
                      LockShop Head Office & Showroom
                    </h4>
                    <p className="text-gray-400 text-sm">
                      123 Security Street, Industrial Area, Mumbai - 400001
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <motion.a
                      href="https://maps.google.com/?q=LockShop+Mumbai"
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#C9A227] text-[#111111] px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm"
                    >
                      Get Directions
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-bold text-[#111111] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C9A227]" />
                Address
              </h4>
              <p className="text-gray-600 mb-4">
                123 Security Street,
                <br />
                Industrial Area, Andheri East,
                <br />
                Mumbai, Maharashtra 400001,
                <br />
                India
              </p>
              <div className="flex items-center gap-2 text-[#C9A227]">
                <Navigation className="w-4 h-4" />
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  className="font-medium hover:underline"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-bold text-[#111111] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#C9A227]" />
                Showroom Hours
              </h4>
              <div className="space-y-3">
                {[
                  { day: "Monday - Friday", time: "9:00 AM - 8:00 PM" },
                  { day: "Saturday", time: "9:00 AM - 6:00 PM" },
                  { day: "Sunday", time: "10:00 AM - 4:00 PM" },
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600">{schedule.day}</span>
                    <span className="font-medium text-[#111111]">
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Open Now</span>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-[#C9A227] to-[#A68520] rounded-2xl p-6 text-white">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Need Help Finding Us?
              </h4>
              <p className="text-white/80 text-sm mb-4">
                Call us and we'll guide you to our showroom
              </p>
              <motion.a
                href="tel:+919876543210"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#111111] px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 w-full"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* How to Reach */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold text-[#111111] mb-6 text-center">
            How to Reach Us
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {directions.map((dir, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-4">
                  <dir.icon className="w-6 h-6 text-[#C9A227]" />
                </div>
                <h4 className="font-bold text-[#111111] mb-2">{dir.title}</h4>
                <p className="text-gray-600 text-sm">{dir.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}