// components/categories/CategoriesPageClient.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CategorySidebar from "./CategorySidebar";
import ProductGrid from "./ProductGrid";
import MobileFilterDrawer from "./MobileFilterDrawer";
import {
  Filter,
  X,
  Grid3X3,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Search,
  ChevronRight,
  RefreshCw,
  Package,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export default function CategoriesPageClient({
  categories,
  subCategories,
  allProducts,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    searchParams.get("subcategory") || "all"
  );
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get subcategories for selected category
  const filteredSubCategories = useMemo(() => {
    if (selectedCategory === "all") return [];
    return subCategories.filter(
      (sub) =>
        sub.category?._id === selectedCategory ||
        sub.category === selectedCategory
    );
  }, [selectedCategory, subCategories]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    setIsLoading(true);

    let result = [...allProducts];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category?._id === selectedCategory ||
          product.category === selectedCategory
      );
    }

    // Filter by subcategory
    if (selectedSubCategory !== "all") {
      result = result.filter(
        (product) =>
          product.subcategory?._id === selectedSubCategory ||
          product.subcategory === selectedSubCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.features?.some((f) => f.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "name-asc":
        result.sort((a, b) => a.name?.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name?.localeCompare(a.name));
        break;
    }

    setTimeout(() => setIsLoading(false), 300);
    return result;
  }, [selectedCategory, selectedSubCategory, searchQuery, sortBy, allProducts]);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedSubCategory !== "all")
      params.set("subcategory", selectedSubCategory);

    const newUrl = params.toString()
      ? `/categories?${params.toString()}`
      : "/categories";

    router.push(newUrl, { scroll: false });
  }, [selectedCategory, selectedSubCategory, router]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory("all");
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSubCategory("all");
    setSearchQuery("");
    setSortBy("newest");
  };

  // Get category name
  const getCategoryName = (id) => {
    if (id === "all") return "All Products";
    const cat = categories.find((c) => c._id === id);
    return cat?.name || "All Products";
  };

  // Get subcategory name
  const getSubCategoryName = (id) => {
    if (id === "all") return "";
    const subCat = subCategories.find((s) => s._id === id);
    return subCat?.name || "";
  };

  // Active filters count
  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedSubCategory !== "all",
    searchQuery !== "",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />

      {/* Page Header */}
      <section className="bg-[#111111] pt-8 pb-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A227' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-64 h-64 border border-[#C9A227]/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-40 h-40 border border-[#C9A227]/10 rounded-full"
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-400 mb-6"
          >
            <Link href="/" className="hover:text-[#C9A227] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A227]">Categories</span>
            {selectedCategory !== "all" && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">
                  {getCategoryName(selectedCategory)}
                </span>
              </>
            )}
            {selectedSubCategory !== "all" && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">
                  {getSubCategoryName(selectedSubCategory)}
                </span>
              </>
            )}
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {selectedCategory === "all" ? (
                <>
                  Browse <span className="text-[#C9A227]">Categories</span>
                </>
              ) : (
                <>
                  <span className="text-[#C9A227]">
                    {getCategoryName(selectedCategory)}
                  </span>
                </>
              )}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Explore our extensive collection of premium security solutions.
              Filter by category to find the perfect lock for your needs.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-6 mt-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#C9A227] rounded-full" />
              <span className="text-gray-300">
                <span className="text-white font-bold">{categories.length}</span>{" "}
                Categories
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#C9A227] rounded-full" />
              <span className="text-gray-300">
                <span className="text-white font-bold">{allProducts.length}</span>{" "}
                Products
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#C9A227] rounded-full" />
              <span className="text-gray-300">
                <span className="text-white font-bold">
                  {filteredProducts.length}
                </span>{" "}
                Results
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <CategorySidebar
                  categories={categories}
                  subCategories={subCategories}
                  selectedCategory={selectedCategory}
                  selectedSubCategory={selectedSubCategory}
                  onCategoryChange={handleCategoryChange}
                  onSubCategoryChange={setSelectedSubCategory}
                  productCounts={allProducts}
                />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Toolbar */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm p-4 mb-6"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 bg-[#111111] text-white px-4 py-2.5 rounded-xl font-medium"
                  >
                    <Filter className="w-5 h-5" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="bg-[#C9A227] text-[#111111] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>

                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F5] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Sort & View Options */}
                  <div className="flex items-center gap-4 ml-auto">
                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-gray-500 hidden sm:block" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-[#F5F5F5] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227] cursor-pointer"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="hidden md:flex items-center gap-1 bg-[#F5F5F5] p-1 rounded-lg">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === "grid"
                            ? "bg-[#C9A227] text-[#111111]"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("grid-sm")}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === "grid-sm"
                            ? "bg-[#C9A227] text-[#111111]"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === "list"
                            ? "bg-[#C9A227] text-[#111111]"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                <AnimatePresence>
                  {activeFiltersCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100"
                    >
                      <span className="text-sm text-gray-500">Active Filters:</span>

                      {selectedCategory !== "all" && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => handleCategoryChange("all")}
                          className="flex items-center gap-1 bg-[#C9A227]/10 text-[#C9A227] px-3 py-1.5 rounded-full text-sm font-medium hover:bg-[#C9A227]/20 transition-colors"
                        >
                          Category: {getCategoryName(selectedCategory)}
                          <X className="w-3 h-3" />
                        </motion.button>
                      )}

                      {selectedSubCategory !== "all" && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => setSelectedSubCategory("all")}
                          className="flex items-center gap-1 bg-[#C9A227]/10 text-[#C9A227] px-3 py-1.5 rounded-full text-sm font-medium hover:bg-[#C9A227]/20 transition-colors"
                        >
                          Sub: {getSubCategoryName(selectedSubCategory)}
                          <X className="w-3 h-3" />
                        </motion.button>
                      )}

                      {searchQuery && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => setSearchQuery("")}
                          className="flex items-center gap-1 bg-[#C9A227]/10 text-[#C9A227] px-3 py-1.5 rounded-full text-sm font-medium hover:bg-[#C9A227]/20 transition-colors"
                        >
                          Search: "{searchQuery}"
                          <X className="w-3 h-3" />
                        </motion.button>
                      )}

                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={clearFilters}
                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 px-3 py-1.5 text-sm font-medium transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Clear All
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Loading State */}
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center py-20"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-[#C9A227] border-t-transparent rounded-full animate-spin" />
                      <p className="text-gray-500">Loading products...</p>
                    </div>
                  </motion.div>
                ) : filteredProducts.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-2xl shadow-sm p-12 text-center"
                  >
                    <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-[#111111] mb-2">
                      No Products Found
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      We couldn't find any products matching your current filters.
                      Try adjusting your search or filter criteria.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearFilters}
                        className="bg-[#C9A227] text-[#111111] px-6 py-3 rounded-xl font-semibold"
                      >
                        Clear All Filters
                      </motion.button>
                      <Link href="/products">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="border-2 border-[#111111] text-[#111111] px-6 py-3 rounded-xl font-semibold"
                        >
                          View All Products
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductGrid products={filteredProducts} viewMode={viewMode} />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        categories={categories}
        subCategories={filteredSubCategories}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        onCategoryChange={handleCategoryChange}
        onSubCategoryChange={setSelectedSubCategory}
        onClearFilters={clearFilters}
        productCounts={allProducts}
        resultsCount={filteredProducts.length}
      />

      <Footer />
    </div>
  );
}