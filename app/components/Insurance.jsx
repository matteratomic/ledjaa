// components/Insurance.js
import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

const Insurance = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center text-blue-500">
          <FaShieldAlt className="mr-2" />
          Insurance
        </h2>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <FiPlus className="mr-2" />
          Add Insurance
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insurance Cards */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-2">Health Insurance</h3>
          <p className="text-gray-700">$1,200/year</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-2">Crop Insurance</h3>
          <p className="text-gray-700">$800/year</p>
        </div>
        {/* Add more insurance categories as needed */}
      </div>
    </div>
  );
};

export default Insurance;
