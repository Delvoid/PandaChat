import ChatBar from '../components/chat/ChatBar';
import ChatBody from '../components/chat/ChatBody';
import ChatHeader from '../components/chat/ChatHeader';
import useBots from '../hooks/useBots';
import useSocket from '../hooks/useSocket';

const Chat = () => {
  const socket = useSocket();
  const bots = useBots();

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
