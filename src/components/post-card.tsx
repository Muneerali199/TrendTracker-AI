"use client";

import type { Post } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Youtube, Instagram, Linkedin, MessageCircle, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

type PostCardProps = {
  post: Post;
};

const platformIcons = {
  YouTube: <Youtube className="w-5 h-5 text-red-600" />,
  Instagram: <Instagram className="w-5 h-5 text-pink-500" />,
  LinkedIn: <Linkedin className="w-5 h-5 text-blue-700" />,
};

export function PostCard({ post }: PostCardProps) {
  const PlatformIcon = platformIcons[post.platform];

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center gap-4 p-4 bg-card">
        <Avatar>
          <AvatarImage asChild src={post.avatar}>
             <Image src={post.avatar} alt={post.influencer} width={40} height={40} data-ai-hint={post.dataAiHint} />
          </AvatarImage>
          <AvatarFallback>{post.influencer.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold">{post.influencer}</CardTitle>
          <CardDescription className="text-sm">{post.handle}</CardDescription>
        </div>
        {PlatformIcon}
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <p className="text-sm text-foreground/90 leading-relaxed">{post.content}</p>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between text-xs text-muted-foreground bg-secondary/30">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{post.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{post.comments.toLocaleString()}</span>
            </div>
        </div>
        <span>{post.timestamp}</span>
      </CardFooter>
    </Card>
  );
}
