import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { generateMessage } from './utils/message';
import { addUser, adminUser, getUser } from './utils/user';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log(`New websocket connection: ${socket.id}`);

  socket.on('join', ({ username, room }) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) {
      return error;
    }
    if (!user) {
      return 'Something went wrong getting the user details';
    }

    socket.join(user.room);
    console.log({ username, room });

    socket.emit('message', generateMessage(adminUser, 'Welcome!'));
    socket.broadcast
      .to(user.room)
      .emit('message', generateMessage(adminUser, `${user.username} has joined`));
  });

  socket.on('sendMessage', (message: string) => {
    const user = getUser(socket.id);
    if (!user) return;
    console.log({ user, message });

    // send message to current room
    io.to(user.room).emit('message', generateMessage(user, message));
  });

  socket.on('disconnecting', () => {
    console.log('server disconnecting');
    socket.emit('serverDisconnect');
  });
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
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
