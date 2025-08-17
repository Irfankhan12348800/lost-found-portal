import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function ReportItem() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'Lost',
    contact: '',
    category: '',
    imageURL: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Items"), {
        ...form,
        createdAt: serverTimestamp()
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
          {[
            { label: "Item Title", name: "title", type: "text", placeholder: "e.g. Black Wallet" },
            { label: "Category", name: "category", type: "text", placeholder: "e.g. Electronics, Book" },
            { label: "Your Contact Info", name: "contact", type: "text", placeholder: "e.g. Email or Phone" },
            { label: "Image URL (optional)", name: "imageURL", type: "text", placeholder: "Paste image URL" }
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-gray-700 font-medium mb-1">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                required={field.name !== "imageURL"}
              />
            </div>
          ))}

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
