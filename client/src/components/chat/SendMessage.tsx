import { KeyboardEvent, useState } from 'react';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket;
};

let typingTimeout: NodeJS.Timeout;

const SendMessage = ({ socket }: Props) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleStopTyping = () => {
    if (!isTyping) return;

    socket.emit('isTyping', false);
    clearTimeout(typingTimeout);
    setIsTyping(false);
    // emit socket
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit('isTyping', false);
      setIsTyping(false);
    }, 2000);

    if (event.key === 'Enter') {
      if (!message) return;
      socket.emit('sendMessage', message);
      handleStopTyping();
      setMessage('');
      return;
    }
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('isTyping', true);
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
        onBlur={handleStopTyping}
      />
    </div>
  );
};
export default SendMessage;
