import { db } from '@/lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const poolsSnapshot = await db.collection('savingsPools').get();
      const pools = poolsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.status(200).json({ pools });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch savings pools' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}