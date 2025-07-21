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
  platform: 'YouTube' | 'Instagram' | 'LinkedIn';
  avatar: string;
  dataAiHint: string;
};

// This data is now used as a fallback or for unauthenticated users.
// Logged-in users will have their own list from Firestore.
export const influencers: Influencer[] = [];
export const posts: Post[] = [];
