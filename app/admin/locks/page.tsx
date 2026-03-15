"use client";

import { useEffect, useState } from "react";

export default function LocksPage() {
  const [locks, setLocks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const lockRes = await fetch("/api/locks");
    const lockData = await lockRes.json();

    const catRes = await fetch("/api/categories");
    const catData = await catRes.json();

    const subRes = await fetch("/api/subcategories");
    const subData = await subRes.json();

    setLocks(lockData.data);
    setCategories(catData.data);
    setSubcategories(subData.data);
  };

  const handleImages = (files: FileList | null) => {
    if (!files) return;

    const arr = Array.from(files);

    if (arr.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setImages(arr);

    const previews = arr.map((file) => URL.createObjectURL(file));

    setPreviewImages(previews);
  };

  const addFeature = () => {
    if (!newFeature) return;

    setFeatures([...features, newFeature]);
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);

    setName("");
    setDescription("");
    setCategory("");
    setSubcategory("");
    setFeatures([]);
    setImages([]);
    setPreviewImages([]);
  };

  const saveLock = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subcategory);

    formData.append("features", JSON.stringify(features));

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

    resetForm();
    loadData();
  };

  const editLock = (lock: any) => {
    setShowForm(true);
    setEditingId(lock._id);

    setName(lock.name);
    setDescription(lock.description);
    setCategory(lock.category?._id);
    setSubcategory(lock.subcategory?._id);

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
    <div className="p-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Locks</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Add Lock
        </button>
      </div>

      {/* ADD / EDIT FORM */}

      {showForm && (
        <div className="border p-6 mb-10 space-y-4">
          <input
            placeholder="Lock Name"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="border p-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 w-full"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            <option>Select SubCategory</option>

            {subcategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Description"
            className="border p-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* FEATURES */}

          <div>
            <h3 className="font-semibold mb-2">Features</h3>

            <div className="flex gap-2">
              <input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="border p-2"
              />

              <button onClick={addFeature} className="bg-black text-white px-4">
                Add
              </button>
            </div>

            <ul className="mt-2">
              {features.map((f, i) => (
                <li key={i} className="flex gap-2">
                  {f}

                  <button
                    onClick={() => removeFeature(i)}
                    className="text-red-500"
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* IMAGE UPLOAD */}

          <input
            type="file"
            multiple
            onChange={(e) => handleImages(e.target.files)}
          />

          {/* IMAGE PREVIEW */}

          <div className="flex gap-4 flex-wrap">
            {previewImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>

          {/* PRODUCT PREVIEW */}

          <div className="border p-4 bg-gray-50">
            <h3 className="font-bold text-lg mb-2">Product Preview</h3>

            <h4 className="font-semibold">{name}</h4>

            <p className="text-sm text-gray-500">{description}</p>

            <ul className="list-disc ml-5 mt-2">
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={saveLock}
              className="bg-black text-white px-6 py-2"
            >
              {editingId ? "Update Lock" : "Save Lock"}
            </button>

            <button onClick={resetForm} className="text-red-500">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* LOCK LIST */}

      <div className="grid grid-cols-3 gap-6">
        {locks.map((lock: any) => (
          <div key={lock._id} className="border rounded p-4 shadow-sm">
            {lock.images?.[0] && (
              <img
                src={lock.images[0]}
                className="h-40 w-full object-cover mb-3 rounded"
              />
            )}

            <h3 className="font-semibold">{lock.name}</h3>

            <p className="text-sm text-gray-500">
              Category: {lock.category?.name}
            </p>

            <p className="text-sm text-gray-500">
              Sub: {lock.subcategory?.name}
            </p>

            <div className="flex gap-4 mt-3">
              <button onClick={() => editLock(lock)} className="text-blue-500">
                Edit
              </button>

              <button
                onClick={() => deleteLock(lock._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
