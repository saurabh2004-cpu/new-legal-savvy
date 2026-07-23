import React from 'react';
import Link from 'next/link';
import { getAllPagesData } from '@/services/pageContentService';

function formatSlugToTitle(slug: string) {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export const DynamicPagesList = async () => {
  const pages = await getAllPagesData();

  if (!pages || !Array.isArray(pages) || pages.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-1 px-2 bg-[#D9D9D9] w-full mx-auto geist-regular">
      <div className="max-w-8xl mx-auto bg-white rounded-xl text-gray-800 px-4 md:px-8 py-8">
        <h2 className="geist-medium text-2xl md:text-3xl mb-6">
          Queries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
          {pages.map((page: any) => (
            <Link
              key={page._id || page.page_slug}
              href={`/${page.page_slug}`}
              className="text-base md:text-lg hover:text-[#FF3030] truncate transition-colors"
              title={formatSlugToTitle(page.page_slug)}
            >
              {formatSlugToTitle(page.page_slug)}...
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
