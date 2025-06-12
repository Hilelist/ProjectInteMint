import React, { useState } from 'react';
import { Bell, Filter, Check, DollarSign, Package, FileText, BarChart3, Users, Clock } from 'lucide-react';
import { alertsFeed } from '../../data/dummyData';

const AlertsFeed: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<string[]>([]);
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [readAlerts, setReadAlerts] = useState<Set<string>>(new Set());

  const alertTypes = ['funding', 'product', 'regulation', 'executive', 'market'];
  const severityLevels = ['high', 'medium', 'low'];
  const competitors = Array.from(new Set(alertsFeed.map(alert => alert.competitor).filter(Boolean)));

  const filteredAlerts = alertsFeed.filter(alert => {
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(alert.type);
    const severityMatch = selectedSeverity.length === 0 || selectedSeverity.includes(alert.priority);
    const competitorMatch = selectedCompetitors.length === 0 || 
      (alert.competitor && selectedCompetitors.includes(alert.competitor));
    
    return typeMatch && severityMatch && competitorMatch;
  });

  const unreadCount = filteredAlerts.filter(alert => !readAlerts.has(alert.id)).length;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'funding':
        return <DollarSign className="w-4 h-4" />;
      case 'product':
        return <Package className="w-4 h-4" />;
      case 'regulation':
        return <FileText className="w-4 h-4" />;
      case 'executive':
        return <Users className="w-4 h-4" />;
      case 'market':
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
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

  const toggleFilter = (filterArray: string[], setFilter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    if (filterArray.includes(value)) {
      setFilter(filterArray.filter(item => item !== value));
    } else {
      setFilter([...filterArray, value]);
    }
  };

  const markAsRead = (alertId: string) => {
    setReadAlerts(prev => new Set([...prev, alertId]));
  };

  const markAllAsRead = () => {
    setReadAlerts(new Set(filteredAlerts.map(alert => alert.id)));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
            <span>Live Alerts Feed</span>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-gray-600">Stay informed about critical events affecting your competitive landscape.</p>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Check className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>

            {/* Alert Type Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Alert Type</h3>
              <div className="space-y-2">
                {alertTypes.map(type => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Severity Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Severity</h3>
              <div className="space-y-2">
                {severityLevels.map(level => (
                  <label key={level} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSeverity.includes(level)}
                      onChange={() => toggleFilter(selectedSeverity, setSelectedSeverity, level)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityDot(level)}`} />
                      <span className="text-sm text-gray-600 capitalize">{level}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Competitor Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Competitors</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {competitors.map(competitor => (
                  <label key={competitor} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCompetitors.includes(competitor)}
                      onChange={() => toggleFilter(selectedCompetitors, setSelectedCompetitors, competitor)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{competitor}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Feed */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const isRead = readAlerts.has(alert.id);
              
              return (
                <div
                  key={alert.id}
                  className={`border rounded-lg p-6 transition-all duration-200 hover:shadow-sm ${
                    getAlertColor(alert.priority)
                  } ${isRead ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                        {getAlertIcon(alert.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                          <div className={`w-2 h-2 rounded-full ${getPriorityDot(alert.priority)}`} />
                          {!isRead && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-700 mb-3 leading-relaxed">{alert.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{alert.timestamp}</span>
                            </div>
                            {alert.competitor && (
                              <div className="flex items-center space-x-1">
                                <span>•</span>
                                <span className="font-medium">{alert.competitor}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <span>•</span>
                              <span className="capitalize">{alert.type}</span>
                            </div>
                          </div>
                          
                          {!isRead && (
                            <button
                              onClick={() => markAsRead(alert.id)}
                              className="flex items-center space-x-1 px-3 py-1 text-sm bg-white text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Check className="w-3 h-3" />
                              <span>Mark Read</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredAlerts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more alerts.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsFeed;