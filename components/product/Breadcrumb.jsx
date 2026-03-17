// components/product/Breadcrumb.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ product }) {
  const breadcrumbItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Categories", href: "/categories" },
    {
      label: product.category?.name || "Products",
      href: `/categories?category=${product.category?._id}`,
    },
  ];

  if (product.subcategory?.name) {
    breadcrumbItems.push({
      label: product.subcategory.name,
      href: `/categories?category=${product.category?._id}&subcategory=${product.subcategory?._id}`,
    });
  }

  breadcrumbItems.push({
    label: product.name,
    href: null,
    current: true,
  });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center flex-wrap gap-2 text-sm"
    >
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-500" />}
          {item.current ? (
            <span className="text-[#C9A227] font-medium truncate max-w-[200px]">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.label}</span>
            </Link>
          )}
        </div>
      ))}
    </motion.nav>
  );
}