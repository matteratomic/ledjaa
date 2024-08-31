export const fetchCommunities = async () => {
    const response = await fetch('/api/communities');
    if (!response.ok) {
      throw new Error('Failed to fetch communities');
    }
    const data = await response.json();
    return data.communities;
  };
  
  export const fetchSavingsPools = async () => {
    const response = await fetch('/api/savings-pools');
    if (!response.ok) {
      throw new Error('Failed to fetch savings pools');
    }
    const data = await response.json();
    return data.pools;
  };
  
  export const getCommunityBalance = async (communityId) => {
    const response = await fetch(`/api/communities/${communityId}/balance`);
    if (!response.ok) {
      throw new Error('Failed to fetch community balance');
    }
    const data = await response.json();
    return data.balance;
  };
  
  export const getPoolBalance = async (poolId) => {
    const response = await fetch(`/api/savings-pools/${poolId}/balance`);
    if (!response.ok) {
      throw new Error('Failed to fetch pool balance');
    }
    const data = await response.json();
    return data.balance;
  };
  
  export const submitClaim = async (communityId, amount) => {
    const response = await fetch('/api/submit-claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ communityId, amount }),
    });
    if (!response.ok) {
      throw new Error('Failed to submit claim');
    }
    return response.json();
  };

  
  export const deposit = async (poolId, amount) => {
    const response = await fetch('/api/deposit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ poolId, amount }),
    });
    if (!response.ok) {
      throw new Error('Failed to make deposit');
    }
    return response.json();
  };
  
  export const withdraw = async (poolId, amount) => {
    const response = await fetch('/api/withdraw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ poolId, amount }),
    });
    if (!response.ok) {
      throw new Error('Failed to make withdrawal');
    }
    return response.json();
  };
  
  export const createCommunity = async (name, description, isPublic) => {
    const response = await fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, isPublic }),
    });
    if (!response.ok) {
      throw new Error('Failed to create community');
    }
    return response.json();
  };
  
  export const createSavingsPool = async (name, description, goal) => {
    const response = await fetch('/api/savings-pools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, goal }),
    });
    if (!response.ok) {
      throw new Error('Failed to create savings pool');
    }
    return response.json();
  };
  
  export const joinCommunity = async (communityId, userId) => {
    const response = await fetch(`/api/communities/${communityId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error('Failed to join community');
    }
    return response.json();
  };
  
  export const leaveCommunity = async (communityId, userId) => {
    const response = await fetch(`/api/communities/${communityId}/leave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error('Failed to leave community');
    }
    return response.json();
  };
  
  export const getUserProfile = async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    return response.json();
  };
  
  export const updateUserProfile = async (userId, data) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update user profile');
    }
    return response.json();
  };