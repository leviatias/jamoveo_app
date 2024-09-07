'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../../hooks/userContext';

export default function LoginPage() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const { login } = useUser();
	const router = useRouter();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			console.log('Sending login request with:', formData);
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			console.log('Response status:', response.status);
			const data = await response.json();
			console.log('Response data:', data);

			if (!response.ok) {
				throw new Error(data.message || 'Login failed');
			}

			console.log('Login successful:', data);

			login(data.user);

			// Redirect to dashboard after successful login
			router.push('/');
		} catch (error) {
			console.error('Login error:', error);
			setError(error.message);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-100 to-white flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-3xl font-bold mb-6 text-center text-primary">
					Login to JaMoveo
				</h2>
				{error && (
					<div
						className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
						role="alert">
						<span className="block sm:inline">{error}</span>
					</div>
				)}
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							className="text-primary mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
							onChange={handleChange}
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							required
							className="text-primary mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
							onChange={handleChange}
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-primaryhover focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50">
						Log In
					</button>
				</form>
				<p className="mt-4 text-center text-sm text-gray-600">
					Don't have an account?{' '}
					<Link href="/register" className="text-primary hover:text-secondary">
						Register here
					</Link>
				</p>
			</div>
		</div>
	);
}
