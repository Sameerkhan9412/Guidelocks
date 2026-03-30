// components/contact/OfficeLocations.jsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Building,
  ExternalLink,
} from "lucide-react";

const offices = [
  {
    city: "Mumbai",
    type: "Head Office & Showroom",
    address: "123 Security Street, Industrial Area, Andheri East",
    phone: "+91 98765 43210",
    email: "mumbai@GuideLock.com",
    hours: "Mon-Sat: 9AM-8PM",
    image: "/images/offices/mumbai.jpg",
    mapUrl: "https://maps.google.com/?q=Mumbai",
    isHQ: true,
  },
  {
    city: "Delhi",
    type: "Regional Office",
    address: "456 Security Plaza, Connaught Place",
    phone: "+91 98765 43211",
    email: "delhi@GuideLock.com",
    hours: "Mon-Sat: 9AM-7PM",
    image: "/images/offices/delhi.jpg",
    mapUrl: "https://maps.google.com/?q=Delhi",
    isHQ: false,
  },
  {
    city: "Bangalore",
    type: "Regional Office",
    address: "789 Lock Tower, MG Road",
    phone: "+91 98765 43212",
    email: "bangalore@GuideLock.com",
    hours: "Mon-Sat: 9AM-7PM",
    image: "/images/offices/bangalore.jpg",
    mapUrl: "https://maps.google.com/?q=Bangalore",
    isHQ: false,
  },
  {
    city: "Chennai",
    type: "Branch Office",
    address: "321 Security Complex, Anna Nagar",
    phone: "+91 98765 43213",
    email: "chennai@GuideLock.com",
    hours: "Mon-Sat: 9AM-6PM",
    image: "/images/offices/chennai.jpg",
    mapUrl: "https://maps.google.com/?q=Chennai",
    isHQ: false,
  },
  {
    city: "Kolkata",
    type: "Branch Office",
    address: "567 Park Street, Central",
    phone: "+91 98765 43214",
    email: "kolkata@GuideLock.com",
    hours: "Mon-Sat: 9AM-6PM",
    image: "/images/offices/kolkata.jpg",
    mapUrl: "https://maps.google.com/?q=Kolkata",
    isHQ: false,
  },
  {
    city: "Hyderabad",
    type: "Branch Office",
    address: "890 Banjara Hills, Road No. 12",
    phone: "+91 98765 43215",
    email: "hyderabad@GuideLock.com",
    hours: "Mon-Sat: 9AM-6PM",
    image: "/images/offices/hyderabad.jpg",
    mapUrl: "https://maps.google.com/?q=Hyderabad",
    isHQ: false,
  },
];

export default function OfficeLocations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedOffice, setSelectedOffice] = useState(offices[0]);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-[#111111] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Building className="w-4 h-4" />
            Our Locations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            Offices Across <span className="text-[#C9A227]">India</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit any of our offices for product demos, consultations, or to meet our team
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Office List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-1"
          >
            <div className="bg-[#F5F5F5] rounded-2xl p-4 max-h-[600px] overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                {offices.map((office, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedOffice(office)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      selectedOffice.city === office.city
                        ? "bg-[#111111] text-white shadow-lg"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedOffice.city === office.city
                              ? "bg-[#C9A227]"
                              : "bg-[#C9A227]/10"
                          }`}
                        >
                          <MapPin
                            className={`w-5 h-5 ${
                              selectedOffice.city === office.city
                                ? "text-white"
                                : "text-[#C9A227]"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold">{office.city}</h4>
                            {office.isHQ && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  selectedOffice.city === office.city
                                    ? "bg-[#C9A227] text-white"
                                    : "bg-[#C9A227]/10 text-[#C9A227]"
                                }`}
                              >
                                HQ
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-sm ${
                              selectedOffice.city === office.city
                                ? "text-gray-300"
                                : "text-gray-500"
                            }`}
                          >
                            {office.type}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 ${
                          selectedOffice.city === office.city
                            ? "text-[#C9A227]"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Selected Office Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOffice.city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100"
              >
                {/* Office Image */}
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={selectedOffice.image}
                    alt={`${selectedOffice.city} Office`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 to-transparent" />

                  {/* Office Title */}
                  <div className="absolute bottom-6 left-6">
                    <div className="flex items-center gap-2 mb-2">
                      {selectedOffice.isHQ && (
                        <span className="bg-[#C9A227] text-[#111111] text-xs font-bold px-2 py-1 rounded">
                          HEADQUARTERS
                        </span>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {selectedOffice.city}
                    </h3>
                    <p className="text-gray-300">{selectedOffice.type}</p>
                  </div>
                </div>

                {/* Office Info */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Address */}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-[#C9A227]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#111111] mb-1">Address</h4>
                        <p className="text-gray-600">{selectedOffice.address}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-[#C9A227]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#111111] mb-1">Phone</h4>
                        <a
                          href={`tel:${selectedOffice.phone}`}
                          className="text-gray-600 hover:text-[#C9A227] transition-colors"
                        >
                          {selectedOffice.phone}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-[#C9A227]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#111111] mb-1">Email</h4>
                        <a
                          href={`mailto:${selectedOffice.email}`}
                          className="text-gray-600 hover:text-[#C9A227] transition-colors"
                        >
                          {selectedOffice.email}
                        </a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-[#C9A227]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#111111] mb-1">Hours</h4>
                        <p className="text-gray-600">{selectedOffice.hours}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      href={selectedOffice.mapUrl}
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-[#111111] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-5 h-5" />
                      Get Directions
                    </motion.a>
                    <motion.a
                      href={`tel:${selectedOffice.phone}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-[#C9A227] text-[#111111] py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Call Now
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}