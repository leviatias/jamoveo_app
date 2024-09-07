import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
	console.log('Login API called');
	try {
		const { email, password } = await request.json();
		console.log('Received login attempt for email:', email);

		const client = await clientPromise;
		const db = client.db('jamoveo');

		const user = await db.collection('users').findOne({ email });
		if (!user) {
			console.log('User not found for email:', email);
			return NextResponse.json(
				{ message: 'Invalid credentials' },
				{ status: 400 }
			);
		}
		console.log('User found:', user.username);

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			console.log('Invalid password for user:', user.username);
			return NextResponse.json(
				{ message: 'Invalid credentials' },
				{ status: 400 }
			);
		}
		console.log('Password valid for user:', user.username);

		// Instead of generating a token, we'll just send back the user info
		return NextResponse.json(
			{
				user: {
					id: user._id.toString(),
					username: user.username,
					email: user.email,
					instrument: user.instrument,
					isAdmin: user.isAdmin,
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}
