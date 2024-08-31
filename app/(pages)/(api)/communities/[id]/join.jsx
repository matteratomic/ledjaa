import { db } from '@/lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query;
    const { userId } = req.body;

    try {
      const communityRef = db.collection('communities').doc(id);
      await communityRef.update({
        members: db.FieldValue.arrayUnion(userId)
      });
      res.status(200).json({ message: 'Joined community successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
