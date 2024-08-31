// // components/Community.js
// import React, { useState, useEffect } from 'react';
// import { db, auth } from '../lib/firebase';
// import { collection, addDoc, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
// import { Input, Textarea } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";

// const Community = () => {
//   const [communityName, setCommunityName] = useState('');
//   const [description, setDescription] = useState('');
//   const [communities, setCommunities] = useState([]);
//   const [user, setUser] = useState(null);
//   const [joinCommunityId, setJoinCommunityId] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredCommunities, setFilteredCommunities] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         fetchCommunities();
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const fetchCommunities = async () => {
//     const q = query(collection(db, 'communities'));
//     const querySnapshot = await getDocs(q);
//     const communitiesData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
//     setCommunities(communitiesData);
//     setFilteredCommunities(communitiesData);
//   };

//   const handleCreateCommunity = async (e) => {
//     e.preventDefault();
//     if (user && communityName.trim() !== '') {
//       const newCommunity = {
//         name: communityName,
//         description,
//         creatorId: user.uid,
//         memberIds: [user.uid],
//       };
//       await addDoc(collection(db, 'communities'), newCommunity);
//       fetchCommunities(); // Refresh community list
//       setCommunityName('');
//       setDescription('');
//     }
//   };

//   const handleJoinCommunity = async (communityId) => {
//     if (user) {
//       const communityRef = doc(db, 'communities', communityId);
//       await updateDoc(communityRef, {
//         memberIds: arrayUnion(user.uid),
//       });
//       fetchCommunities(); // Refresh community list
//     }
//   };

//   const handleSearch = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     if (term.trim() === '') {
//       setFilteredCommunities(communities);
//     } else {
//       const filtered = communities.filter(community =>
//         community.name.toLowerCase().includes(term.toLowerCase())
//       );
//       setFilteredCommunities(filtered);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Communities</h2>
      
//       {/* Create Community */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h3 className="text-xl font-semibold mb-4">Create a New Community</h3>
//         <form onSubmit={handleCreateCommunity} className="space-y-4">
//           <Input
//             type="text"
//             placeholder="Community Name"
//             value={communityName}
//             onChange={(e) => setCommunityName(e.target.value)}
//             className="w-full"
//             required
//           />
//           <Textarea
//             placeholder="Description"
//             value={description}
//             onChange={(
