'use client';

import { useState, useEffect } from 'react';
import { DataProcessor } from '@/lib/data-processor';
import { DashboardMetrics } from '@/types';
import { MetricCard } from './metric-card';
import { SubmissionsChart } from './submissions-chart';
import { TopItemsTable } from './top-items-table';
import { Loader2 } from 'lucide-react';

interface DashboardLayoutProps {
  filename: string;
  title: string;
  description: string;
}

export function DashboardLayout({ filename, title, description }: DashboardLayoutProps) {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const data = await DataProcessor.loadCSV(filename);
        const calculatedMetrics = DataProcessor.calculateMetrics(data);
        setMetrics(calculatedMetrics);
      } catch (err) {
        setError('Failed to load data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [filename]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Submissions"
            value={metrics.totalSubmissions.toLocaleString()}
            description="All time submissions"
          />
          <MetricCard
            title="Unique States"
            value={metrics.topStates.length}
            description="States represented"
          />
          <MetricCard
            title="Unique IPs"
            value={metrics.topIPs.length}
            description="Different IP addresses"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SubmissionsChart
            data={metrics.submissionsPerDay}
            title="Submissions Per Day"
            dataKey="date"
          />
          <SubmissionsChart
            data={metrics.submissionsPerMonth}
            title="Submissions Per Month"
            dataKey="month"
          />
        </div>

        {/* Top Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopItemsTable
            title="Top 10 IP Addresses"
            data={metrics.topIPs}
            keyLabel="IP Address"
            valueLabel="Submissions"
            keyField="ip"
            valueField="count"
          />
          <TopItemsTable
            title="Top 10 States"
            data={metrics.topStates}
            keyLabel="State"
            valueLabel="Submissions"
            keyField="state"
            valueField="count"
          />
          <TopItemsTable
            title="Top 10 Email Addresses"
            data={metrics.topEmails}
            keyLabel="Email"
            valueLabel="Submissions"
            keyField="email"
            valueField="count"
          />
          <TopItemsTable
            title="Top 10 Names"
            data={metrics.topNames}
            keyLabel="Full Name"
            valueLabel="Submissions"
            keyField="name"
            valueField="count"
          />
        </div>
      </div>
    </div>
  );
}
