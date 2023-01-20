import { FaUsers } from 'react-icons/fa';
import UserListCard, { User } from './UserListCard';

import { Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  socket: Socket;
};
const ChatBar = ({ socket }: Props) => {
  const eventAdded = useRef(false);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    if (!socket) return;
    if (eventAdded.current) return;
    eventAdded.current = true;

    socket.on('roomData', (room) => {
      setUsers([...room.users]);
    });
  }, []);
  return (
    <div className="flex flex-col w-1/5 border-r-2 overflow-y-auto">
      <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 gap-2">
        <FaUsers className="h-6 w-6" />
        <span className="text-xl">Users List</span>
      </div>
      {users.length > 0 &&
        users.map(({ imgUrl, username, joinedAt }, index) => (
          <UserListCard
            key={username + joinedAt}
            id={'' + index}
            imgUrl={imgUrl}
            username={username}
            joinedAt={joinedAt}
          />
        ))}
    </div>
  );
};
export default ChatBar;
