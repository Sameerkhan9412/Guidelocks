// components/about/TeamSection.jsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Linkedin,
  Twitter,
  Mail,
  Phone,
  X,
  Quote,
  Award,
  Calendar,
} from "lucide-react";

const teamMembers = [
  {
    name: "Rajesh Kumar",
    position: "Founder & Chairman",
    image: "/images/about/team/rajesh.jpg",
    bio: "With over 30 years of experience in the security industry, Rajesh founded LockShop with a vision to revolutionize security in India. His leadership and commitment to quality have made LockShop a household name.",
    linkedin: "#",
    twitter: "#",
    email: "rajesh@lockshop.com",
    experience: "30+ years",
    achievements: ["Padma Shri Nominee 2020", "Business Leader Award 2018"],
  },
  {
    name: "Priya Sharma",
    position: "CEO",
    image: "/images/about/team/priya.jpg",
    bio: "Priya brings 20 years of strategic leadership to LockShop. Her focus on innovation and market expansion has driven the company's growth by 300% in the last decade.",
    linkedin: "#",
    twitter: "#",
    email: "priya@lockshop.com",
    experience: "20+ years",
    achievements: ["Forbes 40 Under 40", "Women CEO of the Year 2022"],
  },
  {
    name: "Amit Patel",
    position: "CTO",
    image: "/images/about/team/amit.jpg",
    bio: "Leading our R&D division, Amit is the mastermind behind our smart lock innovations. His patents and technological contributions have positioned LockShop at the forefront of security technology.",
    linkedin: "#",
    twitter: "#",
    email: "amit@lockshop.com",
    experience: "15+ years",
    achievements: ["12 Patents Filed", "Tech Innovator Award 2021"],
  },
  {
    name: "Sunita Reddy",
    position: "Head of Operations",
    image: "/images/about/team/sunita.jpg",
    bio: "Sunita oversees our manufacturing operations with precision and efficiency. Her lean manufacturing initiatives have reduced waste by 40% while improving output quality.",
    linkedin: "#",
    twitter: "#",
    email: "sunita@lockshop.com",
    experience: "18+ years",
    achievements: ["Operations Excellence Award", "ISO Lead Auditor"],
  },
  {
    name: "Vikram Singh",
    position: "Head of Sales",
    image: "/images/about/team/vikram.jpg",
    bio: "Vikram has built our nationwide dealer network from the ground up. His relationship-building skills and market insights have been crucial to our pan-India presence.",
    linkedin: "#",
    twitter: "#",
    email: "vikram@lockshop.com",
    experience: "15+ years",
    achievements: ["Sales Leader of the Decade", "500+ Dealer Network"],
  },
  {
    name: "Meera Kapoor",
    position: "Head of Quality",
    image: "/images/about/team/meera.jpg",
    bio: "Meera ensures every lock meets our stringent quality standards. Her zero-defect philosophy has resulted in industry-leading customer satisfaction scores.",
    linkedin: "#",
    twitter: "#",
    email: "meera@lockshop.com",
    experience: "12+ years",
    achievements: ["Six Sigma Black Belt", "Quality Champion 2023"],
  },
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section ref={ref} className="py-24 bg-[#F5F5F5] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#111111]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#111111] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Meet Our Leaders
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
            The Team Behind <span className="text-[#C9A227]">LockShop</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experienced professionals dedicated to securing India, one lock at a time
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedMember(member)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
                  
                  {/* Social Links - Appear on Hover */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={member.linkedin}
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.twitter}
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#C9A227] hover:text-white transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#C9A227] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[#C9A227] font-medium">{member.position}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {member.experience} Experience
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">
            Want to be part of our growing team?
          </p>
          <motion.a
            href="/careers"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[#111111] text-white px-8 py-4 rounded-full font-bold hover:bg-[#2F2F2F] transition-colors"
          >
            View Open Positions
          </motion.a>
        </motion.div>
      </div>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] text-sm font-semibold px-3 py-1 rounded-full mb-4">
                    {selectedMember.position}
                  </span>
                  
                  <h3 className="text-3xl font-bold text-[#111111] mb-4">
                    {selectedMember.name}
                  </h3>

                  <p className="text-gray-600 mb-6">{selectedMember.bio}</p>

                  {/* Experience */}
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-[#C9A227]" />
                    <span className="text-[#111111] font-medium">
                      {selectedMember.experience} Experience
                    </span>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="font-bold text-[#111111] mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#C9A227]" />
                      Achievements
                    </h4>
                    <ul className="space-y-2">
                      {selectedMember.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-[#C9A227] rounded-full" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-3">
                    <a
                      href={selectedMember.linkedin}
                      className="w-12 h-12 bg-[#0077B5] text-white rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={selectedMember.twitter}
                      className="w-12 h-12 bg-[#1DA1F2] text-white rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="w-12 h-12 bg-[#C9A227] text-white rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}