export type User = {
  id: string;
  username: string;
  room: string;
  imgUrl?: string;
  joinedAt: number;
  role: 'User' | 'Admin';
};

const users: User[] = [];
const isTypingList: Record<string, string[]> = {};

const defaultAvatar = 'https://source.unsplash.com/_7LbC5J-jw4/600x600';

export const adminUser: User = {
  id: 'Admin',
  imgUrl: 'https://source.unsplash.com/_7LbC5J-jw4/600x600',
  username: 'Admin',
  joinedAt: new Date().getTime(),
  room: 'Admin',
  role: 'Admin',
};

// addUser,  removeUser, getUser, getUsersInRoom

export const addUser = ({
  id,
  username,
  room,
  imgUrl = defaultAvatar,
}: Omit<User, 'joinedAt' | 'role'>) => {
  // clean the data
  username = username.trim().toLowerCase();
  room = room?.trim().toLowerCase();

  // validate the data
  if (!username || !room) {
    return {
      error: 'Username and room are required!',
    };
  }

  //check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  // validate username
  if (existingUser) {
    return {
      error: 'Username is in use!',
    };
  }

  // Store user
  const user: User = { id, username, room, imgUrl, role: 'User', joinedAt: new Date().getTime() };
  users.push(user);
  return { user };
};

export const getUser = (id: string) => {
  return users.find((user) => user.id === id);
};

export const getUsersInRoom = (room: string) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const addUserIsTyping = (username: string, room: string) => {
  // validate the data
  if (!username || !room) {
    return {
      error: 'Username and room are required!',
    };
  }

  room = room.trim().toLowerCase();

  if (isTypingList[room]) {
    if (isTypingList[room].includes(username)) return;
    isTypingList[room].push(username);
  } else {
    isTypingList[room] = [username];
  }
  console.log(isTypingList);
};

export const removeUserIsTyping = (username: string, room: string) => {
  room = room.trim().toLowerCase();
  if (room in isTypingList) {
    isTypingList[room] = isTypingList[room].filter((item) => item !== username);
  }
};

export const getUsersInRoomTyping = (room: string) => {
  room = room.trim().toLowerCase();
  if (room in isTypingList) return isTypingList[room];
  return [];
};

export const roomDisconnecting = (room: string) => {
  room = room.trim().toLowerCase();
  if (room in isTypingList) {
    delete isTypingList[room];
  }
};
