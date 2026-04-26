import Link from "next/link";
import {
  Package,
  PlusCircle,
  Star,
  FolderKanban,
  Layers3,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const cards = [
    {
      title: "Add Lock",
      desc: "Create a new product with images, features and category.",
      href: "/admin/locks",
      icon: PlusCircle,
      color:
        "from-yellow-400 to-yellow-600 text-black",
    },
    {
      title: "Manage Locks",
      desc: "Edit, update and delete all lock products.",
      href: "/admin/locks",
      icon: Package,
      color:
        "from-blue-500 to-indigo-600 text-white",
    },
    {
      title: "Manage Categories",
      desc: "Control product categories and images.",
      href: "/admin/categories",
      icon: FolderKanban,
      color:
        "from-emerald-500 to-green-600 text-white",
    },
    {
      title: "SubCategories",
      desc: "Organize locks into detailed groups.",
      href: "/admin/subcategories",
      icon: Layers3,
      color:
        "from-purple-500 to-fuchsia-600 text-white",
    },
    {
      title: "Manage Reviews",
      desc: "Add and manage customer feedback.",
      href: "/admin/reviews",
      icon: Star,
      color:
        "from-rose-500 to-pink-600 text-white",
    },
  ];

  return (
    <div className="p-6 lg:p-10 bg-white min-h-screen">

      {/* Header */}
      <div className="mb-10">

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
            <ShieldCheck className="text-black" size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              Admin Dashboard
            </h1>

            <p className="text-sm text-zinc-500 mt-1">
              Welcome back to Vinayak International control panel
            </p>
          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">

        <div className="rounded-3xl bg-white border p-5 shadow-sm">
          <p className="text-sm text-zinc-500">
            Total Sections
          </p>

          <h3 className="text-3xl font-bold mt-2">
            5
          </h3>

          <div className="mt-3 flex items-center gap-2 text-emerald-600 text-sm">
            <TrendingUp size={16} />
            Active Modules
          </div>
        </div>

        <div className="rounded-3xl bg-white border p-5 shadow-sm">
          <p className="text-sm text-zinc-500">
            Store Status
          </p>

          <h3 className="text-3xl font-bold mt-2">
            Live
          </h3>

          <div className="mt-3 text-sm text-zinc-500">
            Website running normally
          </div>
        </div>

        <div className="rounded-3xl bg-white border p-5 shadow-sm">
          <p className="text-sm text-zinc-500">
            Security
          </p>

          <h3 className="text-3xl font-bold mt-2">
            Protected
          </h3>

          <div className="mt-3 text-sm text-zinc-500">
            Admin routes secured
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-zinc-900">
          Quick Actions
        </h2>

        <p className="text-sm text-zinc-500 mt-1">
          Manage your website modules quickly
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-3xl bg-white border p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-md`}
              >
                <Icon size={24} />
              </div>

              <h3 className="text-xl font-bold text-zinc-900 mt-5">
                {card.title}
              </h3>

              <p className="text-sm text-zinc-500 mt-2 leading-6">
                {card.desc}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-zinc-800">
                Open Section

                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}

      </div>

      {/* Bottom Banner */}
      <div className="mt-10 rounded-3xl bg-gradient-to-r from-black via-zinc-900 to-black text-white p-6 lg:p-8">

        <h3 className="text-2xl font-bold">
          Vinayak International CMS Panel
        </h3>

        <p className="text-zinc-300 mt-2 max-w-2xl">
          Manage locks, categories, reviews and website
          content with a premium dashboard experience.
        </p>

      </div>

    </div>
  );
}