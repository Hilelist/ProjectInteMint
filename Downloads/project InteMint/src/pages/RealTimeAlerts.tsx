import React from 'react';
import { AlertTriangle, Bell, ArrowUp, ArrowDown, DollarSign } from 'lucide-react';

const RealTimeAlerts: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Real-Time Alerts</h1>
      
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Bell className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-red-600">5 require immediate attention</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Price Changes</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-yellow-600">3 significant changes</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Competitors</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-blue-600">Added in last 24 hours</span>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Alerts</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                type: 'price_change',
                title: 'Significant Price Drop',
                competitor: 'TechCorp',
                product: 'Premium Product X',
                change: '-15%',
                time: '2 hours ago',
                priority: 'high'
              },
              {
                type: 'new_competitor',
                title: 'New Competitor Detected',
                competitor: 'InnovateTech',
                product: 'Multiple Products',
                change: 'New',
                time: '5 hours ago',
                priority: 'medium'
              },
              {
                type: 'price_increase',
                title: 'Price Increase Alert',
                competitor: 'GlobalTech',
                product: 'Enterprise Solution',
                change: '+8%',
                time: '1 day ago',
                priority: 'low'
              }
            ].map((alert, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  alert.priority === 'high' ? 'bg-red-50' :
                  alert.priority === 'medium' ? 'bg-yellow-50' : 'bg-blue-50'
                }`}>
                  {alert.type === 'price_change' ? (
                    <ArrowDown className="w-5 h-5 text-red-600" />
                  ) : alert.type === 'price_increase' ? (
                    <ArrowUp className="w-5 h-5 text-yellow-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{alert.title}</h3>
                    <span className="text-sm text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {alert.competitor} - {alert.product}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`text-sm font-medium ${
                      alert.type === 'price_change' ? 'text-red-600' :
                      alert.type === 'price_increase' ? 'text-yellow-600' : 'text-blue-600'
                    }`}>
                      {alert.change}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.priority === 'high' ? 'bg-red-100 text-red-700' :
                      alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeAlerts; 