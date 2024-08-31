// components/Credit.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Input, Textarea } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const Credit = () => {
  const [credits, setCredits] = useState([]);
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [repaymentPeriod, setRepaymentPeriod] = useState("");

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
        repaymentPeriod, // e.g., in months
      };
      await addDoc(collection(db, 'credits'), newCredit);
      setCredits([...credits, newCredit]);
      setAmount("");
      setReason("");
      setRepaymentPeriod("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Credit</h2>
      
      <form onSubmit={handleRequestCredit} className="space-y-4 mb-6">
        <Input
          type="number"
          placeholder="Enter credit amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full"
          required
        />
        <Textarea
          placeholder="Reason for credit request"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full"
          required
        />
        <Input
          type="number"
          placeholder="Repayment period (months)"
          value={repaymentPeriod}
          onChange={(e) => setRepaymentPeriod(e.target.value)}
          className="w-full"
          required
        />
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
          Request Credit
        </Button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Your Credit Requests</h3>
      <ul>
        {credits.map(credit => (
          <li key={credit.id} className="mb-2">
            - ${credit.amount} on {credit.date} ({credit.status}) - {credit.reason} - Repayment: {credit.repaymentPeriod} months
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Credit;
