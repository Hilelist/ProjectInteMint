import React from 'react';
import { Bell } from 'lucide-react';

export default function RealTimeAlerts() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Real-Time Alerts</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Real-Time Alerts coming soon!</p>
          <p className="text-sm text-gray-500 mt-2">This section will show important notifications and alerts about your competitors.</p>
        </div>
      </div>
    </div>
  );
} 