import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-yellow-50 p-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 bg-yellow-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="bg-yellow-400 h-12 w-12 flex items-center justify-center rounded-lg font-semibold text-yellow-900">
            Logo
          </div>
          <h1 className="text-xl font-bold text-yellow-900">Title</h1>
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className="bg-yellow-400 px-4 py-2 rounded-lg text-yellow-900 font-medium hover:bg-yellow-500 transition-colors duration-200">
            Home
          </Link>
          <Link to="/donate" className="bg-yellow-400 px-4 py-2 rounded-lg text-yellow-900 font-medium hover:bg-yellow-500 transition-colors duration-200">
            Donate
          </Link>
          <Link to="/collect" className="bg-yellow-400 px-4 py-2 rounded-lg text-yellow-900 font-medium hover:bg-yellow-500 transition-colors duration-200">
            Collect
          </Link>
          <Link to="/contact" className="bg-yellow-400 px-4 py-2 rounded-lg text-yellow-900 font-medium hover:bg-yellow-500 transition-colors duration-200">
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
