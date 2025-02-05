import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[rgb(255,226,134)] text-yellow-900 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="hover:text-yellow-700 transition-colors">Home</Link>
            <Link to="/donate" className="hover:text-yellow-700 transition-colors">Donate</Link>
            <Link to="/collect" className="hover:text-yellow-700 transition-colors">Collect</Link>
            <Link to="/contact" className="hover:text-yellow-700 transition-colors">Contact Us</Link>
            <Link to="/contact" className="hover:text-yellow-700 transition-colors">Feedback</Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-yellow-700 transition-colors" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-yellow-700 transition-colors" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-yellow-700 transition-colors" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-yellow-700 transition-colors" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-center">
            <p>&copy; {new Date().getFullYear()} HyJal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
