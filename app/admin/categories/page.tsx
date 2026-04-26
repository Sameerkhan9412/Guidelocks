"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  ImagePlus,
  FolderKanban,
} from "lucide-react";

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);

    const res = await fetch("/api/categories");
    const result = await res.json();

    setCategories(result.data || []);
    setLoading(false);
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [categories, search]);

  const handleImageChange = (
    file: File | null
  ) => {
    setImage(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const resetForm = () => {
    setName("");
    setImage(null);
    setPreview(null);
    setEditingId(null);
    setShowModal(false);
  };

  const saveCategory = async () => {
    if (!name.trim()) {
      alert("Category name required");
      return;
    }

    setSaving(true);

    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingId) {
        await fetch(
          `/api/categories/${editingId}`,
          {
            method: "PUT",
            body: formData,
          }
        );
      } else {
        await fetch("/api/categories", {
          method: "POST",
          body: formData,
        });
      }

      await loadCategories();
      resetForm();
    } catch (error) {
      console.log(error);
    }

    setSaving(false);
  };

  const editCategory = (cat: Category) => {
    setEditingId(cat._id);
    setName(cat.name);
    setPreview(cat.image);
    setShowModal(true);
  };

  const deleteCategory = async (
    id: string
  ) => {
    if (!confirm("Delete category?"))
      return;

    await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    loadCategories();
  };

  return (
    <div className="p-6 lg:p-10 bg-zinc-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            Categories
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            Manage product categories with images
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="h-11 px-5 rounded-xl bg-black text-white flex items-center gap-2 hover:bg-zinc-800"
        >
          <Plus size={18} />
          Add Category
        </button>

      </div>

      {/* Search + Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="h-11 border rounded-xl px-4 bg-white flex items-center gap-2">
          <Search
            size={16}
            className="text-zinc-400"
          />

          <input
            placeholder="Search category..."
            className="w-full outline-none text-sm text-black"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="h-11 rounded-xl bg-black border flex items-center justify-center text-sm font-medium">
          Total Categories:{" "}
          {filteredCategories.length}
        </div>

        <div className="h-11 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold flex items-center justify-center">
          Vinayak International CMS
        </div>

      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-zinc-500">
          Loading...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredCategories.map((cat) => (
            <div
              key={cat._id}
              className="rounded-3xl border bg-white p-4 shadow-sm hover:shadow-xl transition"
            >
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={500}
                  height={300}
                  className="h-52 w-full object-cover rounded-2xl"
                />
              ) : (
                <div className="h-52 rounded-2xl bg-zinc-100 flex items-center justify-center">
                  No Image
                </div>
              )}

              <div className="mt-4">

                <div className="flex items-center gap-2 text-black text-sm">
                  <FolderKanban size={15} />
                  Category
                </div>

                <h3 className="text-xl text-black font-bold mt-2">
                  {cat.name}
                </h3>

                <p className="text-sm text-zinc-500 mt-1">
                  /{cat.slug}
                </p>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <button
                  onClick={() =>
                    editCategory(cat)
                  }
                  className="h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center gap-2"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteCategory(cat._id)
                  }
                  className="h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-start overflow-y-auto p-6">

          <div className="w-full max-w-xl bg-black rounded-3xl p-6 shadow-2xl">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold">
                {editingId
                  ? "Edit Category"
                  : "Add Category"}
              </h2>

              <button
                onClick={resetForm}
                className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center"
              >
                <X size={18} />
              </button>

            </div>

            <div className="grid gap-4">

              <input
                placeholder="Category Name"
                className="h-11 border rounded-xl px-4 text-white"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <label className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer">

                <ImagePlus className="mx-auto mb-3" />

                <p className="font-medium">
                  Upload Image
                </p>

                <p className="text-sm text-zinc-500">
                  PNG / JPG / WEBP
                </p>

                <input
                  type="file"
                  className="hidden text-black"
                  onChange={(e) =>
                    handleImageChange(
                      e.target.files?.[0] ||
                        null
                    )
                  }
                />

              </label>

              {preview && (
                <div className="relative">
                  <img
                    src={preview}
                    className="h-52 w-full object-cover rounded-2xl border"
                  />

                  <button
                    onClick={() => {
                      setImage(null);
                      setPreview(null);
                    }}
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black text-white flex items-center justify-center"
                  >
                    <X size={15} />
                  </button>
                </div>
              )}

              <button
                onClick={saveCategory}
                disabled={saving}
                className="h-12 rounded-xl bg-yellow-400 text-white font-semibold"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Category"
                  : "Save Category"}
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}