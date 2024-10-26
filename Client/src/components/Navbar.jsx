import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const NavItem = ({ to, icon, label }) => (
    <Link to={to} className="flex flex-col items-center group">
      <div className="bg-yellow-400 p-2 rounded-lg hover:bg-yellow-500 transition-all duration-200 mb-1 group-hover:scale-110">
        <div className="bg-yellow-300 rounded-full p-1">
          <lord-icon
            src={icon}
            trigger="hover"
            colors="primary:#794628"
            style={{ width: '30px', height: '30px' }}>
          </lord-icon>
        </div>
      </div>
      <span className="text-xs font-medium text-yellow-900 transition-all duration-200 group-hover:scale-110">{label}</span>
    </Link>
  );

  return (
    <header className="bg-[rgb(255,226,134)] p-6 relative z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <Link to="/" className="flex items-center space-x-4 bg-yellow-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
          <div className="bg-[rgb(255,226,134)] h-12 w-12 flex items-center justify-center rounded-lg font-semibold text-yellow-900">
            <img src="/src/assets/Logo.png" alt="HyJal logo" className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-yellow-900">HyJal</h1>
        </Link>
        <nav className="flex space-x-6 items-center">
          <NavItem to="/" icon="https://cdn.lordicon.com/wmwqvixz.json" label="Home" />
          <NavItem to="/donate" icon="https://cdn.lordicon.com/ncitidvz.json" label="Donate" />
          <NavItem to="/collect" icon="https://cdn.lordicon.com/gjjvytyq.json" label="Collect" />
          <NavItem to="/contact" icon="https://cdn.lordicon.com/srsgifqc.json" label="Contact" />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
