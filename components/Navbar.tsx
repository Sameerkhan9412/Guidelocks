// components/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, ChevronDown, Phone, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/#categories" },
  { label: "Products", href: "/#products" },
  {
    label: "Company",
    href: "#",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/about#story" },
      { label: "Certifications", href: "/about#certs" },
    ],
  },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/8 border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        {/* Top announcement bar */}
        <div className="bg-red-600 text-white text-center py-2 px-4 text-xs sm:text-sm font-medium">
          <span>🔒 Use code </span>
          <span className="font-black bg-white text-red-600 px-1.5 py-0.5 rounded mx-1">SECURE30</span>
          <span> for 30% OFF your first order!</span>
          <Link href="/categories" className="ml-3 underline underline-offset-2 hover:no-underline font-bold">
            Shop Now →
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30"
              >
                <Shield className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <p className={`text-lg font-black tracking-tight leading-none transition-colors ${scrolled ? "text-gray-900" : "text-white"}`}>
                  VINAYAK<span className="text-red-500"> INTL</span>
                </p>
                <p className={`text-[10px] font-medium leading-none transition-colors ${scrolled ? "text-gray-400" : "text-white/50"}`}>
                  Security Hardware
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.children ? (
                    <button
                      className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        scrolled
                          ? "text-gray-700 hover:text-red-600 hover:bg-red-50"
                          : "text-white/85 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 block ${
                        scrolled
                          ? "text-gray-700 hover:text-red-600 hover:bg-red-50"
                          : "text-white/85 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
                          >
                            <span className="w-1.5 h-1.5 bg-red-600/30 rounded-full group-hover:bg-red-600 transition-colors" />
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+919897627670"
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                  scrolled ? "text-gray-600 hover:text-red-600" : "text-white/70 hover:text-white"
                }`}
              >
                <Phone className="w-4 h-4" />
                +91 98976 27670
              </a>
              <Link href="/categories">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(220,38,38,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg shadow-red-600/25 transition-colors"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                scrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-white z-50 lg:hidden flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <p className="font-black text-gray-900">
                    VINAYAK<span className="text-red-600"> INTL</span>
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex-1 overflow-y-auto p-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    {link.children ? (
                      <div>
                        <p className="px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-widest">
                          {link.label}
                        </p>
                        <div className="ml-2 space-y-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
                            >
                              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-base"
                      >
                        {link.label}
                        <ArrowRight className="w-4 h-4 opacity-40" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-gray-100 space-y-3">
                <a
                  href="tel:+919897627670"
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-600 font-medium"
                >
                  <Phone className="w-4 h-4 text-red-600" />
                  +91 98976 27670
                </a>
                <Link href="/categories" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    Shop Products
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-[calc(40px+64px)]" />
    </>
  );
}