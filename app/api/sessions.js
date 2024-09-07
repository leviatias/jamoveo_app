import clientPromise from '../../lib/mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const session = await getSession({ req });
	if (!session || !session.user.isAdmin) {
		return res.status(403).json({ message: 'Not authorized' });
	}

	const { name } = req.body;

	const client = await clientPromise;
	const db = client.db();

	const result = await db.collection('sessions').insertOne({
		name,
		createdBy: session.user.id,
		createdAt: new Date(),
	});

	res
		.status(201)
		.json({ message: 'Session created', sessionId: result.insertedId });
}
