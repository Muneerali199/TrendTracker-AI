import { Dashboard } from '@/components/dashboard';
import { influencers, posts } from '@/lib/data';

export default function DashboardPage() {
  return (
    <Dashboard initialInfluencers={influencers} initialPosts={posts} />
  );
}
