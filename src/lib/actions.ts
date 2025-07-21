'use server';

import { summarizeAggregatedContent } from '@/ai/flows/summarize-aggregated-content';
import { searchPosts } from '@/ai/flows/search-posts';
import type { Post } from './data';

export async function generateSummaryAction(content: string) {
  if (!content || content.trim().length === 0) {
    return { error: 'Content for summarization cannot be empty.' };
  }

  try {
    const result = await summarizeAggregatedContent({ content });
    return { summary: result.summary };
  } catch (e) {
    console.error(e);
    return { error: 'An error occurred while generating the summary. Please try again.' };
  }
}

export async function fetchPostsAction({ handle, platform }: { handle: string, platform: Post['platform'] }): Promise<{posts?: Omit<Post, 'influencer' | 'handle' | 'avatar' | 'dataAiHint' | 'platform'>[], error?: string}> {
  try {
    const result = await searchPosts({ handle, platform });

    if (!result || !result.posts) {
        return { posts: [] };
    }

    return { posts: result.posts };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `An error occurred while fetching posts: ${errorMessage}` };
  }
}
