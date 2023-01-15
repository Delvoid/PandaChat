import { useEffect, useState } from 'react';
import ChatBar from '../components/chat/ChatBar';
import ChatBody from '../components/chat/ChatBody';
import ChatHeader from '../components/chat/ChatHeader';
import { io, Socket } from 'socket.io-client';
import useSocket from '../hooks/useSocket';

const Chat = () => {
  const socket = useSocket();
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
