import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Dashboard } from '@/components/dashboard';

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <Dashboard user={user} />
  );
}
