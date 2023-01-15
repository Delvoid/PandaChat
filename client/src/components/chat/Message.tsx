import { User } from './UserListCard';

export type Message = {
  fromUser: boolean;
  message: { text: string; createdAt: Date };
  user: User;
};
const Message = ({ fromUser, message, user }: Message) => {
  return (
    <div
      className={`flex ${
        fromUser ? 'justify-end' : 'justify-end flex-row-reverse flex-start'
      } mb-4 `}
    >
      <div
        className={` py-3 px-4 ${
          fromUser
            ? 'bg-blue-400 mr-2 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl'
            : 'bg-gray-400 ml-2 rounded-br-3xl rounded-tr-3xl rounded-tl-xl'
        }  text-white`}
      >
        {message.text}
      </div>
      <img src={user.imgUrl} className="object-cover h-8 w-8 rounded-full" alt={user.username} />
    </div>
  );
};
export default Message;
