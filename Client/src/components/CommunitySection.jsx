import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stateCoordinates = {
  "ANDHRA PRADESH": { x: 200, y: 280 },
  "ARUNACHAL PRADESH": { x: 320, y: 120 },
  ASSAM: { x: 300, y: 140 },
  BIHAR: { x: 240, y: 160 },
  CHHATTISGARH: { x: 200, y: 200 },
  GOA: { x: 140, y: 260 },
  GUJARAT: { x: 120, y: 200 },
  HARYANA: { x: 160, y: 120 },
  "HIMACHAL PRADESH": { x: 160, y: 80 },
  JHARKHAND: { x: 240, y: 180 },
  KARNATAKA: { x: 160, y: 280 },
  KERALA: { x: 160, y: 320 },
  "MADHYA PRADESH": { x: 180, y: 200 },
  MAHARASHTRA: { x: 160, y: 240 },
  MANIPUR: { x: 320, y: 160 },
  MEGHALAYA: { x: 280, y: 150 },
  MIZORAM: { x: 300, y: 180 },
  NAGALAND: { x: 320, y: 140 },
  ODISHA: { x: 240, y: 220 },
  PUNJAB: { x: 140, y: 100 },
  RAJASTHAN: { x: 140, y: 160 },
  SIKKIM: { x: 260, y: 140 },
  "TAMIL NADU": { x: 180, y: 320 },
  TELANGANA: { x: 200, y: 240 },
  TRIPURA: { x: 280, y: 180 },
  "UTTAR PRADESH": { x: 200, y: 140 },
  UTTARAKHAND: { x: 180, y: 100 },
  "WEST BENGAL": { x: 260, y: 200 },
  DELHI: { x: 180, y: 120 },
};

const IndiaMap = ({ locationInfo, isLoading }) => {
  const [hoveredState, setHoveredState] = useState(null);

  const getStateColor = (stateName) => {
    if (!locationInfo) return "#e5e7eb";
    if (locationInfo.state.toUpperCase() === stateName) {
      return "#fbbf24";
    }
    return "#e5e7eb";
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-white p-4">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Indian map outline */}
        <path
          d="M100,50 L300,50 L350,150 L320,250 L280,350 L150,350 L80,250 L100,50"
          fill="none"
          stroke="#666"
          strokeWidth="2"
        />

        {/* State markers */}
        {Object.entries(stateCoordinates).map(([state, coords]) => (
          <g key={state}>
            <circle
              cx={coords.x}
              cy={coords.y}
              r={locationInfo?.state.toUpperCase() === state ? 8 : 4}
              fill={getStateColor(state)}
              stroke="#666"
              strokeWidth="1"
              className="transition-all duration-200"
              onMouseEnter={() => setHoveredState(state)}
              onMouseLeave={() => setHoveredState(null)}
            />
            {hoveredState === state && (
              <text
                x={coords.x}
                y={coords.y - 10}
                textAnchor="middle"
                fontSize="8"
                fill="#666"
                className="pointer-events-none"
              >
                {state}
              </text>
            )}
          </g>
        ))}

        {/* Location marker */}
        {locationInfo && stateCoordinates[locationInfo.state.toUpperCase()] && (
          <g
            transform={`translate(${
              stateCoordinates[locationInfo.state.toUpperCase()].x
            },${stateCoordinates[locationInfo.state.toUpperCase()].y})`}
          >
            <circle r="12" fill="#ef4444" fillOpacity="0.2" />
            <circle r="6" fill="#ef4444" />
          </g>
        )}
      </svg>

      {/* Location info overlay */}
      {locationInfo && (
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2 text-sm border-t">
          <p className="font-semibold">{locationInfo.name}</p>
          <p className="text-gray-600 text-xs">
            {locationInfo.district}, {locationInfo.state}
          </p>
        </div>
      )}
    </div>
  );
};

const CommunitySection = () => {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRouteButton, setShowRouteButton] = useState(false);
  const [locationInfo, setLocationInfo] = useState(null);
  const navigate = useNavigate();

  const fetchLocationFromPincode = async (pincode) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        const { District, State, Name } = postOffice;

        setLocationInfo({
          name: Name,
          district: District,
          state: State,
        });
        return true;
      }
      setError("Location not found");
      return false;
    } catch (error) {
      setError("Error fetching location data");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPincode(value);
    setError("");
    setShowRouteButton(false);
  };

  const handleGoClick = async () => {
    if (pincode.length === 6) {
      const success = await fetchLocationFromPincode(pincode);
      if (success) {
        setShowRouteButton(true);
        setError("");
      }
    } else {
      setError("Please enter a valid 6-digit pincode");
      setShowRouteButton(false);
    }
  };

  return (
    <section className="py-12 bg-yellow-100">
      <div className="container mx-auto px-4">
        <div className="bg-white bg-opacity-50 rounded-xl p-8 shadow-lg relative mt-8">
          {/* Pincode Input Overlay */}
          <div className="absolute -top-6 left-8 right-8 flex flex-wrap gap-4 z-10">
            <div className="pincode bg-yellow-400 px-4 py-2 rounded-full shadow-lg flex items-center">
              <input
                type="text"
                placeholder="Enter your pincode"
                className="bg-transparent border-none focus:outline-none text-yellow-900 placeholder-yellow-700 w-40"
                value={pincode}
                onChange={handlePincodeChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleGoClick();
                  }
                }}
                maxLength={6}
              />
              <button
                className="ml-2 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50"
                onClick={handleGoClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Go"
                )}
              </button>
            </div>
            {showRouteButton && (
              <button
                className="bg-yellow-400 px-6 py-2 rounded-full shadow-lg text-yellow-900 hover:bg-yellow-500 transition-colors duration-200"
                onClick={() => navigate("/map")}
              >
                Go to route
              </button>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
          )}

          <h2 className="text-2xl font-bold mb-6 text-center pt-4">
            Your Community
          </h2>

          <div className="flex flex-col md:flex-row justify-around items-stretch gap-6 md:gap-12">
            <div className="w-full md:w-2/5 lg:w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
              <h3 className="text-lg font-bold p-4 bg-yellow-200">
                Community Map
              </h3>
              <div className="aspect-[4/3] relative">
                <IndiaMap locationInfo={locationInfo} isLoading={isLoading} />
              </div>
            </div>

            <div className="w-full md:w-2/5 lg:w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
              <h3 className="text-lg font-bold p-4 bg-yellow-200">
                Community Info
              </h3>
              <div className="p-3">
                {locationInfo ? (
                  <div className="space-y-1">
                    <p>
                      <strong>Area:</strong> {locationInfo.name}
                    </p>
                    <p>
                      <strong>District:</strong> {locationInfo.district}
                    </p>
                    <p>
                      <strong>State:</strong> {locationInfo.state}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">No information available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
