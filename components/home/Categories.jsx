// components/home/Categories.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const defaultCategories = [
  { name: "Raino Locks", slug: "raino-locks", image: "/images/categories/raino.jpg", count: 45 },
  { name: "Mortise Locks", slug: "mortise-locks", image: "/images/categories/mortise.jpg", count: 38 },
  { name: "Furniture Locks", slug: "furniture-locks", image: "/images/categories/furniture.jpg", count: 52 },
  { name: "Padlocks", slug: "padlocks", image: "/images/categories/padlock.jpg", count: 67 },
  { name: "Digital Locks", slug: "digital-locks", image: "/images/categories/digital.jpg", count: 23 },
  { name: "Drawer Locks", slug: "drawer-locks", image: "/images/categories/drawer.jpg", count: 31 },
];

export default function Categories({ categories = [] }) {
  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="py-24 bg-[#F5F5F5] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#111111]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            Our Categories
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6">
            Browse By <span className="text-[#C9A227]">Category</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our wide range of premium security solutions designed for every need
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCategories.map((category, index) => (
            <motion.div
              key={category.slug || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/category/${category.slug}`}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={category.image || "/images/placeholder.jpg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Hover Overlay Effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-[#C9A227]/20 backdrop-blur-sm"
                    />

                    {/* Category Count Badge */}
                    <div className="absolute top-4 right-4 bg-[#C9A227] text-[#111111] px-3 py-1 rounded-full text-sm font-bold">
                      {category.count || Math.floor(Math.random() * 50 + 20)}+ Products
                    </div>

                    {/* Arrow Icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                        <ArrowUpRight className="w-8 h-8 text-[#111111]" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#C9A227] transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          Premium collection available
                        </p>
                      </div>
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        className="w-10 h-10 bg-[#F5F5F5] group-hover:bg-[#C9A227] rounded-full flex items-center justify-center transition-colors"
                      >
                        <ArrowRight className="w-5 h-5 text-[#111111]" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A227] to-[#8B7019] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/categories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-[#111111] text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-2 hover:bg-[#2F2F2F] transition-colors"
            >
              View All Categories
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}