import { User } from './user';

type Message = {
  text: string;
  createdAt: number;
};
export type ResMessage = {
  message: Message;
  user: User;
};
export const generateMessage = (user: User, text: string): ResMessage => {
  return {
    user,
    message: { text, createdAt: new Date().getTime() },
  };
};
