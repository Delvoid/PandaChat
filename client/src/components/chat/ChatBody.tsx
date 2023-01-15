import { messages } from '../../utils/messagesMock';
import Message from './Message';
import SendMessage from './SendMessage';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket;
};
const ChatBody = ({ socket }: Props) => {
  return (
    <div className="w-full px-5 flex flex-col justify-between">
      <div className="flex flex-col mt-5">
        {messages.map(({ fromUser, message, user }, index) => (
          <Message key={index} fromUser={fromUser} message={message} user={user} />
        ))}
      </div>
      <div className="py-5">
        <SendMessage socket={socket} />
      </div>
    </div>
  );
};
export default ChatBody;
