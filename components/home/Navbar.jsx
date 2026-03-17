// components/home/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Search, 
  Phone, 
  Mail, 
  MapPin,
  ChevronDown,
  Lock,
  Shield
} from "lucide-react";
import Image from "next/image";
import logo from "@/app/assets/Mini-Logo.png"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products", hasDropdown: true },
  { name: "Categories", href: "/categories" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#111111] text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-[#C9A227] transition-colors">
                <Phone size={14} />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:info@lockshop.com" className="flex items-center gap-2 hover:text-[#C9A227] transition-colors">
                <Mail size={14} />
                <span>info@lockshop.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#C9A227]" />
              <span>Mumbai, Maharashtra, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-[#111111]/95 backdrop-blur-lg shadow-2xl py-2" 
            : "bg-[#111111] py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-gray-300 hover:text-[#C9A227] transition-colors duration-300 font-medium py-2"
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={16} />}
                  </Link>
                  
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-[#C9A227]"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.hasDropdown && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-[#2F2F2F] rounded-xl shadow-2xl border border-[#C9A227]/20 overflow-hidden"
                      >
                        {["Raino Locks", "Mortise Locks", "Furniture Locks", "Padlocks", "Digital Locks"].map((item, i) => (
                          <Link
                            key={item}
                            href={`/category/${item.toLowerCase().replace(" ", "-")}`}
                            className="block px-4 py-3 text-gray-300 hover:bg-[#C9A227] hover:text-[#111111] transition-all duration-300"
                          >
                            {item}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Search & Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search locks..."
                  className="bg-[#2F2F2F] text-white px-4 py-2 pl-10 rounded-full w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A227] border border-transparent focus:border-[#C9A227]/50"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#C9A227] to-[#A68520] text-[#111111] px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-[#C9A227]/30 hover:shadow-[#C9A227]/50 transition-all duration-300"
              >
                Get Quote
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#2F2F2F] border-t border-[#C9A227]/20"
            >
              <div className="container mx-auto px-4 py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="block text-gray-300 hover:text-[#C9A227] py-2 text-lg font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-full bg-gradient-to-r from-[#C9A227] to-[#A68520] text-[#111111] py-3 rounded-full font-semibold mt-4"
                >
                  Get Quote
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}