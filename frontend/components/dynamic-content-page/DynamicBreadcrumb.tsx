import React from 'react';
import Link from 'next/link';

export const DynamicBreadcrumb = ({ data }: { data: { currentPage: string } }) => {
  if (!data) return null;
  return (
    <div className="bg-white border-b border-gray-200 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 py-4">
        <nav aria-label="Breadcrumb" className="flex text-sm text-gray-500">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-gray-300 mx-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-medium text-gray-600">{data.currentPage}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};
