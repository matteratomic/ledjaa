import { db } from '@/lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { poolId, amount } = req.body;
    try {
      const poolRef = db.collection('savingsPools').doc(poolId);
      await db.runTransaction(async (transaction) => {
        const poolDoc = await transaction.get(poolRef);
        if (!poolDoc.exists) {
          throw new Error('Savings pool not found');
        }
        const newBalance = poolDoc.data().balance - amount;
        if (newBalance < 0) {
          throw new Error('Insufficient funds');
        }
        transaction.update(poolRef, { balance: newBalance });
      });
      res.status(200).json({ message: 'Withdrawal successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}