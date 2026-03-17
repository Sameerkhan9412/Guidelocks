// components/categories/ProductGrid.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  Heart,
  Share2,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Check,
  X,
} from "lucide-react";

export default function ProductGrid({ products, viewMode }) {
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = viewMode === "list" ? 5 : 12;

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Toggle wishlist
  const toggleWishlist = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Share product
  const shareProduct = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: `/product/${product.slug}`,
      });
    }
  };

  // Get grid classes based on view mode
  const getGridClasses = () => {
    switch (viewMode) {
      case "grid":
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
      case "grid-sm":
        return "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4";
      case "list":
        return "flex flex-col gap-4";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  // Render grid/normal view product card
  const renderGridCard = (product, index) => (
    <motion.div
      key={product._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      layout
      className="group"
    >
      <Link href={`/product/${product.slug}`}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-[#F5F5F5]">
            <Image
              src={product.images?.[0] || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-[#C9A227] text-[#111111] text-xs font-bold px-3 py-1 rounded-full">
                {product.category?.name || "Lock"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => toggleWishlist(product._id, e)}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                  wishlist.includes(product._id)
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-[#C9A227] hover:text-[#111111]"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlist.includes(product._id) ? "fill-current" : ""
                  }`}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickViewProduct(product);
                }}
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:bg-[#C9A227] hover:text-[#111111] transition-colors"
              >
                <Eye className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => shareProduct(product, e)}
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:bg-[#C9A227] hover:text-[#111111] transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Quick View Button - Bottom */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickViewProduct(product);
                }}
                className="w-full bg-white/90 backdrop-blur-sm text-[#111111] py-3 rounded-xl font-semibold hover:bg-[#C9A227] transition-colors flex items-center justify-center gap-2"
              >
                <Maximize2 className="w-4 h-4" />
                Quick View
              </button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Subcategory */}
            {product.subcategory?.name && (
              <span className="text-xs text-[#C9A227] font-medium uppercase tracking-wider">
                {product.subcategory.name}
              </span>
            )}

            {/* Product Name */}
            <h3 className="font-bold text-[#111111] mt-1 line-clamp-2 group-hover:text-[#C9A227] transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 ? "fill-[#C9A227] text-[#C9A227]" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">(4.8)</span>
            </div>

            {/* Features */}
            {viewMode !== "grid-sm" && product.features?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {product.features.slice(0, 2).map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#F5F5F5] text-gray-600 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 2 && (
                  <span className="text-xs bg-[#F5F5F5] text-gray-600 px-2 py-1 rounded-full">
                    +{product.features.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* View Details Link */}
            <div className="flex items-center gap-2 mt-4 text-[#C9A227] font-medium text-sm group/link">
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  // Render list view product card
  const renderListCard = (product, index) => (
    <motion.div
      key={product._id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      layout
    >
      <Link href={`/product/${product.slug}`}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group">
          {/* Image */}
          <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
            <Image
              src={product.images?.[0] || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-[#C9A227] text-[#111111] text-xs font-bold px-3 py-1 rounded-full">
                {product.category?.name || "Lock"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex-1">
              {/* Subcategory */}
              {product.subcategory?.name && (
                <span className="text-xs text-[#C9A227] font-medium uppercase tracking-wider">
                  {product.subcategory.name}
                </span>
              )}

              {/* Product Name */}
              <h3 className="text-xl font-bold text-[#111111] mt-1 group-hover:text-[#C9A227] transition-colors">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4 ? "fill-[#C9A227] text-[#C9A227]" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-1">(4.8) • 120 reviews</span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 mt-3 line-clamp-2">
                  {product.description}
                </p>
              )}

              {/* Features */}
              {product.features?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.features.slice(0, 4).map((feature, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-[#C9A227]" />
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-[#111111] text-white py-3 rounded-xl font-semibold hover:bg-[#2F2F2F] transition-colors flex items-center justify-center gap-2"
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => toggleWishlist(product._id, e)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-colors ${
                  wishlist.includes(product._id)
                    ? "bg-red-500 border-red-500 text-white"
                    : "border-gray-200 hover:border-[#C9A227] text-gray-500 hover:text-[#C9A227]"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlist.includes(product._id) ? "fill-current" : ""
                  }`}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => shareProduct(product, e)}
                className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-gray-200 hover:border-[#C9A227] text-gray-500 hover:text-[#C9A227] transition-colors"
              >
                <Share2 className="w-5 h-5 text-black" />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <>
      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-semibold text-[#111111]">
            {startIndex + 1}-{Math.min(endIndex, products.length)}
          </span>{" "}
          of <span className="font-semibold text-[#111111]">{products.length}</span>{" "}
          products
        </p>
      </div>

      {/* Products Grid/List */}
      <div className={getGridClasses()}>
        {currentProducts.map((product, index) =>
          viewMode === "list"
            ? renderListCard(product, index)
            : renderGridCard(product, index)
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-[#C9A227] hover:text-[#111111] shadow-sm"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === currentPage;
              const isNearCurrent =
                Math.abs(pageNumber - currentPage) <= 2 ||
                pageNumber === 1 ||
                pageNumber === totalPages;

              if (!isNearCurrent) {
                if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                  return (
                    <span key={index} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`min-w-[40px] h-10 rounded-xl font-semibold transition-colors ${
                    isActive
                      ? "bg-[#C9A227] text-[#111111]"
                      : "bg-white text-gray-700 hover:bg-[#F5F5F5] shadow-sm"
                  }`}
                >
                  {pageNumber}
                </motion.button>
              );
            })}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-[#C9A227] hover:text-[#111111] shadow-sm"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      )}

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            isInWishlist={wishlist.includes(quickViewProduct._id)}
            onToggleWishlist={() =>
              setWishlist((prev) =>
                prev.includes(quickViewProduct._id)
                  ? prev.filter((id) => id !== quickViewProduct._id)
                  : [...prev, quickViewProduct._id]
              )
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Quick View Modal Component
function QuickViewModal({ product, onClose, isInWishlist, onToggleWishlist }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#F5F5F5] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="relative bg-[#F5F5F5] p-6">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
              <Image
                src={product.images?.[selectedImageIndex] || "/images/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-[#C9A227]"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-8">
            {/* Category */}
            <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {product.category?.name || "Lock"}
            </span>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-4">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? "fill-[#C9A227] text-[#C9A227]" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">4.8 (120 reviews)</span>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Features */}
            {product.features?.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-[#111111] mb-3">Key Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <Check className="w-4 h-4 text-[#C9A227]" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
              <Link href={`/product/${product.slug}`} className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#111111] text-white py-4 rounded-xl font-bold hover:bg-[#2F2F2F] transition-colors flex items-center justify-center gap-2"
                >
                  View Full Details
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleWishlist}
                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                  isInWishlist
                    ? "bg-red-500 text-white"
                    : "border-2 border-gray-200 hover:border-[#C9A227] text-gray-500 hover:text-[#C9A227]"
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${isInWishlist ? "fill-current" : ""}`}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}