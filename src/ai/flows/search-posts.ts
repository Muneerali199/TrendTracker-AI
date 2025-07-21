'use server';
/**
 * @fileOverview A flow for searching for posts by an influencer on a specific platform.
 *
 * - searchPosts - A function that handles searching for posts.
 * - SearchPostsInput - The input type for the searchPosts function.
 * - SearchPostsOutput - The return type for the searchPosts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PostSchema = z.object({
  id: z.string().describe('Unique identifier for the post'),
  content: z.string().describe('The content of the post.'),
  likes: z.number().describe('Number of likes.'),
  comments: z.number().describe('Number of comments.'),
  timestamp: z.string().describe('When the post was created (e.g., "1h ago", "2d ago").'),
});

const SearchPostsInputSchema = z.object({
  handle: z.string().describe("The influencer's handle."),
  platform: z
    .enum(['YouTube', 'Instagram', 'LinkedIn'])
    .describe('The social media platform to search on.'),
});
export type SearchPostsInput = z.infer<typeof SearchPostsInputSchema>;

const SearchPostsOutputSchema = z.object({
  posts: z
    .array(PostSchema)
    .describe(
      'A list of 1 to 3 recent posts found. If the influencer is unknown or no posts are found, return an empty list.'
    ),
});
export type SearchPostsOutput = z.infer<typeof SearchPostsOutputSchema>;

export async function searchPosts(
  input: SearchPostsInput
): Promise<SearchPostsOutput> {
  return searchPostsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchPostsPrompt',
  input: {schema: SearchPostsInputSchema},
  output: {schema: SearchPostsOutputSchema},
  prompt: `You are an expert social media simulator. Your task is to generate a list of 1 to 3 recent, realistic-sounding posts for a given influencer handle on a specific platform. The posts should be plausible for the platform and the type of content commonly found there.

- For **YouTube**, generate video titles or descriptions.
- For **Instagram**, generate photo captions or stories.
- For **LinkedIn**, generate professional updates or articles.

Generate posts for the following influencer:
- Handle: {{handle}}
- Platform: {{platform}}

If the handle seems generic or you have no specific knowledge of them, create plausible content based on the platform's nature. Make the likes and comments counts realistic for a popular influencer. If you cannot generate any posts, return an empty list for the 'posts' field.`,
});

const searchPostsFlow = ai.defineFlow(
  {
    name: 'searchPostsFlow',
    inputSchema: SearchPostsInputSchema,
    outputSchema: SearchPostsOutputSchema,
  },
  async (input) => {
    console.log(`Generating posts for ${input.handle} on ${input.platform}...`);
    try {
      const {output} = await prompt(input);
      // Ensure the output is never null and posts is always an array
      const posts = output?.posts ?? [];
      console.log(`Found ${posts.length} posts.`);
      return { posts };
    } catch (error) {
      console.error(`Error in searchPostsFlow for ${input.handle}:`, error);
      // In case of an error, return an empty list to prevent downstream failures.
      return { posts: [] };
    }
  }
);
