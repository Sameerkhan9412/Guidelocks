import HeroSection from "@/components/HeroSection";
import LockCard from "@/components/LockCard";
import CategoryCard from "@/components/CategoryCard";
import ReviewCard from "@/components/ReviewCard";

import { connectDB } from "@/lib/db";
import Lock from "@/models/Lock";
import Category from "@/models/Category";
import Review from "@/models/Review";

export default async function HomePage() {

  await connectDB();

  const locks = await Lock.find();
  const categories = await Category.find().lean();
  const reviews = await Review.find().lean();

  const newLocks = locks.filter((l: any) => l.isNew);
  const latestLocks = locks.filter((l: any) => l.isLatest);

  return (
    <main>

      {/* HERO */}
      <HeroSection />

      {/* CATEGORIES */}
      <section className="py-16 px-10">

        <h2 className="text-3xl font-bold text-center mb-10">
          Explore Categories
        </h2>

        <div className="grid grid-cols-4 gap-6">

          {categories.map((cat: any) => (
            <CategoryCard key={cat._id.toString()} category={cat} />
          ))}

        </div>

      </section>


      {/* NEW LOCKS */}
      <section className="py-16 px-10 bg-gray-100">

        <h2 className="text-3xl font-bold text-center mb-10">
          New Locks
        </h2>

        <div className="grid grid-cols-4 gap-6">

          {newLocks.map((lock: any) => (
            <LockCard key={lock._id.toString()} lock={lock} />
          ))}

        </div>

      </section>


      {/* LATEST LOCKS */}
      <section className="py-16 px-10">

        <h2 className="text-3xl font-bold text-center mb-10">
          Latest Locks
        </h2>

        <div className="grid grid-cols-4 gap-6">

          {latestLocks.map((lock: any) => (
            <LockCard key={lock._id.toString()} lock={lock} />
          ))}

        </div>

      </section>


      {/* REVIEWS */}
      <section className="py-16 px-10 bg-gray-50">

        <h2 className="text-3xl font-bold text-center mb-10">
          Client Reviews
        </h2>

        <div className="grid grid-cols-3 gap-6">

          {reviews.map((review: any) => (
            <ReviewCard key={review._id.toString()} review={review} />
          ))}

        </div>

      </section>

    </main>
  );
}