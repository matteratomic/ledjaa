import { db } from '@/lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const communitiesSnapshot = await db.collection('communities').get();
      const communities = communitiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.status(200).json({ communities });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch communities' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}