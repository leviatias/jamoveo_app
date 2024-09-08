'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUserFromSession } from '../utils/AuthUtils'; // Adjust this import based on your project structure
import { useUser } from '../hooks/userContext';
export default function HomePage() {
	const router = useRouter();
	const { user } = useUser();
	const handleStartJamming = () => {
		// If the user is logged in, redirect to the main app page
		// If not, redirect to the login page
		// This is a placeholder - replace with your actual auth check
		// const isLoggedIn = false; // Replace with actual auth check
		if (user) {
			router.push('/main');
		} else {
			router.push('/login');
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
			<main className="container mx-auto px-4 py-16">
				<h1 className="text-5xl font-bold text-center text-primary mb-8">
					Welcome to JaMoveo
				</h1>

				<p className="text-xl text-center text-gray-700 mb-12">
					Enhance your band rehearsals and performances with real-time
					collaboration
				</p>

				<div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
					<h2 className="text-3xl font-semibold text-primary mb-4">
						What is JaMoveo?
					</h2>
					<p className="text-gray-700 mb-4">
						JaMoveo is a web application designed to streamline band rehearsals
						and live performances. It allows band members to synchronize their
						view of lyrics and chords in real-time, enhancing collaboration and
						performance quality.
					</p>
					<h3 className="text-2xl font-semibold text-primary mb-2">
						Key Features:
					</h3>
					<ul className="list-disc list-inside text-gray-700 mb-4">
						<li>Real-time synchronized lyrics and chords display</li>
						<li>Role-based views for vocalists and instrumentalists</li>
						<li>Admin controls for managing sessions and song selection</li>
						<li>Multilingual support for English and Hebrew songs</li>
						<li>Responsive design for various devices</li>
					</ul>
					<p className="text-gray-700">
						Whether you're practicing for your next gig or performing live,
						JaMoveo helps keep your band in perfect harmony.
					</p>
				</div>

				<div className="text-center">
					<button
						onClick={handleStartJamming}
						className="bg-secondary text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-primaryhover transition duration-300">
						Start Jamming
					</button>
				</div>

				
			</main>
		</div>
	);
}
