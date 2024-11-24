import {Server as SocketServer, Socket} from 'socket.io';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { DecodedToken, verifyToken } from '../helper/Auth';
import { NoteManager } from '../helper/NoteManager';

const startSocketServer = (httpServer: HttpServer | HttpsServer) => {
  const io: SocketServer = new SocketServer(httpServer, { cors: {} });
  const noteManager = new NoteManager();

  const authenticateSocket = (socket: Socket, next: (err?: Error) => void) => {
      const token = socket.handshake.auth.token;

      if (!token) {
          return next(new Error('Authentication error: Token not provided'));
      }

      const decoded = verifyToken(token);

      if (!decoded) {
          return next(new Error('Authentication error: Invalid token'));
      }

      // Attach user info to socket
      socket.data.user = decoded; 
      
      next();
  };

  io.use(authenticateSocket);

  const onConnection = async (socket: Socket) => {
    const user = socket.data.user as DecodedToken;

    // Emit all notes when a client connects
    socket.emit('notes', noteManager.getAllNotes());

    // Handle note creation
    socket.on('create_note', (content: string) => {
      const note = noteManager.createNote(content, user.username);
      // Broadcast the new note to all clients
      io.emit('note_created', note); 
    });

    // Handle note updates
    socket.on('update_note', (data: { id: string; content: string }) => {
        const updatedNote = noteManager.updateNote(data.id, data.content);
        if (updatedNote) {
          // Broadcast the updated note to all clients
          io.emit('note_updated', updatedNote); 
        } else {
          socket.emit('error', { message: 'Note not found' });
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${user.username}`);
    });
  };

  io.on('connection', onConnection);
};

export default startSocketServer;