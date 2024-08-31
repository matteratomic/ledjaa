// components/Insurance.js
import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Input, Textarea } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const Insurance = () => {
  const [insuranceClaims, setInsuranceClaims] = useState([]);
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchInsuranceClaims(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchInsuranceClaims = async (userId) => {
    const q = query(collection(db, 'insuranceClaims'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const claimsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setInsuranceClaims(claimsData);
  };

  const handleFileClaim = async (e) => {
    e.preventDefault();
    if (user) {
      let fileURL = "";
      if (file) {
        const storageRef = ref(storage, `insuranceClaims/${user.uid}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        fileURL = await getDownloadURL(snapshot.ref);
      }

      const newClaim = {
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        userId: user.uid,
        description,
        fileURL, // URL of the uploaded file
      };
      await addDoc(collection(db, 'insuranceClaims'), newClaim);
      setInsuranceClaims([...insuranceClaims, newClaim]);
      setAmount("");
      setDescription("");
      setFile(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Insurance</h2>
      
      <form onSubmit={handleFileClaim} className="space-y-4 mb-6">
        <Input
          type="number"
          placeholder="Enter claim amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full"
          required
        />
        <Textarea
          placeholder="Description of the claim"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
          required
        />
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
          required
        />
        <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
          File Insurance Claim
        </Button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Your Insurance Claims</h3>
      <ul>
        {insuranceClaims.map(claim => (
          <li key={claim.id} className="mb-2">
            - ${claim.amount} on {claim.date} ({claim.status}) - {claim.description} {claim.fileURL && <a href={claim.fileURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Document</a>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Insurance;
