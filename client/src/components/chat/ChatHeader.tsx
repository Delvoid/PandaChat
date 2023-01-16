import Button from '../Button';
import { Socket } from 'socket.io-client';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const ChatHeader = () => {
  const [room, setRoom] = useLocalStorage<string>('room', '');
  return (
    <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div className="font-semibold text-2xl">{room}</div>

      <div className="">
        <Button type="submit" variant="primary" label="Leave Chat" />
      </div>
    </div>
  );
};
export default ChatHeader;
