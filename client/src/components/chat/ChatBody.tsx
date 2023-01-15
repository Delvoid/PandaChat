import { messages } from '../../utils/messagesMock';
import Message from './Message';
type Props = {};
const ChatBody = (props: Props) => {
  return (
    <div className="w-full px-5 flex flex-col justify-between">
      <div className="flex flex-col mt-5">
        {messages.map(({ fromUser, message, user }, index) => (
          <Message key={index} fromUser={fromUser} message={message} user={user} />
        ))}
      </div>
      <div className="py-5">
        <input
          className="w-full bg-gray-300 py-5 px-3 rounded-xl"
          type="text"
          placeholder="type your message here..."
        />
      </div>
    </div>
  );
};
export default ChatBody;
