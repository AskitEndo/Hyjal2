import React, { useState, useEffect } from "react";
import SmoothCollectionForm from "../components/SmoothCollectionForm";

export default function Collect() {
  const [view, setView] = useState("all");
  const [pincode, setPincode] = useState("");
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCollections = async (type) => {
    setLoading(true);
    setError(null);
    try {
      let url = "http://localhost:5000/collection/";
      url += type === "all" ? "all" : pincode;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch collections");
      }
      const data = await response.json();
      setCollections(data);
      setView(type);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections("all");
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-8 bg-yellow-50 min-h-screen items-center justify-center">
      {/* SmoothCollectionForm Component */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg max-w-lg h-[500px] w-full">
        <SmoothCollectionForm />
      </div>

      {/* Collection Data Section */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg max-w-lg h-[500px] w-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
        <div className="h-full p-4">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            View Collections
          </h2>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => fetchCollections("all")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              All
            </button>
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            />
            <button
              onClick={() => fetchCollections("pincode")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="px-4 py-2 text-blue-800">Name</th>
                    <th className="px-4 py-2 text-blue-800">Quantity</th>
                    <th className="px-4 py-2 text-blue-800">Quality</th>
                    <th className="px-4 py-2 text-blue-800">Pincode</th>
                  </tr>
                </thead>
                <tbody>
                  {collections.map((collection, index) => (
                    <tr key={collection.id} className={index % 2 === 0 ? "bg-blue-50" : ""}>
                      <td className="border px-4 py-2">{collection.name}</td>
                      <td className="border px-4 py-2">{collection.quantity}</td>
                      <td className="border px-4 py-2">{collection.quality}</td>
                      <td className="border px-4 py-2">{collection.pincode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
