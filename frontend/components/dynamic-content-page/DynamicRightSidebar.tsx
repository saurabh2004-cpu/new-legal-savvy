import React from 'react';
import Link from 'next/link';

export const DynamicRightSidebar = ({ data }: { data: any }) => {
  if (!data) return null;
  
  return (
    <aside className="lg:w-1/4 xl:w-1/5 hidden lg:block sticky top-14 space-y-6 font-sans">
      {data.primaryCard && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
          <h3 className="font-[Geist] font-bold text-gray-900 mb-2 text-base lg:text-lg xl:text-xl">
            {data.primaryCard.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            {data.primaryCard.description}
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors mb-4 text-sm shadow-sm">
            {data.primaryCard.buttonText}
          </button>
          {data.primaryCard.benefits && (
            <ul className="text-left text-xs text-gray-400 space-y-2">
              {data.primaryCard.benefits.map((benefit: string, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  {benefit}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {data.guidesCard && data.guidesCard.guides && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-[Geist] font-bold text-gray-900 mb-4 text-base lg:text-lg xl:text-xl border-b border-gray-300 pb-2">
            {data.guidesCard.title}
          </h3>
          <nav className="space-y-3 text-sm">
            {data.guidesCard.guides.map((guide: any, i: number) => (
              <Link key={i} href={`/${guide.slug}`} className="block text-blue-500 hover:text-blue-700 hover:underline">
                {guide.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </aside>
  );
};
