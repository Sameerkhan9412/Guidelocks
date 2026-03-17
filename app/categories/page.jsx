// app/categories/page.jsx

import { Suspense } from "react";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import Lock from "@/models/Lock";
import { connectDB } from "@/lib/db";
import CategoriesPageClient from "../../components/categories/CategoriesPageClient";

async function getCategoriesData() {
  await connectDB();

  const [categories, subCategories, products] = await Promise.all([
    Category.find({}).sort({ name: 1 }).lean(),
    SubCategory.find({}).populate("category").lean(),
    Lock.find({}).populate("category").populate("subcategory").sort({ createdAt: -1 }).lean(),
  ]);

  return {
    categories: JSON.parse(JSON.stringify(categories)),
    subCategories: JSON.parse(JSON.stringify(subCategories)),
    products: JSON.parse(JSON.stringify(products)),
  };
}

export default async function CategoriesPage() {
  const { categories, subCategories, products } = await getCategoriesData();

  return (
    <Suspense fallback={<CategoriesLoading />}>
      <CategoriesPageClient
        categories={categories}
        subCategories={subCategories}
        allProducts={products}
      />
    </Suspense>
  );
}

function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[#C9A227] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600">Loading categories...</p>
      </div>
    </div>
  );
}