import React, { useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import axios from 'axios';

const Dispute = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/contact', { name, email, message });
      setSuccess(true);
      setError(false);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-10 justify-center flex flex-col md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        <div className="flex flex-col items-start justify-center gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>10015 Sec-2 Pipli Geeta Gate <br />Kurukshetra, Haryana</p>
          <p className='text-gray-500'>Tel: 9185753457 <br />Email: riya@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about Our teams and job Openings</p>
          <button className='border border-black px-8 py-4 text-lg hover:bg-black hover:text-white transition-all duration-500'>Mail Us</button>
        </div>
      </div>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Contact Form</h1>
        {success && <p className="text-green-500 text-center mb-4">Message sent successfully!</p>}
        {error && <p className="text-red-500 text-center mb-4">Error sending message. Please try again.</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
            Send Message
          </button>
        </form>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Dispute;