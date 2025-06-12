import React from 'react';
import { TrendingUp } from 'lucide-react';

interface TrendsChartProps {
  keywords: string[];
  timeRange: string;
  data: Array<{
    date: string;
    value: number;
    keyword: string;
  }>;
}

const TrendsChart: React.FC<TrendsChartProps> = ({ keywords, timeRange, data }) => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
  
  const getFilteredData = (keyword: string) => {
    const days = parseInt(timeRange.replace('d', ''));
    return data
      .filter(d => d.keyword === keyword)
      .slice(-days);
  };

  const getAllData = () => {
    const days = parseInt(timeRange.replace('d', ''));
    const allDates = new Set();
    
    keywords.forEach(keyword => {
      const keywordData = data.filter(d => d.keyword === keyword).slice(-days);
      keywordData.forEach(d => allDates.add(d.date));
    });
    
    return Array.from(allDates).sort();
  };

  const allDates = getAllData();
  const maxValue = Math.max(...keywords.flatMap(keyword => 
    getFilteredData(keyword).map(d => d.value)
  ));
  const minValue = Math.min(...keywords.flatMap(keyword => 
    getFilteredData(keyword).map(d => d.value)
  ));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Trend Analysis</h2>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap items-center space-x-4 mb-6">
        {keywords.map((keyword, index) => (
          <div key={keyword} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-sm text-gray-600 capitalize">{keyword}</span>
          </div>
        ))}
      </div>
      
      {/* Chart */}
      <div className="relative h-80 bg-gray-50 rounded-lg p-4">
        <svg width="100%" height="100%" className="overflow-visible">
          <defs>
            {keywords.map((keyword, index) => (
              <linearGradient key={keyword} id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: colors[index % colors.length], stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: colors[index % colors.length], stopOpacity: 0.05 }} />
              </linearGradient>
            ))}
          </defs>
          
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0%"
              y1={`${y}%`}
              x2="100%"
              y2={`${y}%`}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          ))}
          
          {/* Chart lines */}
          {keywords.map((keyword, keywordIndex) => {
            const keywordData = getFilteredData(keyword);
            const color = colors[keywordIndex % colors.length];
            
            if (keywordData.length === 0) return null;
            
            const pathData = keywordData.map((point, index) => {
              const x = (index / (keywordData.length - 1)) * 100;
              const y = 100 - ((point.value - minValue) / (maxValue - minValue)) * 80;
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ');
            
            return (
              <g key={keyword}>
                {/* Area fill */}
                <path
                  d={`${pathData} L ${((keywordData.length - 1) / (keywordData.length - 1)) * 100} 100 L 0 100 Z`}
                  fill={`url(#gradient-${keywordIndex})`}
                />
                
                {/* Line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                />
                
                {/* Data points */}
                {keywordData.map((point, index) => {
                  const x = (index / (keywordData.length - 1)) * 100;
                  const y = 100 - ((point.value - minValue) / (maxValue - minValue)) * 80;
                  
                  return (
                    <circle
                      key={index}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="3"
                      fill={color}
                      className="hover:r-4 transition-all duration-200"
                    >
                      <title>{`${keyword}: ${point.value} on ${new Date(point.date).toLocaleDateString()}`}</title>
                    </circle>
                  );
                })}
              </g>
            );
          })}
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2 -ml-8">
          <span>{maxValue}</span>
          <span>{Math.round((maxValue + minValue) / 2)}</span>
          <span>{minValue}</span>
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-gray-500 px-4 mt-2">
        <span>{allDates[0] ? new Date(allDates[0]).toLocaleDateString() : ''}</span>
        <span>{allDates[allDates.length - 1] ? new Date(allDates[allDates.length - 1]).toLocaleDateString() : ''}</span>
      </div>
    </div>
  );
};

export default TrendsChart;