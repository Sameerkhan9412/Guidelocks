import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-10">Lock Admin</h2>

      <nav className="flex flex-col gap-4">
        <Link href="/admin/dashboard">Dashboard</Link>

        <Link href="/admin/categories">Categories</Link>

        <Link href="/admin/subcategories">SubCategories</Link>

        <Link href="/admin/locks">Locks</Link>

        <Link href="/admin/reviews">Reviews</Link>
      </nav>
    </div>
  );
}
