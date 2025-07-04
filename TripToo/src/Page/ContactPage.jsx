// src/Page/ContactPage.jsx
import React, { useState } from 'react';
import { FaFacebookF, FaXTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa6';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', subject2: '', message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', subject2: '', message: '' });
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-10 px-4">
      <div className="bg-white max-w-2xl mx-auto p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-[#0f1c2e] mb-8 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]" required />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]" required />
          </div>
          <div>
            <label htmlFor="subject" className="sr-only">Subject</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]" required />
          </div>
          <div className="relative">
            <label htmlFor="subject2" className="sr-only">Subject</label>
            <input type="text" id="subject2" name="subject2" value={formData.subject2} onChange={handleChange} placeholder="Subject" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]" required />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaEnvelope className="h-5 w-5" />
            </span>
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Message" rows="5" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-[#0f1c2e]" required></textarea>
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
            Send Message
          </button>
        </form>

        <div className="text-center mt-10 space-y-3">
          <p className="text-lg text-[#0f1c2e] font-semibold">Triptoo@envail.com</p>
          <p className="text-lg text-[#0f1c2e] font-semibold">Triptoo.com</p>
          <div className="flex justify-center space-x-6 text-gray-700 mt-5">
            <a href="https://facebook.com/yourtriptoo" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-green-500 transition-colors duration-300" title="Facebook"> <FaFacebookF /> </a>
            <a href="https://x.com/yourtriptoo" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-green-500 transition-colors duration-300" title="X (Twitter)"> <FaXTwitter /> </a>
            <a href="https://instagram.com/yourtriptoo" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-green-500 transition-colors duration-300" title="Instagram"> <FaInstagram /> </a>
            <a href="mailto:info@triptoo.com" className="text-3xl hover:text-green-500 transition-colors duration-300" title="Email Us"> <FaEnvelope /> </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;