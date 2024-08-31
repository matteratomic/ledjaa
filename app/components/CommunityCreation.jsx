"use client"
import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, query, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from  '../../components/ui/input';
import { Textarea } from  "../../components/ui/textarea";
import { Button } from  '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from  '../../components/ui/select';
import { Switch } from  '../../components/ui/switch';
import { Label } from  '../../components/ui/label';
import { Alert, AlertDescription, AlertTitle } from  '../../components/ui/alert';
import { Users, UserPlus, Shield } from 'lucide-react';

const Community = () => {
  const [communityName, setCommunityName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [maxMembers, setMaxMembers] = useState('');
  const [rules, setRules] = useState('');
  const [communities, setCommunities] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

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
      if (!communityName || !description || !category) {
        setError('Please fill in all required fields.');
        return;
      }
      const newCommunity = {
        name: communityName,
        description,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
        isPrivate,
        maxMembers: parseInt(maxMembers) || null,
        rules,
        creatorId: user.uid,
        memberIds: [user.uid],
        createdAt: new Date(),
      };
      try {
        await addDoc(collection(db, 'communities'), newCommunity);
        fetchCommunities();
        resetForm();
        setError('');
      } catch (err) {
        setError('Failed to create community. Please try again.');
      }
    }
  };

  const handleJoinCommunity = async (communityId) => {
    if (user) {
      try {
        const communityRef = doc(db, 'communities', communityId);
        await updateDoc(communityRef, {
          memberIds: arrayUnion(user.uid),
        });
        fetchCommunities();
      } catch (err) {
        setError('Failed to join community. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setCommunityName('');
    setDescription('');
    setCategory('');
    setTags('');
    setIsPrivate(false);
    setMaxMembers('');
    setRules('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Community Hub</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create a New Community</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleCreateCommunity(); }} className="space-y-4">
            <div>
              <Label htmlFor="communityName">Community Name*</Label>
              <Input
                id="communityName"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="Enter community name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your community"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category*</Label>
              <Select onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., coding, web development, react"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="isPrivate"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
              <Label htmlFor="isPrivate">Private Community</Label>
            </div>
            
            <div>
              <Label htmlFor="maxMembers">Max Members (optional)</Label>
              <Input
                id="maxMembers"
                type="number"
                value={maxMembers}
                onChange={(e) => setMaxMembers(e.target.value)}
                placeholder="Leave blank for unlimited"
              />
            </div>
            
            <div>
              <Label htmlFor="rules">Community Rules</Label>
              <Textarea
                id="rules"
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                placeholder="Enter community rules and guidelines"
              />
            </div>
            
            <Button type="submit" className="w-full">
              <UserPlus className="mr-2 h-4 w-4" /> Create Community
            </Button>
          </form>
          
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Join Existing Communities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {communities.map(community => (
              <li key={community.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <div>
                  <h3 className="font-semibold">{community.name}</h3>
                  <p className="text-sm text-gray-600">{community.description}</p>
                </div>
                <Button onClick={() => handleJoinCommunity(community.id)} variant="outline">
                  <Users className="mr-2 h-4 w-4" /> Join
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Community;