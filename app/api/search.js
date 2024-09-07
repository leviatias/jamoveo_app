import clientPromise from '../../../lib/mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const session = await getSession({ req });
	if (!session) {
		return res.status(401).json({ message: 'Not authenticated' });
	}

	const { query, language } = req.query;

	const client = await clientPromise;
	const db = client.db();

	const songs = await db
		.collection('songs')
		.find({
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ artist: { $regex: query, $options: 'i' } },
			],
			language: language,
		})
		.toArray();

	res.status(200).json(songs);
}
