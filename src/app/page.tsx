import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, BarChart, Users, Send } from 'lucide-react';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">TrendTracker AI</h1>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Uncover Social Trends, <span className="text-primary">Instantly</span>.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            TrendTracker AI aggregates posts from top influencers, uses AI to summarize key topics, and helps your brand stay ahead of the curve.
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button size="lg" asChild>
              <Link href="/signup">Get Started for Free</Link>
            </Button>
          </div>
        </section>

        <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="relative mx-auto max-w-5xl">
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-primary to-accent opacity-25 blur-3xl animate-glow"></div>
              <Image
                src="https://placehold.co/1200x600.png"
                alt="TrendTracker AI Dashboard"
                width={1200}
                height={600}
                className="relative rounded-lg shadow-2xl border border-border"
                data-ai-hint="dashboard computer screen"
              />
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center mb-12 animate-fade-in-up">
            <h3 className="text-3xl font-bold tracking-tight">How It Works</h3>
            <p className="mt-2 text-muted-foreground">A simple, powerful workflow to keep you in the know.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Users className="h-6 w-6" />
                </div>
                <CardTitle>Track Influencers</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Add handles from YouTube, Instagram, and LinkedIn to build your custom tracking list.
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <BarChart className="h-6 w-6" />
                </div>
                <CardTitle>Aggregate Content</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Our system automatically collects the latest posts from the influencers you follow.
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <CardHeader className="items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Bot className="h-6 w-6" />
                </div>
                <CardTitle>Generate Summaries</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Use AI to generate instant summaries of key trends and topics from the aggregated content.
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <CardHeader className="items-center text-center">
                 <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Send className="h-6 w-6" />
                </div>
                <CardTitle>Deliver Insights</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Easily share automated trend briefs with your brand team to inform your strategy.
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <p>&copy; {new Date().getFullYear()} TrendTracker AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
