"use client";

import { useEffect, useState } from "react";

export default function AddLockPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");
  // const [subcategory, setSubcategory] = useState("");

  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  const [images, setImages] = useState<File[]>([]);

  const [categories, setCategories] = useState<any[]>([]);
  // const [subcategories, setSubcategories] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const catRes = await fetch("/api/categories");
    const catData = await catRes.json();

    const subRes = await fetch("/api/subcategories");
    const subData = await subRes.json();

    setCategories(catData.data);
    // setSubcategories(subData.data);
  };

  const addFeature = () => {
    if (!newFeature) return;

    setFeatures([...features, newFeature]);
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const arr = Array.from(files);

    if (arr.length > 5) {
      alert("Max 5 images allowed");
      return;
    }

    setImages(arr);
  };

  const saveLock = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    // formData.append("subcategory", subcategory);

    formData.append("features", JSON.stringify(features));

    images.forEach((img) => {
      formData.append("images", img);
    });

    await fetch("/api/locks", {
      method: "POST",
      body: formData,
    });

    alert("Lock created");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Add Lock</h1>

      <div className="grid gap-6 w-[600px]">
        <input
          placeholder="Lock Name"
          className="border p-2"
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="border p-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* <select
          className="border p-2"
          onChange={(e) => setSubcategory(e.target.value)}
        >
          <option value="">Select SubCategory</option>

          {subcategories.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select> */}

        <textarea
          placeholder="Description"
          className="border p-2"
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Features */}

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

        {/* Images */}

        <input
          type="file"
          multiple
          onChange={(e) => handleImageUpload(e.target.files)}
        />

        <button onClick={saveLock} className="bg-black text-white py-2">
          Save Lock
        </button>
      </div>
    </div>
  );
}
