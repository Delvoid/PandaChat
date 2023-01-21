import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useLocalStorage } from './useLocalStorage';
import { getRandomInt } from '../utils/users';

const CHAT_CHANCE = 10;

const useBots = (count = 5) => {
  const createdBots = useRef(false);
  const [room, _] = useLocalStorage<string>('room', '');
  const [bots, setBots] = useState<{ socket: Socket; botName: string; isTyping: boolean }[]>([]);

  const connectBot = () => {
    const randomNumberString = getRandomInt(1, 3000).toString();

    //connect
    const s = io('http://localhost:5000');
    if (!s || !room) return;

    s.emit('join', { username: randomNumberString, room });

    s.on('serverDisconnect', () => {
      s.disconnect();
    });

    setBots((prev) => [...prev, { socket: s, botName: randomNumberString, isTyping: false }]);
  };

  useEffect(() => {
    if (createdBots.current) return;
    createdBots.current = true;

    for (let i = 0; i < count; i += 1) {
      connectBot();
    }
  }, []);
  //   randomChat(bots);
  return bots;
};
export default useBots;

export const randomChat = (bots: { socket: Socket; botName: string }[]) => {
  bots.forEach((bot) => {
    let typingTimeout: NodeJS.Timeout;
    setInterval(() => {
      if (Math.random() < CHAT_CHANCE / 100) {
        clearTimeout(typingTimeout);
        bot.socket.emit('isTyping', true);
        typingTimeout = setTimeout(() => {
          bot.socket.emit('isTyping', false);
        }, 3000);
      }
    }, 1000);
  });
};
