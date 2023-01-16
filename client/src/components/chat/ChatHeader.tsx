import Button from '../Button';
import { Socket } from 'socket.io-client';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

type Props = {
  socket: Socket;
};

const ChatHeader = ({ socket }: Props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useLocalStorage<string>('username', '');
  const [room, setRoom] = useLocalStorage<string>('room', '');

  const handleDisconnect = () => {
    socket.disconnect();
    setUsername('');
    setRoom('');
    navigate('/');
  };
  return (
    <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div className="font-semibold text-2xl">{room}</div>

      <div className="">
        <Button
          type="submit"
          variant="primary"
          label="Leave Chat"
          onClick={() => handleDisconnect()}
        />
      </div>
    </div>
  );
};
export default ChatHeader;
