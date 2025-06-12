import React from 'react';
import { TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

const MarketTrends: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Market Trends</h1>
      
      {/* Market Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Market Overview</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Average Price</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">$299.99</span>
                <span className="text-sm text-green-600 flex items-center">
                  <ArrowUp className="w-4 h-4" />
                  5.2%
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Price Range</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">$89.99 - $499.99</span>
                <span className="text-sm text-gray-500">(24 products)</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Market Share</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">32%</span>
                <span className="text-sm text-red-600 flex items-center">
                  <ArrowDown className="w-4 h-4" />
                  2.1%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Trends */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Price Trends</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Premium Product Line</p>
                    <p className="text-sm text-gray-500">12 competitors tracking</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">$399.99</p>
                  <p className="text-sm text-green-600">↑ 3.2% this week</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Market Insights</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900">Price Sensitivity</h3>
              <p className="mt-1 text-sm text-blue-700">
                Customers are showing increased sensitivity to price changes above $50 increments.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900">Competitive Advantage</h3>
              <p className="mt-1 text-sm text-green-700">
                Our product features are valued 15% higher than competitors in the same price range.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900">Market Opportunity</h3>
              <p className="mt-1 text-sm text-purple-700">
                Gap identified in the $200-$250 price range with high customer demand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTrends; 