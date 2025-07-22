# TrendTracker AI

TrendTracker AI is a modern, AI-powered application designed to help brand and social media managers monitor online trends by aggregating and analyzing posts from various influencers. Users can create an account, track influencers across different platforms, view a consolidated feed of their latest posts, and generate AI-powered summaries to quickly identify key topics and trends.

![TrendTracker AI Screenshot](https://placehold.co/1200x600.png)

## Key Features

- **User Authentication**: Secure sign-up and login functionality provided by [Supabase](https://supabase.com/).
- **Track Influencers**: Add influencers by their handle and platform (YouTube, Instagram, LinkedIn) to create a custom tracking list.
- **Aggregate Content**: The application fetches the latest posts from the influencers you are tracking.
- **AI-Powered Summaries**: With a single click, generate a concise summary of all the aggregated posts to quickly understand key trends.
- **Dynamic Filtering**: Filter the post feed by social media platform to focus on specific channels.
- **Responsive UI**: A clean, modern, and fully responsive interface built with ShadCN UI and Tailwind CSS.
- **Simulated Real-Time Data**: Uses Genkit and the Gemini API to generate realistic, on-demand posts, likes, and comments for any influencer, simulating a live data feed.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Authentication**: [Supabase](https://supabase.com/)
- **AI Integration**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **AI Model**: [Google Gemini](https://deepmind.google/technologies/gemini/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A Supabase account and project
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
    Create a `.env` file in the root of your project. You will need to add your Supabase project URL, your Supabase public anon key, and your Gemini API key.

    ```
    # Supabase credentials
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

    # Google Gemini API Key
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

### Running the Application

To run the application in development mode, use the following command. This will start the Next.js development server, typically on `http://localhost:9002`.

```bash
npm run dev
```

The application should now be running, and you can access it in your browser.
