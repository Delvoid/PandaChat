import Message, { TMessage } from './Message';
import SendMessage from './SendMessage';
import { Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { whoIsTyping } from '../../utils/rooms';

type Props = {
  socket: Socket;
};
const ChatBody = ({ socket }: Props) => {
  const eventAdded = useRef(false);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [typingList, setTypingList] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;
    if (eventAdded.current) return;
    eventAdded.current = true;

    socket.on('message', (message: TMessage) => {
      setMessages((prev) => {
        if (prev.length > 0) {
          return [...prev, message];
        } else {
          return [message];
        }
      });
    });
    socket.on('isTypingData', (room: { room: string; isTyping: string[] }) => {
      setTypingList([...room.isTyping]);
    });
  }, []);
  return (
    <div className="w-full px-5 flex flex-col justify-between">
      <div className="flex flex-col mt-5">
        {messages.length > 0 &&
          messages?.map(({ message, user }, index) => (
            <Message key={index} fromUser={socket.id === user.id} message={message} user={user} />
          ))}
        {messages.length === 0 && <div>No messages</div>}
      </div>
      <div className="py-5">
        <div>{whoIsTyping(typingList)}</div>
        <SendMessage socket={socket} />
      </div>
    </div>
  );
};
export default ChatBody;
