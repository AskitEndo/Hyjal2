import React, { useState, useEffect } from "react";
import SmoothDonationForm from "../components/SmoothDonationForm";
import DonateImage from "../assets/donate.svg"; // Import the SVG

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
    <div className="flex flex-col gap-4 p-2 sm:gap-6 sm:p-4 md:p-6 lg:p-8 bg-yellow-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch justify-center">
        {/* SmoothDonationForm Component */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 bg-white rounded-lg shadow-lg w-full lg:max-w-lg">
          <SmoothDonationForm />
        </div>

        {/* Donation Data Section */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 bg-white rounded-lg shadow-lg w-full lg:max-w-lg overflow-hidden">
          <div className="h-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-blue-800">
              View Donations
            </h2>
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              <button
                onClick={() => fetchDonations("all")}
                className="bg-blue-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded text-xs sm:text-sm md:text-base hover:bg-blue-600"
              >
                All
              </button>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode"
                className="border rounded px-2 py-1 text-xs sm:text-sm md:text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 flex-grow"
              />
              <button
                onClick={() => fetchDonations("pincode")}
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
                      <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-blue-800">Pincode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-blue-50" : ""}
                      >
                        <td className="border px-1 sm:px-2 md:px-4 py-2">{donation.name}</td>
                        <td className="border px-1 sm:px-2 md:px-4 py-2">{donation.quantity}</td>
                        <td className="border px-1 sm:px-2 md:px-4 py-2">{donation.pincode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Why Donate section */}
      <div className="mt-4 sm:mt-6 md:mt-8 bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-3 sm:mb-4 md:mb-6 text-center">Why Donate?</h2>
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-center">
          <div className="w-full lg:w-3/5 space-y-2 sm:space-y-3 md:space-y-4 order-2 lg:order-1">
            <p className="text-sm sm:text-base md:text-lg text-gray-700">
              At Hyjal, we transform every donation into a powerful act of change. Our platform empowers you to contribute to a cleaner, healthier future:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-700 space-y-1 sm:space-y-2">
              <li><strong>Helping Communities Thrive:</strong> Access to clean water is essential for healthy, resilient communities. By donating, you're helping provide a vital resource, uplifting families and entire neighborhoods in need.</li>
              <li><strong>Creating a Better Future:</strong> Every contribution leads to a future where water scarcity no longer threatens lives or livelihoods. Our initiative, aligned with Swachh Bharat, works alongside government efforts to ensure access to safe, treated water for all.</li>
              <li><strong>Strengthening Social Status:</strong> By getting involved in good deeds, you're contributing to a cause that society values and respects. Supporting Hyjal not only helps others but also enhances your standing in the community as someone dedicated to making a difference.</li>
              <li><strong>Environmental Responsibility:</strong> Working towards a sustainable water supply is a powerful step toward creating a better environment. When you donate, you're part of a solution that conserves resources, reduces waste, and supports smart city initiatives.</li>
              <li><strong>A Reputation for Positive Impact:</strong> Your involvement in good deeds builds respect and admiration from those around you, enhancing your social status as someone who takes responsibility for a shared future. Each act of support contributes to a ripple effect of positive change that uplifts everyone.</li>
            </ul>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold">
              Join Hyjal in our commitment to a cleaner, healthier, and more respected society. Your donation creates a ripple of positive change.
            </p>
          </div>
          <div className="w-full lg:w-2/5 order-1 lg:order-2">
            <img
              src={DonateImage}
              alt="Water Donation"
              className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
