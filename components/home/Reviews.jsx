// components/home/Reviews.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, User } from "lucide-react";

const defaultReviews = [
  {
    _id: "1",
    name: "Rajesh Kumar",
    message: "Excellent quality locks! I've been using their mortise locks for over 3 years now. The build quality is outstanding and customer service is top-notch.",
    rating: 5,
  },
  {
    _id: "2",
    name: "Priya Sharma",
    message: "Very satisfied with my purchase. The digital lock was easy to install and works perfectly. Highly recommend their products to everyone.",
    rating: 5,
  },
  {
    _id: "3",
    name: "Amit Patel",
    message: "Best lock shop in the market! Great variety and competitive prices. Their team helped me choose the perfect lock for my needs.",
    rating: 4,
  },
  {
    _id: "4",
    name: "Sneha Reddy",
    message: "Fantastic experience! Quick delivery and the product quality exceeded my expectations. Will definitely order again.",
    rating: 5,
  },
  {
    _id: "5",
    name: "Vikram Singh",
    message: "Professional service and premium quality products. The furniture locks I ordered are perfect for my new home.",
    rating: 5,
  },
  {
    _id: "6",
    name: "Anita Gupta",
    message: "Reliable and trustworthy. Have been a customer for 5 years. Their locks are durable and provide excellent security.",
    rating: 5,
  },
];

export default function Reviews({ reviews = [] }) {
  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + displayReviews.length) % displayReviews.length);
  };

  const visibleReviews = [
    displayReviews[(currentIndex - 1 + displayReviews.length) % displayReviews.length],
    displayReviews[currentIndex],
    displayReviews[(currentIndex + 1) % displayReviews.length],
  ];

  return (
    <section className="py-24 bg-[#F5F5F5] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#111111]/5 rounded-full blur-3xl" />

      {/* Large Quote Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        viewport={{ once: true }}
        className="absolute top-20 left-1/2 -translate-x-1/2"
      >
        <Quote className="w-64 h-64 text-[#C9A227]" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111]">
            What Our <span className="text-[#C9A227]">Clients Say</span>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about us.
          </p>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#C9A227] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#C9A227] hover:text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Reviews */}
          <div className="grid md:grid-cols-3 gap-6 px-4">
            {visibleReviews.map((review, index) => (
              <motion.div
                key={`${review._id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: index === 1 ? 1 : 0.5,
                  y: 0,
                  scale: index === 1 ? 1 : 0.9,
                }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-3xl p-8 shadow-xl ${
                  index === 1 ? "ring-2 ring-[#C9A227]" : ""
                }`}
              >
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-[#C9A227] to-[#8B7019] rounded-2xl flex items-center justify-center mb-6">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (review.rating || 5)
                          ? "fill-[#C9A227] text-[#C9A227]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Message */}
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
                  "{review.message}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/5 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111]">{review.name}</h4>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center gap-2 mt-10">
            {displayReviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#C9A227] w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}