'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromSession } from '../../utils/AuthUtils'; // Adjust this import based on your project structure
import songsDB from '../../data/songDB'; // Adjust this import based on your project structure
import io from 'socket.io-client';

let socket;

export default function MainPage() {
	const [user, setUser] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const router = useRouter();
	const sessionId = 'default-session-id';

	useEffect(() => {
		const currUser = getUserFromSession();
		setUser(currUser);
		socketInitializer(currUser);

		return () => {
			if (socket) socket.disconnect();
		};
	}, []);
	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			const results = songsDB.filter(
				(song) =>
					song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					song.artist.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setSearchResults(results);
		}
	};
	const socketInitializer = async (user) => {
		socket = io('http://localhost:3000', {
			transports: ['websocket'],
		});

		socket.on('connect', () => {
			console.log('Connected to socket');
			socket.emit('join-session', {
				sessionId: 'default-session-id',
				username: user.username,
			});
		});

		socket.on('update-song', (songId) => {
			console.log('New song received:', songId);
			router.push(`/live?songId=${songId}`);
		});

		socket.on('scrolling-updated', (scrollingState) => {
			console.log('Scrolling state updated:', scrollingState);
		});

		socket.on('session-ended', () => {
			console.log('Session ended');
			router.push('/'); // Redirect to home page
		});

		socket.on('connect_error', (error) => {
			console.error('Socket connection error:', error);
		});
	};
	const startSession = (songId) => {
		console.log(songId);

		socket.emit('update-song', {
			sessionId: sessionId,
			songId,
		});
	};

	if (!user) {
		// router.push('/login');
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-4">Welcome to JaMoveo</h1>
				<p className="mb-4">Please log in to access the full features.</p>
				<button
					onClick={() => router.push('/login')}
					className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
					Log In
				</button>
			</div>
		);
	}

	if (user.isAdmin) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-4">Search any song...</h1>
				<form onSubmit={handleSearch} className="mb-4">
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Enter song or artist name"
						className="text-primary w-full p-2 border border-gray-300 rounded"
					/>
					<button
						type="submit"
						className="mt-2 bg-secondary text-white px-4 py-2 rounded hover:bg-primaryhover">
						Search
					</button>
				</form>
				{searchResults.length > 0 && (
					<div>
						<h2 className="text-2xl font-bold mb-2">Search Results:</h2>
						<ul>
							{searchResults.map((song) => (
								<li
									key={song.id}
									className="mb-2 p-2 border border-gray-300 rounded">
									<span>
										{song.title} - {song.artist}
									</span>
									<button
										onClick={() => startSession(song.id)}
										className="ml-4 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
										Start Session
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		);
	} else {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold">Waiting for next song</h1>
			</div>
		);
	}
}
