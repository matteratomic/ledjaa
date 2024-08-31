import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FaCreditCard, FaMoneyBillWave, FaCalendarAlt, FaQuestionCircle, FaInfoCircle } from "react-icons/fa";

const Credit = () => {
  const [credits, setCredits] = useState([]);
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [repaymentPeriod, setRepaymentPeriod] = useState("");
  const [showTip, setShowTip] = useState(false);
  const [totalCredit, setTotalCredit] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchCredits(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCredits = async (userId) => {
    const q = query(collection(db, 'credits'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const creditsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setCredits(creditsData);
    calculateTotalCredit(creditsData);
  };

  const calculateTotalCredit = (creditsData) => {
    const total = creditsData.reduce((acc, credit) => acc + credit.amount, 0);
    setTotalCredit(total);
  };

  const handleRequestCredit = async (e) => {
    e.preventDefault();
    if (user) {
      const newCredit = {
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        userId: user.uid,
        reason,
        repaymentPeriod: parseInt(repaymentPeriod),
      };
      await addDoc(collection(db, 'credits'), newCredit);
      fetchCredits(user.uid);
      setAmount("");
      setReason("");
      setRepaymentPeriod("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-2 rounded-full bg-white shadow-lg">
            <FaCreditCard className="h-16 w-16 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Credit Requests</div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Need a Loan?</h2>
            
            <form onSubmit={handleRequestCredit} className="space-y-4 mb-6">
              <div className="relative">
                <FaMoneyBillWave className="absolute top-3 left-3 text-gray-400" />
                <Input
                  type="number"
                  placeholder="Enter credit amount ($)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="relative">
                <FaQuestionCircle className="absolute top-3 left-3 text-gray-400" />
                <Input
                  as="textarea"
                  placeholder="Reason for credit request"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="relative">
                <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
                <Input
                  type="number"
                  placeholder="Repayment period (months)"
                  value={repaymentPeriod}
                  onChange={(e) => setRepaymentPeriod(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300"
              >
                Request Credit
              </Button>
            </form>

            {credits.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Credit Requests</h3>
                <ul className="space-y-3">
                  {credits.map(credit => (
                    <li key={credit.id} className="bg-gray-50 p-3 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">${credit.amount.toFixed(2)}</span>
                        <span className={`text-sm px-2 py-1 rounded ${credit.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                          {credit.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <div>Reason: {credit.reason}</div>
                        <div>Date: {credit.date}</div>
                        <div>Repayment: {credit.repaymentPeriod} months</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right">
                  <span className="text-lg font-semibold">Total Credit: ${totalCredit.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="mt-6 relative">
              <FaInfoCircle 
                className="text-indigo-500 cursor-pointer" 
                onMouseEnter={() => setShowTip(true)}
                onMouseLeave={() => setShowTip(false)}
              />
              {showTip && (
                <div className="absolute bottom-full left-0 mb-2 p-2 bg-white rounded shadow-lg text-sm text-gray-700">
                  Remember to borrow responsibly and consider your ability to repay.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credit;