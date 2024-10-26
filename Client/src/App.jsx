import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Collect from "./pages/Collect";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import DeliverySimulation from "./pages/DeliverySimulation";
import Mapdistance from "./pages/Mapdistance";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-yellow-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/collect" element={<Collect />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route
              path="/delivery-simulation"
              element={<DeliverySimulation />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
