"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Star,
  Trash2,
  MessageSquare,
  User,
  X,
} from "lucide-react";

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const [reviews, setReviews] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);

    const res = await fetch("/api/reviews");
    const data = await res.json();

    setReviews(data.data || []);
    setLoading(false);
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const text =
        review.name + " " + review.message;

      return text
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [reviews, search]);

  const resetForm = () => {
    setName("");
    setMessage("");
    setRating(5);
    setShowModal(false);
  };

  const addReview = async () => {
    if (!name.trim() || !message.trim()) {
      alert("All fields required");
      return;
    }

    setSaving(true);

    await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        message,
        rating,
      }),
    });

    await loadReviews();

    setSaving(false);
    resetForm();
  };

  const deleteReview = async (
    id: string
  ) => {
    if (!confirm("Delete review?"))
      return;

    await fetch(`/api/reviews/${id}`, {
      method: "DELETE",
    });

    loadReviews();
  };

  const renderStars = (count: number) => {
    return Array.from({
      length: count,
    }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className="fill-yellow-400 text-yellow-400"
      />
    ));
  };

  return (
    <div className="p-6 lg:p-10 bg-zinc-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            Reviews
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            Manage customer feedback and trust
            section
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="h-11 px-5 rounded-xl bg-black text-white flex items-center gap-2 hover:bg-zinc-800"
        >
          <Plus size={18} />
          Add Review
        </button>

      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="h-11 border rounded-xl px-4 bg-white flex items-center gap-2">
          <Search
            size={16}
            className="text-black"
          />

          <input
            placeholder="Search review..."
            className="w-full outline-none text-sm text-black"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="h-11 rounded-xl bg-black border flex items-center justify-center text-sm font-medium">
          Total Reviews:{" "}
          {filteredReviews.length}
        </div>

        <div className="h-11 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold flex items-center justify-center">
          Vinayak International Reputation
        </div>

      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-zinc-500">
          Loading...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="rounded-3xl border bg-white p-5 shadow-sm hover:shadow-xl transition"
            >
              <div className="flex items-center gap-3 mb-4">

                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-bold flex items-center justify-center">
                  {review.name
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                <div>
                  <h3 className="font-bold text-zinc-900">
                    {review.name}
                  </h3>

                  <div className="flex gap-1 mt-1">
                    {renderStars(
                      review.rating
                    )}
                  </div>
                </div>

              </div>

              <p className="text-sm text-zinc-600 leading-6 min-h-[90px]">
                “{review.message}”
              </p>

              <button
                onClick={() =>
                  deleteReview(review._id)
                }
                className="mt-5 h-10 w-full rounded-xl bg-red-50 text-red-600 flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
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
                Add Review
              </h2>

              <button
                onClick={resetForm}
                className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center"
              >
                <X size={18} />
              </button>

            </div>

            <div className="grid gap-4">

              <div className="h-11 border rounded-xl px-4 flex items-center gap-2">
                <User
                  size={16}
                  className="text-zinc-400"
                />

                <input
                  placeholder="Client Name"
                  className="w-full outline-none"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </div>

              <div className="border rounded-2xl p-4 flex gap-3">

                <MessageSquare
                  size={18}
                  className="text-zinc-400 mt-1"
                />

                <textarea
                  rows={4}
                  placeholder="Write review..."
                  className="w-full outline-none resize-none"
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                />

              </div>

              <select
                className="h-11 border rounded-xl px-4 bg-black"
                value={rating}
                onChange={(e) =>
                  setRating(
                    Number(e.target.value)
                  )
                }
              >
                <option value="5">
                  5 Stars
                </option>
                <option value="4">
                  4 Stars
                </option>
                <option value="3">
                  3 Stars
                </option>
                <option value="2">
                  2 Stars
                </option>
                <option value="1">
                  1 Star
                </option>
              </select>

              {/* Live Preview */}
              <div className="rounded-2xl border bg-zinc-50 p-4 text-black">

                <p className="text-sm font-semibold mb-3">
                  Preview
                </p>

                <div className="flex items-center gap-3">

                  <div className="h-10 w-10 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center">
                    {name
                      ? name
                          .charAt(0)
                          .toUpperCase()
                      : "A"}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {name ||
                        "Client Name"}
                    </p>

                    <div className="flex gap-1">
                      {renderStars(
                        rating
                      )}
                    </div>
                  </div>

                </div>

                <p className="text-sm text-zinc-600 mt-3">
                  {message ||
                    "Review message preview"}
                </p>

              </div>

              <button
                onClick={addReview}
                disabled={saving}
                className="h-12 rounded-xl bg-yellow-400 text-white font-semibold"
              >
                {saving
                  ? "Saving..."
                  : "Save Review"}
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}