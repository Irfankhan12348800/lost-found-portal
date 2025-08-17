import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Loader from "../components/Loader.jsx";

function ItemList() {
  const [items, setItems] = useState([]); // ✅ lowercase
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(collection(db, "Items"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const itemList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched items:", itemList); // ✅ correct variable
        setItems(itemList); // ✅ correct variable
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // 🔁 Show loader while fetching data
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        📦 Reported Items
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No items reported yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white p-5 rounded-xl shadow-lg border border-blue-100 transition hover:shadow-xl"
            >
              {item.imageURL && (
                <img
                  src={item.imageURL}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-sky-700">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 bg-sky-100 text-sky-800 text-sm rounded">
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                <strong>Category:</strong> {item.category}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Contact:</strong> {item.contact}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList;
