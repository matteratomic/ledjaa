import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Modal } from '../components/ui/Modal';
import { Input } from "../../components/ui/input";
import { FaWallet, FaMoneyBillWave, FaCalendarAlt, FaPiggyBank, FaChartLine, FaInfoCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { db, auth } from "../lib/firebase";
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Savings = () => {
  const [amount, setAmount] = useState("");
  const [savingsGoal, setSavingsGoal] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [contributionFrequency, setContributionFrequency] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [user, setUser] = useState(null);
  const [totalSavings, setTotalSavings] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchTotalSavings(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTotalSavings = async (userId) => {
    const q = query(collection(db, 'savings'), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let total = 0;
    querySnapshot.forEach((doc) => {
      total += doc.data().amount;
    });
    setTotalSavings(total);
  };

  const handleSavings = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPaymentMethod("");
    setWalletAddress("");
  };

  const handlePaymentMethod = async (method) => {
    if (user) {
      let paymentDetails = {};
      if (method === "crypto") {
        paymentDetails = { paymentMethod: "Crypto Wallet", walletAddress };
      } else {
        paymentDetails = { paymentMethod: "Traditional Payment" };
        redirectToPaystack();
      }

      const newSaving = {
        amount: parseFloat(amount),
        savingsGoal,
        targetDate,
        contributionFrequency,
        date: new Date().toISOString().split('T')[0],
        userId: user.uid,
        ...paymentDetails,
      };

      await addDoc(collection(db, 'savings'), newSaving);
      fetchTotalSavings(user.uid);
      resetForm();
    }
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setAmount("");
    setSavingsGoal("");
    setTargetDate("");
    setContributionFrequency("");
    setPaymentMethod("");
    setWalletAddress("");
  };

  const redirectToPaystack = () => {
    router.push("https://paystack.com/pay/ro637qr3x1");
  };

  const calculateProgress = () => {
    const goalAmount = parseFloat(savingsGoal);
    if (goalAmount > 0) {
      return Math.min((totalSavings / goalAmount) * 100, 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-2 rounded-full bg-white shadow-lg">
            <FaPiggyBank className="h-16 w-16 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Smart Savings</div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Plan Your Future</h2>
            <div className="space-y-4">
              <div className="relative">
                <FaMoneyBillWave className="absolute top-3 left-3 text-gray-400" />
                <Input
                  type="number"
                  placeholder="Amount to save"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="relative">
                <FaChartLine className="absolute top-3 left-3 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Savings goal"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="relative">
                <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
                <Input
                  type="date"
                  placeholder="Target date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <select
                value={contributionFrequency}
                onChange={(e) => setContributionFrequency(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select frequency</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
              <Button
                onClick={handleSavings}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300"
              >
                Start Saving
              </Button>
            </div>

            {totalSavings > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Progress</h3>
                <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Total Savings: ${totalSavings.toFixed(2)} / ${savingsGoal || '0'}
                </p>
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
                  Regular savings, even small amounts, can make a big difference over time!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Choose Payment Method</h3>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center py-3 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => handlePaymentMethod("crypto")}
          >
            <FaWallet className="mr-2" />
            Crypto Wallet
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center py-3 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => handlePaymentMethod("traditional")}
          >
            <FaMoneyBillWave className="mr-2" />
            Traditional Payment
          </Button>
        </div>

        {paymentMethod === "crypto" && (
          <div className="mt-6">
            <Input
              type="text"
              placeholder="Enter Wallet Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mb-4"
            />
            <Button
              onClick={() => handlePaymentMethod("crypto")}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition duration-300"
            >
              Confirm Wallet Address
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Savings;