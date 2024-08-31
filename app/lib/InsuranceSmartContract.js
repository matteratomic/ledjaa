// InsuranceSmartContract.js

const { Block, Blockchain } = require('./SimpleBlockchain');


class InsuranceSmartContract {
  constructor() {
    this.blockchain = new Blockchain();
    this.communities = {};
    this.claims = {};
  }

  createCommunity(communityId, members, premium, requiredVotes) {
    this.communities[communityId] = { members, premium, requiredVotes, balance: 0 };
    this.blockchain.addBlock(new Block(Date.now(), { action: 'createCommunity', communityId, members }));
  }

  payPremium(communityId, member, amount) {
    if (this.communities[communityId] && this.communities[communityId].members.includes(member)) {
      this.communities[communityId].balance += amount;
      this.blockchain.addBlock(new Block(Date.now(), { action: 'payPremium', communityId, member, amount }));
      return true;
    }
    return false;
  }

  submitClaim(communityId, member, claimAmount, claimDetails) {
    if (this.communities[communityId] && this.communities[communityId].members.includes(member)) {
      const claimId = Date.now().toString();
      this.claims[claimId] = { communityId, member, claimAmount, claimDetails, votes: 0, status: 'pending' };
      this.blockchain.addBlock(new Block(Date.now(), { action: 'submitClaim', claimId, communityId, member, claimAmount }));
      return claimId;
    }
    return null;
  }

  voteClaim(claimId, voter) {
    const claim = this.claims[claimId];
    if (claim && this.communities[claim.communityId].members.includes(voter)) {
      claim.votes++;
      this.blockchain.addBlock(new Block(Date.now(), { action: 'voteClaim', claimId, voter }));
      
      if (claim.votes >= this.communities[claim.communityId].requiredVotes) {
        this.processClaim(claimId);
      }
      return true;
    }
    return false;
  }

  processClaim(claimId) {
    const claim = this.claims[claimId];
    if (claim && claim.status === 'pending') {
      if (this.communities[claim.communityId].balance >= claim.claimAmount) {
        this.communities[claim.communityId].balance -= claim.claimAmount;
        claim.status = 'approved';
        this.blockchain.addBlock(new Block(Date.now(), { action: 'processClaim', claimId, status: 'approved' }));
      } else {
        claim.status = 'rejected';
        this.blockchain.addBlock(new Block(Date.now(), { action: 'processClaim', claimId, status: 'rejected' }));
      }
    }
  }

  getCommunityBalance(communityId) {
    return this.communities[communityId] ? this.communities[communityId].balance : null;
  }

  getClaimStatus(claimId) {
    return this.claims[claimId] ? this.claims[claimId].status : null;
  }
}

module.exports = InsuranceSmartContract;