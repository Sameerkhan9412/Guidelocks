import Link from "next/link";

interface LockProps {
  lock: any;
}

export default function LockCard({ lock }: LockProps) {

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">

      <img
        src={lock.images?.[0]}
        className="h-56 w-full object-cover"
      />

      <div className="p-4">

        <h3 className="font-semibold text-lg">
          {lock.name}
        </h3>

        <Link
          href={`/locks/${lock.slug}`}
          className="text-blue-500 mt-2 block"
        >
          View Details →
        </Link>

      </div>

    </div>
  );
}