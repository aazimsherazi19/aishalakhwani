import React, { useState } from "react";
import axios from "axios";

const AddTestimonial = () => {
  const [category, setCategory] = useState("Low AMH");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Please upload an image");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("category", category);
      formData.append("image", image);

      await axios.post(`${import.meta.env.VITE_BACKEND_API}api/addtestimonial`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Testimonial added successfully!");
      window.dispatchEvent(new Event("testimonialAdded"));
      setCategory("Low AMH");
      setImage(null);

      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add testimonial");
      setTimeout(() => setMessage(""), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center duration-200 px-6 py-10">
      <div className="bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-xl border border-gray-700">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">
          Add New Testimonial
        </h2>

        {/* ✅ Status Message */}
        {message && (
          <div
            className={`text-center mb-4 font-medium ${
              message.includes("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-700 rounded-md p-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>Low AMH</option>
              <option>Positive Pregnancies With Other Fertility Issues</option>
              <option>Reversals</option>
              <option>Male Fertility</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-gray-700 rounded-md p-3 bg-gray-700 text-gray-200 cursor-pointer focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preview */}
          {image && (
            <div className="flex justify-center mt-4">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border border-gray-600 shadow-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-200"
          >
            {loading ? "Uploading..." : "Add Testimonial"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTestimonial;
