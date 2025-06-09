import React, { useState } from 'react';
import { ExternalLink, Filter, Building2 } from 'lucide-react';
import { competitors } from '../../data/dummyData';

const CompetitorFeed: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCompetitors = competitors.filter(competitor => {
    if (filter === 'all') return true;
    return competitor.riskLevel === filter;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Competitor Activity Feed</h2>
        
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          
          {showFilters && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              {['all', 'high', 'medium', 'low'].map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setFilter(level);
                    setShowFilters(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                    filter === level ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {level === 'all' ? 'All Levels' : `${level.charAt(0).toUpperCase() + level.slice(1)} Risk`}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredCompetitors.map((competitor) => (
          <div key={competitor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-gray-900">{competitor.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getRiskColor(competitor.riskLevel)}`}>
                      {competitor.riskLevel} risk
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Last Funding:</span> {competitor.lastFunding.amount} ({competitor.lastFunding.round}) - {new Date(competitor.lastFunding.date).toLocaleDateString()}
                    </p>
                    <div className="flex items-start space-x-2">
                      <span className="font-medium">Recent News:</span>
                      <a
                        href={competitor.recentNews.url}
                        className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
                      >
                        <span>{competitor.recentNews.headline}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                More Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitorFeed;