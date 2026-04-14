"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Layers3,
  Package,
  Star,
  ShieldCheck,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
    const [loading, setLoading] = useState(false);

      const router = useRouter();
  

  const menu = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: FolderKanban,
    },
    // {
    //   name: "SubCategories",
    //   href: "/admin/subcategories",
    //   icon: Layers3,
    // },
    {
      name: "Locks",
      href: "/admin/locks",
      icon: Package,
    },
    {
      name: "Reviews",
      href: "/admin/reviews",
      icon: Star,
    },

  ];

  const logout = async () => {
    try {
      setLoading(true);

      await fetch("/api/admin/logout", {
        method: "POST",
      });

      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.log("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="h-screen w-72 bg-gradient-to-b from-zinc-950 via-black to-zinc-900 text-white border-r border-white/10 shadow-2xl sticky top-0">

      {/* Top Logo */}
      {/* <div className="px-6 py-7 border-b border-white/10">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <ShieldCheck className="text-black" size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-wide">
              Guide<span className="text-yellow-400">Lock</span>
            </h2>

            <p className="text-xs text-zinc-400">
              Admin Control Panel
            </p>
          </div>

        </div>

      </div> */}

      {/* Menu */}
      <div className="p-4">

        <p className="px-3 mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
          Navigation
        </p>

        <nav className="flex flex-col gap-2">

          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 border
                  
                  ${
                    active
                      ? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-500/20"
                      : "bg-white/5 border-white/5 text-zinc-200 hover:bg-white/10 hover:border-white/10"
                  }
                `}
              >
                <div className="flex items-center gap-3">

                  <Icon size={18} />

                  <span className="font-medium text-sm">
                    {item.name}
                  </span>

                </div>

                <ChevronRight
                  size={16}
                  className={`transition ${
                    active
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />

              </Link>
            );
          })}

        </nav>
         <button
            onClick={logout}
            disabled={loading}
            className="h-11 px-4 md:px-5 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition flex items-center gap-2 disabled:opacity-70 mt-4"
          >
            <LogOut size={16} />
            {loading ? "Logging out..." : "Logout"}
          </button>

      </div>

      {/* Bottom Card */}
      <div className="absolute bottom-5 left-4 right-4">

        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">

          <p className="text-sm font-semibold text-white">
            GuideLock CMS
          </p>

          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Manage locks, categories, reviews and website
            content from one dashboard.
          </p>

          <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-3/4 bg-yellow-400 rounded-full"></div>
          </div>

        </div>

      </div>

    </aside>
  );
}