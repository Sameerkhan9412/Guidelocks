// components/categories/CategorySidebar.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Lock,
  Folder,
  FolderOpen,
  Search,
  X,
  Check,
} from "lucide-react";

export default function CategorySidebar({
  categories,
  subCategories,
  selectedCategory,
  onCategoryChange,
  productCounts,
}) {
  const [expandedCategories, setExpandedCategories] = useState([selectedCategory]);
  const [searchQuery, setSearchQuery] = useState("");

  // Get product count for a category
  const getCategoryProductCount = (categoryId) => {
    if (categoryId === "all") return productCounts.length;
    return productCounts.filter(
      (p) => p.category?._id === categoryId || p.category === categoryId
    ).length;
  };


  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Filter categories by search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#111111] p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#C9A227] rounded-xl flex items-center justify-center">
            <Folder className="w-5 h-5 text-[#111111]" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Categories</h3>
            <p className="text-gray-400 text-sm">{categories.length} categories</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-[#2F2F2F] text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227] placeholder-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories List */}
      <div className="p-4 max-h-[600px] overflow-y-auto custom-scrollbar">
        {/* All Products */}
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange("all")}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all mb-2 ${
            selectedCategory === "all"
              ? "bg-[#C9A227] text-[#111111]"
              : "hover:bg-[#F5F5F5] text-gray-700"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              selectedCategory === "all" ? "bg-[#111111]" : "bg-[#F5F5F5]"
            }`}
          >
            <Lock
              className={`w-5 h-5 ${
                selectedCategory === "all" ? "text-[#C9A227]" : "text-gray-500"
              }`}
            />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold">All Products</p>
            <p
              className={`text-xs ${
                selectedCategory === "all" ? "text-[#111111]/70" : "text-gray-500"
              }`}
            >
              {getCategoryProductCount("all")} products
            </p>
          </div>
          {selectedCategory === "all" && (
            <Check className="w-5 h-5 text-[#111111]" />
          )}
        </motion.button>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-4" />

        {/* Category Items */}
        <div className="space-y-2">
          {filteredCategories.map((category, index) => {
            const isExpanded = expandedCategories.includes(category._id);
            const isSelected = selectedCategory === category._id;

            return (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Category Item */}
                <div
                  className={`flex items-center rounded-xl transition-all ${
                    isSelected
                      ? "bg-[#C9A227]/10 ring-2 ring-[#C9A227]"
                      : "hover:bg-[#F5F5F5]"
                  }`}
                >
                  <motion.button
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onCategoryChange(category._id)}
                    className="flex-1 flex items-center gap-3 p-3"
                  >
                    {/* Category Image or Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 ${
                        isSelected ? "ring-2 ring-[#C9A227]" : ""
                      }`}
                    >
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/5 flex items-center justify-center">
                          <Lock className="w-5 h-5 text-[#C9A227]" />
                        </div>
                      )}
                    </div>

                    {/* Category Info */}
                    <div className="flex-1 text-left min-w-0">
                      <p
                        className={`font-semibold truncate ${
                          isSelected ? "text-[#C9A227]" : "text-gray-800"
                        }`}
                      >
                        {category.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getCategoryProductCount(category._id)} products
                      </p>
                    </div>
                  </motion.button>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No categories found</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#C9A227] text-sm font-medium mt-2"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="p-4 bg-gradient-to-r from-[#C9A227]/10 to-[#C9A227]/5 border-t border-[#C9A227]/20">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Need help finding products?</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#111111] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2F2F2F] transition-colors"
          >
            Contact Support
          </motion.button>
        </div>
      </div>
    </div>
  );
}