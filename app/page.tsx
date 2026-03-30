// app/page.jsx

import { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import NewProducts from "@/components/home/NewProducts";
import AboutUs from "@/components/home/AboutUs";
import PromoBanner from "@/components/home/PromoBanner";
import Brands from "@/components/home/Brands";
import Reviews from "@/components/home/Reviews";
import Category from "@/models/Category";
import Lock from "@/models/Lock";
import Review from "@/models/Review";
import { connectDB } from "@/lib/db";

async function getHomeData() {
  await connectDB();
  
  const [categories, locks, reviews] = await Promise.all([
    Category.find({}).lean(),
    Lock.find({}).populate("category").sort({ createdAt: -1 }).limit(8).lean(),
    Review.find({}).sort({ createdAt: -1 }).limit(6).lean(),
  ]);

  return {
    categories: JSON.parse(JSON.stringify(categories)),
    locks: JSON.parse(JSON.stringify(locks)),
    reviews: JSON.parse(JSON.stringify(reviews)),
  };
}

export default async function HomePage() {
  const { categories, locks, reviews } = await getHomeData();

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <HeroSection />
      <Banner />
      <Categories categories={categories} />
      <NewProducts products={locks} />
      <AboutUs />
      <PromoBanner />
      {/* <Brands /> */}
      <Reviews reviews={reviews} />
    </main>
  );
}