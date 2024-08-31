import { db } from '@/lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query;
    const { goal } = req.body;

    try {
      const poolRef = db.collection('savingsPools').doc(id);
      await poolRef.update({ goal });
      res.status(200).json({ message: 'Goal set successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}