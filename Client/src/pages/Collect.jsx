import React, { useState, useEffect } from "react";
import SmoothCollectionForm from "../components/SmoothCollectionForm";
import CollectImage from "../assets/collect.svg"; // Import the SVG for collection

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
    <div className="flex flex-col gap-4 p-2 sm:gap-6 sm:p-4 md:p-6 lg:p-8 bg-yellow-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch justify-center">
        {/* SmoothCollectionForm Component */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 bg-white rounded-lg shadow-lg w-full lg:max-w-lg">
          <SmoothCollectionForm />
        </div>

        {/* Collection Data Section */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 bg-white rounded-lg shadow-lg w-full lg:max-w-lg overflow-hidden">
          <div className="h-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-blue-800">
              View Collections
            </h2>
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              <button
                onClick={() => fetchCollections("all")}
                className="bg-blue-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded text-xs sm:text-sm md:text-base hover:bg-blue-600"
              >
                All
              </button>
              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="border rounded px-2 py-1 text-xs sm:text-sm md:text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 flex-grow"
              />
              <button
                onClick={() => fetchCollections("pincode")}
                className="bg-blue-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded text-xs sm:text-sm md:text-base hover:bg-blue-600"
              >
                Search
              </button>
            </div>

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-xs sm:text-sm md:text-base">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-blue-800">Name</th>
                      <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-blue-800">Quantity</th>
                      <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-blue-800">Quality</th>
                      <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-blue-800">Pincode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collections.map((collection, index) => (
                      <tr key={collection.id} className={index % 2 === 0 ? "bg-blue-50" : ""}>
                        <td className="border px-1 sm:px-2 md:px-4 py-2">{collection.name}</td>
                        <td className="border px-1 sm:px-2 md:px-4 py-2">{collection.quantity}</td>
                        <td className="border px-1 sm:px-2 md:px-4 py-2">{collection.quality}</td>
                        <td className="border px-1 sm:px-2 md:px-4 py-2">{collection.pincode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Why Collect section */}
      <div className="mt-4 sm:mt-6 md:mt-8 bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-3 sm:mb-4 md:mb-6 text-center">Why Collect?</h2>
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-center">
          <div className="w-full lg:w-3/5 space-y-2 sm:space-y-3 md:space-y-4 order-2 lg:order-1">
            <p className="text-sm sm:text-base md:text-lg text-gray-700">
              At Hyjal, our collection process is key to generating revenue while addressing urgent water needs. Here's how we make an impact:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-700 space-y-1 sm:space-y-2">
              <li><strong>Revenue Generation:</strong> This is where we make revenue to sustain our mission, ensuring our services remain viable and impactful.</li>
              <li><strong>Targeting High-Demand Communities:</strong> We focus on communities with high water demand, directly tackling their access to clean water.</li>
              <li><strong>Efficient Treatment Processes:</strong> Our water is treated with minimal filtration, allowing for quick delivery and reduced operational costs.</li>
              <li><strong>Supporting Local Needs:</strong> We empower communities by providing a reliable source of treated water, fostering health and local economic growth.</li>
              <li><strong>Sustainable Practices:</strong> Our model balances environmental stewardship with community needs, ensuring sustainable access to water.</li>
            </ul>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold">
              By supporting our collection efforts, you're contributing to a sustainable future where every drop counts.
            </p>
          </div>
          <div className="w-full lg:w-2/5 order-1 lg:order-2">
            <img
              src={CollectImage}
              alt="Water Collection"
              className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
