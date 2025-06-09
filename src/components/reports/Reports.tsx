import React, { useState } from 'react';
import { FileText, Download, Calendar, Plus, BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { reportsData } from '../../data/dummyData';

const Reports: React.FC = () => {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState('30d');
  const [reportType, setReportType] = useState('comprehensive');
  const [isGenerating, setIsGenerating] = useState(false);

  const competitors = ['PayFlow Technologies', 'CreditFlow Inc.', 'MoneyBridge Solutions', 'InstantPay Corp'];
  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' }
  ];

  const reportTypes = [
    { value: 'comprehensive', label: 'Comprehensive Intelligence Report', icon: BarChart3 },
    { value: 'funding', label: 'Funding Overview', icon: DollarSign },
    { value: 'trends', label: 'Market Trends Analysis', icon: TrendingUp },
    { value: 'competitive', label: 'Competitive Landscape', icon: Users }
  ];

  const handleGenerateReport = () => {
    if (selectedCompetitors.length === 0) {
      alert('Please select at least one competitor');
      return;
    }

    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      alert('Report generated successfully! In a real app, this would download the PDF.');
    }, 2000);
  };

  const toggleCompetitor = (competitor: string) => {
    if (selectedCompetitors.includes(competitor)) {
      setSelectedCompetitors(selectedCompetitors.filter(c => c !== competitor));
    } else {
      setSelectedCompetitors([...selectedCompetitors, competitor]);
    }
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'funding':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'trends':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'competitive':
        return <Users className="w-5 h-5 text-purple-600" />;
      default:
        return <BarChart3 className="w-5 h-5 text-gray-600" />;
    }
  };

  const getReportColor = (type: string) => {
    switch (type) {
      case 'funding':
        return 'bg-green-50 border-green-200';
      case 'trends':
        return 'bg-blue-50 border-blue-200';
      case 'competitive':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Summaries</h1>
        <p className="text-gray-600">Generate comprehensive intelligence reports and export strategic summaries.</p>
      </div>

      {/* Recent Reports */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportsData.map((report) => (
            <div key={report.id} className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${getReportColor(report.type)}`}>
              <div className="flex items-center space-x-3 mb-4">
                {getReportIcon(report.type)}
                <h3 className="font-semibold text-gray-900">{report.title}</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{report.summary}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(report.dateGenerated).toLocaleDateString()}</span>
                </div>
                <span className="capitalize">{report.type}</span>
              </div>
              
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Generate New Report */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Plus className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Generate New Report</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="space-y-6">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
              <div className="space-y-2">
                {reportTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <label key={type.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="reportType"
                        value={type.value}
                        checked={reportType === type.value}
                        onChange={(e) => setReportType(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <Icon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{type.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Time Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeRanges.map((range) => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Competitors Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Competitors ({selectedCompetitors.length} selected)
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {competitors.map((competitor) => (
                  <label key={competitor} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCompetitors.includes(competitor)}
                      onChange={() => toggleCompetitor(competitor)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{competitor}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Report Preview</h3>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Report Type:</span>
                <span className="font-medium text-gray-900 capitalize">
                  {reportTypes.find(t => t.value === reportType)?.label}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>Time Period:</span>
                <span className="font-medium text-gray-900">
                  {timeRanges.find(t => t.value === timeRange)?.label}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>Competitors:</span>
                <span className="font-medium text-gray-900">{selectedCompetitors.length} selected</span>
              </div>
              
              <div className="flex justify-between">
                <span>Estimated Pages:</span>
                <span className="font-medium text-gray-900">
                  {Math.max(5, selectedCompetitors.length * 2 + 3)} pages
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Report will include:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Executive Summary</li>
                <li>• Competitive Landscape Analysis</li>
                <li>• Market Trend Insights</li>
                <li>• Funding Activity Overview</li>
                <li>• Strategic Recommendations</li>
              </ul>
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={isGenerating || selectedCompetitors.length === 0}
              className={`w-full mt-6 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                isGenerating || selectedCompetitors.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating Report...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Generate Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;