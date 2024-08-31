"use client"
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const OTPConfirmation = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP submission logic here
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="w-full md:w-1/2 flex bg-white items-center justify-center p-6 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <img src="/logo.jpg" alt="Logo" className="h-24 mb-8" />
          <h2 className="text-3xl font-bold mb-2">Enter Reset Code</h2>
          <p className="text-gray-600 mb-8">We`&apos;`ve sent a 6-digit code to your email</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between mb-5">
              {otp.map((data, index) => {
                return (
                  <input
                    className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl border-gray-300 focus:border-[#39c049] focus:ring-2 focus:ring-[#39c049] text-gray-700"
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onFocus={e => e.target.select()}
                    ref={input => inputRefs.current[index] = input}
                  />
                );
              })}
            </div>
            <button
              type="submit"
              className="w-full bg-[#39c049] text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              Verify Code
            </button>
          </form>
          
          <p className="mt-8 text-center">
            Didn`&apos;`t receive the code?{' '}
            <a href="#" className="text-[#22742c] hover:underline bg-white">Resend</a>
          </p>
        </motion.div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-purple-600">
        <img src="/otp.jpg" alt="Decorative" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default OTPConfirmation;