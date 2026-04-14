// components/categories/MobileFilterDrawer.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  ChevronRight,
  Lock,
  Check,
  RefreshCw,
  Filter,
} from "lucide-react";

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
  onClearFilters,
  productCounts,
  resultsCount,
}) {
  // Get product count for a category
  const getCategoryProductCount = (categoryId) => {
    if (categoryId === "all") return productCounts.length;
    return productCounts.filter(
      (p) => p.category?._id === categoryId || p.category === categoryId
    ).length;
  };


  // Handle category click
  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#111111] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C9A227] rounded-xl flex items-center justify-center">
                    <Filter className="w-5 h-5 text-[#111111]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Filters</h3>
                    <p className="text-gray-400 text-sm">
                      {resultsCount} products found
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-[#2F2F2F] rounded-xl flex items-center justify-center text-white hover:bg-[#3F3F3F] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Clear Filters */}
              <button
                onClick={onClearFilters}
                className="flex items-center gap-2 text-gray-400 hover:text-[#C9A227] transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Clear all filters
              </button>
            </div>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto p-4">
              <h4 className="font-semibold text-gray-800 mb-4">Categories</h4>

              {/* All Products */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick("all")}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all mb-2 ${
                  selectedCategory === "all"
                    ? "bg-[#C9A227] text-[#111111]"
                    : "bg-[#F5F5F5] hover:bg-gray-200 text-gray-700"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedCategory === "all" ? "bg-[#111111]" : "bg-white"
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
                      selectedCategory === "all"
                        ? "text-[#111111]/70"
                        : "text-gray-500"
                    }`}
                  >
                    {getCategoryProductCount("all")} products
                  </p>
                </div>
                {selectedCategory === "all" && (
                  <Check className="w-5 h-5 text-[#111111]" />
                )}
              </motion.button>

              {/* Category Items */}
              <div className="space-y-2 mt-4">
                {categories.map((category) => {
                  const isSelected = selectedCategory === category._id;

                  return (
                    <motion.button
                      key={category._id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryClick(category._id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                        isSelected
                          ? "bg-[#C9A227]/10 ring-2 ring-[#C9A227]"
                          : "bg-[#F5F5F5] hover:bg-gray-200"
                      }`}
                    >
                      {/* Category Image */}
                      <div
                        className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 ${
                          isSelected ? "ring-2 ring-[#C9A227]" : ""
                        }`}
                      >
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={category.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/5 flex items-center justify-center">
                            <Lock className="w-6 h-6 text-[#C9A227]" />
                          </div>
                        )}
                      </div>

                      {/* Category Info */}
                      <div className="flex-1 text-left">
                        <p
                          className={`font-semibold ${
                            isSelected ? "text-[#C9A227]" : "text-gray-800"
                          }`}
                        >
                          {category.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getCategoryProductCount(category._id)} products
                        </p>
                      </div>

                      {/* Arrow or Check */}
                      {isSelected ? (
                        <Check className="w-5 h-5 text-[#C9A227]" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-gray-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full bg-[#111111] text-white py-4 rounded-xl font-bold hover:bg-[#2F2F2F] transition-colors flex items-center justify-center gap-2"
              >
                Show {resultsCount} Products
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}