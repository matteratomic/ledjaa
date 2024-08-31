import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Community = () => {
  const [communityName, setCommunityName] = useState('');
  const [description, setDescription] = useState('');
  const [communities, setCommunities] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchCommunities();
      }
    });
  }, []);

  const fetchCommunities = async () => {
    const q = query(collection(db, 'communities'));
    const querySnapshot = await getDocs(q);
    const communitiesData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setCommunities(communitiesData);
  };

  const handleCreateCommunity = async () => {
    if (user) {
      const newCommunity = {
        name: communityName,
        description,
        creatorId: user.uid,
        memberIds: [user.uid],
      };
      await addDoc(collection(db, 'communities'), newCommunity);
      fetchCommunities(); // Refresh community list
    }
  };

  const handleJoinCommunity = async (communityId) => {
    if (user) {
      const communityRef = doc(db, 'communities', communityId);
      await updateDoc(communityRef, {
        memberIds: arrayUnion(user.uid),
      });
      fetchCommunities(); // Refresh community list
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Communities</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Community Name"
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
          className="p-2 border mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border mb-2"
        />
        <button
          onClick={handleCreateCommunity}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Community
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-4">Join an Existing Community</h3>
      <ul>
        {communities.map(community => (
          <li key={community.id} className="mb-2">
            {community.name} - {community.description}
            <button
              onClick={() => handleJoinCommunity(community.id)}
              className="ml-4 bg-green-500 text-white px-2 py-1 rounded"
            >
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Community;
