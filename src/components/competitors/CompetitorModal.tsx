import React from 'react';
import { X, Building2, DollarSign, Users, Calendar, ExternalLink, TrendingUp, Globe } from 'lucide-react';
import { trackedCompetitors } from '../../data/dummyData';

interface CompetitorModalProps {
  competitorId: string;
  onClose: () => void;
}

const CompetitorModal: React.FC<CompetitorModalProps> = ({ competitorId, onClose }) => {
  const competitor = trackedCompetitors.find(c => c.id === competitorId);

  if (!competitor) return null;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{competitor.name}</h2>
              <p className="text-gray-600">{competitor.industry}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Team Size</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{competitor.employees}</p>
              <p className="text-sm text-blue-700">employees</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">Total Funding</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{competitor.totalFunding}</p>
              <p className="text-sm text-green-700">raised to date</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Risk Level</span>
              </div>
              <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getRiskColor(competitor.riskLevel)}`}>
                {competitor.riskLevel}
              </span>
            </div>
          </div>

          {/* Company Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* About */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">{competitor.description}</p>
              </div>

              {/* Key Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Founded</span>
                    <span className="font-medium text-gray-900">{competitor.founded}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Headquarters</span>
                    <span className="font-medium text-gray-900">{competitor.headquarters}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Website</span>
                    <a href={competitor.website} className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span>Visit Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Funding History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Funding History</h3>
                <div className="space-y-3">
                  {competitor.fundingHistory.map((round, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{round.round}</span>
                        <span className="text-sm text-gray-500">{new Date(round.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-green-700">{round.amount}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Led by {round.leadInvestor}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent News */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent News</h3>
                <div className="space-y-3">
                  {competitor.recentNews.map((news, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <a
                        href={news.url}
                        className="text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-start space-x-1"
                      >
                        <span className="line-clamp-2">{news.headline}</span>
                        <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      </a>
                      <p className="text-sm text-gray-500 mt-2 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(news.date).toLocaleDateString()}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorModal;