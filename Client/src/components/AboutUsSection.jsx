import React from 'react';

const AboutUsSection = () => {
  return (
    <section className="bg-[rgb(255,226,134)] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-yellow-900 text-center mb-8">About Hyjal</h2>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <p className="text-yellow-900 mb-4">
            Hyjal is a pioneering community-based water supply chain dedicated to creating a sustainable future through clean water accessibility. What began as an initiative for individuals to donate treated water has now evolved to serve larger communities and industrial partners, expanding our impact on water sustainability. With a focus on supporting Smart City initiatives, Hyjal blends technology with community action to facilitate the responsible distribution of treated water, where donations are always free and anonymous, while collection is optimized based on purification needs.
          </p>
          <p className="text-yellow-900 mb-4">
            Our approach is built on partnerships with NGOs, government organizations, and local communities, enabling us to serve as a bridge between those who wish to give and those in need of safe, affordable water. Aligned with the Swachh Bharat Abhiyan, Hyjal aims to enhance public health by reducing the spread of waterborne diseases, promoting a cleaner environment, and empowering communities with the resources to thrive. By supporting sustainable practices and leveraging digital innovation, we envision a future where water is accessible to all and every contribution strengthens the health of both people and planet.
          </p>
        </div>
        <div className="mt-8 text-center">
          <button className="bg-yellow-500 text-yellow-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-600 transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
