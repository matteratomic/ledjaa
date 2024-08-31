"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Button } from '../../components/ui/button';
import { getUserProfile, updateUserProfile } from '../lib/api';
import {useAuth} from  '../lib/auth';


const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    try {
      const data = await getUserProfile(user.uid);
      setProfile(data);
      setName(data.name || '');
      setEmail(data.email || '');
    } catch (error) {
      console.error('Failed to load user profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(user.uid, { name, email });
      loadUserProfile();
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">User Profile</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            type="email"
          />
          <Button type="submit">Update Profile</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfile;