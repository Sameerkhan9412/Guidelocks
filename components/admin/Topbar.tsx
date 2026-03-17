"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {

  const router = useRouter();

  const logout = async () => {

    try {

      await fetch("/api/admin/logout", {
        method: "POST",
      });

      router.push("/admin/login");
      router.refresh();

    } catch (error) {
      console.log("Logout failed", error);
    }

  };

  return (

    <div className="h-16 bg-white border-b flex items-center justify-between px-6">

      {/* Left */}
      <h1 className="text-xl font-semibold">
        Admin Dashboard
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">

        <div className="text-sm text-gray-500">
          Admin
        </div>

        <button
          onClick={logout}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Logout
        </button>

      </div>

    </div>

  );

}