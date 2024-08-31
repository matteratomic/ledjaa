// components/Credit.js
import React from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

const Credit = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center text-green-500">
          <FaCreditCard className="mr-2" />
          Credit
        </h2>
        <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          <FiPlus className="mr-2" />
          Add Credit
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Credit Cards */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-2">Personal Loan</h3>
          <p className="text-gray-700">$10,000</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-2">Credit Card</h3>
          <p className="text-gray-700">$2,000</p>
        </div>
        {/* Add more credit categories as needed */}
      </div>
    </div>
  );
};

export default Credit;
