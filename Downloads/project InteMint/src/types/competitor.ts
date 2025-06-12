export interface NewsArticle {
  id: string;
  competitor_id: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  created_at: string;
}

export interface Competitor {
  id: string;
  user_id: string;
  name: string;
  website: string;
  logo_url?: string;
  industry?: string;
  description?: string;
  founded_year?: number;
  employee_count?: number;
  headquarters?: string;
  social_links?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

export interface FundingRound {
  id: string;
  competitor_id: string;
  amount: number;
  round_type: string;
  date: string;
  source_url: string;
  created_at: string;
}

export interface CompetitorWithNews extends Competitor {
  news: NewsArticle[];
  funding: FundingRound[];
} 