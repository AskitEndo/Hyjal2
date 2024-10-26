import React, { useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Collect from "./pages/Collect";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import DeliverySimulation from "./pages/DeliverySimulation";
import Navbar from "./components/Navbar";
import Mapdistance from "./pages/Mapdistance";
const AppContent = () => {
  const location = useLocation();
  const loadingBarRef = useRef(null);

  useEffect(() => {
    loadingBarRef.current && loadingBarRef.current.continuousStart();

    const timer = setTimeout(() => {
      loadingBarRef.current && loadingBarRef.current.complete();
    }, 500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <LoadingBar
        color="#ffca28" // Adjust color to match your theme
        ref={loadingBarRef}
        height={4}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/collect" element={<Collect />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/delivery-simulation" element={<DeliverySimulation />} />
        <Route path="/map" element={<Mapdistance />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-yellow-50">
        <Navbar />
        <main>
          <AppContent />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
