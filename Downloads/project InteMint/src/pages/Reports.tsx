import React from 'react';
import { FileText, Download, Calendar, BarChart2, PieChart, LineChart } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
      
      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Price Analysis</p>
              <p className="text-2xl font-bold text-gray-900">24 Reports</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <LineChart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>Download Latest</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Market Share</p>
              <p className="text-2xl font-bold text-gray-900">12 Reports</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <button className="text-sm text-purple-600 hover:text-purple-700 flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>Download Latest</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Competitor Analysis</p>
              <p className="text-2xl font-bold text-gray-900">18 Reports</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <BarChart2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <button className="text-sm text-green-600 hover:text-green-700 flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>Download Latest</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                title: 'Q1 2024 Price Analysis',
                type: 'Price Analysis',
                date: 'Mar 31, 2024',
                size: '2.4 MB',
                icon: LineChart
              },
              {
                title: 'Market Share Report - March 2024',
                type: 'Market Share',
                date: 'Mar 28, 2024',
                size: '1.8 MB',
                icon: PieChart
              },
              {
                title: 'Competitor Analysis - Tech Sector',
                type: 'Competitor Analysis',
                date: 'Mar 25, 2024',
                size: '3.2 MB',
                icon: BarChart2
              }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white rounded-lg">
                    <report.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-500">{report.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{report.date}</p>
                    <p className="text-xs text-gray-500">{report.size}</p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Report */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Generate New Report</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Price Analysis</option>
                <option>Market Share</option>
                <option>Competitor Analysis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 