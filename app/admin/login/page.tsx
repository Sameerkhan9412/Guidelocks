"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/admin/dashboard");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border p-8 w-96">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}
