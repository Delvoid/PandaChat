import { KeyboardEvent, useState } from 'react';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket;
};
const SendMessage = ({ socket }: Props) => {
  const [message, setMessage] = useState('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <div>
      <input
        id="message"
        name="message"
        className="w-full bg-gray-300 py-5 px-3 rounded-xl"
        type="text"
        value={message}
        placeholder="type your message here..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
export default SendMessage;
