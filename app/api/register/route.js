import { getJamoveoUsersCollection } from '../../lib/mongodb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
	console.log('Registration API called with POST method');

	try {
		const { username, email, password, instrument } = await request.json();
		console.log('Received registration data:', { username, email, instrument });

		console.log('Attempting to get users collection');
		const usersCollection = await getJamoveoUsersCollection();
		console.log('Successfully got users collection');

		// Check if user already exists
		console.log('Checking if user already exists with email:', email);
		const existingUser = await usersCollection.findOne({ email });
		if (existingUser) {
			console.log('User already exists with email:', email);
			return NextResponse.json(
				{ message: 'User already exists' },
				{ status: 400 }
			);
		}
		console.log('No existing user found with this email');

		// Hash the password
		console.log('Hashing password');
		const hashedPassword = await bcrypt.hash(password, 12);
		console.log('Password hashed successfully');

		// Create new user
		console.log('Attempting to insert new user');
		const result = await usersCollection.insertOne({
			username,
			email,
			password: hashedPassword,
			instrument,
			isAdmin: false,
		});
		console.log('User inserted successfully with ID:', result.insertedId);

		return NextResponse.json(
			{ message: 'User created', userId: result.insertedId },
			{ status: 201 }
		);
	} catch (error) {
		console.error('Registration error:', error);
		return NextResponse.json(
			{ message: 'Internal server error', error: error.message },
			{ status: 500 }
		);
	}
}
