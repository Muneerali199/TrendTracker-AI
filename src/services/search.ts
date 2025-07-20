import type { SearchPostsInput, SearchPostsOutput } from '@/ai/flows/search-posts';

/**
 * @fileOverview A mock search service to simulate fetching posts.
 * This can be replaced with a real search API integration in the future.
 */

// This is a hardcoded list of potential posts to be "found" by the search service.
const mockSearchResults = [
  {
    platform: 'Instagram',
    posts: [
      {
        id: 'insta-101',
        content: 'Just wrapped up an amazing collaboration with a brand that shares my values. Stay tuned for the big reveal!',
        likes: 23000,
        comments: 850,
        timestamp: '1h ago',
      },
      {
        id: 'insta-102',
        content: 'Morning coffee and coding. How I start my days for maximum productivity. ☕💻 #devlife',
        likes: 18000,
        comments: 400,
        timestamp: '3h ago',
      },
      {
        id: 'insta-103',
        content: 'Exploring the city and found this hidden gem. The vibes are immaculate.',
        likes: 52000,
        comments: 1200,
        timestamp: '1d ago',
      },
    ],
  },
  {
    platform: 'LinkedIn',
    posts: [
      {
        id: 'li-201',
        content: "Excited to share that I'll be speaking at the upcoming Tech Forward conference on the future of AI in marketing. Hope to see you there! #AI #Marketing",
        likes: 5000,
        comments: 320,
        timestamp: '8h ago',
      },
      {
        id: 'li-202',
        content: 'Reflecting on my career journey, the most important lesson has been persistence. Never give up on your goals, even when things get tough.',
        likes: 7200,
        comments: 600,
        timestamp: '1d ago',
      },
       {
        id: 'li-203',
        content: 'Mentorship is a two-way street. I learned as much from my mentee as they did from me. #Leadership #Development',
        likes: 4100,
        comments: 250,
        timestamp: '3d ago',
      },
    ],
  },
  {
    platform: 'YouTube',
    posts: [
      {
        id: 'yt-301',
        content: 'New video alert! I reviewed the top 5 productivity apps of the year. You won\'t believe number one!',
        likes: 95000,
        comments: 6500,
        timestamp: '2d ago',
      },
      {
        id: 'yt-302',
        content: 'A day in the life of a content creator. It\'s not as glamorous as you think! Full vlog is up now.',
        likes: 180000,
        comments: 11000,
        timestamp: '5d ago',
      },
    ],
  },
];

export async function performSearch(input: SearchPostsInput): Promise<SearchPostsOutput> {
  console.log(`Searching for posts by ${input.handle} on ${input.platform}...`);

  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // A list of handles known to have no posts, to simulate a "user not found" scenario
  const handlesWithNoPosts = ['@nonexistentuser', '@nobodyhere', '@fakehandle'];
  if (handlesWithNoPosts.includes(input.handle.toLowerCase())) {
    console.log(`No posts found for handle: ${input.handle} (simulated)`);
    return { posts: [] };
  }

  const platformResults = mockSearchResults.find(r => r.platform === input.platform);

  if (platformResults) {
    // Return a random subset of posts for the given platform to make it feel dynamic
    const shuffled = [...platformResults.posts].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * shuffled.length) + 1;
    const posts = shuffled.slice(0, count);

    console.log(`Found ${posts.length} posts.`);
    return { posts };
  }

  console.log('Found no posts.');
  return { posts: [] };
}
