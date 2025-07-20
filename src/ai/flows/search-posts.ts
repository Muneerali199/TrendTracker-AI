'use server';
/**
 * @fileOverview A flow for searching for posts by an influencer on a specific platform.
 *
 * - searchPosts - A function that handles searching for posts.
 * - SearchPostsInput - The input type for the searchPosts function.
 * - SearchPostsOutput - The return type for the searchPosts function.
 */

import {ai} from '@/ai/genkit';
import {performSearch} from '@/services/search';
import {z} from 'genkit';

const PostSchema = z.object({
  id: z.string().describe('Unique identifier for the post'),
  content: z.string().describe('The content of the post.'),
  likes: z.number().describe('Number of likes.'),
  comments: z.number().describe('Number of comments.'),
  timestamp: z.string().describe('When the post was created.'),
});

const SearchPostsInputSchema = z.object({
  handle: z.string().describe("The influencer's handle."),
  platform: z
    .enum(['YouTube', 'Instagram', 'LinkedIn'])
    .describe('The social media platform to search on.'),
});
export type SearchPostsInput = z.infer<typeof SearchPostsInputSchema>;

const SearchPostsOutputSchema = z.object({
  posts: z.array(PostSchema).describe('A list of recent posts found.'),
});
export type SearchPostsOutput = z.infer<typeof SearchPostsOutputSchema>;

const searchTool = ai.defineTool(
  {
    name: 'searchTool',
    description: 'Performs a search for recent posts by an influencer on a given platform.',
    inputSchema: SearchPostsInputSchema,
    outputSchema: SearchPostsOutputSchema,
  },
  async (input) => {
    console.log(`Using search tool for ${input.handle} on ${input.platform}`);
    return await performSearch(input);
  }
);


export async function searchPosts(
  input: SearchPostsInput
): Promise<SearchPostsOutput> {
  return searchPostsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchPostsPrompt',
  input: {schema: SearchPostsInputSchema},
  output: {schema: SearchPostsOutputSchema},
  tools: [searchTool],
  prompt: `Find recent posts for {{handle}} on {{platform}}.`,
});

const searchPostsFlow = ai.defineFlow(
  {
    name: 'searchPostsFlow',
    inputSchema: SearchPostsInputSchema,
    outputSchema: SearchPostsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
