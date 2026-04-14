"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  ShieldCheck,
} from "lucide-react";

export default function LocksPage() {
  const [locks, setLocks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const lockRes = await fetch("/api/locks");
    const lockData = await lockRes.json();

    const catRes = await fetch("/api/categories");
    const catData = await catRes.json();

    setLocks(lockData.data || []);
    setCategories(catData.data || []);

    setLoading(false);
  };

  const filteredLocks = useMemo(() => {
    return locks.filter((lock) => {
      const matchSearch = lock.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory = filterCategory
        ? lock.category?._id === filterCategory
        : true;

      return matchSearch && matchCategory;
    });
  }, [locks, search, filterCategory]);

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);

    setName("");
    setDescription("");
    setCategory("");
    setFeatures([]);
    setNewFeature("");

    setImages([]);
    setPreviewImages([]);
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;

    setFeatures([...features, newFeature]);
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleImages = (files: FileList | null) => {
    if (!files) return;

    const arr = Array.from(files);

    if (arr.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setImages(arr);

    const previews = arr.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(previews);
  }

  const removePreviewImage = (index: number) => {
    setPreviewImages(
      previewImages.filter((_, i) => i !== index)
    );

    setImages(images.filter((_, i) => i !== index));
  };

  const saveLock = async () => {
    setSaving(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append(
      "features",
      JSON.stringify(features)
    );

    images.forEach((img) => {
      formData.append("images", img);
    });

    if (editingId) {
      await fetch(`/api/locks/${editingId}`, {
        method: "PUT",
        body: formData,
      });
    } else {
      await fetch("/api/locks", {
        method: "POST",
        body: formData,
      });
    }

    await loadData();

    setSaving(false);
    resetForm();
  };

  const editLock = (lock: any) => {
    setShowForm(true);
    setEditingId(lock._id);

    setName(lock.name);
    setDescription(lock.description);
    setCategory(lock.category?._id || "");

    setFeatures(lock.features || []);
    setPreviewImages(lock.images || []);
  };

  const deleteLock = async (id: string) => {
    if (!confirm("Delete this lock?")) return;

    await fetch(`/api/locks/${id}`, {
      method: "DELETE",
    });

    loadData();
  };

  return (
    <div className="p-6 lg:p-10 bg-white">

      {/* Top Header */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            Manage Locks
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            Add, edit and manage all products
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="h-11 px-5 rounded-xl bg-black text-white flex items-center gap-2 hover:bg-zinc-800"
        >
          <Plus size={18} />
          Add Lock
        </button>

      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="h-11 border rounded-xl px-4 flex items-center gap-2 bg-white">
          <Search size={16} className="text-black" />
          <input
            placeholder="Search locks..."
            className="w-full outline-none text-sm text-black"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          className="h-11 border rounded-xl px-4 bg-black"
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value)
          }
        >
          <option value="">
            All Categories
          </option>

          {categories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
            >
              {cat.name}
            </option>
          ))}
        </select>

        <div className="h-11 rounded-xl bg-black flex items-center justify-center text-sm font-medium">
          Total Products: {filteredLocks.length}
        </div>

      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-20 text-black">
          Loading...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredLocks.map((lock) => (
            <div
              key={lock._id}
              className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-lg transition"
            >
              <div className="relative">

                <img
                  src={lock.images?.[0]}
                  className="h-52 w-full object-cover rounded-xl"
                />

                <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
                  Secure
                </div>

              </div>

              <div className="mt-4">

                <h3 className="font-bold text-black text-lg">
                  {lock.name}
                </h3>

                <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                  {lock.description}
                </p>

                <p className="text-sm mt-3 text-black">
                  <span className="font-medium">
                    Category:
                  </span>{" "}
                  {lock.category?.name}
                </p>

              </div>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => editLock(lock)}
                  className="flex-1 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center gap-2"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteLock(lock._id)
                  }
                  className="flex-1 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-start overflow-y-auto p-6">

          <div className="w-full max-w-3xl bg-black rounded-3xl p-6 shadow-2xl">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                {editingId
                  ? "Edit Lock"
                  : "Add New Lock"}
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
                placeholder="Lock Name"
                className="h-11 border rounded-xl px-4"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <select
                className="h-11 border rounded-xl px-4 bg-white text-black"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>

              <textarea
                rows={4}
                placeholder="Description"
                className="border rounded-xl p-4"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

              {/* Features */}
              <div>

                <label className="font-medium text-sm">
                  Features
                </label>

                <div className="flex gap-2 mt-2">

                  <input
                    className="h-11 border rounded-xl px-4 flex-1"
                    value={newFeature}
                    onChange={(e) =>
                      setNewFeature(e.target.value)
                    }
                    placeholder="Add feature"
                  />

                  <button
                    onClick={addFeature}
                    className="px-4 rounded-xl bg-black text-white"
                  >
                    Add
                  </button>

                </div>

                <div className="flex gap-2 flex-wrap mt-3">

                  {features.map((f, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 rounded-full bg-zinc-100 text-black text-sm flex items-center gap-2"
                    >
                      {f}

                      <button
                        onClick={() =>
                          removeFeature(i)
                        }
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                </div>

              </div>

              {/* Upload */}
              <label className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer">

                <Upload className="mx-auto mb-3" />

                <p className="font-medium">
                  Upload Images
                </p>

                <p className="text-sm text-zinc-500">
                  Max 5 images
                </p>

                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    handleImages(e.target.files)
                  }
                />

              </label>

              {/* Preview */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">

                {previewImages.map(
                  (img, i) => (
                    <div
                      key={i}
                      className="relative"
                    >
                      <img
                        src={img}
                        className="h-24 w-full object-cover rounded-xl"
                      />

                      <button
                        onClick={() =>
                          removePreviewImage(i)
                        }
                        className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )
                )}

              </div>

              <button
                onClick={saveLock}
                disabled={saving}
                className="h-12 rounded-xl bg-yellow-400 text-white font-semibold"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Lock"
                  : "Save Lock"}
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}