import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/form/Input';
import { useLocalStorage } from '../hooks/useLocalStorage';
const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useLocalStorage<string>('username', '');
  const [room, setRoom] = useLocalStorage<string>('room', '');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!username || !room) return;
    navigate('/chat');
  };
  return (
    <div className="flex justify-center items-center m-auto w-full h-full">
      <div className="shadow-lg bg-gray-800 rounded-md  p-6 w-1/3">
        <h1 className="text-xl text-white">Join room</h1>
        <form onSubmit={handleSubmit} className="mx-auto w-full  lg:px-0">
          <Input
            id="username"
            label="Display Name"
            initialValue={username}
            onUpdate={(_, value) => setUsername(value)}
          />
          <Input
            id="room"
            label="Room"
            initialValue={room}
            onUpdate={(_, value) => setRoom(value)}
          />
          <div className="flex w-full justify-end">
            <div className="w-1/4">
              <Button type="submit" variant="green" label="Join" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Home;
