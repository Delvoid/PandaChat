import { useEffect, useState } from 'react';
import ChatBar from '../components/chat/ChatBar';
import ChatBody from '../components/chat/ChatBody';
import ChatHeader from '../components/chat/ChatHeader';
import { useLocalStorage } from '../hooks/useLocalStorage';
import useSocket from '../hooks/useSocket';

const Chat = () => {
  const [username, setUsername] = useLocalStorage<string>('username', '');
  const [room, setRoom] = useLocalStorage<string>('room', '');
  const socket = useSocket();

  console.log({ username, room });
  return (
    <div className="container mx-auto shadow-lg rounded-lg h-full flex flex-col">
      <ChatHeader />

      <div className="flex flex-row justify-between bg-white h-full">
        <ChatBar />
        <ChatBody />
      </div>
    </div>
  );
};
export default Chat;
