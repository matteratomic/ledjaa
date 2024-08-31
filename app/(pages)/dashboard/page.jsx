"use client"
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import {Card, CardHeader, CardContent} from '../../../components/ui/card'

import {Input} from '../../../components/ui/input'

import { Button } from '../../../components/ui/button';
const Dashboard = () => {
  const [communities, setCommunities] = useState([]);
  const [savingsPools, setSavingsPools] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedPool, setSelectedPool] = useState(null);

  useEffect(() => {
    // Fetch communities and savings pools data
    // This is a placeholder and should be replaced with actual API calls
    setCommunities([
      { id: 1, name: 'Community A', balance: 5000 },
      { id: 2, name: 'Community B', balance: 7500 },
    ]);
    setSavingsPools([
      { id: 1, name: 'Pool X', balance: { USD: 1000, BTC: 0.5 }, goal: 5000, progress: 20 },
      { id: 2, name: 'Pool Y', balance: { USD: 2000, ETH: 1 }, goal: 10000, progress: 40 },
    ]);
  }, []);

  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community);
  };

  const handlePoolSelect = (pool) => {
    setSelectedPool(pool);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Community Insurance</h2>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Your Communities</h3>
              {communities.map((community) => (
                <Button
                  key={community.id}
                  onClick={() => handleCommunitySelect(community)}
                  variant={selectedCommunity?.id === community.id ? 'default' : 'outline'}
                  className="mr-2 mb-2"
                >
                  {community.name}
                </Button>
              ))}
            </div>
            {selectedCommunity && (
              <div>
                <h3 className="text-lg font-medium mb-2">{selectedCommunity.name} Details</h3>
                <p>Balance: ${selectedCommunity.balance}</p>
                <Button className="mt-4">Submit Claim</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Savings Pools</h2>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Your Pools</h3>
              {savingsPools.map((pool) => (
                <Button
                  key={pool.id}
                  onClick={() => handlePoolSelect(pool)}
                  variant={selectedPool?.id === pool.id ? 'default' : 'outline'}
                  className="mr-2 mb-2"
                >
                  {pool.name}
                </Button>
              ))}
            </div>
            {selectedPool && (
              <div>
                <h3 className="text-lg font-medium mb-2">{selectedPool.name} Details</h3>
                <p>Goal: ${selectedPool.goal}</p>
                <p>Progress: {selectedPool.progress}%</p>
                <div className="mt-4">
                  <Input type="number" placeholder="Amount" className="mb-2" />
                  <Button className="mr-2">Deposit</Button>
                  <Button variant="outline">Withdraw</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Activity Overview</h2>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={communities}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="balance" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;