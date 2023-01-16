import moment from 'moment';

export type User = {
  id: string;
  imgUrl: string;
  username: string;
  joinedAt: number;
  role: 'User' | 'Admin';
};
const UserListCard = ({ imgUrl, username, joinedAt }: Omit<User, 'role'>) => {
  return (
    <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 gap-2">
      <div className="w-1/4">
        <img src={imgUrl} className="object-cover h-12 w-12 rounded-full" alt="" />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{username}</div>
        <span className="text-gray-500">{moment(joinedAt).format('hh:mma')}</span>
      </div>
    </div>
  );
};
export default UserListCard;
