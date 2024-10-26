import React from 'react';
import HeroSection from '../components/HeroSection';
import CommunitySection from '../components/CommunitySection';
import AboutUsSection from '../components/AboutUsSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CommunitySection />
      <AboutUsSection />
      {/* Add other sections of your home page here */}
    </div>
  );
};

export default Home;
