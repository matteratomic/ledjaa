// pages/api/submit-claim.js
import { db } from '@/lib/firebase-admin';
import { verifyIdToken } from '@/lib/auth-admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Verify the user's token
      const token = req.headers.authorization?.split('Bearer ')[1];
      const decodedToken = await verifyIdToken(token);
      const userId = decodedToken.uid;

      const { communityId, amount } = req.body;

      // Validate input
      if (!communityId || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const communityRef = db.collection('communities').doc(communityId);
      const communityDoc = await communityRef.get();

      if (!communityDoc.exists) {
        return res.status(404).json({ error: 'Community not found' });
      }

      const communityData = communityDoc.data();

      // Check if the user is a member of the community
      if (!communityData.members.includes(userId)) {
        return res.status(403).json({ error: 'User is not a member of this community' });
      }

      // Check if the community has enough balance
      if (communityData.balance < amount) {
        return res.status(400).json({ error: 'Insufficient funds in the community' });
      }

      // Process the claim
      await db.runTransaction(async (transaction) => {
        const updatedBalance = communityData.balance - amount;
        transaction.update(communityRef, { balance: updatedBalance });

        // Add claim to user's claims
        const userClaimRef = db.collection('userClaims').doc(userId);
        transaction.set(userClaimRef, {
          claims: db.FieldValue.arrayUnion({
            communityId,
            amount,
            timestamp: db.FieldValue.serverTimestamp()
          })
        }, { merge: true });
      });

      res.status(200).json({ message: 'Claim submitted successfully' });
    } catch (error) {
      console.error('Error processing claim:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}