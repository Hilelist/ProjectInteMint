import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './components/dashboard/Dashboard';
import CompetitorTracker from './components/competitors/CompetitorTracker';
import MarketTrends from './components/trends/MarketTrends';
import RealTimeAlerts from './components/alerts/RealTimeAlerts';
import Reports from './components/reports/Reports';
import Settings from './components/settings/Settings';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/competitors" element={<CompetitorTracker />} />
          <Route path="/market-trends" element={<MarketTrends />} />
          <Route path="/alerts" element={<RealTimeAlerts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;