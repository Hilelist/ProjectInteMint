import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { overviewMetrics } from '../../data/dummyData';
import * as Icons from 'lucide-react';

const OverviewMetrics: React.FC = () => {
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

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {overviewMetrics.map((metric) => {
        const IconComponent = (Icons as any)[metric.icon];
        
        return (
          <div key={metric.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <IconComponent className="w-6 h-6 text-blue-600" />
              </div>
              {getTrendIcon(metric.trend)}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className={`text-sm ${getTrendColor(metric.trend)}`}>
                {metric.change}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OverviewMetrics;