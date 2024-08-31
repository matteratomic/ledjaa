// pages/api/insurance.js

import { InsuranceSmartContract } from '../../lib/InsuranceSmartContract';

const contract = new InsuranceSmartContract();

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return handlePost(req, res);
    case 'GET':
      return handleGet(req, res);
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function handlePost(req, res) {
  const { action } = req.body;

  switch (action) {
    case 'createCommunity':
      const { communityId, members, premium, requiredVotes } = req.body;
      contract.createCommunity(communityId, members, premium, requiredVotes);
      return res.status(200).json({ message: 'Community created successfully' });

    case 'payPremium':
      const { communityId: paymentCommunityId, member, amount } = req.body;
      const success = contract.payPremium(paymentCommunityId, member, amount);
      return res.status(success ? 200 : 400).json({ message: success ? 'Premium paid successfully' : 'Failed to pay premium' });

    case 'submitClaim':
      const { communityId: claimCommunityId, claimMember, claimAmount, claimDetails } = req.body;
      const claimId = contract.submitClaim(claimCommunityId, claimMember, claimAmount, claimDetails);
      return res.status(claimId ? 200 : 400).json({ claimId, message: claimId ? 'Claim submitted successfully' : 'Failed to submit claim' });

    case 'voteClaim':
      const { claimId: voteClaimId, voter } = req.body;
      const voteSuccess = contract.voteClaim(voteClaimId, voter);
      return res.status(voteSuccess ? 200 : 400).json({ message: voteSuccess ? 'Vote recorded successfully' : 'Failed to record vote' });

    default:
      return res.status(400).json({ message: 'Invalid action' });
  }
}

function handleGet(req, res) {
  const { action, communityId, claimId } = req.query;

  switch (action) {
    case 'getCommunityBalance':
      const balance = contract.getCommunityBalance(communityId);
      return res.status(balance !== null ? 200 : 404).json({ balance });

    case 'getClaimStatus':
      const status = contract.getClaimStatus(claimId);
      return res.status(status !== null ? 200 : 404).json({ status });

    default:
      return res.status(400).json({ message: 'Invalid action' });
  }
}