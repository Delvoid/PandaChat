import { Message } from '../components/chat/Message';

export const messages: Message[] = [
  {
    fromUser: true,
    message: { text: 'Welcome to group everyone !', createdAt: new Date() },
    user: {
      imgUrl: 'https://source.unsplash.com/otT2199XwI8/600x600',
      username: 'Delvoid',
      joinedAt: new Date().toDateString(),
    },
  },
  {
    fromUser: false,
    message: {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat at praesentium, aut ullam delectus odio error sit rem. Architecto nulla doloribus laborum illo rem enim dolor odio saepe, consequatur quas?',
      createdAt: new Date(),
    },
    user: {
      imgUrl: 'https://source.unsplash.com/L2cxSuKWbpo/600x600',
      username: 'Athano',
      joinedAt: new Date().toDateString(),
    },
  },
  {
    fromUser: true,
    message: {
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, repudiandae.',
      createdAt: new Date(),
    },
    user: {
      imgUrl: 'https://source.unsplash.com/otT2199XwI8/600x600',
      username: 'Delvoid',
      joinedAt: new Date().toDateString(),
    },
  },
  {
    fromUser: true,
    message: {
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, repudiandae.',
      createdAt: new Date(),
    },
    user: {
      imgUrl: 'https://source.unsplash.com/otT2199XwI8/600x600',
      username: 'Delvoid',
      joinedAt: new Date().toDateString(),
    },
  },
  {
    fromUser: false,
    message: {
      text: 'short message',
      createdAt: new Date(),
    },
    user: {
      imgUrl: 'https://source.unsplash.com/L2cxSuKWbpo/600x600',
      username: 'Athano',
      joinedAt: new Date().toDateString(),
    },
  },
];
