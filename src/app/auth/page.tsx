"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Link from 'next/link';
import { Bot } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function AuthPage() {
    const supabase = createClientComponentClient();
    const { theme } = useTheme();
    const [redirectUrl, setRedirectUrl] = useState<string>('');

    useEffect(() => {
        // This code runs only on the client, after the component has mounted
        setRedirectUrl(`${window.location.origin}/auth/callback`);
    }, []);

    // Render a loading state or nothing until the redirectUrl is ready
    if (!redirectUrl) {
        return null;
    }

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
                    redirectTo={redirectUrl}
                    showLinks={false}
                />
            </div>
        </div>
    );
}
