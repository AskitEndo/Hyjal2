import React from 'react';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function ContactUs() {
  const contactItems = [
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp',
      info: '+91 9876543210',
      link: 'https://wa.me/919876543210',
    },
    {
      icon: <FaEnvelope />,
      label: 'Email',
      info: 'waterhelp@example.com',
      link: 'mailto:waterhelp@example.com',
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      info: '+91 1234567890',
      link: 'tel:+911234567890',
    },
  ];

  return (
    <div className="flex flex-col items-center bg-blue-100 min-h-screen py-10">
      <h2 className="text-4xl font-bold text-blue-800 mb-8 flex items-center">
        Contact Us
        <span className="ml-2">
          <span className="animate-dots">.</span>
          <span className="animate-dots delay-100">.</span>
          <span className="animate-dots delay-200">.</span>
        </span>
      </h2>
      <div className="space-y-6">
        {contactItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 bg-white shadow-lg rounded-lg w-72 text-blue-700 hover:bg-blue-200 transition-transform transform hover:-translate-y-1 hover:scale-105 duration-200"
          >
            <span className="text-3xl">{item.icon}</span>
            <div>
              <h3 className="text-xl font-semibold">{item.label}</h3>
              <p className="text-sm">{item.info}</p>
            </div>
          </a>
        ))}
      </div>
      <p className="mt-8 text-blue-500 text-center">
        We appreciate your interest in water collection and donation!
      </p>

      <style>
        {`
          @keyframes dot-blink {
            0%, 100% { opacity: 0; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-5px); }
          }
          .animate-dots {
            animation: dot-blink 1s infinite;
            display: inline-block;
          }
          .delay-100 {
            animation-delay: 0.1s;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
        `}
      </style>
    </div>
  );
}
