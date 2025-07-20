export type Post = {
  id: string;
  influencer: string;
  handle: string;
  platform: 'YouTube' | 'Instagram' | 'LinkedIn';
  content: string;
  likes: number;
  comments: number;
  avatar: string;
  timestamp: string;
  dataAiHint: string;
};

export type Influencer = {
  name: string;
  handle: string;
  avatar: string;
  dataAiHint: string;
};

export const influencers: Influencer[] = [
  { name: 'Linus Tech Tips', handle: '@linustech', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man tech' },
  { name: 'iJustine', handle: '@ijustine', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman tech' },
  { name: 'Cleo Abram', handle: '@cleoabram', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman journalist' },
  { name: 'Marques Brownlee', handle: '@mkbhd', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man tech' },
  { name: 'Sara Dietschy', handle: '@saradietschy', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman creative' },
];

export const posts: Post[] = [
  {
    id: '1',
    influencer: 'Marques Brownlee',
    handle: '@mkbhd',
    platform: 'YouTube',
    content: "Just dropped a new video on the latest folding phone. Is it a gimmick or the future? Let me know your thoughts!",
    likes: 120000,
    comments: 8000,
    avatar: 'https://placehold.co/40x40.png',
    timestamp: '2h ago',
    dataAiHint: 'man tech'
  },
  {
    id: '2',
    influencer: 'Sara Dietschy',
    handle: '@saradietschy',
    platform: 'Instagram',
    content: "A behind-the-scenes look at my creative process for my latest documentary short. It's messy but it's real.",
    likes: 45000,
    comments: 1200,
    avatar: 'https://placehold.co/40x40.png',
    timestamp: '5h ago',
    dataAiHint: 'woman creative'
  },
   {
    id: 'ij-1',
    influencer: 'iJustine',
    handle: '@ijustine',
    platform: 'YouTube',
    content: 'UNBOXING a transparent TV! This is WILD!',
    likes: 310000,
    comments: 12000,
    avatar: 'https://placehold.co/40x40.png',
    timestamp: '1d ago',
    dataAiHint: 'woman tech',
  },
  {
    id: 'ca-1',
    influencer: 'Cleo Abram',
    handle: '@cleoabram',
    platform: 'YouTube',
    content: 'Why AI terrifies and excites me. A deep dive into the future of artificial intelligence.',
    likes: 85000,
    comments: 4500,
    avatar: 'https://placehold.co/40x40.png',
    timestamp: '2d ago',
    dataAiHint: 'woman journalist',
  },
  {
    id: 'ltt-1',
    influencer: 'Linus Tech Tips',
    handle: '@linustech',
    platform: 'YouTube',
    content: 'We built a PC inside a fish tank. It actually works. For now.',
    likes: 1200000,
    comments: 55000,
    avatar: 'https://placehold.co/40x40.png',
    timestamp: '3d ago',
    dataAiHint: 'man tech',
  },
  {
    id: '6',
    influencer: 'Marques Brownlee',
    handle: '@mkbhd',
    platform: 'Instagram',
    content: 'Studio vibes today. Working on the next Dope Tech video. What do you want to see featured?',
    likes: 150000,
    comments: 4000,
    avatar: 'https://placehold.co/40x40.png',
    timestamp: '3d ago',
    dataAiHint: 'man tech'
  },
  {
    id: 'ij-2',
    influencer: 'iJustine',
    handle: '@ijustine',
    platform: 'Instagram',
    content: 'Got to play with some new camera gear today. This thing is a beast!',
    likes: 95000,
    comments: 2100,
    avatar: 'https://placehold.co/40x40.png',
    timestamp: '4d ago',
    dataAiHint: 'woman tech',
  },
  {
    id: '8',
    influencer: 'Sara Dietschy',
    handle: '@saradietschy',
    platform: 'LinkedIn',
    content: "Networking tip: Don't just collect contacts, build relationships. Ask how you can help them before asking for anything in return. #CreativeCareer",
    likes: 9000,
    comments: 500,
    avatar: 'https://placehold.co/40x40.png',
    timestamp: '4d ago',
    dataAiHint: 'woman creative'
  },
];
