import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[rgb(255,226,134)] text-yellow-900 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-yellow-700 transition-colors">Home</Link>
            <Link to="/donate" className="hover:text-yellow-700 transition-colors">Donate</Link>
            <Link to="/collect" className="hover:text-yellow-700 transition-colors">Collect</Link>
            <Link to="/contact" className="hover:text-yellow-700 transition-colors">Contact Us</Link>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-yellow-700 transition-colors" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-yellow-700 transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-yellow-700 transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-yellow-700 transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} HyJal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
