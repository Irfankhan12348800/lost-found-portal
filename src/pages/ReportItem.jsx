import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // ab storage Firebase se hata diya
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import imageCompression from "browser-image-compression";
import { supabase } from "../lib/supabaseClient";

function ReportItem() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Lost",
    contact: "",
    category: "",
    imageURL: "" // URL ya uploaded file ka link
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "imageURL" && e.target.value) {
      setImageFile(null); // disable file if URL entered
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setForm({ ...form, imageURL: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalImageUrl = form.imageURL;

      // 📤 Agar file select hui hai → Supabase pe upload
      if (imageFile) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(imageFile, options);
        const fileName = `lostfound/${Date.now()}_${compressedFile.name}`;

        const { error } = await supabase.storage
          .from("images") // 👈 apna bucket name yahan likho
          .upload(fileName, compressedFile);

        if (error) throw error;

        // ✅ Public URL lena
        const { data } = supabase.storage.from("images").getPublicUrl(fileName);
        finalImageUrl = data.publicUrl;
      }

      // 📥 Firestore me save karo
      await addDoc(collection(db, "Items"), {
        ...form,
        imageURL: finalImageUrl,
        createdAt: serverTimestamp(),
      });

      navigate("/Items");
    } catch (err) {
      console.error("Error adding document:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl px-10 py-8 w-full max-w-2xl border border-blue-200 transition-transform transform hover:scale-[1.01] hover:shadow-blue-200">
        <h2 className="text-4xl font-bold text-sky-700 text-center mb-6 animate-slide-in-down">
          📋 Report Lost or Found Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 animate-slide-in-up">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Item Title</label>
            <input
              name="title"
              type="text"
              placeholder="e.g. Black Wallet"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <input
              name="category"
              type="text"
              placeholder="e.g. Electronics, Book"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Contact Info</label>
            <input
              name="contact"
              type="text"
              placeholder="e.g. Email or Phone"
              value={form.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
              required
            />
          </div>

          {/* Image Upload OR URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Item Image</label>

            {/* URL Input */}
            <input
              name="imageURL"
              type="text"
              placeholder="Paste image URL"
              value={form.imageURL}
              onChange={handleChange}
              disabled={!!imageFile}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all mb-3"
            />

            {/* File Upload */}
            <label
              className={`cursor-pointer flex items-center justify-center border-2 border-dashed rounded-xl p-6 hover:border-sky-400 transition ${
                form.imageURL ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <span className="text-3xl">+</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={!!form.imageURL}
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Item Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
              rows="3"
              placeholder="Give details about the item"
              required
            ></textarea>
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            >
              <option value="Lost">🔍 Lost</option>
              <option value="Found">📦 Found</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:from-sky-600 hover:to-blue-700"
          >
            🚀 Submit Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportItem;
