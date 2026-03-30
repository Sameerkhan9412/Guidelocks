// components/home/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronRight,
  Lock,
  Shield,
  Loader2,
  Grid3X3,
} from "lucide-react";
import Image from "next/image";
import logo from "@/app/assets/Mini-Logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories", hasDropdown: true },
  // { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await fetch("/api/categories");
        const data=await response.json();
        console.log("i am resposne",data.data)
          setCategories(data.data || data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    router.push(`/categories?category=${categoryId}`);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/categories?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0a0a0a] text-white py-2 hidden md:block border-b border-[#C9A227]/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a
                href="tel:+919897627670"
                className="flex items-center gap-2 hover:text-[#C9A227] transition-colors"
              >
                <Phone size={14} />
                <span>+91 9897627670</span>
              </a>
              <a
                href="mailto:info@vinayakexports.com"
                className="flex items-center gap-2 hover:text-[#C9A227] transition-colors"
              >
                <Mail size={14} />
                <span>info@vinayakexports.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#C9A227]" />
              <span>Aligarh , Uttar pradesh , India</span>
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
              <Image
                src={logo}
                height={100}
                width={100}
                alt="logo"
                className="w-10"
              />
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
                  className="relative dropdown-container"
                  onMouseEnter={() =>
                    link.hasDropdown && setActiveDropdown(link.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-gray-300 hover:text-[#C9A227] transition-colors duration-300 font-medium py-2"
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <motion.span
                        animate={{
                          rotate: activeDropdown === link.name ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} />
                      </motion.span>
                    )}
                  </Link>

                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-[#C9A227]"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Categories Dropdown */}
                  <AnimatePresence>
                    {link.hasDropdown && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#C9A227]/20 overflow-hidden"
                      >
                        {/* Dropdown Header */}
                        <div className="bg-gradient-to-r from-[#C9A227]/10 to-transparent px-4 py-3 border-b border-[#C9A227]/10">
                          <div className="flex items-center gap-2">
                            <Grid3X3 className="w-4 h-4 text-[#C9A227]" />
                            <span className="text-sm font-semibold text-white">
                              Browse Categories
                            </span>
                          </div>
                        </div>

                        {/* Categories List */}
                        <div className="max-h-80 overflow-y-auto py-2 custom-scrollbar">
                          {isLoadingCategories ? (
                            <div className="flex items-center justify-center py-8">
                              <Loader2 className="w-6 h-6 text-[#C9A227] animate-spin" />
                            </div>
                          ) : categories.length > 0 ? (
                            <>
                              {/* All Categories Option */}
                              <Link
                                href="/categories"
                                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#C9A227] hover:text-[#111111] transition-all duration-300 group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="w-10 h-10 bg-[#2a2a2a] group-hover:bg-[#111111]/20 rounded-lg flex items-center justify-center transition-colors">
                                  <Grid3X3 className="w-5 h-5" />
                                </div>
                                <div>
                                  <span className="font-medium block">
                                    All Categories
                                  </span>
                                  <span className="text-xs opacity-70">
                                    View all products
                                  </span>
                                </div>
                                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>

                              <div className="h-px bg-[#C9A227]/10 mx-4 my-2" />

                              {/* Individual Categories */}
                              {categories.map((category, i) => (
                                <motion.button
                                  key={category._id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  onClick={() =>
                                    handleCategorySelect(category._id)
                                  }
                                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#C9A227] hover:text-[#111111] transition-all duration-300 group text-left"
                                >
                                  <div className="w-10 h-10 bg-[#2a2a2a] group-hover:bg-[#111111]/20 rounded-lg flex items-center justify-center overflow-hidden transition-colors">
                                    {category.image ? (
                                      <Image
                                        src={category.image}
                                        alt={category.name}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <Lock className="w-5 h-5" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="font-medium block truncate">
                                      {category.name}
                                    </span>
                                    {category.productCount !== undefined && (
                                      <span className="text-xs opacity-70">
                                        {category.productCount} products
                                      </span>
                                    )}
                                  </div>
                                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                </motion.button>
                              ))}
                            </>
                          ) : (
                            <div className="text-center py-8 text-gray-400">
                              <Lock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">No categories found</p>
                            </div>
                          )}
                        </div>

                        {/* Dropdown Footer */}
                        <div className="bg-[#0a0a0a] px-4 py-3 border-t border-[#C9A227]/10">
                          <Link
                            href="/categories"
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-center gap-2 text-[#C9A227] text-sm font-medium hover:underline"
                          >
                            <span>View All Categories</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Search & Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <form onSubmit={handleSearch}>
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#2F2F2F] text-white px-4 py-2 pl-10 rounded-full w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A227] border border-transparent focus:border-[#C9A227]/50"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </motion.div>
              </form>
<Link href={"https://wa.me/9897627670?text=Hi, I'm interested"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#C9A227] to-[#A68520] text-[#111111] px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-[#C9A227]/30 hover:shadow-[#C9A227]/50 transition-all duration-300"
              >
                Get Quote
              </motion.button>
              </Link>
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
              className="lg:hidden bg-[#1a1a1a] border-t border-[#C9A227]/20"
            >
              <div className="container mx-auto px-4 py-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#2F2F2F] text-white px-4 py-3 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </form>

                {/* Mobile Nav Links */}
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.hasDropdown ? (
                        <div className="border border-[#2a2a2a] rounded-xl overflow-hidden">
                          <button
                            onClick={() =>
                              setExpandedMobileCategory(
                                expandedMobileCategory === link.name
                                  ? null
                                  : link.name
                              )
                            }
                            className="w-full flex items-center justify-between text-gray-300 py-3 px-4 text-lg font-medium hover:bg-[#2a2a2a] transition-colors"
                          >
                            <span>{link.name}</span>
                            <motion.span
                              animate={{
                                rotate:
                                  expandedMobileCategory === link.name
                                    ? 180
                                    : 0,
                              }}
                            >
                              <ChevronDown size={20} />
                            </motion.span>
                          </button>

                          <AnimatePresence>
                            {expandedMobileCategory === link.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-[#0a0a0a]"
                              >
                                {/* All Categories */}
                                <Link
                                  href="/categories"
                                  className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-[#C9A227] border-b border-[#2a2a2a]"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <Grid3X3 className="w-5 h-5" />
                                  <span>All Categories</span>
                                </Link>

                                {isLoadingCategories ? (
                                  <div className="flex items-center justify-center py-6">
                                    <Loader2 className="w-6 h-6 text-[#C9A227] animate-spin" />
                                  </div>
                                ) : (
                                  <div className="max-h-64 overflow-y-auto">
                                    {categories.map((category) => (
                                      <button
                                        key={category._id}
                                        onClick={() =>
                                          handleCategorySelect(category._id)
                                        }
                                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-[#C9A227] hover:bg-[#1a1a1a] transition-colors text-left"
                                      >
                                        <div className="w-8 h-8 bg-[#2a2a2a] rounded-lg flex items-center justify-center overflow-hidden">
                                          {category.image ? (
                                            <Image
                                              src={category.image}
                                              alt={category.name}
                                              width={32}
                                              height={32}
                                              className="w-full h-full object-cover"
                                            />
                                          ) : (
                                            <Lock className="w-4 h-4" />
                                          )}
                                        </div>
                                        <span>{category.name}</span>
                                        <ChevronRight className="w-4 h-4 ml-auto" />
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className="block text-gray-300 hover:text-[#C9A227] py-3 px-4 text-lg font-medium hover:bg-[#2a2a2a] rounded-xl transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <Link href={"https://wa.me/9897627670?text=Hi, I'm interested"}>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-full bg-gradient-to-r from-[#C9A227] to-[#A68520] text-[#111111] py-3 rounded-xl font-semibold mt-6"
                >
                  Get Quote
                </motion.button>
                  </Link>
                {/* Mobile Contact Info */}
                <div className="mt-6 pt-6 border-t border-[#2a2a2a] space-y-3">
                  <a
                    href="tel:+919897627670"
                    className="flex items-center gap-3 text-gray-400 hover:text-[#C9A227] transition-colors"
                  >
                    <Phone size={18} />
                    <span>+91 9897627670</span>
                  </a>
                  <a
                    href="mailto:info@vinayakexports.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-[#C9A227] transition-colors"
                  >
                    <Mail size={18} />
                    <span>info@vinayakexports.com</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c9a227;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a68520;
        }
      `}</style>
    </>
  );
}