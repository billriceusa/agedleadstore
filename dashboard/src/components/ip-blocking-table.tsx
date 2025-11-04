'use client';

import { IPBlockingData } from '@/types';
import { Download } from 'lucide-react';
import { IPAggregator } from '@/lib/ip-aggregator';

interface IPBlockingTableProps {
  data: IPBlockingData[];
  onDownload: () => void;
}

export function IPBlockingTable({ data, onDownload }: IPBlockingTableProps) {
  const handleDownload = () => {
    IPAggregator.downloadCSV(data);
    onDownload();
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header with Download Button */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">IP Addresses to Block</h2>
            <p className="text-gray-600 mt-1">
              Aggregated IP addresses from all privacy form submissions ({data.length} unique IPs)
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Download CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sources
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Seen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Seen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item.ip} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  {item.ip}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.count >= 10 
                      ? 'bg-red-100 text-red-800' 
                      : item.count >= 5 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.count}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                  <div className="truncate" title={item.sources.join(', ')}>
                    {item.sources.length === 1 
                      ? item.sources[0]
                      : `${item.sources[0]} +${item.sources.length - 1} more`
                    }
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(item.firstSeen)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(item.lastSeen)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No IP data available</p>
          <p className="text-gray-400 text-sm mt-2">
            IP addresses will appear here once CSV data is loaded
          </p>
        </div>
      )}

      {/* Summary Stats */}
      {data.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-900">Total IPs:</span>
              <span className="ml-2 text-gray-600">{data.length.toLocaleString()}</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Total Submissions:</span>
              <span className="ml-2 text-gray-600">
                {data.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-900">High Activity IPs (10+ submissions):</span>
              <span className="ml-2 text-red-600 font-medium">
                {data.filter(item => item.count >= 10).length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
