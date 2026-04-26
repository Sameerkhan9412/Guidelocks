// components/product/FloatingActions.jsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Send,
  Heart,
  Share2,
  X,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Mail,
  Copy,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  ShoppingBag,
  Star,
  ArrowUp,
  Plus,
  Minus,
  Info,
  Shield,
  Truck,
  Clock,
  Award,
  ExternalLink,
  Bookmark,
  Bell,
  Printer,
  QrCode,
  MapPin,
  Eye,
  HelpCircle,
  FileText,
  Download,
  Smartphone,
  MessageSquare,
  Instagram,
  Youtube,
  AlertCircle,
  Zap,
  Gift,
  Tag,
  Calendar,
  Users,
  ThumbsUp,
  Sparkles,
} from "lucide-react";

// ============================================
// MAIN FLOATING ACTIONS COMPONENT (MOBILE)
// ============================================
export default function FloatingActions({
  product,
  isWishlisted = false,
  onToggleWishlist,
}) {
  // State Management
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePanel, setActivePanel] = useState(null); // 'share', 'more', 'contact'
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(true);
  const [touchStart, setTouchStart] = useState(null);

  const containerRef = useRef(null);
  const expandedRef = useRef(null);

  // Scroll handler for visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      setScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
      
      // Show after 400px scroll
      setIsVisible(currentScrollY > 400);
      
      // Close panels on significant scroll
      if (Math.abs(currentScrollY - lastScrollY) > 100) {
        setActivePanel(null);
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActivePanel(null);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Swipe gesture handler for expanded panel
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientY;
    const diff = touchStart - currentTouch;
    
    // Swipe down to close
    if (diff < -50 && isExpanded) {
      setIsExpanded(false);
      setTouchStart(null);
    }
    // Swipe up to expand
    if (diff > 50 && !isExpanded) {
      setIsExpanded(true);
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  // Copy link handler
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, []);

  // Social share handler
  const handleSocialShare = useCallback((platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(product?.name || "Product");
    const text = encodeURIComponent(
      `Check out ${product?.name || "this product"} - Premium Lock from Vinayak International`
    );
    const image = encodeURIComponent(product?.images?.[0] || "");

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}&media=${image}`,
      email: `mailto:?subject=${title}&body=${text}%0A%0A${url}`,
    };

    const shareUrl = shareUrls[platform];
    if (shareUrl) {
      if (platform === "email") {
        window.location.href = shareUrl;
      } else {
        window.open(shareUrl, "_blank", "width=600,height=500,scrollbars=yes");
      }
    }
    setActivePanel(null);
  }, [product]);

  // Native share handler
  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || "Product",
          text: `Check out ${product?.name || "this product"} - Premium Lock from Vinayak International`,
          url: window.location.href,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          // Fallback to custom share menu
          setActivePanel("share");
        }
      }
    } else {
      setActivePanel("share");
    }
  }, [product]);

  // Print handler
  const handlePrint = useCallback(() => {
    window.print();
    setActivePanel(null);
    setIsExpanded(false);
  }, []);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Toggle panel
  const togglePanel = useCallback((panel) => {
    setActivePanel((current) => (current === panel ? null : panel));
    setIsExpanded(false);
  }, []);

  // WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in *${product?.name || "this product"}*.\n\nPlease provide more details about:\n• Price\n• Availability\n• Installation\n\nProduct Link: ${typeof window !== "undefined" ? window.location.href : ""}`
  );

  // Call message
  const callNumber = "+919897627670";

  if (!product) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: scrollingDown && !isExpanded && !activePanel ? 0 : 0, 
            opacity: 1 
          }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Backdrop for panels */}
          <AnimatePresence>
            {(activePanel || isExpanded) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
                onClick={() => {
                  setActivePanel(null);
                  setIsExpanded(false);
                }}
              />
            )}
          </AnimatePresence>

          {/* Expanded Content Panel */}
          <AnimatePresence>
            {isExpanded && (
              <ExpandedPanel
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
                isWishlisted={isWishlisted}
                onToggleWishlist={onToggleWishlist}
                onShare={handleNativeShare}
                onNotify={() => setShowNotifyModal(true)}
                onPrint={handlePrint}
              />
            )}
          </AnimatePresence>

          {/* Share Panel */}
          <AnimatePresence>
            {activePanel === "share" && (
              <SharePanel
                product={product}
                onClose={() => setActivePanel(null)}
                onShare={handleSocialShare}
                onCopyLink={handleCopyLink}
                copied={copied}
              />
            )}
          </AnimatePresence>

          {/* More Actions Panel */}
          <AnimatePresence>
            {activePanel === "more" && (
              <MoreActionsPanel
                product={product}
                onClose={() => setActivePanel(null)}
                onScrollToTop={scrollToTop}
                onEnquiry={() => {
                  setActivePanel(null);
                  setShowEnquiryModal(true);
                }}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={isWishlisted}
                whatsappMessage={whatsappMessage}
              />
            )}
          </AnimatePresence>

          {/* Contact Panel */}
          <AnimatePresence>
            {activePanel === "contact" && (
              <ContactPanel
                product={product}
                onClose={() => setActivePanel(null)}
                whatsappMessage={whatsappMessage}
                callNumber={callNumber}
              />
            )}
          </AnimatePresence>

          {/* Main Floating Bar */}
          <MainFloatingBar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            activePanel={activePanel}
            togglePanel={togglePanel}
            whatsappMessage={whatsappMessage}
            callNumber={callNumber}
          />

          {/* Notify Modal */}
          <AnimatePresence>
            {showNotifyModal && (
              <NotifyModal
                product={product}
                onClose={() => setShowNotifyModal(false)}
              />
            )}
          </AnimatePresence>

          {/* Enquiry Modal */}
          <AnimatePresence>
            {showEnquiryModal && (
              <EnquiryModal
                product={product}
                onClose={() => setShowEnquiryModal(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Scroll to Top - Separate from main bar */}
      {isVisible && !isExpanded && !activePanel && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 z-40 md:hidden w-11 h-11 bg-white text-[#111111] rounded-full shadow-lg border border-gray-200 flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ============================================
// MAIN FLOATING BAR COMPONENT
// ============================================
function MainFloatingBar({
  isExpanded,
  setIsExpanded,
  activePanel,
  togglePanel,
  whatsappMessage,
  callNumber,
}) {
  return (
    <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      {/* Pull Handle */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (activePanel) togglePanel(null);
        }}
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 bg-white rounded-t-2xl shadow-md flex items-center justify-center border border-b-0 border-gray-200 z-10"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.button>

      {/* Main Actions Row */}
      <div className="px-4 py-3 flex items-center gap-2">
        {/* More Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => togglePanel(activePanel === "more" ? null : "more")}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
            activePanel === "more"
              ? "bg-[#C9A227] text-white shadow-lg"
              : "bg-[#F5F5F5] text-[#111111] hover:bg-gray-200"
          }`}
        >
          <AnimatePresence mode="wait">
            {activePanel === "more" ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="more"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Call Button */}
        <motion.a
          href={`tel:${callNumber}`}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-[#111111] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:bg-[#2F2F2F]"
        >
          <Phone className="w-5 h-5" />
          <span className="text-sm">Call Now</span>
        </motion.a>

        {/* WhatsApp Button */}
        <motion.a
          href={`https://wa.me/919897627670?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-green-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:bg-green-600"
        >
          <Send className="w-5 h-5" />
          <span className="text-sm">WhatsApp</span>
        </motion.a>

        {/* Share Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => togglePanel(activePanel === "share" ? null : "share")}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
            activePanel === "share"
              ? "bg-[#C9A227] text-white shadow-lg"
              : "bg-[#F5F5F5] text-[#111111] hover:bg-gray-200"
          }`}
        >
          <Share2 className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Safe Area for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}

// ============================================
// EXPANDED PANEL COMPONENT
// ============================================
function ExpandedPanel({
  product,
  quantity,
  setQuantity,
  isWishlisted,
  onToggleWishlist,
  onShare,
  onNotify,
  onPrint,
}) {
  const rating = 4.5;
  const reviewCount = 124;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white border-t border-gray-100 shadow-inner overflow-hidden"
    >
      {/* Product Preview */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F5F5F5]">
            <Image
              src={product.images?.[0] || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {/* Discount Badge */}
            <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              -15%
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-[#111111] text-base leading-tight line-clamp-2">
              {product.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(rating)
                        ? "fill-[#C9A227] text-[#C9A227]"
                        : i < rating
                        ? "fill-[#C9A227]/50 text-[#C9A227]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({reviewCount})</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                <CheckCircle className="w-3 h-3" />
                In Stock
              </span>
              <span className="text-xs text-gray-500">
                {product.category?.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-[#111111]">Quantity</span>
            <p className="text-xs text-gray-500 mt-0.5">Select quantity needed</p>
          </div>
          <div className="flex items-center gap-1 bg-[#F5F5F5] rounded-xl p-1">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-11 h-11 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#111111] font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="w-5 h-5" />
            </motion.button>
            <motion.span
              key={quantity}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-12 text-center font-bold text-[#111111] text-lg"
            >
              {quantity}
            </motion.span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setQuantity(quantity + 1)}
              className="w-11 h-11 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#111111] font-bold"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="p-4 grid grid-cols-4 gap-3">
        {[
          {
            icon: Heart,
            label: isWishlisted ? "Saved" : "Save",
            active: isWishlisted,
            onClick: onToggleWishlist,
            activeColor: "text-red-500 bg-red-50",
            activeFill: true,
          },
          {
            icon: Share2,
            label: "Share",
            onClick: onShare,
          },
          {
            icon: Bell,
            label: "Notify",
            onClick: onNotify,
          },
          {
            icon: Printer,
            label: "Print",
            onClick: onPrint,
          },
        ].map((action, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.9 }}
            onClick={action.onClick}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${
              action.active
                ? action.activeColor || "bg-[#C9A227]/10 text-[#C9A227]"
                : "bg-[#F5F5F5] text-gray-600 hover:bg-gray-200 active:bg-gray-300"
            }`}
          >
            <action.icon
              className={`w-5 h-5 mb-1.5 ${
                action.active && action.activeFill ? "fill-current" : ""
              }`}
            />
            <span className="text-xs font-medium">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Shield, label: "100% Genuine", color: "text-green-600" },
            { icon: Truck, label: "Free Delivery", color: "text-blue-600" },
            { icon: Award, label: "5 Year Warranty", color: "text-[#C9A227]" },
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl"
            >
              <badge.icon className={`w-5 h-5 ${badge.color} mb-1`} />
              <span className="text-[10px] font-medium text-gray-600 text-center leading-tight">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Info */}
      <div className="px-4 pb-4">
        <div className="bg-[#C9A227]/5 border border-[#C9A227]/20 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#C9A227]" />
            <span className="text-sm text-[#111111]">
              <strong>Fast Dispatch:</strong> Order before 2 PM for same-day shipping
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// SHARE PANEL COMPONENT
// ============================================
function SharePanel({ product, onClose, onShare, onCopyLink, copied }) {
  const socialPlatforms = [
    { id: "whatsapp", icon: Send, label: "WhatsApp", color: "bg-green-500" },
    { id: "facebook", icon: Facebook, label: "Facebook", color: "bg-blue-600" },
    { id: "twitter", icon: Twitter, label: "Twitter", color: "bg-sky-500" },
    { id: "linkedin", icon: Linkedin, label: "LinkedIn", color: "bg-blue-700" },
    { id: "telegram", icon: MessageCircle, label: "Telegram", color: "bg-sky-400" },
    { id: "pinterest", icon: Instagram, label: "Pinterest", color: "bg-red-500" },
    { id: "email", icon: Mail, label: "Email", color: "bg-gray-600" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute bottom-full left-0 right-0 mb-2 mx-3"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
              <Share2 className="w-5 h-5 text-[#C9A227]" />
            </div>
            <div>
              <h4 className="font-bold text-[#111111]">Share Product</h4>
              <p className="text-xs text-gray-500">Choose a platform</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </motion.button>
        </div>

        {/* Social Platforms Grid */}
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4">
            {socialPlatforms.slice(0, 4).map((platform, index) => (
              <motion.button
                key={platform.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onShare(platform.id)}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-14 h-14 ${platform.color} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <platform.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {platform.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* More Platforms */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            {socialPlatforms.slice(4).map((platform, index) => (
              <motion.button
                key={platform.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index + 4) * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onShare(platform.id)}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-14 h-14 ${platform.color} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <platform.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {platform.label}
                </span>
              </motion.button>
            ))}

            {/* Copy Link Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCopyLink}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${
                  copied ? "bg-green-500" : "bg-gray-700"
                }`}
              >
                {copied ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <Link2 className="w-6 h-6 text-white" />
                )}
              </div>
              <span className="text-xs font-medium text-gray-600">
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Product Link Preview */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <Link2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-500 truncate flex-1">
              {typeof window !== "undefined" ? window.location.href : ""}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onCopyLink}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                copied
                  ? "bg-green-100 text-green-600"
                  : "bg-[#111111] text-white"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// MORE ACTIONS PANEL COMPONENT
// ============================================
function MoreActionsPanel({
  product,
  onClose,
  onScrollToTop,
  onEnquiry,
  onToggleWishlist,
  isWishlisted,
  whatsappMessage,
}) {
  const actions = [
    {
      icon: Eye,
      label: "View Full Details",
      desc: "See complete product information",
      onClick: () => {
        onScrollToTop();
        onClose();
      },
    },
    {
      icon: MessageSquare,
      label: "Ask a Question",
      desc: "Get expert assistance via WhatsApp",
      href: `https://wa.me/919897627670?text=${whatsappMessage}`,
      external: true,
    },
    {
      icon: Bookmark,
      label: isWishlisted ? "Remove from Saved" : "Save for Later",
      desc: isWishlisted ? "Remove from your wishlist" : "Add to your saved items",
      onClick: () => {
        onToggleWishlist();
        onClose();
      },
      active: isWishlisted,
    },
    {
      icon: MapPin,
      label: "Find Nearby Store",
      desc: "Locate authorized dealers near you",
      onClick: onClose,
    },
    {
      icon: Award,
      label: "Compare Products",
      desc: "Compare with similar locks",
      onClick: onClose,
    },
    {
      icon: Download,
      label: "Download Brochure",
      desc: "Get product PDF for offline viewing",
      onClick: onClose,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute bottom-full left-0 right-0 mb-2 mx-3"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-h-[60vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#111111] rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-[#111111]">More Actions</h4>
              <p className="text-xs text-gray-500">Quick shortcuts</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </motion.button>
        </div>

        {/* Actions List */}
        <div className="p-2">
          {actions.map((action, index) => {
            const Component = action.href ? "a" : "button";
            const props = action.href
              ? {
                  href: action.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : { onClick: action.onClick };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Component
                  {...props}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-colors ${
                    action.active
                      ? "bg-red-50"
                      : "hover:bg-gray-50 active:bg-gray-100"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      action.active ? "bg-red-100" : "bg-[#C9A227]/10"
                    }`}
                  >
                    <action.icon
                      className={`w-6 h-6 ${
                        action.active ? "text-red-500" : "text-[#C9A227]"
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p
                      className={`font-semibold ${
                        action.active ? "text-red-600" : "text-[#111111]"
                      }`}
                    >
                      {action.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{action.desc}</p>
                  </div>
                  {action.external ? (
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </Component>
              </motion.div>
            );
          })}
        </div>

        {/* Enquiry CTA */}
        <div className="p-4 border-t border-gray-100">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onEnquiry}
            className="w-full bg-gradient-to-r from-[#C9A227] to-[#A68520] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <HelpCircle className="w-5 h-5" />
            Send Enquiry
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// CONTACT PANEL COMPONENT
// ============================================
function ContactPanel({ product, onClose, whatsappMessage, callNumber }) {
  const contactOptions = [
    {
      icon: Phone,
      label: "Call Us",
      desc: "Speak directly with our team",
      value: callNumber,
      href: `tel:${callNumber}`,
      color: "bg-[#111111]",
    },
    {
      icon: Send,
      label: "WhatsApp",
      desc: "Quick response, usually within minutes",
      value: "+91 98765 43210",
      href: `https://wa.me/919897627670?text=${whatsappMessage}`,
      color: "bg-green-500",
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      desc: "For detailed enquiries",
      value: "info@vinayakexports.com",
      href: "mailto:info@vinayakexports.com",
      color: "bg-blue-500",
    },
    {
      icon: MessageCircle,
      label: "Live Chat",
      desc: "Chat with support agent",
      value: "Available 9 AM - 9 PM",
      onClick: onClose,
      color: "bg-purple-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute bottom-full left-0 right-0 mb-2 mx-3"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-[#111111]">Contact Us</h4>
              <p className="text-xs text-gray-500">We're here to help</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-gray-500" />
          </motion.button>
        </div>

        {/* Contact Options */}
        <div className="p-3 space-y-2">
          {contactOptions.map((option, index) => {
            const Component = option.href ? "a" : "button";
            const props = option.href
              ? {
                  href: option.href,
                  target: option.external ? "_blank" : undefined,
                  rel: option.external ? "noopener noreferrer" : undefined,
                }
              : { onClick: option.onClick };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Component
                  {...props}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-[#111111]">{option.label}</p>
                    <p className="text-xs text-gray-500">{option.desc}</p>
                    <p className="text-sm text-[#C9A227] font-medium mt-0.5">
                      {option.value}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Component>
              </motion.div>
            );
          })}
        </div>

        {/* Working Hours */}
        <div className="px-4 pb-4">
          <div className="bg-[#F5F5F5] rounded-xl p-3 flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#C9A227]" />
            <div>
              <p className="text-sm font-medium text-[#111111]">Working Hours</p>
              <p className="text-xs text-gray-500">Mon - Sat: 9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// NOTIFY MODAL COMPONENT
// ============================================
function NotifyModal({ product, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    notifyType: "both",
    priceAlert: true,
    stockAlert: true,
    recommendations: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const validateForm = () => {
    if (formData.notifyType === "email" || formData.notifyType === "both") {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError("Please enter a valid email address");
        return false;
      }
    }
    if (formData.notifyType === "sms" || formData.notifyType === "both") {
      if (!formData.phone || formData.phone.length < 10) {
        setError("Please enter a valid phone number");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setTimeout(() => onClose(), 2500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 md:hidden">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="p-5 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#A68520] rounded-2xl flex items-center justify-center shadow-lg">
              <Bell className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111111]">Get Notified</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Never miss updates on this product
              </p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </motion.button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"
              >
                <CheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
              <h4 className="text-2xl font-bold text-[#111111] mb-2">
                You're All Set!
              </h4>
              <p className="text-gray-500">
                We'll notify you about price drops and updates for{" "}
                <span className="font-medium text-[#111111]">
                  {product.name}
                </span>
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="p-5 pt-2 space-y-5"
            >
              {/* Product Preview */}
              <div className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-xl">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.images?.[0] || "/images/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#111111] text-sm truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.category?.name || "Lock"}
                  </p>
                </div>
              </div>

              {/* Notification Type */}
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-3">
                  How should we notify you?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "email", label: "Email", icon: Mail },
                    { value: "sms", label: "SMS", icon: Smartphone },
                    { value: "both", label: "Both", icon: Bell },
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChange("notifyType", option.value)}
                      className={`flex flex-col items-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                        formData.notifyType === option.value
                          ? "bg-[#C9A227] text-white shadow-lg"
                          : "bg-[#F5F5F5] text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <option.icon className="w-5 h-5" />
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              {(formData.notifyType === "email" ||
                formData.notifyType === "both") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-semibold text-[#111111] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-4 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all"
                    />
                  </div>
                </motion.div>
              )}

              {/* Phone Input */}
              {(formData.notifyType === "sms" ||
                formData.notifyType === "both") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-semibold text-[#111111] mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full pl-12 pr-4 py-4 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all"
                    />
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Notification Preferences */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#111111]">
                  Notification Preferences
                </label>
                {[
                  {
                    key: "priceAlert",
                    icon: Tag,
                    label: "Price drop alerts",
                  },
                  {
                    key: "stockAlert",
                    icon: ShoppingBag,
                    label: "Back in stock alerts",
                  },
                  {
                    key: "recommendations",
                    icon: Gift,
                    label: "Similar product recommendations",
                  },
                ].map((pref) => (
                  <label
                    key={pref.key}
                    className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData[pref.key]}
                      onChange={(e) =>
                        handleChange(pref.key, e.target.checked)
                      }
                      className="w-5 h-5 rounded border-gray-300 text-[#C9A227] focus:ring-[#C9A227]"
                    />
                    <pref.icon className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{pref.label}</span>
                  </label>
                ))}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                className="w-full bg-gradient-to-r from-[#C9A227] to-[#A68520] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#C9A227]/30"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Bell className="w-5 h-5" />
                    Notify Me
                  </>
                )}
              </motion.button>

              {/* Privacy Note */}
              <p className="text-xs text-gray-400 text-center">
                By subscribing, you agree to our{" "}
                <Link
                  href="/privacy"
                  className="text-[#C9A227] hover:underline"
                >
                  Privacy Policy
                </Link>
                . Unsubscribe anytime.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// ENQUIRY MODAL COMPONENT
// ============================================
function EnquiryModal({ product, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    quantity: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => onClose(), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 md:hidden">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="p-5 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#111111] rounded-2xl flex items-center justify-center shadow-lg">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111111]">Send Enquiry</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                We'll get back to you shortly
              </p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-500" />
          </motion.button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"
              >
                <CheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
              <h4 className="text-2xl font-bold text-[#111111] mb-2">
                Enquiry Sent!
              </h4>
              <p className="text-gray-500">
                Our team will contact you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="p-5 pt-2 space-y-4"
            >
              {/* Product Preview */}
              <div className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-xl">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.images?.[0] || "/images/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#111111] text-sm truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Enquiring about this product
                  </p>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3.5 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3.5 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email (optional)"
                  className="w-full px-4 py-3.5 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Quantity Required
                </label>
                <div className="flex items-center gap-3 bg-[#F5F5F5] rounded-xl p-2 w-fit">
                  <button
                    type="button"
                    onClick={() =>
                      handleChange("quantity", Math.max(1, formData.quantity - 1))
                    }
                    className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold">
                    {formData.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleChange("quantity", formData.quantity + 1)
                    }
                    className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-[#111111] mb-2">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Any specific requirements or questions..."
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227] resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#111111] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Enquiry
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// DESKTOP FLOATING ACTIONS COMPONENT
// ============================================
export function DesktopFloatingActions({
  product,
  isWishlisted = false,
  onToggleWishlist,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${product?.name}`);

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=500");
    setShowSharePopup(false);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${product?.name}. Please provide more details.`
  );

  if (!product) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
        >
          {/* Call Button */}
          <motion.a
            href="tel:+919897627670"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-14 h-14 bg-[#111111] text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-[#2F2F2F] transition-colors"
          >
            <Phone className="w-6 h-6" />
            <span className="absolute right-full mr-3 px-4 py-2 bg-[#111111] text-white text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              Call Now
            </span>
          </motion.a>

          {/* WhatsApp Button */}
          <motion.a
            href={`https://wa.me/9897627670?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-green-600 transition-colors"
          >
            <Send className="w-6 h-6" />
            <span className="absolute right-full mr-3 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              WhatsApp
            </span>
          </motion.a>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleWishlist}
            className={`group relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-colors ${
              isWishlisted
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <Heart
              className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
            />
            <span
              className={`absolute right-full mr-3 px-4 py-2 text-white text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg ${
                isWishlisted ? "bg-red-500" : "bg-gray-700"
              }`}
            >
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </span>
          </motion.button>

          {/* Share Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSharePopup(!showSharePopup)}
              className={`group relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-colors ${
                showSharePopup
                  ? "bg-[#C9A227] text-white"
                  : "bg-white text-gray-700 hover:bg-[#C9A227]/10 hover:text-[#C9A227]"
              }`}
            >
              <Share2 className="w-6 h-6" />
            </motion.button>

            {/* Share Popup */}
            <AnimatePresence>
              {showSharePopup && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20 }}
                  className="absolute right-full mr-3 top-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 min-w-[220px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-[#111111]">Share</span>
                    <button
                      onClick={() => setShowSharePopup(false)}
                      className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { icon: Facebook, color: "bg-blue-600", id: "facebook" },
                      { icon: Twitter, color: "bg-sky-500", id: "twitter" },
                      { icon: Linkedin, color: "bg-blue-700", id: "linkedin" },
                      { icon: Send, color: "bg-green-500", id: "whatsapp" },
                    ].map((social) => (
                      <motion.button
                        key={social.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShare(social.id)}
                        className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <social.icon className="w-5 h-5 text-white" />
                      </motion.button>
                    ))}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors ${
                      copied
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scroll to Top */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group relative w-14 h-14 bg-[#C9A227] text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-[#A68520] transition-colors"
          >
            <ArrowUp className="w-6 h-6" />
            <span className="absolute right-full mr-3 px-4 py-2 bg-[#C9A227] text-white text-sm font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              Back to Top
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}