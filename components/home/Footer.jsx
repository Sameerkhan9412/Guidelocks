// components/home/Footer.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Lock, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  ArrowRight,
  Send
} from "lucide-react";
import logo from "@/app/assets/Mini-Logo.png"
import Image from "next/image";

const footerLinks = {
  products: [
    { name: "Raino Locks", href: "/category/raino-locks" },
    { name: "Mortise Locks", href: "/category/mortise-locks" },
    { name: "Furniture Locks", href: "/category/furniture-locks" },
    { name: "Digital Locks", href: "/category/digital-locks" },
    { name: "Padlocks", href: "/category/padlocks" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press", href: "/press" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Warranty", href: "/warranty" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", color: "#1877F2" },
  { icon: Instagram, href: "#", color: "#E4405F" },
  { icon: Twitter, href: "#", color: "#1DA1F2" },
  { icon: Youtube, href: "#", color: "#FF0000" },
  { icon: Linkedin, href: "#", color: "#0A66C2" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white relative overflow-hidden">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full">
          <path
            d="M0 100V0C240 66 480 100 720 100C960 100 1200 66 1440 0V100H0Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#C9A227] to-[#A68520] rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='evenodd'%3E%3Cpath d='M0 20h40v1H0zM20 0v40h1V0z'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#111111]">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-[#111111]/70 mt-2">
                Get the latest updates, offers, and security tips delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-6 py-4 rounded-l-full bg-white text-[#111111] focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#111111] text-white px-8 py-4 rounded-r-full font-semibold flex items-center gap-2"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
           <Link href="/" className="flex items-center gap-3 group">
              {/* <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#C9A227] to-[#8B7019] rounded-xl flex items-center justify-center shadow-lg shadow-[#C9A227]/30">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A227] rounded-full flex items-center justify-center">
                  <Shield className="w-2.5 h-2.5 text-[#111111]" />
                </div>
              </motion.div> */}
              <Image src={logo} height={100} width={100} alt="logo" className="w-10"/> 
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  GUIDE<span className="text-[#C9A227]">LOCKS</span>
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Security Solutions</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              India's leading manufacturer and supplier of premium quality locks 
              and security solutions. Protecting homes and businesses since 1980.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#C9A227]" />
                <span>D-114/115,sector-1, UPSIDC,Industrial Area , Talanagri , Ramghat Road , Aligarh -202001 , Uttar Pradesh </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#C9A227]" />
                <span>+91 9897627670</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#C9A227]" />
                <span>info@vinayakexports.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Clock className="w-5 h-5 text-[#C9A227]" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C9A227] rounded-full" />
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#C9A227] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C9A227] rounded-full" />
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#C9A227] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C9A227] rounded-full" />
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#C9A227] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 mt-12 border-t border-gray-800">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <span className="text-gray-400">Follow Us:</span>
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-[#2F2F2F] rounded-full flex items-center justify-center hover:bg-[#C9A227] transition-colors group"
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-[#111111]" />
              </motion.a>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">We Accept:</span>
            <div className="flex gap-2">
              {["Visa", "Mastercard", "UPI", "NetBanking"].map((method) => (
                <div
                  key={method}
                  className="bg-[#2F2F2F] px-3 py-1 rounded text-xs text-gray-400"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 mt-8 border-t border-gray-800 space-y-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Vinayak International. All rights reserved. |
            <Link href="/privacy" className="hover:text-[#C9A227] ml-1">
              Privacy Policy
            </Link>
            |
            <Link href="/terms" className="hover:text-[#C9A227] ml-1">
              Terms of Service
            </Link>
          </p>

          <p className="text-gray-400 text-sm">
            Designed & Developed by ❤️{" "}
            <a
              href="https://digimart360.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A227] font-semibold hover:underline"
            >
              Digimart 360
            </a>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-32 -right-32 w-64 h-64 border border-[#C9A227]/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -right-20 w-40 h-40 border border-[#C9A227]/20 rounded-full"
      />
    </footer>
  );
}