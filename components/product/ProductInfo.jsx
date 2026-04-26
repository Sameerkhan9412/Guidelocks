// components/product/ProductInfo.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Share2,
  Check,
  Star,
  MessageCircle,
  Phone,
  Mail,
  Copy,
  CheckCircle,
  Shield,
  Clock,
  Package,
  Truck,
  Facebook,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";

export default function ProductInfo({ product, isWishlisted, onToggleWishlist }) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.name} - Premium Lock from Vinayak International`;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
    setShowShareMenu(false);
  };

  return (
    <div className="lg:sticky lg:top-24 space-y-6">
      {/* Category & Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-[#C9A227]/10 text-[#C9A227] px-3 py-1 rounded-full text-sm font-semibold">
          {product.category?.name || "Lock"}
        </span>
        {product.subcategory?.name && (
          <span className="bg-[#111111]/5 text-[#111111] px-3 py-1 rounded-full text-sm">
            {product.subcategory.name}
          </span>
        )}
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          In Stock
        </span>
      </div>

      {/* Product Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] leading-tight">
        {product.name}
      </h1>

      {/* Rating & Reviews */}
      <div className="flex flex-wrap items-center gap-4">
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
        <span className="text-gray-600">4.8 out of 5</span>
        <span className="text-gray-400">|</span>
        <a
          href="#reviews"
          className="text-[#C9A227] font-medium hover:underline flex items-center gap-1"
        >
          <MessageCircle className="w-4 h-4" />
          124 Reviews
        </a>
      </div>

      {/* Short Description */}
      {product.description && (
        <p className="text-gray-600 text-lg leading-relaxed">
          {product.description.length > 200
            ? `${product.description.substring(0, 200)}...`
            : product.description}
        </p>
      )}

      {/* Key Features Highlights */}
      {product.features?.length > 0 && (
        <div className="bg-[#F5F5F5] rounded-2xl p-6">
          <h3 className="font-bold text-[#111111] mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#C9A227]" />
            Key Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.features.slice(0, 6).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 bg-[#C9A227] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Shield, label: "Warranty", value: "5 Years" },
          { icon: Clock, label: "Delivery", value: "3-5 Days" },
          { icon: Package, label: "SKU", value: product.slug?.slice(0, 8).toUpperCase() || "N/A" },
          { icon: Truck, label: "Shipping", value: "Free" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-xl p-3 text-center"
          >
            <item.icon className="w-5 h-5 text-[#C9A227] mx-auto mb-1" />
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="font-semibold text-[#111111] text-sm">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="font-semibold text-[#111111]">Quantity:</span>
        <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-xl p-1">
          <button
            onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
            className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#111111] font-bold hover:bg-[#C9A227] hover:text-white transition-colors"
          >
            -
          </button>
          <span className="w-12 text-center font-bold text-[#111111]">
            {selectedQuantity}
          </span>
          <button
            onClick={() => setSelectedQuantity(selectedQuantity + 1)}
            className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#111111] font-bold hover:bg-[#C9A227] hover:text-white transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.a
          href={`tel:+919897627670`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-[#111111] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#2F2F2F] transition-colors"
        >
          <Phone className="w-5 h-5" />
          Call to Order
        </motion.a>
        <motion.a
          href={`https://wa.me/919897627670?text=Hi, I'm interested in ${product.name}`}
          target="_blank"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
        >
          <Send className="w-5 h-5" />
          WhatsApp
        </motion.a>
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggleWishlist}
          className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
            isWishlisted
              ? "bg-red-50 text-red-500 border-2 border-red-200"
              : "bg-white border-2 border-gray-200 text-gray-700 hover:border-[#C9A227] hover:text-[#C9A227]"
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
          {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
        </motion.button>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="w-12 h-12 border-2 border-gray-200 rounded-xl flex items-center justify-center text-gray-700 hover:border-[#C9A227] hover:text-[#C9A227] transition-all"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>

          {/* Share Menu */}
          <AnimatePresence>
            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-100 p-3 min-w-[200px]"
              >
                <p className="text-sm font-semibold text-gray-700 mb-2 px-2">
                  Share this product
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sky-50 text-sky-500 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    <span>Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </button>
                  <div className="border-t border-gray-100 my-2" />
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-500">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Contact Options */}
      <div className="bg-gradient-to-r from-[#C9A227]/10 to-[#C9A227]/5 rounded-2xl p-6 border border-[#C9A227]/20">
        <h4 className="font-bold text-[#111111] mb-4">Need Help?</h4>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="tel:+919897627670"
            className="flex items-center gap-3 text-[#111111] hover:text-[#C9A227] transition-colors"
          >
            <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Call us at</p>
              <p className="font-semibold">+91 9897627670</p>
            </div>
          </a>
          <a
            href="mailto:info@vinayakexports.com"
            className="flex items-center gap-3 text-[#111111] hover:text-[#C9A227] transition-colors"
          >
            <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email us at</p>
              <p className="font-semibold">info@vinayakexports.com</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}