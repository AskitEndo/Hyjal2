import React from 'react';
import SmoothDonationForm from '../components/SmoothDonationForm';

export default function Collect() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-8 bg-gray-50 min-h-screen items-center justify-center">
      {/* SmoothCollectionForm Component */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg max-w-lg h-[700px] w-full">
        <SmoothDonationForm />
      </div>

      {/* InfoSection Component with Scroll */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg max-w-lg h-[700px] w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="h-full p-4">
          <h2 className="text-2xl font-semibold mb-4 text-black">What This Section Does</h2>
          <p className="text-gray-700">
            The Donation section is designed for those who wish to collect water donations. 
            Users provide details such as the quantity of water needed, quality, and their contact information. 
            Once submitted, this information helps us manage and facilitate water distribution efficiently, 
            ensuring that those in need receive clean water from local donors in their area.
          </p>
          <p className="text-gray-700 mt-4">
            By using this section, you're contributing to a more sustainable way of sharing resources, 
            allowing everyone to access safe water when it's needed most.
          </p>
          
         
        </div>
      </div>
    </div>
  );
}
