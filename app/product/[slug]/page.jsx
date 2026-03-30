// app/product/[slug]/page.jsx

import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Lock from "@/models/Lock";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import Review from "@/models/Review";
import ProductDetailClient from "@/components/product/ProductDetailClient";

async function getProductData(slug) {
  await connectDB();

  const product = await Lock.findOne({ slug })
    .populate("category")
    .populate("subcategory")
    .lean();

  if (!product) {
    return null;
  }

  // Get related products from same category
  const relatedProducts = await Lock.find({
    category: product.category?._id,
    _id: { $ne: product._id },
  })
    .populate("category")
    .limit(4)
    .lean();

  // Get all products from same subcategory
  const similarProducts = await Lock.find({
    subcategory: product.subcategory?._id,
    _id: { $ne: product._id },
  })
    .populate("category")
    .limit(4)
    .lean();

  // Get reviews
  const reviews = await Review.find({}).sort({ createdAt: -1 }).limit(5).lean();

  return {
    product: JSON.parse(JSON.stringify(product)),
    relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
    similarProducts: JSON.parse(JSON.stringify(similarProducts)),
    reviews: JSON.parse(JSON.stringify(reviews)),
  };
}

// ✅ Fixed: Await params before accessing properties
export async function generateMetadata({ params }) {
  const { slug } = await params; // Await params first
  
  await connectDB();
  const product = await Lock.findOne({ slug }).lean();

  if (!product) {
    return {
      title: "Product Not Found | GuideLock",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | GuideLock`,
    description:
      product.description ||
      `Premium ${product.name} - High quality security solution from GuideLock`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

// ✅ Fixed: Await params before accessing properties
export default async function ProductPage({ params }) {
  const { slug } = await params; // Await params first
  
  const data = await getProductData(slug);

  if (!data) {
    notFound();
  }

  return (
    <ProductDetailClient
      product={data.product}
      relatedProducts={data.relatedProducts}
      similarProducts={data.similarProducts}
      reviews={data.reviews}
    />
  );
}