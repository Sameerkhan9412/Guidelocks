"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export default function CategoriesPage() {

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadCategories = async () => {
    const res = await fetch("/api/categories");
    const result = await res.json();
    setCategories(result.data || []);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleImageChange = (file: File | null) => {

    setImage(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }

  };

  const saveCategory = async () => {

    if (!name) return alert("Category name required");

    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
    }
    console.log("fordmdata",formData)

    setLoading(true);

    try {

      if (editingId) {

        await fetch(`/api/categories/${editingId}`, {
          method: "PUT",
          body: formData
        });

      } else {
        console.log("i am formdaa",formData)
        await fetch("/api/categories", {
          method: "POST",
          body: formData
        });

      }

      setName("");
      setImage(null);
      setPreview(null);
      setEditingId(null);

      loadCategories();

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const editCategory = (cat: Category) => {

    setName(cat.name);
    setEditingId(cat._id);
    setPreview(cat.image);

  };

  const cancelEdit = () => {

    setEditingId(null);
    setName("");
    setImage(null);
    setPreview(null);

  };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Manage Categories
      </h1>

      {/* Form */}

      <div className="flex items-center gap-4 mb-8">

        <input
          placeholder="Category name"
          className="border p-2 w-60"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) =>
            handleImageChange(e.target.files?.[0] || null)
          }
        />

        <button
          onClick={saveCategory}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update"
            : "Add"}
        </button>

        {editingId && (
          <button
            onClick={cancelEdit}
            className="text-red-500"
          >
            Cancel
          </button>
        )}

      </div>

      {/* Preview */}

      {preview && (
        <div className="mb-8">
          <p className="text-sm mb-2">Preview:</p>
          <img
            src={preview}
            className="h-32 w-32 object-cover border rounded"
          />
        </div>
      )}

      {/* Categories Grid */}

      <div className="grid grid-cols-3 gap-6">

        {categories.map((cat) => (

          <div
            key={cat._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >

            {cat.image ? (
              <Image
                src={cat.image}
                alt={cat.name}
                width={300}
                height={160}
                className="h-40 w-full object-cover rounded mb-2"
              />
            ) : (
              <div className="h-40 flex items-center justify-center bg-gray-100 rounded mb-2">
                No Image
              </div>
            )}

            <h3 className="font-semibold text-lg">
              {cat.name}
            </h3>

            <p className="text-sm text-gray-500 mb-2">
              {cat.slug}
            </p>

            <button
              onClick={() => editCategory(cat)}
              className="text-blue-500 text-sm"
            >
              Edit
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}