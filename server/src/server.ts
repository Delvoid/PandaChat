import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { generateMessage } from './utils/message';
import {
  addUser,
  addUserIsTyping,
  adminUser,
  getUser,
  getUsersInRoom,
  getUsersInRoomTyping,
  removeUser,
  removeUserIsTyping,
  roomDisconnecting,
} from './utils/user';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log(`New websocket connection: ${socket.id}`);

  socket.on('join', ({ username, room }) => {
    console.log(username);
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) {
      return error;
    }
    if (!user) {
      return 'Something went wrong getting the user details';
    }

    socket.join(user.room);

    socket.emit('message', generateMessage(adminUser, 'Welcome!'));
    socket.broadcast
      .to(user.room)
      .emit('message', generateMessage(adminUser, `${user.username} has joined`));

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on('isTyping', (isTyping: boolean) => {
    const user = getUser(socket.id);
    if (!user) return;

    console.log(`${user?.username} ${isTyping ? 'started typing' : 'stopped typing'}`);
    console.log(user.room);

    //add to typing list
    if (isTyping) {
      addUserIsTyping(user.username, user.room);
    }
    if (!isTyping) {
      removeUserIsTyping(user.username, user.room);
    }

    //emit data to server
    io.to(user.room).emit('isTypingData', {
      room: user.room,
      isTyping: getUsersInRoomTyping(user.room),
    });
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
    const user = removeUser(socket.id);
    if (user) {
      removeUserIsTyping(user.username, user.room);
      io.to(user.room).emit('isTypingData', {
        room: user.room,
        isTyping: getUsersInRoomTyping(user.room),
      });
      // send message to room that user left
      io.to(user.room).emit('message', generateMessage(adminUser, `${user.username} has left!`));
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
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
