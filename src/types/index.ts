export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company: {
    name: string;
    sector: string;
  };
}

export interface Competitor {
  id: string;
  name: string;
  logo?: string;
  sector: string;
  lastFunding: {
    amount: string;
    date: string;
    round: string;
  };
  recentNews: {
    headline: string;
    url: string;
    date: string;
  };
  riskLevel: 'low' | 'medium' | 'high';
}

export interface TrackedCompetitor {
  id: string;
  name: string;
  industry: string;
  employees: string;
  totalFunding: string;
  founded: string;
  headquarters: string;
  website: string;
  description: string;
  lastFunding: {
    amount: string;
    date: string;
    round: string;
  };
  fundingHistory: Array<{
    round: string;
    amount: string;
    date: string;
    leadInvestor: string;
  }>;
  recentActivity: {
    headline: string;
    url: string;
    date: string;
  };
  recentNews: Array<{
    headline: string;
    url: string;
    date: string;
  }>;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Alert {
  id: string;
  type: 'funding' | 'regulation' | 'product' | 'market' | 'executive';
  title: string;
  description: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
  competitor?: string | null;
}

export interface TrendData {
  date: string;
  value: number;
  keyword: string;
}

export interface OverviewMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface OnboardingData {
  sector: string;
  competitors: string[];
  step: number;
}

export interface Report {
  id: string;
  title: string;
  summary: string;
  dateGenerated: string;
  type: 'comprehensive' | 'funding' | 'trends' | 'competitive';
}