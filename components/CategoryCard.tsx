import Link from "next/link";

export default function CategoryCard({ category }: any) {

  return (
    <Link
      href={`/category/${category.slug}`}
      className="border rounded-lg p-6 text-center hover:shadow-lg"
    >

      <h3 className="text-xl font-semibold">
        {category.name}
      </h3>

    </Link>
  );
}