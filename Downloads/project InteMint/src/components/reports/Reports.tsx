import React from 'react';
import { FileText } from 'lucide-react';

export default function Reports() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Reports coming soon!</p>
          <p className="text-sm text-gray-500 mt-2">This section will provide detailed reports and analytics about your competitors.</p>
        </div>
      </div>
    </div>
  );
}