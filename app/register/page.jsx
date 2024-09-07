'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../../hooks/userContext';
export default function RegisterPage() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		instrument: '',
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
			console.log('Sending registration data:', formData);
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			console.log('Response status:', response.status);
			const responseData = await response.json();
			console.log('Response data:', responseData);

			if (!response.ok) {
				throw new Error(responseData.message || 'Registration failed');
			}

			console.log('Registration successful:', responseData);
			login(formData);
			router.push('/');
		} catch (error) {
			console.error('Registration error:', error);
			setError(error.message || 'An unexpected error occurred');
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-3xl font-bold mb-6 text-center text-primary">
					Register for JaMoveo
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
							htmlFor="username"
							className="block text-sm font-medium text-gray-700">
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							required
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50 text-black"
							onChange={handleChange}
						/>
					</div>
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
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50 text-black"
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
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50 text-black"
							onChange={handleChange}
						/>
					</div>
					<div>
						<label
							htmlFor="instrument"
							className="block text-sm font-medium text-gray-700">
							Instrument
						</label>
						<select
							id="instrument"
							name="instrument"
							required
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50 text-black"
							onChange={handleChange}>
							<option value="">Select an instrument</option>
							<option value="guitar">Guitar</option>
							<option value="bass">Bass</option>
							<option value="drums">Drums</option>
							<option value="keyboard">Keyboard</option>
							<option value="vocals">Vocals</option>
						</select>
					</div>
					<button
						type="submit"
						className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-primaryhover focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50">
						Register
					</button>
				</form>
				<p className="mt-4 text-center text-sm text-gray-600">
					Already have an account?{' '}
					<Link href="/login" className="text-primary hover:text-secondary">
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
}
