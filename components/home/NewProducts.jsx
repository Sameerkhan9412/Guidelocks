// components/home/NewProducts.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingCart, Star, ArrowRight, Sparkles } from "lucide-react";

const defaultProducts = [
  {
    _id: "1",
    name: "Premium Mortise Lock",
    slug: "premium-mortise-lock",
    category: { name: "Mortise Locks" },
    images: ["/images/products/mortise1.jpg"],
    features: ["Stainless Steel", "Anti-Pick", "5 Years Warranty"],
  },
  {
    _id: "2",
    name: "Digital Smart Lock Pro",
    slug: "digital-smart-lock-pro",
    category: { name: "Digital Locks" },
    images: ["/images/products/digital1.jpg"],
    features: ["Fingerprint", "App Control", "Battery Backup"],
  },
  {
    _id: "3",
    name: "Heavy Duty Padlock",
    slug: "heavy-duty-padlock",
    category: { name: "Padlocks" },
    images: ["/images/products/padlock1.jpg"],
    features: ["Weather Proof", "Hardened Steel", "Anti-Cut"],
  },
  {
    _id: "4",
    name: "Furniture Drawer Lock",
    slug: "furniture-drawer-lock",
    category: { name: "Furniture Locks" },
    images: ["/images/products/furniture1.jpg"],
    features: ["Elegant Design", "Silent Close", "Easy Install"],
  },
  {
    _id: "5",
    name: "Raino Main Door Lock",
    slug: "raino-main-door-lock",
    category: { name: "Raino Locks" },
    images: ["/images/products/raino1.jpg"],
    features: ["Premium Build", "Multi-Point", "Corrosion Resistant"],
  },
  {
    _id: "6",
    name: "Cabinet Lock System",
    slug: "cabinet-lock-system",
    category: { name: "Furniture Locks" },
    images: ["/images/products/cabinet1.jpg"],
    features: ["Modern Design", "Quick Access", "Child Safe"],
  },
  {
    _id: "7",
    name: "Industrial Gate Lock",
    slug: "industrial-gate-lock",
    category: { name: "Industrial" },
    images: ["/images/products/gate1.jpg"],
    features: ["Heavy Duty", "Rust Proof", "10 Years Warranty"],
  },
  {
    _id: "8",
    name: "Smart Deadbolt Lock",
    slug: "smart-deadbolt-lock",
    category: { name: "Digital Locks" },
    images: ["/images/products/deadbolt1.jpg"],
    features: ["Keyless Entry", "Auto Lock", "Voice Control"],
  },
];

export default function NewProducts({ products = [] }) {
  const displayProducts = products.length > 0 ? products : defaultProducts;
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A227]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#111111]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-5 h-5 text-[#C9A227]" />
              <span className="bg-gradient-to-r from-[#C9A227] to-[#A68520] bg-clip-text text-transparent font-semibold">
                New Arrivals
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111]">
              Latest <span className="text-[#C9A227]">Products</span>
            </h2>
            <p className="text-gray-600 text-lg mt-4 max-w-xl">
              Discover our newest collection of premium security solutions
            </p>
          </div>
          
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 md:mt-0 group flex items-center gap-2 text-[#111111] font-semibold hover:text-[#C9A227] transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group"
            >
              <div className="relative bg-[#F5F5F5] rounded-3xl overflow-hidden">
                {/* New Badge */}
                <div className="absolute top-4 left-4 z-10 bg-[#C9A227] text-[#111111] px-3 py-1 rounded-full text-xs font-bold">
                  NEW
                </div>

                {/* Wishlist Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleWishlist(product._id)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#C9A227] transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      wishlist.includes(product._id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600 group-hover:text-[#111111]"
                    }`}
                  />
                </motion.button>

                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.images?.[0] || "/images/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Quick Actions */}
                  <AnimatePresence>
                    {hoveredProduct === product._id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-4 left-4 right-4 flex gap-2"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-[#111111] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#2F2F2F] transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </motion.button>
                        <Link href={`/product/${product.slug}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 bg-[#C9A227] text-[#111111] rounded-xl flex items-center justify-center"
                          >
                            <Eye className="w-5 h-5" />
                          </motion.button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Category */}
                  <span className="text-xs text-[#C9A227] font-semibold uppercase tracking-wider">
                    {product.category?.name || "Uncategorized"}
                  </span>

                  {/* Product Name */}
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-lg font-bold text-[#111111] mt-2 group-hover:text-[#C9A227] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4 ? "fill-[#C9A227] text-[#C9A227]" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.features?.slice(0, 2).map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#111111]/5 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(201, 162, 39, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#C9A227] to-[#A68520] text-[#111111] px-10 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 shadow-xl"
            >
              Explore All Products
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}