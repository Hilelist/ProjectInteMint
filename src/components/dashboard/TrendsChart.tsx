import React, { useState } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { trendData } from '../../data/dummyData';

const TrendsChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  // Filter data based on time range
  const getFilteredData = () => {
    const days = parseInt(timeRange.replace('d', ''));
    return trendData.slice(-days);
  };

  const filteredData = getFilteredData();
  const maxValue = Math.max(...filteredData.map(d => d.value));
  const minValue = Math.min(...filteredData.map(d => d.value));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Market Trends</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Keyword: "fintech"</span>
          <span>Current Score: {filteredData[filteredData.length - 1]?.value || 0}</span>
        </div>
        
        {/* Simple line chart visualization */}
        <div className="relative h-64 bg-gray-50 rounded-lg p-4">
          <svg width="100%" height="100%" className="overflow-visible">
            <defs>
              <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.05 }} />
              </linearGradient>
            </defs>
            
            {/* Chart area */}
            <g>
              {filteredData.map((point, index) => {
                const x = (index / (filteredData.length - 1)) * 100;
                const y = 100 - ((point.value - minValue) / (maxValue - minValue)) * 80;
                
                return (
                  <g key={index}>
                    {/* Data point */}
                    <circle
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="3"
                      fill="#3B82F6"
                      className="hover:r-4 transition-all duration-200"
                    />
                    
                    {/* Line to next point */}
                    {index < filteredData.length - 1 && (
                      <line
                        x1={`${x}%`}
                        y1={`${y}%`}
                        x2={`${((index + 1) / (filteredData.length - 1)) * 100}%`}
                        y2={`${100 - ((filteredData[index + 1].value - minValue) / (maxValue - minValue)) * 80}%`}
                        stroke="#3B82F6"
                        strokeWidth="2"
                        fill="none"
                      />
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
            <span>{maxValue}</span>
            <span>{Math.round((maxValue + minValue) / 2)}</span>
            <span>{minValue}</span>
          </div>
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-gray-500 px-4">
          <span>{new Date(filteredData[0]?.date).toLocaleDateString()}</span>
          <span>{new Date(filteredData[filteredData.length - 1]?.date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TrendsChart;