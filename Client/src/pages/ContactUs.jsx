import React from 'react';
import ContactUs from '../components/ContactUs';

function ContactUsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p>You can reach us through the following methods:</p>
      <ContactUs />
    </div>
  );
}

export default ContactUsPage;
