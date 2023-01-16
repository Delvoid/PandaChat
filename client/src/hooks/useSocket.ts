import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useLocalStorage } from './useLocalStorage';

const useSocket = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useLocalStorage<string>('username', '');
  const [room, setRoom] = useLocalStorage<string>('room', '');
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const s = io('http://localhost:5000');
    if (!s || !username || !room) {
      setUsername('');
      setRoom('');
      navigate('/');
    }
    setSocket(s);
    s.emit('join', { username, room });
    s.on('serverDisconnect', () => {
      s.disconnect();
      navigate('/');
      setUsername('');
      setRoom('');
    });
    // s.on('message', (message) => console.log(message));
    return () => {
      s.disconnect();
    };
  }, []);

  return socket;
};
export default useSocket;
