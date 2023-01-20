import { useEffect, useRef, useState } from 'react';
import ChatBar from '../components/chat/ChatBar';
import ChatBody from '../components/chat/ChatBody';
import ChatHeader from '../components/chat/ChatHeader';
import { useLocalStorage } from '../hooks/useLocalStorage';
import useSocket from '../hooks/useSocket';
import { getRandomInt } from '../utils/users';

const Chat = () => {
  const socket = useSocket();
  // const botsSet = useRef(false);

  // const [bots, setBots] = useState<string[]>([]);

  const [room, _] = useLocalStorage<string>('room', '');

  // useEffect(() => {
  //   if (!botsSet.current && socket) {
  //     botsSet.current = true;
  //     for (let i = 0; i < 10; i += 1) {
  //       const randomNumber = getRandomInt(1, 3000).toString();

  //       socket?.emit('join', { username: '' + randomNumber, room });
  //     }
  //   }
  // }, [socket]);

  if (!socket) {
    return <div>Error connecting to socket</div>;
  }

  return (
    <div className="container mx-auto shadow-lg rounded-lg h-full flex flex-col">
      <ChatHeader socket={socket} />

      <div className="flex flex-row justify-between bg-white h-full">
        <ChatBar socket={socket} />
        <ChatBody socket={socket} />
      </div>
    </div>
  );
};
export default Chat;
