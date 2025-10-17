import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("All");

  // ✅ Fetch testimonials (filtered)
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const url =
        category === "All"
          ? `${import.meta.env.VITE_BACKEND_API}api/gettestimonials`
          : `${import.meta.env.VITE_BACKEND_API}api/gettestimonials?category=${encodeURIComponent(
              category
            )}`;
      const res = await axios.get(url);
      setTestimonials(res.data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete testimonial
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this testimonial?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_API}api/deletetestimonial/${id}`);
      setMessage("🗑️ Testimonial deleted successfully!");
      setTestimonials((prev) => prev.filter((t) => t._id !== id));

      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      setMessage("❌ Failed to delete testimonial");
      setTimeout(() => setMessage(""), 2500);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6 duration-200">
      <div className="max-w-7xl mx-auto bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">
          Manage Testimonials
        </h2>

        {/* ✅ Filter + Status Message */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option>All</option>
            <option>Low AMH</option>
            <option>Positive Pregnancies With Other Fertility Issues</option>
            <option>Reversals</option>
            <option>Male Fertility</option>
          </select>

          {message && (
            <p className="text-sm text-green-400 font-medium text-center sm:text-right">
              {message}
            </p>
          )}
        </div>

        {/* ✅ Loading / Empty */}
        {loading ? (
          <p className="text-center text-gray-400">Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-gray-400">
            No testimonials found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-600 p-2"
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_API.replace(/\/$/, "")}${item.imageUrl}`}
                  alt={item.category}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold mb-3 text-white">
                    {item.category}
                  </h3>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTestimonials;
