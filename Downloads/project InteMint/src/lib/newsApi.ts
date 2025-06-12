import axios from 'axios';

interface NewsArticle {
  title: string;
  url: string;
  publishedAt: string;
  description: string;
  source: {
    name: string;
  };
}

interface NewsResponse {
  articles: NewsArticle[];
  status: string;
  totalResults: number;
}

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

export async function fetchCompetitorNews(competitorName: string, industry: string): Promise<NewsArticle[]> {
  try {
    // Create a search query combining competitor name and industry
    const query = `${competitorName} ${industry}`;
    
    const response = await axios.get<NewsResponse>(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 3, // Get top 3 articles
        apiKey: NEWS_API_KEY
      }
    });

    if (response.data.status !== 'ok') {
      throw new Error('News API returned an error');
    }

    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
} 