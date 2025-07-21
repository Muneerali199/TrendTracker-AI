"use client";

import React, { useState, useMemo, useTransition, useEffect } from 'react';
import type { Influencer, Post as PostType } from '@/lib/data';
import { influencers as initialInfluencers, posts as initialPosts } from '@/lib/data';
import { generateSummaryAction, fetchPostsAction } from '@/lib/actions';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { PostCard } from '@/components/post-card';
import { Mail, Plus, Sparkles, Trash2, Bot, Loader2 } from 'lucide-react';

const platforms: PostType['platform'][] = ['YouTube', 'Instagram', 'LinkedIn'];

export function Dashboard() {
  const [influencers, setInfluencers] = useState<Influencer[]>(initialInfluencers);
  const [posts, setPosts] = useState<PostType[]>(initialPosts);

  const [newInfluencerName, setNewInfluencerName] = useState('');
  const [newInfluencerHandle, setNewInfluencerHandle] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, boolean>>(
    platforms.reduce((acc, p) => ({ ...acc, [p]: true }), {})
  );

  const [summary, setSummary] = useState('');
  const [isSummarizing, startSummaryTransition] = useTransition();
  const [isFetching, startFetchingTransition] = useTransition();
  const { toast } = useToast();

  const filteredPosts = useMemo(() => {
    const activePlatforms = Object.keys(selectedPlatforms).filter(p => selectedPlatforms[p]);
    const sortedPosts = [...posts].sort((a, b) => {
        const aVal = a.timestamp.includes('h') ? 1 : 0;
        const bVal = b.timestamp.includes('h') ? 1 : 0;
        if (aVal !== bVal) return bVal - aVal;
        const aNum = parseInt(a.timestamp);
        const bNum = parseInt(b.timestamp);
        return aNum - bNum;
    });

    return sortedPosts.filter(post => 
      activePlatforms.includes(post.platform) && 
      influencers.some(inf => inf.handle === post.handle)
    );
  }, [selectedPlatforms, influencers, posts]);

  const handleAddInfluencer = async () => {
    if (newInfluencerName.trim() && newInfluencerHandle.trim() && !isFetching) {
      const handleWithAt = newInfluencerHandle.startsWith('@') ? newInfluencerHandle : `@${newInfluencerHandle}`;
      if (influencers.find(i => i.handle === handleWithAt)) {
        toast({ title: "Error", description: "Influencer handle already exists.", variant: "destructive" });
        return;
      }
      
      const newInfluencer: Influencer = { 
        name: newInfluencerName, 
        handle: handleWithAt, 
        avatar: `https://placehold.co/40x40.png`,
        dataAiHint: 'person portrait'
      };

      startFetchingTransition(async () => {
        const result = await fetchPostsAction(newInfluencer);
        if (result.error) {
            toast({ title: "Error fetching posts", description: result.error, variant: "destructive" });
        } else if (result.posts && result.posts.length > 0) {
            setPosts(prevPosts => [...prevPosts, ...result.posts!]);
            setInfluencers(prev => [...prev, newInfluencer]);
            setNewInfluencerName('');
            setNewInfluencerHandle('');
            toast({ title: "Influencer Added", description: `Found ${result.posts.length} new posts for ${newInfluencer.name}.`});
        } else {
            toast({ 
              title: "No Posts Found", 
              description: `Could not find any recent posts for ${handleWithAt}. Please check the handle and selected platforms.`, 
              variant: "destructive" 
            });
        }
      });
    }
  };

  const handleRemoveInfluencer = async (handleToRemove: string) => {
    setInfluencers(influencers.filter(i => i.handle !== handleToRemove));
  };

  const handleGenerateSummary = () => {
    const contentToSummarize = filteredPosts.map(p => `${p.influencer} (${p.platform}): ${p.content}`).join('\n\n');
    
    startSummaryTransition(async () => {
      setSummary('');
      const result = await generateSummaryAction(contentToSummarize);
      if (result.error) {
        toast({ title: "Summarization Failed", description: result.error, variant: "destructive" });
      } else {
        setSummary(result.summary || '');
        toast({ title: "Success", description: "New trend summary generated!" });
      }
    });
  };
  
  const handleDeliverInsights = () => {
    toast({
      title: "Brief Sent!",
      description: "A summary has been sent to the brand team.",
    });
  };
  
  const isPending = isSummarizing || isFetching;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
             <Bot className="w-8 h-8 text-primary" />
             <h2 className="text-xl font-semibold tracking-tight">TrendTracker AI</h2>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarGroup>
            <SidebarGroupLabel>Manage Handles</SidebarGroupLabel>
            <div className="space-y-2">
              {influencers.map((influencer) => (
                <div key={influencer.handle} className="flex items-center justify-between text-sm p-1 rounded-md hover:bg-sidebar-accent">
                  <span>{influencer.name}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveInfluencer(influencer.handle)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <Input placeholder="Name (e.g. Jane Smith)" value={newInfluencerName} onChange={(e) => setNewInfluencerName(e.target.value)} />
              <Input placeholder="Handle (e.g. @janesmith)" value={newInfluencerHandle} onChange={(e) => setNewInfluencerHandle(e.target.value)} />
              <Button onClick={handleAddInfluencer} className="w-full" disabled={isFetching}>
                {isFetching ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                {isFetching ? 'Searching...' : 'Add Handle'}
              </Button>
            </div>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Filter Platforms</SidebarGroupLabel>
            <div className="space-y-2">
              {platforms.map(platform => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox 
                    id={platform} 
                    checked={selectedPlatforms[platform]}
                    onCheckedChange={(checked) => setSelectedPlatforms({...selectedPlatforms, [platform]: !!checked})}
                  />
                  <Label htmlFor={platform} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-8">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <div className="md:hidden">
                  <SidebarTrigger />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              </div>
              <p className="text-muted-foreground">Aggregated posts from tracked influencers.</p>
            </div>
            <Button onClick={handleDeliverInsights} className="w-full sm:w-auto">
              <Mail className="w-4 h-4 mr-2" /> Deliver Insights
            </Button>
          </header>
          
          <Card className="mb-8 border-accent shadow-lg shadow-accent/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-accent" />
                <CardTitle className="text-accent">AI-Powered Trend Analysis</CardTitle>
              </div>
              <CardDescription>Generate a summary of the latest posts to identify key trends and topics.</CardDescription>
            </CardHeader>
            <CardContent>
              {isSummarizing ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : summary ? (
                <p className="text-sm leading-relaxed">{summary}</p>
              ) : (
                <p className="text-sm text-muted-foreground">Click the button to generate an AI summary of the posts below.</p>
              )}
              <Button onClick={handleGenerateSummary} disabled={isSummarizing} className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                {isSummarizing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Generate Summary'}
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
              !isPending && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No posts found for the selected filters. Add an influencer to get started.</p>
                </div>
              )
            )}
            {isPending && Array.from({length:3}).map((_, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center gap-4 p-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                    <CardFooter className="p-4">
                        <Skeleton className="h-4 w-1/2" />
                    </CardFooter>
                </Card>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
