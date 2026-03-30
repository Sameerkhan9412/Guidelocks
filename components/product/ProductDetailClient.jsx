// components/product/ProductDetailClient.jsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import FloatingActions from "./FloatingActions";
import Breadcrumb from "./Breadcrumb";
import {
  ChevronRight,
  Home,
  Share2,
  Heart,
  ShieldCheck,
  Truck,
  Award,
  Headphones,
  ArrowUp,
} from "lucide-react";

export default function ProductDetailClient({
  product,
  relatedProducts,
  similarProducts,
  reviews,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const topRef = useRef(null);

  // Handle scroll
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowScrollTop(window.scrollY > 500);
    });
  }

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]" ref={topRef}>
      {/* <Navbar /> */}

      {/* Breadcrumb Section */}
      <section className="bg-[#111111] py-6">
        <div className="container mx-auto px-4">
          <Breadcrumb product={product} />
        </div>
      </section>

      {/* Main Product Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ImageGallery images={product.images} productName={product.name} />
            </motion.div>

            {/* Right - Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ProductInfo
                product={product}
                isWishlisted={isWishlisted}
                onToggleWishlist={() => setIsWishlisted(!isWishlisted)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Genuine Product",
                desc: "100% Authentic",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "All Over India",
              },
              {
                icon: Award,
                title: "Quality Assured",
                desc: "ISI Certified",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                desc: "Expert Assistance",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F5F5F5] transition-colors group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/5 rounded-xl flex items-center justify-center group-hover:from-[#C9A227] group-hover:to-[#A68520] transition-all duration-300">
                  <item.icon className="w-7 h-7 text-[#C9A227] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111111]">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Tabs - Description, Features, Specifications, Reviews */}
      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <ProductTabs product={product} reviews={reviews} />
        </div>
      </section> */}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <RelatedProducts
              title="Related Products"
              subtitle="You might also like"
              products={relatedProducts}
            />
          </div>
        </section>
      )}

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <RelatedProducts
              title="Similar Products"
              subtitle="From the same category"
              products={similarProducts}
            />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[#111111] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A227' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 left-10 w-20 h-20 bg-[#C9A227]/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-32 h-32 bg-[#C9A227]/10 rounded-full blur-xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Need Help Choosing the Right{" "}
              <span className="text-[#C9A227]">Lock?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Our security experts are here to help you find the perfect lock for
              your needs. Get personalized recommendations and expert advice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="tel:+919897627670"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-gradient-to-r from-[#C9A227] to-[#A68520] text-[#111111] px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-[#C9A227]/30 hover:shadow-[#C9A227]/50 transition-all flex items-center justify-center gap-2"
              >
                <Headphones className="w-5 h-5" />
                Call Now: +91 9897627670
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border-2 border-[#C9A227] text-[#C9A227] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#C9A227] hover:text-[#111111] transition-all"
              >
                Request Callback
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Actions (Mobile) */}
      <FloatingActions
        product={product}
        isWishlisted={isWishlisted}
        onToggleWishlist={() => setIsWishlisted(!isWishlisted)}
      />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40 w-12 h-12 bg-[#C9A227] text-[#111111] rounded-full shadow-lg flex items-center justify-center hover:bg-[#A68520] transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}