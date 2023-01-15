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
  socket.emit('WS connection');

  socket.join(roomName);
  socket.on('create-room', (room) => {
    console.log(room);
  });

  socket.emit('message', 'hello from server');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.of('/').adapter.on('create-room', (room) => {
  console.log(`room ${room} was created`);
  console.log(io.sockets.adapter.rooms);
});

io.of('/').adapter.on('join-room', (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
  console.log(io.sockets.adapter.rooms);
});

io.of('/').adapter.on('leave-room', (room, id) => {
  console.log(`socket ${id} has left room ${room}`);
  console.log(io.sockets.adapter.rooms);
});

io.of('/').adapter.on('delete-room', (room) => {
  console.log(`room ${room} was deleted`);
  console.log(io.sockets.adapter.rooms);
});
server.listen(PORT, () => {
  console.log('info', `App listening on port ${PORT}`);
  console.info('================================');
  console.info(`======= ENV: ${process.env.NODE_ENV} =======`);
  console.info(`🚀 App listening on the port ${PORT}`);
  console.info(`url http://localhost:${PORT}`);
  console.info('================================');
});
