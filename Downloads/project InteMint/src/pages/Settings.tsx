import React from 'react';
import { Bell, Shield, User, Globe, CreditCard, HelpCircle } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      
      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-500">Update your profile details</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Notification Preferences</h3>
                <p className="text-sm text-gray-500">Manage your alert settings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Password & Security</h3>
                <p className="text-sm text-gray-500">Update your security settings</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Globe className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">API Access</h3>
                <p className="text-sm text-gray-500">Manage API keys and access</p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Billing</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <CreditCard className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Payment Methods</h3>
                <p className="text-sm text-gray-500">Manage your payment options</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <HelpCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Billing Support</h3>
                <p className="text-sm text-gray-500">Get help with billing issues</p>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Integrations</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                    alt="Google"
                    className="w-8 h-8"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">Google Analytics</h3>
                    <p className="text-sm text-gray-500">Connected</p>
                  </div>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700">
                  Disconnect
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://www.shopify.com/favicon.ico"
                    alt="Shopify"
                    className="w-8 h-8"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">Shopify</h3>
                    <p className="text-sm text-gray-500">Not connected</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 