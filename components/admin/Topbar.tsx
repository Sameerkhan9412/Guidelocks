"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  LogOut,
  LayoutDashboard,
  FolderKanban,
  Package,
  Star,
  Search,
  Bell,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function Topbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

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

  const getPageTitle = () => {
    if (pathname.includes("/dashboard")) return "Dashboard";
    if (pathname.includes("/categories")) return "Categories";
    if (pathname.includes("/subcategories")) return "Subcategories";
    if (pathname.includes("/locks")) return "Locks";
    if (pathname.includes("/reviews")) return "Reviews";
    return "Admin Panel";
  };

  const getPageIcon = () => {
    if (pathname.includes("/dashboard"))
      return <LayoutDashboard size={18} />;
    if (pathname.includes("/categories"))
      return <FolderKanban size={18} />;
    if (pathname.includes("/locks"))
      return <Package size={18} />;
    if (pathname.includes("/reviews"))
      return <Star size={18} />;

    return <ShieldCheck size={18} />;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black text-white backdrop-blur-xl shadow-xl">

      <div className="h-20 px-6 lg:px-10 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-5">

          {/* Logo */}
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <ShieldCheck className="text-black" size={24} />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">
              Guide<span className="text-yellow-400">Lock</span>
            </h1>

            <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
              {getPageIcon()}
              <span>{getPageTitle()}</span>
              <ChevronRight size={14} />
              <span className="text-zinc-300">Admin</span>
            </div>
          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-4">

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-4 h-11 rounded-xl min-w-[260px]">
            <Search size={16} className="text-zinc-400" />
            <input
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full placeholder:text-zinc-500"
            />
          </div>

          {/* Notifications */}
          <button className="relative h-11 w-11 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center">
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-yellow-400"></span>
          </button>

          {/* Admin Badge */}
          <div className="hidden sm:flex items-center gap-3 px-4 h-11 rounded-xl bg-white/5 border border-white/10">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-bold flex items-center justify-center text-sm">
              A
            </div>

            <div className="leading-tight">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-zinc-400">Super User</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            disabled={loading}
            className="h-11 px-4 md:px-5 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition flex items-center gap-2 disabled:opacity-70"
          >
            <LogOut size={16} />
            {loading ? "Logging out..." : "Logout"}
          </button>

        </div>
      </div>
    </header>
  );
}