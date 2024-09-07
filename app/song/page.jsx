'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function SongPage() {
	const { id } = useParams();
	const [song, setSong] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchSong = async () => {
			const response = await fetch(`http://localhost:5000/songs/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			const songData = await response.json();
			setSong(songData);
		};

		// Fetch user data from local storage or context
		const userData = JSON.parse(localStorage.getItem('user'));
		setUser(userData);

		fetchSong();
	}, [id]);

	if (!song) return <div>Loading...</div>;

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">{song.title}</h1>
			<h2 className="text-2xl font-semibold mb-4">{song.artist}</h2>
			{user && user.instrument !== 'vocals' && (
				<div>
					<h3 className="text-xl font-semibold mb-2">Chords</h3>
					<pre className="bg-gray-100 p-4 rounded mb-4">{song.chords}</pre>
				</div>
			)}
			<div>
				<h3 className="text-xl font-semibold mb-2">Lyrics</h3>
				<pre className="bg-gray-100 p-4 rounded">{song.lyrics}</pre>
			</div>
		</div>
	);
}
