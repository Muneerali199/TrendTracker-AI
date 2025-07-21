"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Link from 'next/link';
import { Bot } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function AuthPage() {
    const supabase = createClientComponentClient();
    const { theme } = useTheme();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
             <div className="w-full max-w-sm">
                <Link href="/" className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-8 w-8 text-primary" />
                </Link>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme={theme === 'dark' ? 'dark' : 'default'}
                    providers={['google']}
                    redirectTo={`${new URL(window.location.href).origin}/auth/callback`}
                />
            </div>
        </div>
    );
}
