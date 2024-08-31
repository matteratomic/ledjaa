import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';
"use client"
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent  } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../components/ui/dialog';
import { useAuth } from '../../lib/auth';
import { useApp } from '../../lib/app-context';
import { submitClaim, deposit, withdraw } from '../../lib/api';
import CommunityCreation from '../../components/CommunityCreation';
import SavingsPoolCreation from '../../components/SavingsPoolCreation';
import UserProfile from '../../components/UserProfile';
import Toast from '../../components/Toast';
import CommunityManagement from '../../components/CommunityManagement';
import SavingsGoals from '../../components/SavingsGoals';

const Dashboard = () => {
  const { user } = useAuth();
  const { communities, savingsPools, setCommunities, setSavingsPools, loading } = useApp();
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedPool, setSelectedPool] = useState(null);
  const [claimAmount, setClaimAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('insurance');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleCommunitySelect = (communityId) => {
    const community = communities.find(c => c.id === communityId);
    setSelectedCommunity(community);
  };

  const handlePoolSelect = (poolId) => {
    const pool = savingsPools.find(p => p.id === poolId);
    setSelectedPool(pool);
  };

  const handleSubmitClaim = async () => {
    if (selectedCommunity && claimAmount) {
      try {
        await submitClaim(selectedCommunity.id, parseFloat(claimAmount));
        showToast('Claim submitted successfully', 'success');
        setIsClaimDialogOpen(false);
        setClaimAmount('');
        // Update the community balance
        const updatedCommunities = communities.map(c =>
          c.id === selectedCommunity.id ? { ...c, balance: c.balance - parseFloat(claimAmount) } : c
        );
        setCommunities(updatedCommunities);
      } catch (error) {
        showToast(error.message, 'error');
      }
    }
  };

  const handleDeposit = async () => {
    if (selectedPool && depositAmount) {
      try {
        await deposit(selectedPool.id, parseFloat(depositAmount));
        showToast('Deposit successful', 'success');
        setDepositAmount('');
        // Update the pool balance
        const updatedPools = savingsPools.map(p =>
          p.id === selectedPool.id ? { ...p, balance: p.balance + parseFloat(depositAmount) } : p
        );
        setSavingsPools(updatedPools);
      } catch (error) {
        showToast(error.message, 'error');
      }
    }
  };

  const handleWithdraw = async () => {
    if (selectedPool && withdrawAmount) {
      try {
        await withdraw(selectedPool.id, parseFloat(withdrawAmount));
        showToast('Withdrawal successful', 'success');
        setWithdrawAmount('');
        // Update the pool balance
        const updatedPools = savingsPools.map(p =>
          p.id === selectedPool.id ? { ...p, balance: p.balance - parseFloat(withdrawAmount) } : p
        );
        setSavingsPools(updatedPools);
      } catch (error) {
        showToast(error.message, 'error');
      }
    }
  };


  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 min-h-screen"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-6"
      >
        Welcome, {user?.displayName || 'User'}
      </motion.h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="insurance">Community Insurance</TabsTrigger>
          <TabsTrigger value="savings">Savings Pools</TabsTrigger>
          <TabsTrigger value="communities">Manage Communities</TabsTrigger>
          <TabsTrigger value="profile">User Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="insurance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Community Insurance</h2>
              </CardHeader>
              <CardContent>
                <Select onValueChange={handleCommunitySelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a community" />
                  </SelectTrigger>
                  <SelectContent>
                    {communities.map(community => (
                      <SelectItem key={community.id} value={community.id}>{community.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCommunity && (
                  <div className="mt-4">
                    <p>Balance: ${selectedCommunity.balance}</p>
                    <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="mt-2">Submit Claim</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Submit Insurance Claim</DialogTitle>
                          <DialogDescription>
                            Enter the claim amount for {selectedCommunity.name}
                          </DialogDescription>
                        </DialogHeader>
                        <Input
                          type="number"
                          value={claimAmount}
                          onChange={(e) => setClaimAmount(e.target.value)}
                          placeholder="Claim amount"
                        />
                        <Button onClick={handleSubmitClaim}>Submit Claim</Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>
            <CommunityCreation onCreated={loadData} />
          </div>
        </TabsContent>

        <TabsContent value="savings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Savings Pools</h2>
              </CardHeader>
              <CardContent>
                <Select onValueChange={handlePoolSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a savings pool" />
                  </SelectTrigger>
                  <SelectContent>
                    {savingsPools.map(pool => (
                      <SelectItem key={pool.id} value={pool.id}>{pool.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedPool && (
                  <div className="mt-4">
                    <p>Balance: ${selectedPool.balance}</p>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="Deposit amount"
                      />
                      <Button onClick={handleDeposit}>Deposit</Button>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="Withdraw amount"
                      />
                      <Button onClick={handleWithdraw}>Withdraw</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <SavingsPoolCreation onCreated={loadData} />
          </div>
        </TabsContent>

        <TabsContent value="communities">
          <CommunityManagement />
        </TabsContent>
        <TabsContent value="goals">
          <SavingsGoals />
        </TabsContent>

        <TabsContent value="profile">
          <UserProfile />
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Activity Overview</h2>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={communities}>
                {/* ... (chart components) */}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </motion.div>
  );
};

export default Dashboard;
