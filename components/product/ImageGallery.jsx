// components/product/ImageGallery.jsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  X,
  Maximize2,
  Download,
  Share2,
} from "lucide-react";

export default function ImageGallery({ images = [], productName }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef(null);

  // Default images if none provided
  const displayImages =
    images.length > 0 ? images : ["/images/placeholder.jpg"];

  const handlePrevious = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current || !isZoomed) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: productName,
        url: window.location.href,
      });
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image Container */}
        <motion.div
          ref={imageContainerRef}
          className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-lg group cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onClick={() => setIsLightboxOpen(true)}
        >
          {/* Main Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={displayImages[selectedIndex]}
                alt={`${productName} - Image ${selectedIndex + 1}`}
                fill
                className={`object-contain transition-transform duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : {}
                }
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#C9A227] hover:text-white transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#C9A227] hover:text-white transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {selectedIndex + 1} / {displayImages.length}
          </div>

          {/* Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#C9A227] hover:text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#C9A227] hover:text-white"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </>
          )}

          {/* Zoom Hint */}
          <div className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3 h-3" />
            Hover to zoom
          </div>
        </motion.div>

        {/* Thumbnail Strip */}
        {displayImages.length > 1 && (
          <div className="relative">
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {displayImages.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedIndex === index
                      ? "ring-2 ring-[#C9A227] ring-offset-2"
                      : "ring-1 ring-gray-200 hover:ring-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    fill
                    className={`object-cover transition-opacity ${
                      selectedIndex === index ? "opacity-100" : "opacity-70 hover:opacity-100"
                    }`}
                  />
                  {selectedIndex === index && (
                    <motion.div
                      layoutId="thumbnailIndicator"
                      className="absolute inset-0 bg-[#C9A227]/20"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Main Image */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-5xl h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayImages[selectedIndex]}
                alt={`${productName} - Image ${selectedIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Navigation */}
            {displayImages.length > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </motion.button>
              </>
            )}

            {/* Thumbnail Strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-xl">
              {displayImages.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                  className={`w-14 h-14 rounded-lg overflow-hidden transition-all ${
                    selectedIndex === index
                      ? "ring-2 ring-[#C9A227]"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>

            {/* Image Counter */}
            <div className="absolute top-6 left-6 text-white text-lg font-medium">
              {selectedIndex + 1} / {displayImages.length}
            </div>

            {/* Download Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                // Download logic
                const link = document.createElement("a");
                link.href = displayImages[selectedIndex];
                link.download = `${productName}-${selectedIndex + 1}.jpg`;
                link.click();
              }}
              className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Download</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}