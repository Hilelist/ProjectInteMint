import { useState, useEffect } from 'react';
import { Newspaper, Loader2, AlertCircle, TrendingUp } from 'lucide-react';
import { fetchIndustryNews, analyzeTrendingKeywords } from '@/lib/newsService';

interface NewsArticle {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  description: string;
}

interface TrendingKeyword {
  keyword: string;
  count: number;
}

const DEFAULT_INDUSTRIES = [
  'SaaS',
  'Fintech',
  'AI',
  'Cybersecurity',
  'Blockchain',
  'Healthcare Tech',
  'E-commerce',
  'EdTech'
];

export default function MarketTrends() {
  const [selectedIndustry, setSelectedIndustry] = useState(DEFAULT_INDUSTRIES[0]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [trendingKeywords, setTrendingKeywords] = useState<TrendingKeyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const articles = await fetchIndustryNews(selectedIndustry);
        setNews(articles);

        // Analyze trending keywords from the news titles
        const keywords = analyzeTrendingKeywords(articles);
        setTrendingKeywords(keywords);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    // Refresh every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedIndustry]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Market Trends</h2>
          <div className="flex items-center space-x-4">
            <label htmlFor="industry" className="text-sm font-medium text-gray-700">
              Industry:
            </label>
            <select
              id="industry"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {DEFAULT_INDUSTRIES.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="ml-2 text-gray-500">Loading market trends...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-8 text-red-500">
            <AlertCircle className="w-8 h-8 mr-2" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* News Section */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Newspaper className="w-5 h-5 mr-2" />
                Latest News
              </h3>
              <div className="space-y-4">
                {news.map((article, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                    >
                      {article.title}
                    </a>
                    {article.description && (
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                        {article.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center text-xs text-gray-400">
                      <span>{article.source}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Keywords Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Trending Keywords
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {trendingKeywords.length > 0 ? (
                  <div className="space-y-3">
                    {trendingKeywords.map(({ keyword, count }) => (
                      <div
                        key={keyword}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-gray-900">
                          {keyword}
                        </span>
                        <span className="text-xs text-gray-500">
                          {count} mentions
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No trending keywords found</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}