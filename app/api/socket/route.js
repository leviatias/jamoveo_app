import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      socket.on('join-session', (sessionId) => {
        socket.join(sessionId);
        console.log(`User joined session ${sessionId}`);
      });
      socket.on('update-current-song', ({ sessionId, songId }) => {
        io.to(sessionId).emit('song-updated', songId);
      });
    });
  }
  res.end();
};

export const GET = SocketHandler;
export const POST = SocketHandler;
