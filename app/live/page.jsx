'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUserFromSession } from '../../utils/AuthUtils';
import SongDisplay from '../components/SongDisplay';
import songsDB from '../../data/songDB';
import io from 'socket.io-client';
import { useUser } from '../../hooks/userContext';

let socket;

const fetchSongById = async (id) => {
	return new Promise((resolve) => {
		// Simulating a database call with a timeout
		setTimeout(() => {
			const selectedSong = songsDB.find((song) => song.id === id);
			resolve(selectedSong);
		}, 1000); // Simulating a 1-second delay
	});
};

function LiveContent() {
	const [isScrolling, setIsScrolling] = useState(false);
	const [currentSong, setCurrentSong] = useState({});
	const [roomInfo, setRoomInfo] = useState({ participants: [], count: 0 });
	const scrollContainerRef = useRef(null);
	const router = useRouter();
	const searchParams = useSearchParams();
	const songId = searchParams.get('songId');
	const { user } = useUser();
	// If the user is logged in, redirect to the main app page
	// If not, redirect to the login page
	// This is a placeholder - replace with your actual auth check
	// const isLoggedIn = false; // Replace with actual auth check
	if (!user) {
		return router.push('/login');
	}

	useEffect(() => {
		socketInitializer(user);

		return () => {
			if (socket) socket.disconnect();
		};
	}, []);

	// console.log('use effecrr');
	useEffect(() => {
		console.log(songId);

		if (songId) {
			const fetchAndSetSong = async () => {
				const selectedSong = await fetchSongById(songId); // Fetching the song from the DB
				if (selectedSong) {
					setCurrentSong(selectedSong); // Set the song in state
					console.log('Song fetched from DB:', selectedSong); // Log the song after fetching
				} else {
					console.error('Song not found');
				}
			};

			fetchAndSetSong(); // Call the async function to fetch song
		}
	}, []);

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

		socket.on('room-update', (info) => {
			console.log('Room update received:', info);
			setRoomInfo(info);
		});

		socket.on('update-song', (songId) => {
			console.log('New song received:', songId);
			// In a real app, you'd fetch the new song data here
			setCurrentSong(selectedSong);
		});

		socket.on('scrolling-updated', (scrollingState) => {
			console.log('Scrolling state updated:', scrollingState);
			setIsScrolling(scrollingState);
		});

		socket.on('session-ended', () => {
			console.log('Session ended');
			router.push('/'); // Redirect to home page
		});

		socket.on('connect_error', (error) => {
			console.error('Socket connection error:', error);
		});
	};

	useEffect(() => {
		let scrollInterval;
		if (isScrolling && scrollContainerRef.current) {
			scrollInterval = setInterval(() => {
				if (scrollContainerRef.current) {
					const { scrollTop, scrollHeight, clientHeight } =
						scrollContainerRef.current;
					if (scrollTop + clientHeight < scrollHeight) {
						scrollContainerRef.current.scrollTop += 1;
					} else {
						if (user && user.isAdmin) {
							socket.emit('update-scrolling', {
								sessionId: 'default-session-id',
								isScrolling: false,
							});
						}
					}
				}
			}, 50);
		}
		return () => clearInterval(scrollInterval);
	}, [isScrolling, user]);

	const toggleScrolling = () => {
		if (user && user.isAdmin) {
			const newScrollingState = !isScrolling;
			socket.emit('update-scrolling', {
				sessionId: 'default-session-id',
				isScrolling: newScrollingState,
			});
		}
	};

	const handleEndSession = () => {
		if (user && user.isAdmin && socket) {
			socket.emit('end-session', { sessionId: 'default-session-id' });
		}
	};

	if (!user) {
		return <div className="text-white text-2xl">Loading...</div>;
	}

	const isVocalist = user.instrument === 'vocals';

	return (
		<div className="min-h-screen bg-gray-900 text-white p-4">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold mb-2">Live Session</h1>
				<h2 className="text-2xl mb-2">Current Song: {currentSong.title}</h2>
				<h5 className="text-xl mb-6">Author: {currentSong.artist}</h5>

				<div className="mb-4 bg-gray-800 p-4 rounded-lg">
					<h3 className="text-xl font-semibold mb-2">Room Information</h3>
					<p>People in the room: {roomInfo.count}</p>
					<ul className="list-disc list-inside">
						{roomInfo.participants.map((participant, index) => (
							<li key={index}>{participant}</li>
						))}
					</ul>
				</div>

				<div
					ref={scrollContainerRef}
					className="overflow-y-auto h-[calc(100vh-400px)] pr-4 bg-gray-800 p-4 rounded-lg">
					<SongDisplay songData={currentSong} isVocalist={isVocalist} />
				</div>

				{user.isAdmin && (
					<>
						<button
							onClick={handleEndSession}
							className="fixed bottom-4 left-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
							End Session
						</button>
						<button
							onClick={toggleScrolling}
							className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
							{isScrolling ? 'Stop Scrolling' : 'Start Scrolling'}
						</button>
					</>
				)}

				{!user.isAdmin && isScrolling && (
					<div className="fixed bottom-4 right-4 bg-blue-600 text-white font-bold py-2 px-4 rounded">
						Auto-scrolling
					</div>
				)}
			</div>
		</div>
	);
}

export default function Live() {
	return (
		<Suspense fallback={<div className="text-white text-2xl">Loading...</div>}>
			<LiveContent />
		</Suspense>
	);
}
