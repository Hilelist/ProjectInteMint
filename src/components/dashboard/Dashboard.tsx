import React from 'react';
import OverviewMetrics from './OverviewMetrics';
import CompetitorFeed from './CompetitorFeed';
import TrendsChart from './TrendsChart';
import AlertsPanel from './AlertsPanel';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, Sarah! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your competitors and market trends today.
        </p>
      </div>

      {/* Overview Metrics */}
      <OverviewMetrics />

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left column - Competitor Feed and Trends */}
        <div className="xl:col-span-2 space-y-8">
          <CompetitorFeed />
          <TrendsChart />
        </div>

        {/* Right column - Alerts Panel */}
        <div className="xl:col-span-1">
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;