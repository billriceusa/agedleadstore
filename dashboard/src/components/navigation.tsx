'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CSV_FILES } from '@/types';
import { BarChart3, Home, Shield } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Privacy Dashboard
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Home className="h-4 w-4 mr-1" />
                Overview
              </Link>
              <Link
                href="/ip-blocking"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/ip-blocking'
                    ? 'border-red-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Shield className="h-4 w-4 mr-1" />
                IP Blocking
              </Link>
              {CSV_FILES.map((file) => (
                <Link
                  key={file.name}
                  href={`/dashboard/${file.name}`}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === `/dashboard/${file.name}`
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {file.displayName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              pathname === '/'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            Overview
          </Link>
          <Link
            href="/ip-blocking"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              pathname === '/ip-blocking'
                ? 'bg-red-50 border-red-500 text-red-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            IP Blocking
          </Link>
          {CSV_FILES.map((file) => (
            <Link
              key={file.name}
              href={`/dashboard/${file.name}`}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === `/dashboard/${file.name}`
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {file.displayName}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
