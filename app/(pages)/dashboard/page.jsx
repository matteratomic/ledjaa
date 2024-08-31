// pages/dashboard.js
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaPiggyBank, FaCreditCard, FaShieldAlt } from 'react-icons/fa';
import Savings from '../../components/Savings'
import Credit from '../../components/Credit';
import Insurance from '../../components/Insurance';

const Dashboard = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Link href="/logout">
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Logout
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <nav className="mt-10">
            <Link href="/dashboard/savings"    className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                  pathname === '/dashboard/savings' ? 'bg-gray-200' : ''
                }`}
              >
            
             
                <FaPiggyBank className="mr-3" />
                Savings
            
            </Link>
            <Link href="/dashboard/credit"      className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                  pathname === '/dashboard/credit' ? 'bg-gray-200' : ''
                }`}>
   
           
              
                <FaCreditCard className="mr-3" />
                Credit
      
            </Link>
            <Link href="/dashboard/insurance"  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                  pathname === '/dashboard/insurance' ? 'bg-gray-200' : ''
                }`}>
    
               
      
                <FaShieldAlt className="mr-3" />
                Insurance
         
            </Link>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {/* Using dynamic routing for different sections */}
          {pathname === '/dashboard/savings' && <Savings />}
          {pathname === '/dashboard/credit' && <Credit />}
          {pathname === '/dashboard/insurance' && <Insurance />}
          {/* Default Content */}
          {pathname === '/dashboard' && (
            <div className="text-center mt-20">
              <h2 className="text-2xl font-semibold">Welcome to Your Dashboard!</h2>
              <p className="mt-4 text-gray-600">Select a section from the sidebar to get started.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
