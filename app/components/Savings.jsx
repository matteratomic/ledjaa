// components/Savings.js
import React from 'react';
import { FaPiggyBank } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

const Savings = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center text-purple-600">
          <FaPiggyBank className="mr-2" />
          Savings
        </h2>
        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          <FiPlus className="mr-2" />
          Add Savings
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Savings Cards */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-2">Emergency Fund</h3>
          <p className="text-gray-700">$5,000</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-2">Vacation Fund</h3>
          <p className="text-gray-700">$2,500</p>
        </div>
        {/* Add more savings categories as needed */}
      </div>
    </div>
  );
};

export default Savings;
