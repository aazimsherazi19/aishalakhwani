import React, { useState } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import ReactQuill from "react-quill-new"; 
import "react-quill-new/dist/quill.snow.css";



const AddPrograms = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleVideoChange = (e) => setVideo(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", name);
    formData.append("description", description);
    formData.append("content", content);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}api/addprogram`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Program added successfully:", result);
        setMessage("✅ Program added successfully!");
        setName("");
        setDescription("");
        setContent("");
        setImage(null);
        setVideo(null);
        window.dispatchEvent(new Event("programAdded"));
      } else {
        setMessage("❌ Failed to add program");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Error adding program");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 2500);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <>
      <Header />
      <div className="flex bg-gray-900 min-h-screen text-white">
        <Sidebar />

        <main className="flex-1 p-6 flex justify-center items-start">
          <div className="bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-2xl border border-gray-700 mt-10">
            <h2 className="text-3xl font-semibold text-center mb-6 text-white">
              Add New Program
            </h2>

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
              {/* Program Title */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Title
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Program Title"
                  className="w-full border border-gray-700 rounded-md p-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Short Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description about the program"
                  className="w-full border border-gray-700 rounded-md p-3 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Detailed Content with Rich Editor */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Detailed Content
                </label>
                <div className="bg-gray-700 rounded-md border border-gray-600">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-700 rounded-md p-3 bg-gray-700 text-gray-200 cursor-pointer focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Upload Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-200"
              >
                {loading ? "Uploading..." : "Add Program"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default AddPrograms;
