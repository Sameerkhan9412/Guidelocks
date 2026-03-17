// components/about/CertificationsSection.jsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Award, Shield, CheckCircle, FileCheck } from "lucide-react";

const certifications = [
  {
    name: "ISO 9001:2015",
    description: "Quality Management System",
    logo: "/images/certifications/iso-9001.png",
  },
  {
    name: "ISO 14001:2015",
    description: "Environmental Management",
    logo: "/images/certifications/iso-14001.png",
  },
  {
    name: "ISI Certified",
    description: "Bureau of Indian Standards",
    logo: "/images/certifications/isi.png",
  },
  {
    name: "CE Marking",
    description: "European Conformity",
    logo: "/images/certifications/ce.png",
  },
  {
    name: "ANSI Grade",
    description: "American National Standards",
    logo: "/images/certifications/ansi.png",
  },
  {
    name: "RoHS Compliant",
    description: "Restriction of Hazardous Substances",
    logo: "/images/certifications/rohs.png",
  },
];

const awards = [
  {
    year: "2023",
    title: "Best Lock Manufacturer",
    organization: "India Manufacturing Excellence Awards",
  },
  {
    year: "2022",
    title: "Innovation in Security",
    organization: "Security Industry Association",
  },
  {
    year: "2021",
    title: "Export Excellence Award",
    organization: "Ministry of Commerce",
  },
  {
    year: "2020",
    title: "Customer Satisfaction Award",
    organization: "Consumer Association of India",
  },
];

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Shield className="w-4 h-4" />
            Quality Assurance
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
            Certifications & <span className="text-[#C9A227]">Awards</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our commitment to quality is validated by leading certification bodies 
            and recognized by industry awards
          </p>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-[#111111] mb-8 text-center">
            Certifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-[#F5F5F5] rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-20 h-20 mx-auto mb-4 relative grayscale group-hover:grayscale-0 transition-all">
                  <Image
                    src={cert.logo}
                    alt={cert.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="font-bold text-[#111111] text-sm">{cert.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-[#111111] mb-8 text-center">
            Awards & Recognition
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-[#111111] to-[#2F2F2F] rounded-2xl p-6 text-white relative overflow-hidden group"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#C9A227]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                
                {/* Year Badge */}
                <span className="inline-block bg-[#C9A227] text-[#111111] text-sm font-bold px-3 py-1 rounded-full mb-4">
                  {award.year}
                </span>

                {/* Award Icon */}
                <Award className="w-10 h-10 text-[#C9A227] mb-4 group-hover:scale-110 transition-transform" />

                {/* Content */}
                <h4 className="font-bold text-lg mb-2">{award.title}</h4>
                <p className="text-gray-400 text-sm">{award.organization}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}