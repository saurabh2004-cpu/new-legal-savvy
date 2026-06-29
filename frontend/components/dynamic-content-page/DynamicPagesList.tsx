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
    <section className="bg-[#d8d0ca] w-full mx-auto   font-sans">
      <div className=" bg-white max-w-[97vw] mx-auto rounded-xl px-4 md:px-8 py-8">
        <h2 className="text-[#0F172A] text-2xl md:text-3xl font-[Geist] font-bold mb-8">
          Queries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
          {pages.map((page: any) => (
            <Link
              key={page._id || page.page_slug}
              href={`/${page.page_slug}`}
              className="text-slate-500 hover:text-[#FF3030] text-sm md:text-base truncate transition-colors"
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
