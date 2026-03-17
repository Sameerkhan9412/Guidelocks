// components/product/RelatedProducts.jsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  Heart,
  Eye,
  Share2,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Award,
  Check,
  X,
  Maximize2,
  Phone,
  Send,
  Shield,
  Truck,
  Clock,
} from "lucide-react";

export default function RelatedProducts({
  title = "Related Products",
  subtitle = "You might also like",
  products = [],
  showViewAll = true,
  autoScroll = false,
  autoScrollInterval = 5000,
  variant = "default", // default, compact, featured
}) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Check scroll position
  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Calculate active index
      const cardWidth = 320;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, products.length - 1));
    }
  }, [products.length]);

  // Initial check and add scroll listener
  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [checkScrollPosition]);

  // Auto scroll
  useEffect(() => {
    if (!autoScroll || isHovering || isDragging) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("right");
        }
      }
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, isHovering, isDragging]);

  // Scroll function
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Scroll to specific index
  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = 340;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  // Toggle wishlist
  const toggleWishlist = (productId, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Share product
  const shareProduct = async (product, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `Check out ${product.name}`,
        url: `${window.location.origin}/product/${product.slug}`,
      });
    } else {
      // Fallback - copy to clipboard
      await navigator.clipboard.writeText(
        `${window.location.origin}/product/${product.slug}`
      );
      alert("Link copied to clipboard!");
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-2">
            {variant === "featured" ? (
              <Sparkles className="w-5 h-5 text-[#C9A227]" />
            ) : (
              <TrendingUp className="w-5 h-5 text-[#C9A227]" />
            )}
            <span className="text-[#C9A227] font-semibold text-sm uppercase tracking-wider">
              {subtitle}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111]">
            {title}
          </h2>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          {/* Product Count */}
          <span className="hidden sm:block text-gray-500 text-sm">
            {products.length} Products
          </span>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: canScrollLeft ? 1.1 : 1 }}
              whileTap={{ scale: canScrollLeft ? 0.9 : 1 }}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? "bg-[#111111] text-white hover:bg-[#2F2F2F] shadow-lg"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: canScrollRight ? 1.1 : 1 }}
              whileTap={{ scale: canScrollRight ? 0.9 : 1 }}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? "bg-[#111111] text-white hover:bg-[#2F2F2F] shadow-lg"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 scroll-smooth"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {products.map((product, index) => (
            <ProductCard
              key={product._id || index}
              product={product}
              index={index}
              variant={variant}
              isWishlisted={wishlist.includes(product._id)}
              onToggleWishlist={toggleWishlist}
              onShare={shareProduct}
              onQuickView={() => setQuickViewProduct(product)}
            />
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      {products.length > 3 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {products.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToIndex(index)}
              className={`transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 h-3 bg-[#C9A227] rounded-full"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full"
              }`}
            />
          ))}
        </div>
      )}

      {/* View All Button */}
      {showViewAll && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/categories">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(17, 17, 17, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-[#111111] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#2F2F2F] transition-colors group"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      )}

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            isWishlisted={wishlist.includes(quickViewProduct._id)}
            onToggleWishlist={() => toggleWishlist(quickViewProduct._id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// PRODUCT CARD COMPONENT
// ============================================
function ProductCard({
  product,
  index,
  variant,
  isWishlisted,
  onToggleWishlist,
  onShare,
  onQuickView,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate random rating for demo
  const rating = 4 + Math.random() * 0.9;
  const reviewCount = Math.floor(Math.random() * 150) + 20;

  const cardWidth = variant === "compact" ? "w-64" : "w-72 md:w-80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex-shrink-0 ${cardWidth} group`}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-[#F5F5F5]">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
          )}

          {/* Product Image */}
          <Image
            src={product.images?.[0] || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {/* Category Badge */}
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="bg-[#C9A227] text-[#111111] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
            >
              {product.category?.name || "Lock"}
            </motion.span>

            {/* New Badge */}
            {index < 2 && (
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                New
              </motion.span>
            )}
          </div>

          {/* Action Buttons - Right Side */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 flex flex-col gap-2 z-10"
          >
            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => onToggleWishlist(product._id, e)}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isWishlisted
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
              />
            </motion.button>

            {/* Quick View Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView();
              }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-700 hover:bg-[#C9A227] hover:text-white transition-colors"
            >
              <Eye className="w-5 h-5" />
            </motion.button>

            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => onShare(product, e)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-700 hover:bg-[#C9A227] hover:text-white transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Quick Action Button - Bottom */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 z-10"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView();
              }}
              className="w-full bg-white/95 backdrop-blur-sm text-[#111111] py-3 rounded-xl font-semibold hover:bg-[#C9A227] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <Maximize2 className="w-4 h-4" />
              Quick View
            </motion.button>
          </motion.div>

          {/* Floating Rating Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1 z-10"
          >
            <Star className="w-4 h-4 fill-[#C9A227] text-[#C9A227]" />
            <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Subcategory */}
          {product.subcategory?.name && (
            <span className="text-xs text-[#C9A227] font-semibold uppercase tracking-wider mb-1">
              {product.subcategory.name}
            </span>
          )}

          {/* Product Name */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold text-[#111111] text-lg leading-tight line-clamp-2 group-hover:text-[#C9A227] transition-colors mb-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "fill-[#C9A227] text-[#C9A227]"
                      : i < rating
                      ? "fill-[#C9A227]/50 text-[#C9A227]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({reviewCount} reviews)
            </span>
          </div>

          {/* Features Preview */}
          {product.features?.length > 0 && variant !== "compact" && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.features.slice(0, 2).map((feature, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-xs bg-[#F5F5F5] text-gray-600 px-2 py-1 rounded-full"
                >
                  <Check className="w-3 h-3 text-[#C9A227]" />
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="text-xs bg-[#F5F5F5] text-gray-600 px-2 py-1 rounded-full">
                  +{product.features.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* View Details Link */}
          <Link href={`/product/${product.slug}`}>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-[#C9A227] font-semibold group/link cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </div>

        {/* Bottom Border Animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="h-1 bg-gradient-to-r from-[#C9A227] to-[#A68520] origin-left"
        />
      </div>
    </motion.div>
  );
}

// ============================================
// QUICK VIEW MODAL COMPONENT
// ============================================
function QuickViewModal({ product, onClose, isWishlisted, onToggleWishlist }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const displayImages = product.images?.length > 0
    ? product.images
    : ["/images/placeholder.jpg"];

  const rating = 4.5;
  const reviewCount = 124;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#F5F5F5] transition-colors"
        >
          <X className="w-6 h-6" />
        </motion.button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left - Image Gallery */}
          <div className="relative bg-[#F5F5F5] p-6 md:p-8">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-white"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={displayImages[selectedImageIndex]}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image Navigation Arrows */}
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImageIndex(
                        selectedImageIndex === 0
                          ? displayImages.length - 1
                          : selectedImageIndex - 1
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImageIndex(
                        selectedImageIndex === displayImages.length - 1
                          ? 0
                          : selectedImageIndex + 1
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            {displayImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                {displayImages.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${
                      selectedImageIndex === index
                        ? "ring-2 ring-[#C9A227] ring-offset-2"
                        : "ring-1 ring-gray-200 hover:ring-gray-300 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 mt-6">
              {[
                { icon: Shield, label: "Genuine" },
                { icon: Truck, label: "Free Ship" },
                { icon: Clock, label: "Warranty" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-2 bg-white rounded-xl p-3"
                >
                  <badge.icon className="w-4 h-4 text-[#C9A227]" />
                  <span className="text-xs font-medium text-gray-600">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="p-6 md:p-8 flex flex-col">
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#C9A227]/10 text-[#C9A227] text-sm font-semibold px-3 py-1 rounded-full">
                {product.category?.name || "Lock"}
              </span>
              {product.subcategory?.name && (
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {product.subcategory.name}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-3">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(rating)
                        ? "fill-[#C9A227] text-[#C9A227]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {rating} ({reviewCount} reviews)
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>
            )}

            {/* Features */}
            {product.features?.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-[#111111] mb-3">
                  Key Features
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.slice(0, 6).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                      <span className="text-sm text-gray-600 truncate">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-[#111111]">Quantity:</span>
              <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#111111] font-bold hover:bg-[#C9A227] hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-[#111111]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#111111] font-bold hover:bg-[#C9A227] hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Primary Actions */}
              <div className="flex gap-3">
                <motion.a
                  href="tel:+919876543210"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-[#111111] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#2F2F2F] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call to Order
                </motion.a>
                <motion.a
                  href={`https://wa.me/919876543210?text=Hi, I'm interested in ${product.name}`}
                  target="_blank"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  WhatsApp
                </motion.a>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-3">
                <Link href={`/product/${product.slug}`} className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border-2 border-[#111111] text-[#111111] py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#111111] hover:text-white transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                    View Full Details
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onToggleWishlist}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                    isWishlisted
                      ? "bg-red-500 text-white"
                      : "border-2 border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// COMPACT RELATED PRODUCTS VARIANT
// ============================================
export function CompactRelatedProducts({ products = [], title }) {
  return (
    <RelatedProducts
      title={title || "You May Also Like"}
      subtitle="Recommended"
      products={products}
      variant="compact"
      showViewAll={false}
    />
  );
}

// ============================================
// FEATURED PRODUCTS VARIANT
// ============================================
export function FeaturedProducts({ products = [] }) {
  return (
    <RelatedProducts
      title="Featured Products"
      subtitle="Top Picks"
      products={products}
      variant="featured"
      autoScroll={true}
      autoScrollInterval={4000}
    />
  );
}

// ============================================
// PRODUCT GRID (Non-Carousel)
// ============================================
export function ProductsGrid({ products = [], title, subtitle }) {
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  if (!products || products.length === 0) return null;

  return (
    <div>
      {/* Header */}
      {title && (
        <div className="mb-8">
          {subtitle && (
            <span className="text-[#C9A227] font-semibold text-sm uppercase tracking-wider">
              {subtitle}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mt-1">
            {title}
          </h2>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product._id || index}
            product={product}
            index={index}
            variant="default"
            isWishlisted={wishlist.includes(product._id)}
            onToggleWishlist={() => toggleWishlist(product._id)}
            onShare={() => {}}
            onQuickView={() => setQuickViewProduct(product)}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            isWishlisted={wishlist.includes(quickViewProduct._id)}
            onToggleWishlist={() => toggleWishlist(quickViewProduct._id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// MINIMAL PRODUCT LIST
// ============================================
export function MinimalProductList({ products = [], title }) {
  if (!products || products.length === 0) return null;

  return (
    <div>
      {title && (
        <h3 className="text-xl font-bold text-[#111111] mb-4">{title}</h3>
      )}
      <div className="space-y-4">
        {products.slice(0, 5).map((product, index) => (
          <Link key={product._id || index} href={`/product/${product.slug}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5, backgroundColor: "#F5F5F5" }}
              className="flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={product.images?.[0] || "/images/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#111111] truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < 4 ? "fill-[#C9A227] text-[#C9A227]" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}