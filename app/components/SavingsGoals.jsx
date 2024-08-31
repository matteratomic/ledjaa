import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Progress } from '../../../components/ui/progress';
import { useApp } from '../../lib/app-context';
import { setGoal, claimReward } from '../../lib/api';

const SavingsGoals = () => {
  const { savingsPools, setSavingsPools } = useApp();
  const [selectedPool, setSelectedPool] = useState(null);
  const [newGoal, setNewGoal] = useState('');

  const handleSetGoal = async () => {
    if (selectedPool && newGoal) {
      try {
        await setGoal(selectedPool.id, parseFloat(newGoal));
        // Update local state
        const updatedPools = savingsPools.map(p =>
          p.id === selectedPool.id ? { ...p, goal: parseFloat(newGoal) } : p
        );
        setSavingsPools(updatedPools);
        setNewGoal('');
      } catch (error) {
        console.error('Failed to set goal:', error);
        // Show error message to user
      }
    }
  };

  const handleClaimReward = async (poolId) => {
    try {
      await claimReward(poolId);
      // Update local state (e.g., mark reward as claimed)
      const updatedPools = savingsPools.map(p =>
        p.id === poolId ? { ...p, rewardClaimed: true } : p
      );
      setSavingsPools(updatedPools);
    } catch (error) {
      console.error('Failed to claim reward:', error);
      // Show error message to user
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Savings Goals</h2>
      </CardHeader>
      <CardContent>
        {savingsPools.map(pool => (
          <div key={pool.id} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{pool.name}</h3>
            <Progress value={(pool.balance / pool.goal) * 100} className="mb-2" />
            <p>Balance: ${pool.balance} / Goal: ${pool.goal}</p>
            {pool.balance >= pool.goal && !pool.rewardClaimed && (
              <Button onClick={() => handleClaimReward(pool.id)} className="mt-2">
                Claim Reward
              </Button>
            )}
          </div>
        ))}

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Set New Goal</h3>
          <select
            onChange={(e) => setSelectedPool(savingsPools.find(p => p.id === e.target.value))}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="">Select a pool</option>
            {savingsPools.map(pool => (
              <option key={pool.id} value={pool.id}>{pool.name}</option>
            ))}
          </select>
          <Input
            type="number"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="New Goal Amount"
            className="mb-2"
          />
          <Button onClick={handleSetGoal}>Set Goal</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsGoals;