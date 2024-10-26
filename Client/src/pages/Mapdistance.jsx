import React, { useState, useEffect } from "react";
import { MapPin, Navigation, AlertCircle, Loader2 } from "lucide-react";

const Mapdistance = () => {
  const [sourcePin, setSourcePin] = useState("");
  const [destPin, setDestPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mapUrl, setMapUrl] = useState("");

  const validatePinCode = (pin) => {
    return /^[1-9][0-9]{5}$/.test(pin);
  };

  const getLocationFromPinCode = async (pincode) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?country=India&postalcode=${pincode}&format=json`
      );
      const data = await response.json();
      if (data && data[0]) {
        return {
          lat: data[0].lat,
          lon: data[0].lon,
          display_name: data[0].display_name,
        };
      }
      throw new Error(`Location not found for PIN code ${pincode}`);
    } catch (error) {
      throw new Error(`Error finding location for PIN code ${pincode}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setMapUrl("");

    try {
      if (!validatePinCode(sourcePin) || !validatePinCode(destPin)) {
        throw new Error("Please enter valid 6-digit PIN codes");
      }

      // Create map URL with source and destination PINs
      const embedUrl = `https://www.google.com/maps/embed/v1/directions?origin=${sourcePin}&destination=${destPin}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`;

      setMapUrl(embedUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load the Lord Icon script
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-yellow-50 border-b border-yellow-100">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Find Route Between PIN Codes
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Source PIN Input */}
              <div className="relative">
                <input
                  type="text"
                  value={sourcePin}
                  onChange={(e) =>
                    setSourcePin(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="px-4 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 w-36"
                  placeholder="From PIN"
                  maxLength={6}
                  disabled={loading}
                />
                <MapPin
                  className="absolute right-3 top-2.5 text-yellow-600"
                  size={20}
                />
              </div>

              {/* Destination PIN Input */}
              <div className="relative">
                <input
                  type="text"
                  value={destPin}
                  onChange={(e) =>
                    setDestPin(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="px-4 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 w-36"
                  placeholder="To PIN"
                  maxLength={6}
                  disabled={loading}
                />
                <MapPin
                  className="absolute right-3 top-2.5 text-yellow-600"
                  size={20}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !sourcePin || !destPin}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:bg-yellow-300"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <lord-icon
                    src="https://cdn.lordicon.com/qhkvfxpn.json"
                    trigger="hover"
                    colors="primary:#794628"
                    style={{ width: "50px", height: "30px" }}
                  ></lord-icon>
                )}
                {loading ? "Loading..." : "Show Route"}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center justify-center gap-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Map Section */}
      {mapUrl && (
        <div className="max-w-5xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div
              style={{
                overflow: "hidden",
                resize: "none",
                maxWidth: "100%",
                width: "100%",
                height: "500px",
              }}
            >
              <div
                id="google-maps-display"
                style={{ height: "100%", width: "100%", maxWidth: "100%" }}
              >
                <iframe
                  style={{ height: "100%", width: "100%", border: "0" }}
                  frameBorder="0"
                  src={mapUrl}
                  allowFullScreen
                ></iframe>
              </div>
              <style>{`
                #google-maps-display .text-marker{}
                .map-generator{max-width: 100%; max-height: 100%; background: none;}
              `}</style>
            </div>
          </div>

          {/* Route Details Panel */}
          <div className="mt-4 bg-yellow-50 rounded-lg p-4">
            <h2 className="font-semibold text-gray-800 mb-2">
              Route Information
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>From: PIN {sourcePin}</p>
              <p>To: PIN {destPin}</p>
              <a
                href={`https://www.google.com/maps/dir/${sourcePin}/${destPin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-yellow-600 hover:text-yellow-700"
              >
                View Full Route Details ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mapdistance;
