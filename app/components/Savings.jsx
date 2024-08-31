// components/Savings.js
'use client';
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Modal } from '../components/ui/Modal';
import { Input } from "../../components/ui/input";
import { FaWallet, FaMoneyBillWave } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { db, auth } from "../lib/firebase";
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Savings = () => {
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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
        // Additional logic for crypto deposits can be added here
      } else {
        paymentDetails = { paymentMethod: "Traditional Payment" };
        redirectToPaystack();
      }

      const newSaving = {
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0],
        userId: user.uid,
        ...paymentDetails,
      };

      await addDoc(collection(db, 'savings'), newSaving);
      setIsModalOpen(false);
      setAmount("");
      setPaymentMethod("");
      setWalletAddress("");
      // Optionally, refresh data or notify the user
    }
  };

  const redirectToPaystack = () => {
    // Implement Paystack redirection logic
    router.push("/paystack-redirect");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Savings</h2>
        <Input
          type="number"
          placeholder="Enter amount to save"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleSavings} className="w-full">
          Add Savings/Contribute
        </Button>

        <Modal isOpen={isModalOpen} onClose={handleModalClose} className="max-w-md mx-auto p-6">
          <h3 className="text-xl font-bold mb-4">Choose Payment Method</h3>
          <div className="flex flex-col space-y-4">
            <Button
              variant="outline"
              className="flex items-center justify-center"
              onClick={() => handlePaymentMethod("crypto")}
            >
              <FaWallet className="mr-2" />
              Crypto Wallet
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center"
              onClick={() => handlePaymentMethod("traditional")}
            >
              <FaMoneyBillWave className="mr-2" />
              Traditional Payment (Bank/Mobile Money)
            </Button>
          </div>

          {paymentMethod === "crypto" && (
            <div className="mt-6">
              <Input
                type="text"
                placeholder="Enter Wallet Address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="mb-4"
              />
              <Button onClick={() => handlePaymentMethod("crypto")} className="w-full">
                Save Wallet Address
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Savings;
