'use server';

import { summarizeAggregatedContent } from '@/ai/flows/summarize-aggregated-content';

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
