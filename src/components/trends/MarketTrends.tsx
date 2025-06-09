import React, { useState } from 'react';
import { Calendar, Plus, TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { marketTrendData, trendKeywords } from '../../data/dummyData';
import TrendsChart from './TrendsChart';
import InsightBox from './InsightBox';

const MarketTrends: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedKeywords, setSelectedKeywords] = useState(['fintech', 'digital payments']);
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !selectedKeywords.includes(newKeyword.trim().toLowerCase())) {
      setSelectedKeywords([...selectedKeywords, newKeyword.trim().toLowerCase()]);
      setNewKeyword('');
      setShowAddKeyword(false);
    }
  };

  const removeKeyword = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
  };

  const getKeywordData = (keyword: string) => {
    return marketTrendData.filter(d => d.keyword === keyword);
  };

  const getKeywordTrend = (keyword: string) => {
    const data = getKeywordData(keyword);
    if (data.length < 2) return 'neutral';
    
    const recent = data.slice(-7);
    const previous = data.slice(-14, -7);
    
    const recentAvg = recent.reduce((sum, d) => sum + d.value, 0) / recent.length;
    const previousAvg = previous.reduce((sum, d) => sum + d.value, 0) / previous.length;
    
    if (recentAvg > previousAvg * 1.1) return 'up';
    if (recentAvg < previousAvg * 0.9) return 'down';
    return 'neutral';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Market Trends</h1>
        <p className="text-gray-600">Track keyword trends and emerging signals in your industry.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Time Range */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Keywords */}
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Tracking:</span>
            {selectedKeywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                <span>{keyword}</span>
                {getTrendIcon(getKeywordTrend(keyword))}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="text-blue-600 hover:text-blue-800 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
            
            {showAddKeyword ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Enter keyword..."
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                />
                <button
                  onClick={handleAddKeyword}
                  className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddKeyword(false)}
                  className="px-2 py-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddKeyword(true)}
                className="flex items-center space-x-1 px-3 py-1 border border-dashed border-gray-300 rounded-full text-sm text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Keyword</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="xl:col-span-2">
          <TrendsChart 
            keywords={selectedKeywords}
            timeRange={timeRange}
            data={marketTrendData}
          />
        </div>

        {/* Insights */}
        <div className="xl:col-span-1">
          <InsightBox keywords={selectedKeywords} />
        </div>
      </div>

      {/* Keyword Performance Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span>Keyword Performance Summary</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedKeywords.map((keyword) => {
            const data = getKeywordData(keyword);
            const trend = getKeywordTrend(keyword);
            const currentValue = data[data.length - 1]?.value || 0;
            const previousValue = data[data.length - 2]?.value || 0;
            const change = previousValue ? ((currentValue - previousValue) / previousValue * 100).toFixed(1) : '0';
            
            return (
              <div key={keyword} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 capitalize">{keyword}</h3>
                  {getTrendIcon(trend)}
                </div>
                <p className="text-2xl font-bold text-gray-900">{currentValue}</p>
                <p className={`text-sm ${
                  trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {trend === 'up' ? '+' : trend === 'down' ? '' : '±'}{change}% from yesterday
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MarketTrends;