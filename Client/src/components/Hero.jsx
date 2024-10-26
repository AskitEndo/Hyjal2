import React from 'react';
import FastTypewriter from './FastTypewriter';

const words = [
  "amazing opportunities",
  "innovative solutions",
  "sustainable practices",
  "community impact",
  "water conservation"
];

const Hero = () => {
  return (
    <div className="bg-yellow-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Water Initiative
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Discovering{" "}
          <FastTypewriter words={words} typingSpeed={50} pauseDuration={2000} />
        </h2>
        <p className="text-xl mb-8">
          Join us in our mission to make a difference in water conservation and management.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Hero;
