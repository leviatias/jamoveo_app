const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const rooms = new Map(); // Session ID -> Set of usernames

app.prepare().then(() => {
	const server = createServer((req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	});

	const io = new Server(server);

	io.on('connection', (socket) => {
		console.log('New client connected');

		// Join session room
		socket.on('join-session', (data) => {
			const { sessionId, username } = data;

			// Store the session ID and username
			socket.sessionId = sessionId;
			socket.username = username;

			// Join the room
			socket.join(sessionId);
			console.log(`User ${username} joined session ${sessionId}`);

			// Add the user to the session's room list
			if (!rooms.has(sessionId)) {
				rooms.set(sessionId, new Set());
			}
			rooms.get(sessionId).add(username);

			// Broadcast the updated participants list to the room
			const roomParticipants = Array.from(rooms.get(sessionId));
			io.to(sessionId).emit('room-update', {
				participants: roomParticipants,
				count: roomParticipants.length,
			});
		});

		// Update the current song in the session
		socket.on('update-song', ({ sessionId, songId }) => {
			console.log(`Updating song for session ${sessionId} to ${songId}`);
			console.log(`Emitting song update to room ${sessionId}`);
			io.to(sessionId).emit('update-song', songId);
		});

		// Update scrolling state for the session
		socket.on('update-scrolling', ({ sessionId, isScrolling }) => {
			io.to(sessionId).emit('scrolling-updated', isScrolling);
			console.log('scroll updated');
		});

		// End the session and notify all participants
		socket.on('end-session', ({ sessionId }) => {
			console.log(`Ending session ${sessionId}`);
			io.to(sessionId).emit('session-ended');

			// Clear the session room
			if (rooms.has(sessionId)) {
				rooms.delete(sessionId);
			}
		});

		// Handle client disconnection
		socket.on('disconnect', () => {
			const { sessionId, username } = socket;

			if (sessionId && rooms.has(sessionId)) {
				const participants = rooms.get(sessionId);
				participants.delete(username);

				// If the room is empty, delete the session
				if (participants.size === 0) {
					rooms.delete(sessionId);
				} else {
					// Otherwise, broadcast the updated room info
					io.to(sessionId).emit('room-update', {
						participants: Array.from(participants),
						count: participants.size,
					});
				}
			}
			console.log(`Client ${username} disconnected from session ${sessionId}`);
		});
	});

	// Start the server
	server.listen(3000, (err) => {
		if (err) throw err;
		console.log('> Ready on http://localhost:3000');
	});
});
