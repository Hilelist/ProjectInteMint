import React from 'react';
import { Bell, DollarSign, Package, FileText, BarChart3, Clock } from 'lucide-react';
import { alerts } from '../../data/dummyData';

const AlertsPanel: React.FC = () => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'funding':
        return <DollarSign className="w-4 h-4" />;
      case 'product':
        return <Package className="w-4 h-4" />;
      case 'regulation':
        return <FileText className="w-4 h-4" />;
      case 'market':
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getAlertColor = (type: string, priority: string) => {
    if (priority === 'high') {
      return 'bg-red-50 border-red-200 text-red-800';
    } else if (priority === 'medium') {
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    } else {
      return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Real-Time Alerts</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Bell className="w-4 h-4" />
          <span>{alerts.length} active</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-sm ${getAlertColor(alert.type, alert.priority)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-900 truncate">{alert.title}</h3>
                  <div className={`w-2 h-2 rounded-full ${getPriorityDot(alert.priority)}`} />
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{alert.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default AlertsPanel;