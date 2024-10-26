import React from 'react';

const HeroSection = () => {
  return (
    <main className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex space-x-8">
        <section className="flex flex-col space-y-4 flex-1">
          <div className="bg-yellow-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-yellow-900 mb-2">Welcome to Our Platform</h2>
            <p className="text-yellow-800 text-lg">Discover amazing opportunities to make a difference</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow-sm">
            <p className="text-yellow-900 mb-4 leading-relaxed">
              Join our community of dedicated individuals who are passionate about creating positive change.
            </p>
            <p className="text-yellow-800 mb-4">
              Together we can make a lasting impact on the causes that matter most.
            </p>
            <div className="flex space-x-4">
              <button className="bg-yellow-400 px-6 py-2 rounded-lg text-yellow-900 font-medium hover:bg-yellow-500 transition-colors duration-200">
                Get Started
              </button>
              <button className="bg-yellow-200 px-6 py-2 rounded-lg text-yellow-900 font-medium hover:bg-yellow-300 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </section>
        
        <div className="w-1/3">
          <div className="bg-yellow-100 p-8 rounded-lg shadow-sm h-full">
            <div className="bg-yellow-200 h-full rounded-lg flex items-center justify-center min-h-[400px]">
              <span className="text-yellow-800 font-medium">Hero Image</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
