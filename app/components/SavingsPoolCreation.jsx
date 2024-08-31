// File: components/SavingsPoolCreation.js
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Button } from '../../components/ui/button';

import { createSavingsPool } from '../lib/api';

const SavingsPoolCreation = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSavingsPool(name, description, parseFloat(goal));
      setName('');
      setDescription('');
      setGoal('');
      if (onCreated) onCreated();
    } catch (error) {
      console.error('Failed to create savings pool:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Create New Savings Pool</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pool Name"
            required
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <Input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Savings Goal"
            required
          />
          <Button type="submit">Create Savings Pool</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SavingsPoolCreation;