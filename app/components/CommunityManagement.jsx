import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { useApp } from '../../lib/app-context';
import { joinCommunity, leaveCommunity } from '../../lib/api';

const CommunityManagement = () => {
  const { communities, setCommunities } = useApp();
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  const handleJoinCommunity = async () => {
    try {
      await joinCommunity(selectedCommunity.id, joinCode);
      // Update the local state
      const updatedCommunities = communities.map(c =>
        c.id === selectedCommunity.id ? { ...c, isMember: true } : c
      );
      setCommunities(updatedCommunities);
      setIsJoinDialogOpen(false);
    } catch (error) {
      console.error('Failed to join community:', error);
      // Show error message to user
    }
  };

  const handleLeaveCommunity = async (communityId) => {
    try {
      await leaveCommunity(communityId);
      // Update the local state
      const updatedCommunities = communities.map(c =>
        c.id === communityId ? { ...c, isMember: false } : c
      );
      setCommunities(updatedCommunities);
    } catch (error) {
      console.error('Failed to leave community:', error);
      // Show error message to user
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Manage Communities</h2>
      </CardHeader>
      <CardContent>
        {communities.map(community => (
          <div key={community.id} className="flex justify-between items-center mb-4">
            <span>{community.name}</span>
            {community.isMember ? (
              <Button onClick={() => handleLeaveCommunity(community.id)} variant="destructive">
                Leave
              </Button>
            ) : (
              <Button onClick={() => {
                setSelectedCommunity(community);
                setIsJoinDialogOpen(true);
              }}>
                Join
              </Button>
            )}
          </div>
        ))}

        <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Community</DialogTitle>
              <DialogDescription>
                Enter the join code for {selectedCommunity?.name}
              </DialogDescription>
            </DialogHeader>
            <Input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Join Code"
            />
            <Button onClick={handleJoinCommunity}>Join</Button>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CommunityManagement;