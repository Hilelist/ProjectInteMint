import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <SettingsIcon className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Settings coming soon!</p>
          <p className="text-sm text-gray-500 mt-2">This section will allow you to configure your account and preferences.</p>
        </div>
      </div>
    </div>
  );
}