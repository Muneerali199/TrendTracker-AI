import { Dashboard } from '@/components/dashboard';
import { influencers, posts } from '@/lib/data';

export default function Home() {
  return (
    <Dashboard initialInfluencers={influencers} initialPosts={posts} />
  );
}