import { useEffect, useState } from 'react';
import ChatBar from '../components/chat/ChatBar';
import ChatBody from '../components/chat/ChatBody';
import ChatHeader from '../components/chat/ChatHeader';
import useSocket from '../hooks/useSocket';

const Chat = () => {
  const socket = useSocket();

  if (!socket) {
    return <div>Error connecting to socket</div>;
  }

  return (
    <div className="container mx-auto shadow-lg rounded-lg h-full flex flex-col">
      <ChatHeader />

      <div className="flex flex-row justify-between bg-white h-full">
        <ChatBar />
        <ChatBody socket={socket} />
      </div>
    </div>
  );
};
export default Chat;
