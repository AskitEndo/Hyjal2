import React, { useEffect } from 'react';
import FastTypewriter from './FastTypewriter';
import WaterdropSVG from '../assets/waterdrop.svg'; // Adjust the import path as needed

const words = [
  "amazing opportunities",
  "innovative solutions",
  "sustainable practices",
  "community impact",
  "water conservation"
];

const HeroSection = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-us');
    console.log('About section:', aboutSection); // Debug log
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('About section not found'); // Debug log
    }
  };

  return (
    <section className="bg-yellow-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-around">
          <div className="w-full md:w-5/12 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-left">
              Welcome to <span className="text-blue-500">HyJal</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-left">
              Discovering{" "}
              <span className="text-blue-500">
                <FastTypewriter words={words} typingSpeed={50} pauseDuration={2000} />
              </span>
            </h2>
            <p className="text-2xl mb-8 text-left">
              Join us in our mission to make a difference in water conservation and management.
            </p>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={scrollToAbout}
            >
              Learn More
            </button>
          </div>
          <div className="w-full md:w-4/12 relative">
            <div className="aspect-square relative">
              <div className="bg absolute inset-0 flex items-center justify-center z-0">
                <img
                  src="/src/assets/BuildingBg.svg"
                  alt="Building Background"
                  className="w-11/12 h-11/12 object-cover"
                />
              </div>
              <div className="truck absolute inset-x-0 bottom-8 flex items-center justify-center z-10">
                <lord-icon
                  src="https://cdn.lordicon.com/amfpjnmb.json"
                  trigger="loop"
                  colors="primary:#121331,secondary:#9ce5f4,tertiary:#3a3347,quaternary:#f4f19c,quinary:#646e78"
                  style={{ width: '250px', height: '250px' }}
                  speed="3">
                </lord-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
