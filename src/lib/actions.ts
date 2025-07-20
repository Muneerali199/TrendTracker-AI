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
    const platforms: Post['platform'][] = ['Instagram', 'LinkedIn', 'YouTube'];
    const searchPromises = platforms.map(platform => searchPosts({ handle: influencer.handle, platform }));
    
    const results = await Promise.all(searchPromises);

    const newPosts: Post[] = results.flatMap((result, index) => {
        return result.posts.map(p => ({
            ...p,
            platform: platforms[index],
            influencer: influencer.name,
            handle: influencer.handle,
            avatar: influencer.avatar,
            dataAiHint: influencer.dataAiHint,
        }));
    });

    return { posts: newPosts };
  } catch (e) {
    console.error(e);
    return { error: 'An error occurred while fetching posts. Please try again.' };
  }
}
