import { FaUsers } from 'react-icons/fa';
import { users } from '../../utils/userMock';
import UserListCard from './UserListCard';

type Props = {};
const ChatBar = (props: Props) => {
  return (
    <div className="flex flex-col w-1/5 border-r-2 overflow-y-auto">
      <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 gap-2">
        <FaUsers className="h-6 w-6" />
        <span className="text-xl">Users List</span>
      </div>
      {users.map(({ imgUrl, username, joinedAt }) => (
        <UserListCard
          key={username + joinedAt}
          imgUrl={imgUrl}
          username={username}
          joinedAt={joinedAt}
        />
      ))}
    </div>
  );
};
export default ChatBar;
