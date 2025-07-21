'use client';
import { createClient } from '@/lib/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';

export default function AuthPage() {
    const supabase = createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <Bot className="w-8 h-8 text-primary" />
                        <h1 className="text-2xl font-bold tracking-tight">TrendTracker AI</h1>
                    </div>
                    <CardTitle>Welcome</CardTitle>
                    <CardDescription>Sign in or create an account to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        providers={['google', 'github']}
                        redirectTo={`${siteUrl}/auth/callback`}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
