import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FaUmbrella, FaMoneyBillWave, FaFileAlt, FaUpload, FaInfoCircle } from "react-icons/fa";

const Insurance = () => {
  const [insuranceClaims, setInsuranceClaims] = useState([]);
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const [totalClaims, setTotalClaims] = useState(0);

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
    calculateTotalClaims(claimsData);
  };

  const calculateTotalClaims = (claimsData) => {
    const total = claimsData.reduce((acc, claim) => acc + claim.amount, 0);
    setTotalClaims(total);
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
        fileURL,
      };
      await addDoc(collection(db, 'insuranceClaims'), newClaim);
      fetchInsuranceClaims(user.uid);
      setAmount("");
      setDescription("");
      setFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-2 rounded-full bg-white shadow-lg">
            <FaUmbrella className="h-16 w-16 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold mb-1">Insurance Claims</div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">File a Claim</h2>
            
            <form onSubmit={handleFileClaim} className="space-y-4 mb-6">
              <div className="relative">
                <FaMoneyBillWave className="absolute top-3 left-3 text-gray-400" />
                <Input
                  type="number"
                  placeholder="Enter claim amount ($)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <FaFileAlt className="absolute top-3 left-3 text-gray-400" />
                <Input
                  as="textarea"
                  placeholder="Description of the claim"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="relative">
                <FaUpload className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-green-600 transition duration-300"
              >
                File Insurance Claim
              </Button>
            </form>

            {insuranceClaims.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Insurance Claims</h3>
                <ul className="space-y-3">
                  {insuranceClaims.map(claim => (
                    <li key={claim.id} className="bg-gray-50 p-3 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">${claim.amount.toFixed(2)}</span>
                        <span className={`text-sm px-2 py-1 rounded ${claim.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                          {claim.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <div>Description: {claim.description}</div>
                        <div>Date: {claim.date}</div>
                        {claim.fileURL && (
                          <a href={claim.fileURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            View Document
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right">
                  <span className="text-lg font-semibold">Total Claims: ${totalClaims.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="mt-6 relative">
              <FaInfoCircle 
                className="text-blue-500 cursor-pointer" 
                onMouseEnter={() => setShowTip(true)}
                onMouseLeave={() => setShowTip(false)}
              />
              {showTip && (
                <div className="absolute bottom-full left-0 mb-2 p-2 bg-white rounded shadow-lg text-sm text-gray-700">
                  Make sure to provide accurate information when filing a claim. False claims can lead to serious consequences.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;