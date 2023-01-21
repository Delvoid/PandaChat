import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useLocalStorage } from './useLocalStorage';
import { getRandomInt } from '../utils/users';

const useBots = (count = 5) => {
  const createdBots = useRef(false);
  const [room, _] = useLocalStorage<string>('room', '');
  const [bots, setBots] = useState<{ socket: Socket; botName: string }[]>([]);

  const connectBot = () => {
    const randomNumberString = getRandomInt(1, 3000).toString();

    //connect
    const s = io('http://localhost:5000');
    if (!s || !room) return;

    s.emit('join', { username: randomNumberString, room });

    s.on('serverDisconnect', () => {
      s.disconnect();
    });

    setBots((prev) => [...prev, { socket: s, botName: randomNumberString }]);
  };

  useEffect(() => {
    if (createdBots.current) return;
    createdBots.current = true;

    for (let i = 0; i < count; i += 1) {
      connectBot();
    }
  }, []);

  return bots;
};
export default useBots;
