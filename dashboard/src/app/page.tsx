import Link from 'next/link';
import { CSV_FILES } from '@/types';
import { BarChart3, FileText, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive analytics for privacy rights requests and opt-out forms. 
            Monitor submissions, track trends, and analyze user behavior across all privacy forms.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">{CSV_FILES.length}</h3>
            <p className="text-gray-600">Form Types</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">Thousands</h3>
            <p className="text-gray-600">Total Submissions</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">Real-time</h3>
            <p className="text-gray-600">Analytics</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">6</h3>
            <p className="text-gray-600">Key Metrics</p>
          </div>
        </div>

        {/* Dashboard Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CSV_FILES.map((file) => (
            <Link
              key={file.name}
              href={`/dashboard/${file.name}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {file.displayName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {file.description}
                  </p>
                </div>
                <BarChart3 className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors ml-4 flex-shrink-0" />
              </div>
              <div className="flex items-center text-sm text-blue-600 group-hover:text-blue-700">
                View Dashboard
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Dashboard Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Time-based Analytics</h3>
              <p className="text-gray-600 text-sm">Track submissions per day and month with interactive charts</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Insights</h3>
              <p className="text-gray-600 text-sm">Analyze top IP addresses, states, emails, and names</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interactive Tables</h3>
              <p className="text-gray-600 text-sm">Sortable top 10 lists for all key metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}