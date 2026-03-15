import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-10 py-4 flex justify-between items-center">

      <div className="text-2xl font-bold">
        LOCKSAFE
      </div>

      <div className="flex gap-8">

        <Link href="/">Home</Link>
        <Link href="/locks">Locks</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/contact">Contact</Link>

      </div>

    </nav>
  );
}