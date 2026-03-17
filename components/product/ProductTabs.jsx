// components/product/ProductTabs.jsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FileText,
  List,
  Settings,
  MessageSquare,
  HelpCircle,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  User,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Filter,
  SortDesc,
  Camera,
  X,
  Send,
  Shield,
  Award,
  Zap,
  Lock,
  Wrench,
  Download,
  FileDown,
  Play,
  Calendar,
  CheckCircle,
  AlertCircle,
  Info,
  Package,
  Ruler,
  Weight,
  Palette,
  Key,
  Home,
  Building,
  ArrowRight,
} from "lucide-react";

const tabs = [
  { id: "description", label: "Description", icon: FileText },
  { id: "features", label: "Features", icon: List },
  { id: "specifications", label: "Specifications", icon: Settings },
  { id: "reviews", label: "Reviews", icon: MessageSquare },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

export default function ProductTabs({ product, reviews = [] }) {
  const [activeTab, setActiveTab] = useState("description");

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return <DescriptionTab product={product} />;
      case "features":
        return <FeaturesTab product={product} />;
      case "specifications":
        return <SpecificationsTab product={product} />;
      case "reviews":
        return <ReviewsTab reviews={reviews} product={product} />;
      case "faq":
        return <FAQTab product={product} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      {/* Tab Headers */}
      <div className="border-b border-gray-100 bg-[#FAFAFA]">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-2 px-6 py-5 font-semibold whitespace-nowrap transition-all relative min-w-fit ${
                activeTab === tab.id
                  ? "text-[#C9A227] bg-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.id === "reviews" && reviews.length > 0 && (
                <span className="bg-[#C9A227]/10 text-[#C9A227] text-xs px-2 py-0.5 rounded-full font-bold">
                  {reviews.length}
                </span>
              )}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8 lg:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================
// DESCRIPTION TAB
// ============================================
function DescriptionTab({ product }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const benefits = [
    {
      icon: Shield,
      title: "Enhanced Security",
      desc: "Multi-point locking mechanism provides maximum protection against break-ins and unauthorized access.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Award,
      title: "Premium Quality",
      desc: "Manufactured using high-grade stainless steel and brass for exceptional durability and longevity.",
      color: "from-[#C9A227] to-[#A68520]",
    },
    {
      icon: Wrench,
      title: "Easy Installation",
      desc: "Comes with comprehensive installation guide and all necessary hardware for quick setup.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Zap,
      title: "Smooth Operation",
      desc: "Precision-engineered components ensure effortless key turning and latch operation.",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const useCases = [
    { icon: Home, label: "Residential Homes", desc: "Perfect for main doors and interior doors" },
    { icon: Building, label: "Commercial Spaces", desc: "Ideal for offices and retail stores" },
    { icon: Package, label: "Storage Units", desc: "Secure your valuable storage areas" },
  ];

  return (
    <div className="space-y-12">
      {/* Main Description */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#111111] mb-4">
              About {product.name}
            </h3>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p className="leading-relaxed">
                {product.description ||
                  `Introducing the ${product.name}, a premium security solution designed to provide 
                  exceptional protection for your home or business. This lock represents the perfect 
                  blend of cutting-edge technology, superior craftsmanship, and elegant design.`}
              </p>
              <p className="leading-relaxed">
                Crafted with precision engineering and manufactured using state-of-the-art technology, 
                this lock undergoes rigorous quality testing to ensure it meets the highest security 
                standards. The robust construction guarantees long-lasting durability, while the sleek 
                design seamlessly complements any door style.
              </p>
              <p className="leading-relaxed">
                Whether you're securing your family home, office space, or commercial property, 
                the {product.name} delivers uncompromising security without sacrificing aesthetics. 
                Trust in a lock that's backed by decades of expertise and a commitment to excellence.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Video/Image Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-video bg-[#111111] rounded-2xl overflow-hidden relative group cursor-pointer">
            <Image
              src={product.images?.[0] || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoPlaying(true)}
                className="w-20 h-20 bg-[#C9A227] rounded-full flex items-center justify-center shadow-2xl shadow-[#C9A227]/30"
              >
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </motion.button>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm font-medium">Watch Product Video</p>
              <p className="text-white/70 text-xs">2:30 mins</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#F5F5F5] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#C9A227]">5+</p>
              <p className="text-xs text-gray-500">Years Warranty</p>
            </div>
            <div className="bg-[#F5F5F5] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#C9A227]">10K+</p>
              <p className="text-xs text-gray-500">Happy Customers</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Benefits Grid */}
      <div>
        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-[#111111] mb-6 flex items-center gap-2"
        >
          <CheckCircle className="w-6 h-6 text-[#C9A227]" />
          Key Benefits
        </motion.h4>
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex gap-4 p-6 bg-[#F5F5F5] rounded-2xl hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h5 className="font-bold text-[#111111] text-lg mb-1">
                  {benefit.title}
                </h5>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-r from-[#111111] to-[#2F2F2F] rounded-3xl p-8 md:p-10">
        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-white mb-6"
        >
          Perfect For
        </motion.h4>
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#C9A227]/50 transition-colors"
            >
              <div className="w-12 h-12 bg-[#C9A227] rounded-lg flex items-center justify-center flex-shrink-0">
                <useCase.icon className="w-6 h-6 text-[#111111]" />
              </div>
              <div>
                <h5 className="font-bold text-white">{useCase.label}</h5>
                <p className="text-gray-400 text-sm mt-1">{useCase.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Package Contents */}
      <div>
        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-[#111111] mb-6 flex items-center gap-2"
        >
          <Package className="w-6 h-6 text-[#C9A227]" />
          What's in the Box
        </motion.h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Main Lock Body", qty: "1 Piece" },
            { name: "Keys", qty: "5 Pieces" },
            { name: "Strike Plate", qty: "1 Piece" },
            { name: "Mounting Screws", qty: "1 Set" },
            { name: "Installation Guide", qty: "1 Copy" },
            { name: "Warranty Card", qty: "1 Card" },
            { name: "Key Cover", qty: "1 Piece" },
            { name: "Lubricant", qty: "1 Sachet" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-xl"
            >
              <div className="w-8 h-8 bg-[#C9A227]/10 rounded-lg flex items-center justify-center">
                <Check className="w-4 h-4 text-[#C9A227]" />
              </div>
              <div>
                <p className="font-medium text-[#111111] text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">{item.qty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-full h-full flex items-center justify-center text-white">
                <p>Video Player Placeholder</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// FEATURES TAB
// ============================================
function FeaturesTab({ product }) {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const defaultFeatures = [
    {
      icon: Shield,
      title: "Anti-Pick Protection",
      description: "Advanced pin tumbler mechanism prevents lock picking attempts",
      category: "Security",
    },
    {
      icon: Lock,
      title: "Anti-Drill Technology",
      description: "Hardened steel pins protect against drilling attacks",
      category: "Security",
    },
    {
      icon: Key,
      title: "Bump-Proof Design",
      description: "Special key profile prevents bump key attacks",
      category: "Security",
    },
    {
      icon: Zap,
      title: "Smooth Operation",
      description: "Precision-engineered for effortless key turning",
      category: "Performance",
    },
    {
      icon: Award,
      title: "Premium Materials",
      description: "Made from high-grade stainless steel and brass",
      category: "Quality",
    },
    {
      icon: Palette,
      title: "Multiple Finishes",
      description: "Available in various finishes to match your decor",
      category: "Design",
    },
    {
      icon: Wrench,
      title: "Easy Installation",
      description: "Simple DIY installation with included hardware",
      category: "Convenience",
    },
    {
      icon: Calendar,
      title: "5-Year Warranty",
      description: "Comprehensive warranty coverage for peace of mind",
      category: "Support",
    },
  ];

  const features = product.features?.length > 0
    ? product.features.map((f, i) => ({
        icon: [Shield, Lock, Key, Zap, Award, Palette, Wrench, Calendar][i % 8],
        title: f,
        description: `Premium feature ensuring optimal performance and security`,
        category: ["Security", "Quality", "Design", "Performance"][i % 4],
      }))
    : defaultFeatures;

  const categories = [...new Set(features.map((f) => f.category))];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4"
        >
          <List className="w-4 h-4" />
          Premium Features
        </motion.div>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-[#111111] mb-4"
        >
          Why Choose {product.name}?
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600"
        >
          Discover the exceptional features that make this lock stand out from the rest.
        </motion.p>
      </div>

      {/* Features by Category */}
      {categories.map((category, catIndex) => (
        <div key={category}>
          <motion.h4
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="text-lg font-bold text-[#111111] mb-4 flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-[#C9A227] rounded-full" />
            {category}
          </motion.h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features
              .filter((f) => f.category === category)
              .map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onMouseEnter={() => setHoveredFeature(`${category}-${index}`)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`relative p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                    hoveredFeature === `${category}-${index}`
                      ? "bg-[#C9A227] text-white shadow-xl shadow-[#C9A227]/30 scale-105"
                      : "bg-[#F5F5F5] hover:bg-[#EBEBEB]"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                      hoveredFeature === `${category}-${index}`
                        ? "bg-white/20"
                        : "bg-[#C9A227]/10"
                    }`}
                  >
                    <feature.icon
                      className={`w-6 h-6 transition-colors ${
                        hoveredFeature === `${category}-${index}`
                          ? "text-white"
                          : "text-[#C9A227]"
                      }`}
                    />
                  </div>
                  <h5
                    className={`font-bold text-lg mb-2 transition-colors ${
                      hoveredFeature === `${category}-${index}`
                        ? "text-white"
                        : "text-[#111111]"
                    }`}
                  >
                    {feature.title}
                  </h5>
                  <p
                    className={`text-sm transition-colors ${
                      hoveredFeature === `${category}-${index}`
                        ? "text-white/80"
                        : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: hoveredFeature === `${category}-${index}` ? 1 : 0,
                      x: hoveredFeature === `${category}-${index}` ? 0 : -10,
                    }}
                    className="absolute bottom-6 right-6"
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.div>
                </motion.div>
              ))}
          </div>
        </div>
      ))}

      {/* Comparison Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#111111] rounded-3xl p-8 md:p-10 mt-10"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold text-white mb-2">
              Compare with Other Locks
            </h4>
            <p className="text-gray-400">
              See how {product.name} stacks up against the competition
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#C9A227] text-[#111111] px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-[#C9A227]/30"
          >
            View Comparison
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================
// SPECIFICATIONS TAB
// ============================================
function SpecificationsTab({ product }) {
  const [activeSpecCategory, setActiveSpecCategory] = useState("dimensions");

  const specCategories = {
    dimensions: {
      label: "Dimensions",
      icon: Ruler,
      specs: [
        { label: "Overall Length", value: "185mm" },
        { label: "Overall Width", value: "90mm" },
        { label: "Body Thickness", value: "25mm" },
        { label: "Backset", value: "60mm / 70mm" },
        { label: "Door Thickness Range", value: "35mm - 55mm" },
        { label: "Cylinder Length", value: "60mm" },
      ],
    },
    materials: {
      label: "Materials",
      icon: Palette,
      specs: [
        { label: "Body Material", value: "Stainless Steel 304" },
        { label: "Cylinder Material", value: "Brass" },
        { label: "Spring Material", value: "Hardened Steel" },
        { label: "Finish Options", value: "Satin, Antique Brass, Chrome" },
        { label: "Coating", value: "Anti-Corrosion PVD" },
        { label: "Key Material", value: "Nickel Silver" },
      ],
    },
    technical: {
      label: "Technical",
      icon: Settings,
      specs: [
        { label: "Lock Type", value: product.category?.name || "Mortise Lock" },
        { label: "Key Type", value: "Computer Key / Dimple Key" },
        { label: "Number of Keys", value: "5 Keys" },
        { label: "Key Combinations", value: "100,000+" },
        { label: "Locking Points", value: "3 Points" },
        { label: "Deadbolt Throw", value: "20mm" },
      ],
    },
    certifications: {
      label: "Certifications",
      icon: Award,
      specs: [
        { label: "ISI Certification", value: "IS 3818:2007" },
        { label: "Quality Standard", value: "ISO 9001:2015" },
        { label: "Security Grade", value: "Grade 2" },
        { label: "Fire Rating", value: "30 Minutes" },
        { label: "Cycle Test", value: "200,000 Cycles" },
        { label: "Salt Spray Test", value: "96 Hours" },
      ],
    },
    weight: {
      label: "Weight & Packaging",
      icon: Weight,
      specs: [
        { label: "Product Weight", value: "1.2 kg" },
        { label: "Package Weight", value: "1.5 kg" },
        { label: "Package Dimensions", value: "250 x 150 x 80 mm" },
        { label: "Units per Carton", value: "10 Pieces" },
        { label: "Carton Weight", value: "16 kg" },
        { label: "Carton Dimensions", value: "520 x 320 x 280 mm" },
      ],
    },
  };

  const documents = [
    {
      name: "Product Brochure",
      type: "PDF",
      size: "2.5 MB",
      icon: FileText,
    },
    {
      name: "Installation Guide",
      type: "PDF",
      size: "1.8 MB",
      icon: Wrench,
    },
    {
      name: "Technical Datasheet",
      type: "PDF",
      size: "850 KB",
      icon: Settings,
    },
    {
      name: "Warranty Document",
      type: "PDF",
      size: "320 KB",
      icon: Shield,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Spec Categories */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(specCategories).map(([key, category]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSpecCategory(key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
              activeSpecCategory === key
                ? "bg-[#C9A227] text-[#111111] shadow-lg shadow-[#C9A227]/30"
                : "bg-[#F5F5F5] text-gray-600 hover:bg-[#EBEBEB]"
            }`}
          >
            <category.icon className="w-4 h-4" />
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Specifications Table */}
      <motion.div
        key={activeSpecCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl border border-gray-200"
      >
        <div className="bg-[#111111] px-6 py-4">
          <h4 className="text-white font-bold flex items-center gap-2">
            {(() => {
              const Icon = specCategories[activeSpecCategory].icon;
              return <Icon className="w-5 h-5 text-[#C9A227]" />;
            })()}
            {specCategories[activeSpecCategory].label} Specifications
          </h4>
        </div>
        <table className="w-full">
          <tbody>
            {specCategories[activeSpecCategory].specs.map((spec, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${
                  index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"
                } hover:bg-[#C9A227]/5 transition-colors`}
              >
                <td className="px-6 py-4 font-semibold text-[#111111] w-1/2 border-r border-gray-100">
                  {spec.label}
                </td>
                <td className="px-6 py-4 text-gray-600">{spec.value}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* All Specifications Overview */}
      <div>
        <h4 className="text-xl font-bold text-[#111111] mb-6">
          Complete Specifications
        </h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(specCategories).map(([key, category], catIndex) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-[#F5F5F5] rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-[#C9A227]" />
                </div>
                <h5 className="font-bold text-[#111111]">{category.label}</h5>
              </div>
              <div className="space-y-3">
                {category.specs.slice(0, 3).map((spec, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-medium text-[#111111]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Downloadable Documents */}
      <div className="bg-gradient-to-r from-[#F5F5F5] to-[#EBEBEB] rounded-3xl p-8">
        <h4 className="text-xl font-bold text-[#111111] mb-6 flex items-center gap-2">
          <Download className="w-6 h-6 text-[#C9A227]" />
          Downloadable Documents
        </h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {documents.map((doc, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <doc.icon className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#111111] text-sm truncate">
                  {doc.name}
                </p>
                <p className="text-xs text-gray-500">
                  {doc.type} • {doc.size}
                </p>
              </div>
              <FileDown className="w-5 h-5 text-gray-400 group-hover:text-[#C9A227] transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> Specifications are subject to change without prior notice. 
          Please contact us for the most up-to-date technical information.
        </p>
      </div>
    </div>
  );
}

// ============================================
// REVIEWS TAB
// ============================================
function ReviewsTab({ reviews, product }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 5,
    title: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calculate rating stats
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    const rating = review.rating || 5;
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating - 1]++;
    }
  });
  const totalReviews = reviews.length || 1;
  const avgRating = reviews.length
    ? (
        reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length
      ).toFixed(1)
    : "5.0";

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((r) => filterRating === 0 || r.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "highest":
          return (b.rating || 5) - (a.rating || 5);
        case "lowest":
          return (a.rating || 5) - (b.rating || 5);
        default:
          return 0;
      }
    });

  const displayReviews = showAllReviews
    ? filteredReviews
    : filteredReviews.slice(0, 5);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
    setShowReviewForm(false);
    // Reset form
    setReviewForm({
      name: "",
      email: "",
      rating: 5,
      title: "",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div id="reviews" className="space-y-10">
      {/* Success Message */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <p className="font-semibold text-green-800">Thank you for your review!</p>
              <p className="text-sm text-green-600">Your review will be published after moderation.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Rating Overview - Left Side */}
        <div className="lg:w-1/3">
          <div className="bg-gradient-to-br from-[#F5F5F5] to-[#EBEBEB] rounded-3xl p-8 sticky top-24">
            {/* Average Rating */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-6xl font-bold text-[#111111] mb-2"
              >
                {avgRating}
              </motion.div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(parseFloat(avgRating))
                        ? "fill-[#C9A227] text-[#C9A227]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-500">Based on {reviews.length} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3 mb-8">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating - 1];
                const percentage = (count / totalReviews) * 100;

                return (
                  <button
                    key={rating}
                    onClick={() =>
                      setFilterRating(filterRating === rating ? 0 : rating)
                    }
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      filterRating === rating
                        ? "bg-[#C9A227]/10"
                        : "hover:bg-white"
                    }`}
                  >
                    <span className="text-sm text-gray-600 w-3">{rating}</span>
                    <Star className="w-4 h-4 text-[#C9A227] fill-current" />
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, delay: 0.1 * (5 - rating) }}
                        className="h-full bg-gradient-to-r from-[#C9A227] to-[#A68520] rounded-full"
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8 text-right">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Clear Filter */}
            {filterRating > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setFilterRating(0)}
                className="w-full text-sm text-[#C9A227] font-medium mb-4"
              >
                Clear filter
              </motion.button>
            )}

            {/* Write Review Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowReviewForm(true)}
              className="w-full bg-[#C9A227] text-[#111111] py-4 rounded-xl font-bold hover:bg-[#A68520] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/30"
            >
              <MessageSquare className="w-5 h-5" />
              Write a Review
            </motion.button>

            {/* Review Guidelines */}
            <div className="mt-6 p-4 bg-white rounded-xl">
              <h5 className="font-semibold text-[#111111] text-sm mb-2">
                Review Guidelines
              </h5>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Be honest and helpful</li>
                <li>• Focus on product features</li>
                <li>• Avoid inappropriate content</li>
                <li>• Share your genuine experience</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews List - Right Side */}
        <div className="lg:w-2/3">
          {/* Header with Sort & Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-2xl font-bold text-[#111111]">
              Customer Reviews
              {filterRating > 0 && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (Showing {filterRating}-star reviews)
                </span>
              )}
            </h3>
            <div className="flex items-center gap-3">
              <SortDesc className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F5F5F5] border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#C9A227] cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
          </div>

          {/* Reviews */}
          {filteredReviews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-[#F5F5F5] rounded-3xl"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <MessageSquare className="w-10 h-10 text-gray-300" />
              </div>
              <h4 className="text-xl font-bold text-[#111111] mb-2">
                {reviews.length === 0 ? "No Reviews Yet" : "No Matching Reviews"}
              </h4>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {reviews.length === 0
                  ? "Be the first to share your experience with this product!"
                  : "Try adjusting your filter to see more reviews."}
              </p>
              {reviews.length === 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowReviewForm(true)}
                  className="bg-[#C9A227] text-[#111111] px-8 py-3 rounded-xl font-bold"
                >
                  Write the First Review
                </motion.button>
              )}
            </motion.div>
          ) : (
            <div className="space-y-6">
              {displayReviews.map((review, index) => (
                <ReviewCard key={review._id || index} review={review} index={index} />
              ))}

              {/* Load More Button */}
              {filteredReviews.length > 5 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="w-full py-4 border-2 border-[#111111] text-[#111111] rounded-xl font-semibold hover:bg-[#111111] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  {showAllReviews
                    ? "Show Less"
                    : `View All ${filteredReviews.length} Reviews`}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      showAllReviews ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowReviewForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Form Header */}
              <div className="bg-[#111111] p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Write a Review</h3>
                    <p className="text-gray-400 text-sm mt-1">{product.name}</p>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmitReview} className="p-6 space-y-6">
                {/* Rating */}
                <div>
                  <label className="block font-semibold text-[#111111] mb-3">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setReviewForm({ ...reviewForm, rating: star })
                        }
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= reviewForm.rating
                              ? "fill-[#C9A227] text-[#C9A227]"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-gray-500">
                      {reviewForm.rating === 5
                        ? "Excellent!"
                        : reviewForm.rating === 4
                        ? "Very Good"
                        : reviewForm.rating === 3
                        ? "Good"
                        : reviewForm.rating === 2
                        ? "Fair"
                        : "Poor"}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block font-semibold text-[#111111] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-semibold text-[#111111] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={reviewForm.email}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your email will not be published
                  </p>
                </div>

                {/* Review Title */}
                <div>
                  <label className="block font-semibold text-[#111111] mb-2">
                    Review Title
                  </label>
                  <input
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, title: e.target.value })
                    }
                    placeholder="Summarize your experience"
                    className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all"
                  />
                </div>

                {/* Review Message */}
                <div>
                  <label className="block font-semibold text-[#111111] mb-2">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewForm.message}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, message: e.target.value })
                    }
                    placeholder="Share your experience with this product..."
                    className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 20 characters
                  </p>
                </div>

                {/* Upload Photos */}
                <div>
                  <label className="block font-semibold text-[#111111] mb-2">
                    Add Photos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#C9A227] transition-colors cursor-pointer">
                    <Camera className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG up to 5MB (Max 3 images)
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 py-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    className="flex-1 bg-[#C9A227] text-[#111111] py-4 rounded-xl font-bold hover:bg-[#A68520] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Review
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Individual Review Card Component
function ReviewCard({ review, index }) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [showFullReview, setShowFullReview] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(Math.floor(Math.random() * 20));

  const isLongReview = review.message?.length > 300;
  const displayMessage =
    isLongReview && !showFullReview
      ? `${review.message.substring(0, 300)}...`
      : review.message;

  const handleHelpful = () => {
    if (!isHelpful) {
      setHelpfulCount(helpfulCount + 1);
    } else {
      setHelpfulCount(helpfulCount - 1);
    }
    setIsHelpful(!isHelpful);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-[#F5F5F5] rounded-2xl p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 bg-gradient-to-br from-[#C9A227] to-[#A68520] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
          <span className="text-xl font-bold text-white">
            {review.name?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h4 className="font-bold text-[#111111] text-lg">{review.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (review.rating || 5)
                          ? "fill-[#C9A227] text-[#C9A227]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified Buyer
                </span>
              </div>
            </div>
            <span className="text-sm text-gray-400">
              {new Date(review.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Review Content */}
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">{displayMessage}</p>

            {isLongReview && (
              <button
                onClick={() => setShowFullReview(!showFullReview)}
                className="text-[#C9A227] font-medium text-sm hover:underline flex items-center gap-1"
              >
                {showFullReview ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleHelpful}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isHelpful ? "text-[#C9A227]" : "text-gray-500 hover:text-[#C9A227]"
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${isHelpful ? "fill-current" : ""}`} />
              Helpful ({helpfulCount})
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
              <Flag className="w-4 h-4" />
              Report
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// FAQ TAB
// ============================================
function FAQTab({ product }) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: `What type of door is the ${product.name} suitable for?`,
      answer: `The ${product.name} is designed to be versatile and can be installed on most standard wooden, metal, and UPVC doors. It's suitable for both residential and commercial applications. The lock accommodates door thicknesses ranging from 35mm to 55mm. For specific compatibility questions, please contact our support team.`,
      category: "Compatibility",
    },
    {
      question: "How do I install this lock?",
      answer:
        "Installation is straightforward with the included hardware and detailed instruction manual. Basic tools like a screwdriver and drill are required. The average installation time is 30-45 minutes. If you're not comfortable with DIY installation, we recommend hiring a professional locksmith. We also offer installation services in select cities.",
      category: "Installation",
    },
    {
      question: "What is the warranty period?",
      answer:
        "This product comes with a comprehensive 5-year manufacturer warranty covering any defects in materials or workmanship. The warranty includes free replacement of defective parts. Normal wear and tear, misuse, or unauthorized modifications are not covered. Keep your purchase receipt for warranty claims.",
      category: "Warranty",
    },
    {
      question: "Can I get duplicate keys?",
      answer:
        "Yes, duplicate keys can be obtained through authorized dealers only. For security reasons, you'll need to provide the key card that came with your lock and valid identification. Each lock comes with 5 keys. Additional keys can be ordered for a nominal fee. We recommend keeping at least one spare key in a secure location.",
      category: "Keys",
    },
    {
      question: "What makes this lock secure?",
      answer:
        "This lock features multiple security measures including anti-pick pins, anti-drill protection, bump-proof design, and hardened steel components. The precision-engineered cylinder with over 100,000 possible key combinations makes it virtually impossible to duplicate keys without authorization. It meets IS 3818:2007 security standards.",
      category: "Security",
    },
    {
      question: "How do I maintain the lock?",
      answer:
        "Regular maintenance ensures optimal performance. Lubricate the lock cylinder every 6 months with graphite powder (included with purchase). Avoid using oil-based lubricants as they can attract dust and cause jamming. Clean the exterior with a soft, damp cloth. Periodically check and tighten all screws.",
      category: "Maintenance",
    },
    {
      question: "What if I lose all my keys?",
      answer:
        "If you lose all keys, contact our customer support immediately with your key card number and proof of purchase. We can arrange for a replacement cylinder with new keys. This service may involve additional charges. To prevent lockouts, we recommend keeping a spare key with a trusted person or in a secure location.",
      category: "Keys",
    },
    {
      question: "Does this lock work in all weather conditions?",
      answer:
        "Yes, the lock is designed to withstand various weather conditions. The anti-corrosion PVD coating protects against rust and deterioration. However, for exterior doors exposed to extreme weather, we recommend additional protective measures like a door canopy. The lock has passed 96-hour salt spray testing.",
      category: "Durability",
    },
    {
      question: "Can I return the product if it doesn't fit?",
      answer:
        "We offer a 7-day return policy for unused products in original packaging. Please check the specifications carefully before ordering. If you're unsure about compatibility, contact our support team before purchase. Return shipping charges may apply. Opened or installed products cannot be returned unless defective.",
      category: "Returns",
    },
    {
      question: "Do you offer bulk discounts?",
      answer:
        "Yes, we offer attractive discounts for bulk orders. Contractors, builders, and businesses can benefit from our special pricing. Contact our sales team with your requirements for a customized quote. Minimum order quantities apply for bulk discounts. We also offer credit facilities for regular business customers.",
      category: "Pricing",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-4"
        >
          <HelpCircle className="w-4 h-4" />
          Frequently Asked Questions
        </motion.div>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-[#111111] mb-4"
        >
          Got Questions? We've Got Answers
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600"
        >
          Find answers to common questions about {product.name}
        </motion.p>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-xl mx-auto"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all"
          />
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSearchQuery(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              searchQuery === category
                ? "bg-[#C9A227] text-[#111111]"
                : "bg-[#F5F5F5] text-gray-600 hover:bg-[#EBEBEB]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredFaqs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-[#F5F5F5] rounded-2xl"
          >
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No matching questions found</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#C9A227] font-medium mt-2"
            >
              Clear search
            </button>
          </motion.div>
        ) : (
          filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#F5F5F5] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? -1 : index)
                }
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#EBEBEB] transition-colors"
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
                    <div className="px-6 pb-6 pt-0">
                      <div className="pl-12 border-l-2 border-[#C9A227]/30 ml-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                          <span className="text-xs bg-[#C9A227]/10 text-[#C9A227] px-3 py-1 rounded-full font-medium">
                            {faq.category}
                          </span>
                          <button className="text-sm text-gray-500 hover:text-[#C9A227] transition-colors flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            Helpful
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#111111] to-[#2F2F2F] rounded-3xl p-8 md:p-10 text-center mt-10"
      >
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-[#C9A227] rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-[#111111]" />
          </div>
          <h4 className="text-2xl font-bold text-white mb-3">
            Still Have Questions?
          </h4>
          <p className="text-gray-400 mb-6">
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="tel:+919876543210"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-[#C9A227] text-[#111111] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/30"
            >
              <span>Call Support</span>
            </motion.a>
            <motion.a
              href="mailto:support@lockshop.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-[#111111] transition-colors"
            >
              <span>Email Us</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}