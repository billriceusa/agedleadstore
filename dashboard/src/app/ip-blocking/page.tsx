'use client';

import { useState, useEffect } from 'react';
import { IPAggregator } from '@/lib/ip-aggregator';
import { IPBlockingData } from '@/types';
import { IPBlockingTable } from '@/components/ip-blocking-table';
import { Loader2, Shield, AlertTriangle } from 'lucide-react';

export default function IPBlockingPage() {
  const [ipData, setIPData] = useState<IPBlockingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    async function loadIPData() {
      try {
        setLoading(true);
        setError(null);
        
        // Load all CSV data
        const allData = await IPAggregator.loadAllCSVData();
        
        // Aggregate IP data
        const aggregatedIPs = IPAggregator.aggregateIPData(allData);
        
        setIPData(aggregatedIPs);
      } catch (err) {
        setError('Failed to load IP data');
        console.error('Error loading IP data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadIPData();
  }, []);

  const handleDownload = () => {
    setDownloadCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading IP blocking data...</p>
          <p className="text-sm text-gray-500 mt-2">Aggregating data from all CSV files</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 mx-auto mb-4 text-red-600" />
          <p className="text-red-600 mb-2">Error loading IP data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const highActivityIPs = ipData.filter(ip => ip.count >= 10);
  const mediumActivityIPs = ipData.filter(ip => ip.count >= 5 && ip.count < 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">IP Blocking Dashboard</h1>
          </div>
          <p className="text-gray-600 max-w-3xl">
            Comprehensive analysis of IP addresses across all privacy form submissions. 
            Use this data to identify potentially suspicious or high-volume IP addresses for blocking.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Unique IPs</p>
                <p className="text-2xl font-bold text-gray-900">{ipData.length.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">High Activity (10+)</p>
                <p className="text-2xl font-bold text-red-600">{highActivityIPs.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Medium Activity (5-9)</p>
                <p className="text-2xl font-bold text-yellow-600">{mediumActivityIPs.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Downloads</p>
                <p className="text-2xl font-bold text-green-600">{downloadCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* IP Blocking Table */}
        <IPBlockingTable data={ipData} onDownload={handleDownload} />

        {/* Usage Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use This Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">🔴 High Priority (Red - 10+ submissions)</h4>
              <p>Consider blocking these IPs immediately as they show excessive activity patterns.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🟡 Medium Priority (Yellow - 5-9 submissions)</h4>
              <p>Monitor these IPs closely and consider blocking if activity continues to increase.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">📥 Download CSV</h4>
              <p>Export the complete list for use in firewalls, CDNs, or other blocking systems.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">📊 Sources Column</h4>
              <p>Shows which privacy forms the IP has submitted to, helping identify patterns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
