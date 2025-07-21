'use server';

import { summarizeAggregatedContent } from '@/ai/flows/summarize-aggregated-content';
import { searchPosts } from '@/ai/flows/search-posts';
import type { Post } from './data';
import type { Influencer } from './data';

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

export async function fetchPostsAction(influencer: Influencer): Promise<{posts?: Post[], error?: string}> {
  try {
    // We search on all platforms for the influencer
    const platforms: Post['platform'][] = ['Instagram', 'LinkedIn', 'YouTube'];
    const searchPromises = platforms.map(platform => 
        searchPosts({ handle: influencer.handle, platform })
    );
    
    const results = await Promise.all(searchPromises);

    const allPosts = results.flatMap((result, index) => {
        if (!result || !result.posts) return [];
        return result.posts.map(p => ({
            ...p,
            platform: platforms[index],
            influencer: influencer.name,
            handle: influencer.handle,
            avatar: influencer.avatar,
            dataAiHint: influencer.dataAiHint,
        }));
    });

    // If no posts were found across all platforms, return a specific message.
    if (allPosts.length === 0) {
        return { posts: [] };
    }

    return { posts: allPosts };
  } catch (e) {
    console.error(e);
    // Provide a more specific error message if possible
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `An error occurred while fetching posts: ${errorMessage}` };
  }
}
