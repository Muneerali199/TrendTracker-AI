# TrendTracker AI

## Problem Statement

In the fast-paced world of social media, brand managers, marketers, and content creators face a significant challenge: staying current with rapidly changing trends. Manually tracking numerous influencers across multiple platforms (like YouTube, Instagram, and LinkedIn) is time-consuming, inefficient, and makes it easy to miss the key conversations and topics that are capturing audience attention. This reactive approach often leads to missed opportunities for timely and relevant brand engagement.

## Solution

**TrendTracker AI** is a modern, AI-powered application designed to solve this problem. It provides a centralized dashboard where users can track a curated list of influencers. The application simulates fetching the latest posts from these influencers and leverages the power of Google's Gemini AI to generate instant, concise summaries of the aggregated content. This allows users to quickly identify emerging trends, key topics, and overall sentiment without having to sift through endless feeds manually. TrendTracker AI transforms trend analysis from a reactive chore into a proactive strategy.

![TrendTracker AI Screenshot](https://placehold.co/1200x600.png)

## Key Features

- **Track Influencers**: Add influencers by their handle and platform (YouTube, Instagram, LinkedIn) to create a custom tracking list.
- **Simulated Real-Time Data**: Uses Genkit and the Gemini API to generate realistic, on-demand posts, likes, and comments for any influencer, simulating a live data feed.
- **AI-Powered Summaries**: With a single click, generate a concise summary of all aggregated posts to quickly understand key trends.
- **Dynamic Filtering**: Filter the post feed by social media platform to focus on specific channels.
- **Responsive UI**: A clean, modern, and fully responsive interface built with ShadCN UI and Tailwind CSS.
- **Authentication Ready**: Includes a complete, but currently disabled, authentication flow built with Supabase for easy re-integration.

## Application Flow

The current public-facing demo follows this simplified, unauthenticated architecture:

```mermaid
graph TD
    subgraph "User Interface (Client-Side)"
        A[User opens Dashboard] --> B{View Posts};
        B --> C[Add New Influencer];
        C -- Enters Handle & Platform --> D{Fetch Posts};
        B --> E[Remove Influencer];
        B --> F[Filter by Platform];
        B --> G[Click "Generate Summary"];
    end

    subgraph "Backend (Server Actions & AI)"
        D --> H[Call fetchPostsAction];
        H --> I["searchPosts (Genkit Flow)"];
        I --> J["Gemini LLM Generates Posts"];
        J --> K{Return Simulated Posts};

        G --> L[Call generateSummaryAction];
        L --> M["summarizeAggregatedContent (Genkit Flow)"];
        M --> N["Gemini LLM Generates Summary"];
        N --> O{Summary Response};
    end

    subgraph "UI Update"
       K --> P[Display New Posts in Feed];
       O --> Q[Display AI-Generated Summary];
    end

    E --> P;
    F --> B;
```

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **AI Integration**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **AI Model**: [Google Gemini](https://deepmind.google.com/technologies/gemini/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Authentication (Disabled)**: [Supabase](https://supabase.com/)

## Future Goals

- **Data Visualization**: Implement charts and graphs to visualize trend engagement, post frequency, and key topic mentions over time.
- **Sentiment Analysis**: Enhance the AI flow to analyze the sentiment (positive, negative, neutral) of aggregated posts.
- **Brief Sharing**: Add a feature to format and export the AI-generated summaries as "trend briefs" that can be easily shared with team members.
- **Database Integration**: Re-enable and complete the Supabase/Firestore integration to allow users to save their influencer lists and persist data across sessions.
- **Background Fetching**: Implement a background process to periodically fetch new posts from tracked influencers automatically.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A Google Gemini API key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/trendtracker-ai.git
    cd trendtracker-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Google Gemini API key.

    ```
    # Google Gemini API Key
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

### Running the Application

To run the application in development mode, use the following command. This will start the Next.js development server, typically on `http://localhost:9002`.

```bash
npm run dev
```

The application should now be running, and you can access it in your browser.
