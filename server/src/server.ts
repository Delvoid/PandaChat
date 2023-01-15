import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const roomName = 'testing room';

io.on('connection', (socket) => {
  console.log('New websocket connection');

  socket.on('join', ({ username, room }) => {
    socket.join(roomName);
    console.log({ username, room });
  });

  socket.emit('message', 'hello from server');

  socket.on('sendMessage', (message: string) => {
    console.log({ userId: socket.id, message });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log('info', `App listening on port ${PORT}`);
  console.info('================================');
  console.info(`======= ENV: ${process.env.NODE_ENV} =======`);
  console.info(`🚀 App listening on the port ${PORT}`);
  console.info(`url http://localhost:${PORT}`);
  console.info('================================');
});
