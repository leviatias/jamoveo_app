import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
	throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export default clientPromise;

export async function getJamoveoUsersCollection() {
	const client = await clientPromise;
	return client.db('jamoveo').collection('users');
}

export async function checkDatabaseConnection() {
	try {
		const client = await clientPromise;
		const db = client.db('jamoveo');

		// Check connection
		await db.command({ ping: 1 });
		console.log('Successfully connected to the database.');

		// Get all collections
		const collections = await db.listCollections().toArray();
		const collectionNames = collections.map((col) => col.name);

		return true;
	} catch (error) {
		console.error('Failed to connect to the database:', error);
		return false;
	}
}
