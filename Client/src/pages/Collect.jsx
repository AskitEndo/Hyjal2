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
    <div className="flex flex-col md:flex-row gap-6 p-8 bg-gray-50 min-h-screen items-center justify-center">
      {/* SmoothCollectionForm Component */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg max-w-lg h-[700px] w-full">
        <SmoothCollectionForm />
      </div>

      {/* Collection Data Section */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg max-w-lg h-[700px] w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="h-full p-4">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            View Collections
          </h2>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => fetchCollections("all")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              All
            </button>
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <button
              onClick={() => fetchCollections("pincode")}
              className="bg-green-500 text-white px-4 py-2 rounded"
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
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Quality</th>
                    <th className="px-4 py-2">Pincode</th>
                  </tr>
                </thead>
                <tbody>
                  {collections.map((collection) => (
                    <tr key={collection.id}>
                      <td className="border px-4 py-2">{collection.name}</td>
                      <td className="border px-4 py-2">
                        {collection.quantity}
                      </td>
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
