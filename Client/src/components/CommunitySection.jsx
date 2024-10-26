import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholderMap from "../assets/placeholder-map.jpg"; // Make sure to add this image to your assets folder

const CommunitySection = () => {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [showRouteButton, setShowRouteButton] = useState(false);
  const navigate = useNavigate();

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    setPincode(value);
    setError("");
    setShowRouteButton(false);

    if (value.length > 6) {
      setError("Pincode should be 6 digits");
    }
  };

  const handleGoClick = () => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setShowRouteButton(true);
      setError("");
    } else {
      setError("Please enter a valid 6-digit pincode");
      setShowRouteButton(false);
    }
  };

  const handleGoToRoute = () => {
    // Redirect to home page
    navigate("/");

    // Later, you can replace this with your simulation page, e.g.:
    // navigate('/simulation', { state: { pincode: pincode } });
  };

  return (
    <section className="py-12 bg-yellow-100">
      <div className="container mx-auto px-4">
        <div className="bg-white bg-opacity-50 rounded-xl p-8 shadow-lg relative mt-8">
          {/* Pincode Input Overlay */}
          <div className="absolute -top-6 left-8 right-8 flex justify-start z-10 space-x-4">
            <div className="pincode bg-yellow-400 px-4 py-2 rounded-full shadow-lg flex items-center">
              <input
                type="text"
                placeholder="Enter your pincode"
                className="bg-transparent border-none focus:outline-none text-yellow-900 placeholder-yellow-700 w-40"
                value={pincode}
                onChange={handlePincodeChange}
                maxLength={6}
              />
              <button
                className="ml-2 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full hover:bg-yellow-600 transition-colors duration-200"
                onClick={handleGoClick}
              >
                Go
              </button>
            </div>
            {showRouteButton && (
              <button
                className="bg-yellow-400 px-6 py-2 rounded-full shadow-lg text-yellow-900 hover:bg-yellow-500 transition-colors duration-200"
                onClick={() => navigate("/delivery-simulation")}
              >
                Go to route
              </button>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}

          <h2 className="text-2xl font-bold mb-8 text-center pt-4">
            Your Community
          </h2>
          <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md overflow-hidden">
              <h3 className="text-lg font-bold p-4 bg-yellow-200">
                Community Map
              </h3>
              <div className="aspect-square relative">
                <img
                  src={placeholderMap}
                  alt="Community Map"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md overflow-hidden mt-8 md:mt-0">
              <h3 className="text-lg font-bold p-4 bg-yellow-200">
                Community Info
              </h3>
              <div className="p-4">
                <p>No information available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
