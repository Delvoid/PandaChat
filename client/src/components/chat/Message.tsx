import { User } from './UserListCard';
import moment from 'moment';

export type TMessage = {
  fromUser: boolean;
  message: { text: string; createdAt: number };
  user: User;
};
const Message = ({ fromUser, message, user }: TMessage) => {
  if (user.role === 'Admin') {
    return (
      <div className="flex flex-col justify-start mb-4">
        <div className="flex items-center text-sm gap-2">
          <div className=" text-gray-400">{moment(message.createdAt).format('hh:mma')}</div>
          <div className=" font-bold capitalize">{user.username}</div>
          <div>{message.text}</div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`flex flex-col ${
        fromUser ? 'justify-end' : 'justify-end flex-row-reverse flex-start'
      } mb-4 `}
    >
      <div
        className={`flex items-center text-sm gap-2 ${
          fromUser ? 'justify-end' : 'justify-end flex-row-reverse flex-start'
        }`}
      >
        <div className=" text-gray-400">{moment(message.createdAt).format('hh:mma')}</div>
        <div className=" font-bold capitalize">{user.username}</div>
      </div>
      <div
        className={`flex items-center ${
          fromUser ? 'justify-end' : 'justify-end flex-row-reverse flex-start'
        }`}
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
    </div>
  );
};
export default Message;
