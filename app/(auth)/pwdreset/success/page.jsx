import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ResetSuccess = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="w-full md:w-1/2 flex bg-white items-center justify-center p-6 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md text-center"
        >
          <img src="/logo.jpg" alt="Logo" className="h-24 mb-8 mx-auto" />
          <FaCheckCircle className="text-[#39c049] text-6xl mb-4 mx-auto" />
          <h2 className="text-3xl font-bold mb-2">Password Reset Successful</h2>
          <p className="text-gray-600 mb-8">Your password has been successfully reset</p>
          
          <a
            href="/login"
            className="inline-block w-full bg-[#39c049] text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Back to Login
          </a>
          
          <p className="mt-8 text-center">
            Need help?{' '}
            <a href="#" className="text-[#22742c] hover:underline bg-white">Contact Support</a>
          </p>
        </motion.div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-purple-600">
        
        <img src="/reset-success.jpg" alt="Decorative" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ResetSuccess;