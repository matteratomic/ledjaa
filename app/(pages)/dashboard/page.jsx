// pages/dashboard.js
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaPiggyBank, FaCreditCard, FaShieldAlt } from 'react-icons/fa';
import Savings from '../../components/Savings';
import Credit from '../../components/Credit';
import Insurance from '../../components/Insurance';
import Community from '../../components/CommunityCreation';
import { db, auth } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {FaUsers} from 'react-icons/fa'
import { onAuthStateChanged } from 'firebase/auth';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [savingsData, setSavingsData] = useState([]);
  const [creditsData, setCreditsData] = useState([]);
  const [insuranceData, setInsuranceData] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchData(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = async (userId) => {
    // Fetch Savings
    const savingsQuery = query(collection(db, 'savings'), where('userId', '==', userId));
    const savingsSnapshot = await getDocs(savingsQuery);
    const savings = savingsSnapshot.docs.map(doc => doc.data());
    setSavingsData(savings);

    // Fetch Credits
    const creditsQuery = query(collection(db, 'credits'), where('userId', '==', userId));
    const creditsSnapshot = await getDocs(creditsQuery);
    const credits = creditsSnapshot.docs.map(doc => doc.data());
    setCreditsData(credits);

    // Fetch Insurance Claims
    const insuranceQuery = query(collection(db, 'insuranceClaims'), where('userId', '==', userId));
    const insuranceSnapshot = await getDocs(insuranceQuery);
    const insurance = insuranceSnapshot.docs.map(doc => doc.data());
    setInsuranceData(insurance);
  };

  // Prepare data for Charts

  // Savings Over Time
  const savingsByMonth = savingsData.reduce((acc, curr) => {
    const month = curr.date.substring(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + parseFloat(curr.amount);
    return acc;
  }, {});

  const savingsChartData = {
    labels: Object.keys(savingsByMonth).sort(),
    datasets: [
      {
        label: 'Savings ($)',
        data: Object.values(savingsByMonth),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Credit Status
  const creditStatus = creditsData.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const creditChartData = {
    labels: Object.keys(creditStatus),
    datasets: [
      {
        label: 'Credit Requests',
        data: Object.values(creditStatus),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  // Insurance Claims Status
  const insuranceStatus = insuranceData.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const insuranceChartData = {
    labels: Object.keys(insuranceStatus),
    datasets: [
      {
        label: 'Insurance Claims',
        data: Object.values(insuranceStatus),
        backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
      },
    ],
  };

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
            <Link href="/dashboard/savings" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${pathname === '/dashboard/savings' ? 'bg-gray-200' : ''}`}>
              <FaPiggyBank className="mr-3" />
              Savings
            </Link>
            <Link href="/dashboard/credit" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${pathname === '/dashboard/credit' ? 'bg-gray-200' : ''}`}>
              <FaCreditCard className="mr-3" />
              Credit
            </Link>
            <Link href="/dashboard/insurance" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${pathname === '/dashboard/insurance' ? 'bg-gray-200' : ''}`}>
              <FaShieldAlt className="mr-3" />
              Insurance
            </Link>
            <Link href="/dashboard/Investment" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${pathname === '/dashboard/insurance' ? 'bg-gray-200' : ''}`}>
              <FaShieldAlt className="mr-3" />
              Investment Options
            </Link>
            <Link href="/dashboard/community" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${pathname === '/dashboard/community' ? 'bg-gray-200' : ''}`}>
              {/* Use an appropriate icon for Community */}
              <FaUsers className="mr-3" />
              Community
            </Link>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Using dynamic routing for different sections */}
          {pathname === '/dashboard/savings' && <Savings />}
          {pathname === '/dashboard/credit' && <Credit />}
          {pathname === '/dashboard/insurance' && <Insurance />}
          {pathname === '/dashboard/community' && <Community />}

          {/* Default Dashboard Analytics */}
          {pathname === '/dashboard' && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-6">Your Financial Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Savings Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">Savings Over Time</h3>
                  <Line data={savingsChartData} />
                </div>

                {/* Credit Status Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">Credit Requests Status</h3>
                  <Pie data={creditChartData} />
                </div>

                {/* Insurance Claims Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">Insurance Claims Status</h3>
                  <Bar data={insuranceChartData} options={{ indexAxis: 'y' }} />
                </div>
              </div>

              {/* Detailed Tables */}
              <div className="mt-10">
                {/* Savings Table */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-xl font-bold mb-4">Your Savings</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount ($)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {savingsData.map((saving, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{saving.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">${saving.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{saving.paymentMethod}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Credit Requests Table */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-xl font-bold mb-4">Your Credit Requests</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount ($)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {creditsData.map((credit, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{credit.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">${credit.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap capitalize">{credit.status}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{credit.reason || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Insurance Claims Table */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">Your Insurance Claims</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount ($)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {insuranceData.map((claim, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{claim.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">${claim.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap capitalize">{claim.status}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{claim.description || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
