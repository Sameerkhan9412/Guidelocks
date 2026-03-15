"use client";

import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: Category;
}

export default function SubCategoriesPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubCategories] = useState<SubCategory[]>([]);

  const loadData = async () => {
    const catRes = await fetch("/api/categories");
    const catData = await catRes.json();

    const subRes = await fetch("/api/subcategories");
    const subData = await subRes.json();

    setCategories(catData.data);
    setSubCategories(subData.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addSubCategory = async () => {
    if (!name) return alert("Name required");
    if (!category) return alert("Category required");

    await fetch("/api/subcategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
      }),
    });

    setName("");
    setCategory("");

    loadData();
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Manage SubCategories</h1>

      <div className="flex gap-4 mb-8">
        <input
          placeholder="Subcategory name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button onClick={addSubCategory} className="bg-black text-white px-6">
          Add
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {subcategories.map((sub) => (
          <div key={sub._id} className="border p-4">
            <h3 className="font-semibold">{sub.name}</h3>

            <p className="text-sm text-gray-500">
              Category: {sub.category?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
