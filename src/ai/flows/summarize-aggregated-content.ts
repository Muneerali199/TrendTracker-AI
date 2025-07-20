'use server';
/**
 * @fileOverview A flow for summarizing aggregated content from social media to identify key trends and topics.
 *
 * - summarizeAggregatedContent - A function that handles the content summarization process.
 * - SummarizeAggregatedContentInput - The input type for the summarizeAggregatedContent function.
 * - SummarizeAggregatedContentOutput - The return type for the summarizeAggregatedContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAggregatedContentInputSchema = z.object({
  content: z
    .string()
    .describe('The aggregated content from social media platforms.'),
});
export type SummarizeAggregatedContentInput = z.infer<
  typeof SummarizeAggregatedContentInputSchema
>;

const SummarizeAggregatedContentOutputSchema = z.object({
  summary: z.string().describe('A summary of the key trends and topics.'),
});
export type SummarizeAggregatedContentOutput = z.infer<
  typeof SummarizeAggregatedContentOutputSchema
>;

export async function summarizeAggregatedContent(
  input: SummarizeAggregatedContentInput
): Promise<SummarizeAggregatedContentOutput> {
  return summarizeAggregatedContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAggregatedContentPrompt',
  input: {schema: SummarizeAggregatedContentInputSchema},
  output: {schema: SummarizeAggregatedContentOutputSchema},
  prompt: `You are an expert social media analyst.

You will receive aggregated content from various social media platforms. Your task is to summarize the content, identifying key trends and topics. Provide a concise summary that highlights the main points and insights from the content.

Aggregated Content:
{{{content}}}`,
});

const summarizeAggregatedContentFlow = ai.defineFlow(
  {
    name: 'summarizeAggregatedContentFlow',
    inputSchema: SummarizeAggregatedContentInputSchema,
    outputSchema: SummarizeAggregatedContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
