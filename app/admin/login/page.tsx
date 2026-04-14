"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">

        {/* Logo / Header */}
        <div className="text-center mb-8">

          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
            <ShieldCheck className="text-black" size={28} />
          </div>

          <h2 className="text-2xl font-bold text-zinc-900">
            Guide<span className="text-yellow-500">Lock</span>
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            Admin Panel Login
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4 relative">
          <Mail className="absolute left-3 top-3 text-zinc-400" size={18} />

          <input
            type="email"
            placeholder="Enter email"
            className="w-full border rounded-xl text-black pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <Lock className="absolute left-3 top-3 text-zinc-400" size={18} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full border rounded-xl pl-10 pr-10 py-3 outline-none text-black focus:ring-2 focus:ring-yellow-400 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-zinc-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-yellow-400 text-white font-semibold hover:bg-zinc-800 transition disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          Secure Admin Access • GuideLock CMS
        </p>

      </div>
    </div>
  );
}