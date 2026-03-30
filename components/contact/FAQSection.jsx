// components/contact/FAQSection.jsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Phone,
  Search,
} from "lucide-react";

const faqs = [
  {
    question: "How can I become a GuideLock dealer?",
    answer:
      "To become a dealer, fill out the contact form selecting 'Become a Dealer' as the inquiry type, or call our sales team directly. We'll guide you through the application process, which includes verification and a minimum order requirement.",
  },
  {
    question: "Do you offer installation services?",
    answer:
      "Yes, we provide professional installation services in select cities. For other locations, we can connect you with authorized installers. All our products come with detailed installation guides.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for unused products in original packaging. For defective products, we provide free replacement under warranty. Please contact our support team with your order details to initiate a return.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 3-5 business days for most locations in India. Express delivery (1-2 days) is available in metro cities. You'll receive tracking information once your order ships.",
  },
  {
    question: "Do you provide bulk order discounts?",
    answer:
      "Yes, we offer attractive discounts for bulk orders. Contact our sales team with your requirements for a customized quote. Special pricing is available for contractors, builders, and businesses.",
  },
  {
    question: "What warranty do your products have?",
    answer:
      "Most of our locks come with a 5-year manufacturer warranty covering defects in materials and workmanship. Some premium products have extended warranties. Check individual product pages for specific warranty details.",
  },
  {
    question: "Can I get product samples before placing a bulk order?",
    answer:
      "Yes, we provide samples for evaluation before bulk purchases. Sample costs may apply but are adjusted against your order. Contact our sales team to request samples.",
  },
  {
    question: "Do you export to other countries?",
    answer:
      "Yes, we export to 10+ countries. International orders have different shipping times and may be subject to customs duties. Contact our export team for specific inquiries.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section ref={ref} className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            Frequently Asked <span className="text-[#C9A227]">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions. Can't find what you're looking for? 
            Contact us directly.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto mb-10"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 border-transparent focus:border-[#C9A227] transition-all focus:outline-none shadow-lg"
            />
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white rounded-2xl"
            >
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No matching questions found</p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-[#C9A227] font-medium hover:underline"
              >
                Clear search
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                >
                  <button
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? -1 : index)
                    }
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-[#C9A227] font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <span className="font-semibold text-[#111111] text-lg pr-4">
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-[#C9A227]" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          <div className="pl-12 text-gray-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-[#111111] rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Still have questions?
                </h3>
                <p className="text-gray-400">
                  Our team is here to help you find the answers
                </p>
              </div>
              <div className="flex gap-4">
                <motion.a
                  href="tel:+919897627670"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#C9A227] text-[#111111] px-6 py-3 rounded-full font-bold flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </motion.a>
                <motion.a
                  href="#contact-form"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#111111] px-6 py-3 rounded-full font-bold flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}