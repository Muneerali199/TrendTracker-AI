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
  { name: 'Casey Neistat', handle: '@caseyneistat', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man portrait' },
  { name: 'Marques Brownlee', handle: '@mkbhd', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man tech' },
  { name: 'Sara Dietschy', handle: '@saradietschy', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman creative' },
  { name: 'Gary Vaynerchuk', handle: '@garyvee', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man business' },
  { name: 'Brene Brown', handle: '@brenebrown', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman author' },
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
    timestamp: '2 hours ago',
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
    timestamp: '5 hours ago',
    dataAiHint: 'woman creative'
  },
  {
    id: '3',
    influencer: 'Gary Vaynerchuk',
    handle: '@garyvee',
    platform: 'LinkedIn',
    content: "Kindness is the ultimate strength in business. It's the ROI that compounds indefinitely. Stop overlooking it.",
    likes: 22000,
    comments: 2500,
    avatar: 'https://placehold.co/40x40.png',
    timestamp: '1 day ago',
    dataAiHint: 'man business'
  },
  {
    id: '4',
    influencer: 'Casey Neistat',
    handle: '@caseyneistat',
    platform: 'YouTube',
    content: "Built something crazy in my studio. It involves a lot of wood, a drone, and a questionable amount of glue. Full video is live!",
    likes: 250000,
    comments: 15000,
    avatar: 'https://placehold.co/40x40.png',
    timestamp: '1 day ago',
    dataAiHint: 'man portrait'
  },
  {
    id: '5',
    influencer: 'Brene Brown',
    handle: '@brenebrown',
    platform: 'Instagram',
    content: "Vulnerability is not weakness; it's our most accurate measure of courage. Daring Greatly is not about winning or losing. It's about courage.",
    likes: 88000,
    comments: 3400,
    avatar: 'https://placehold.co/40x40.png',
    timestamp: '2 days ago',
    dataAiHint: 'woman author'
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
    timestamp: '2 days ago',
    dataAiHint: 'man tech'
  },
  {
    id: '7',
    influencer: 'Gary Vaynerchuk',
    handle: '@garyvee',
    platform: 'YouTube',
    content: 'A new episode of DailyVee is up! I talk about the importance of speed and how to get more done in less time.',
    likes: 40000,
    comments: 3200,
    avatar: 'https://placehold.co/40x40.png',
    timestamp: '3 days ago',
    dataAiHint: 'man business'
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
    timestamp: '4 days ago',
    dataAiHint: 'woman creative'
  },
];
