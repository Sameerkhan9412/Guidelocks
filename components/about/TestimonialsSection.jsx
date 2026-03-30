// components/about/TestimonialsSection.jsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight, Play } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    position: "Homeowner, Mumbai",
    image: "/images/testimonials/arjun.jpg",
    rating: 5,
    text: "GuideLock's mortise lock has been securing my home for 5 years now. The quality is exceptional, and their after-sales service is top-notch. Highly recommend!",
    videoUrl: null,
  },
  {
    name: "Sneha Kapoor",
    position: "Interior Designer, Delhi",
    image: "/images/testimonials/sneha.jpg",
    rating: 5,
    text: "I recommend GuideLock to all my clients. Their locks not only provide excellent security but also complement modern interior designs beautifully.",
    videoUrl: "#",
  },
  {
    name: "Rahul Verma",
    position: "Hotel Manager, Jaipur",
    image: "/images/testimonials/rahul.jpg",
    rating: 5,
    text: "We've installed over 200 GuideLock locks in our hotel. The durability and reliability are unmatched. Our guests feel safe, and that's what matters most.",
    videoUrl: null,
  },
  {
    name: "Priya Nair",
    position: "Architect, Bangalore",
    image: "/images/testimonials/priya.jpg",
    rating: 5,
    text: "The smart locks from GuideLock have revolutionized how my clients think about home security. Modern, reliable, and easy to use.",
    videoUrl: "#",
  },
  {
    name: "Vikram Singh",
    position: "Builder, Pune",
    image: "/images/testimonials/vikram.jpg",
    rating: 5,
    text: "As a builder, I've tried many lock brands. GuideLock stands out for quality and price. They're my go-to for all residential projects.",
    videoUrl: null,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={ref} className="py-24 bg-[#F5F5F5] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#C9A227]/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Quote className="w-4 h-4" />
            Customer Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
            What Our <span className="text-[#C9A227]">Customers</span> Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real stories from real customers who trust GuideLock for their security needs
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="grid md:grid-cols-5">
                {/* Image */}
                <div className="md:col-span-2 relative">
                  <div className="aspect-square md:aspect-auto md:h-full relative">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                    {currentTestimonial.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-16 h-16 bg-[#C9A227] rounded-full flex items-center justify-center shadow-xl"
                        >
                          <Play className="w-6 h-6 text-white ml-1" fill="white" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                  {/* Quote Icon */}
                  <Quote className="w-12 h-12 text-[#C9A227]/20 mb-6" />

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < currentTestimonial.rating
                            ? "fill-[#C9A227] text-[#C9A227]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-xl md:text-2xl text-[#111111] leading-relaxed mb-8 italic">
                    "{currentTestimonial.text}"
                  </p>

                  {/* Author */}
                  <div>
                    <h4 className="text-xl font-bold text-[#111111]">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-[#C9A227]">{currentTestimonial.position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 h-3 bg-[#C9A227]"
                      : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#C9A227] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-12 h-12 bg-[#111111] text-white rounded-full shadow-md flex items-center justify-center hover:bg-[#C9A227] transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}