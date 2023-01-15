export type User = {
  imgUrl: string;
  username: string;
  joinedAt: string;
};
const UserListCard = ({ imgUrl, username, joinedAt }: User) => {
  return (
    <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 gap-2">
      <div className="w-1/4">
        <img src={imgUrl} className="object-cover h-12 w-12 rounded-full" alt="" />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{username}</div>
        <span className="text-gray-500">{joinedAt}</span>
      </div>
    </div>
  );
};
export default UserListCard;
