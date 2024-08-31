// File: components/CommunityCreation.js
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Button } from '../../components/ui/button';

import { createCommunity } from '../lib/api';

const CommunityCreation = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCommunity(name, description, isPublic);
      setName('');
      setDescription('');
      setIsPublic(false);
      if (onCreated) onCreated();
    } catch (error) {
      console.error('Failed to create community:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Create New Community</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Community Name"
            required
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="public-switch"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <label htmlFor="public-switch">Make community public</label>
          </div>
          <Button type="submit">Create Community</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommunityCreation;