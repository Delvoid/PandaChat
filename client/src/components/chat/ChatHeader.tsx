import Button from '../Button';

const ChatHeader = () => {
  return (
    <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div className="font-semibold text-2xl">Room Name</div>

      <div className="">
        <Button type="submit" variant="primary" label="Leave Chat" />
      </div>
    </div>
  );
};
export default ChatHeader;
