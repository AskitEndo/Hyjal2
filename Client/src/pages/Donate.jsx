import React, { useState, useEffect } from "react";
import SmoothDonationForm from "../components/SmoothDonationForm";

export default function Donate() {
  const [view, setView] = useState("all");
  const [pincode, setPincode] = useState("");
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDonations = async (type) => {
    setLoading(true);
    setError(null);
    try {
      let url = "http://localhost:5000/donation/";
      url += type === "all" ? "all" : pincode;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch donations");
      }
      const data = await response.json();
      setDonations(data);
      setView(type);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations("all");
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-8 bg-gray-50 min-h-screen items-center justify-center">
      {/* SmoothDonationForm Component */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg max-w-lg h-[700px] w-full">
        <SmoothDonationForm />
      </div>

      {/* Donation Data Section */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg max-w-lg h-[700px] w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="h-full p-4">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            View Donations
          </h2>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => fetchDonations("all")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              All
            </button>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter Pincode"
              className="border rounded px-2 py-1"
            />
            <button
              onClick={() => fetchDonations("pincode")}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Search
            </button>
          </div>

          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Pincode</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      <td className="px-4 py-2">{donation.name}</td>
                      <td className="px-4 py-2">{donation.quantity}</td>
                      <td className="px-4 py-2">{donation.pincode}</td>
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
