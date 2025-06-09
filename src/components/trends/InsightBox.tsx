import React from 'react';
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { marketTrendData } from '../../data/dummyData';

interface InsightBoxProps {
  keywords: string[];
}

const InsightBox: React.FC<InsightBoxProps> = ({ keywords }) => {
  const generateInsights = () => {
    const insights = [];
    
    keywords.forEach(keyword => {
      const data = marketTrendData.filter(d => d.keyword === keyword);
      if (data.length < 7) return;
      
      const recent = data.slice(-7);
      const previous = data.slice(-14, -7);
      
      const recentAvg = recent.reduce((sum, d) => sum + d.value, 0) / recent.length;
      const previousAvg = previous.reduce((sum, d) => sum + d.value, 0) / previous.length;
      const change = ((recentAvg - previousAvg) / previousAvg * 100);
      
      if (Math.abs(change) > 15) {
        insights.push({
          type: change > 0 ? 'trending' : 'declining',
          keyword,
          change: Math.abs(change).toFixed(1),
          message: change > 0 
            ? `${keyword} is trending up ${change.toFixed(1)}% this week`
            : `${keyword} mentions declined ${Math.abs(change).toFixed(1)}% this week`
        });
      }
    });
    
    // Add some general insights
    insights.push({
      type: 'opportunity',
      keyword: 'market',
      change: '0',
      message: 'Consider expanding tracking to include "blockchain payments" - showing 45% growth'
    });
    
    insights.push({
      type: 'alert',
      keyword: 'regulation',
      change: '0',
      message: 'New EU fintech regulations may impact market dynamics in Q2'
    });
    
    return insights.slice(0, 4);
  };

  const insights = generateInsights();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Lightbulb className="w-4 h-4 text-blue-500" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'trending':
        return 'bg-green-50 border-green-200';
      case 'declining':
        return 'bg-red-50 border-red-200';
      case 'alert':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Emerging Signals</h2>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${getInsightColor(insight.type)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 leading-relaxed">
                  {insight.message}
                </p>
                {insight.change !== '0' && (
                  <p className="text-xs text-gray-600 mt-1">
                    Change: {insight.change}%
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {insights.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Lightbulb className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>No significant signals detected.</p>
            <p className="text-sm">Add more keywords to track emerging trends.</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          View Detailed Analysis
        </button>
      </div>
    </div>
  );
};

export default InsightBox;