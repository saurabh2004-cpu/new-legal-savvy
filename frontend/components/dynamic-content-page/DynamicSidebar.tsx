import React from 'react';

export const DynamicSidebar = ({ data }: { data: { title: string, chapters: { id: string, title: string }[] } }) => {
  if (!data) return null;
  return (
    <aside className="lg:w-1/4 xl:w-1/5 hidden lg:block sticky top-14 font-sans">
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-[Geist] font-bold text-gray-900 mb-4 text-base md:text-lg lg:text-xl border-b pb-2">{data.title}</h3>
        <nav className="space-y-2 text-sm">
          {data.chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className="block py-1.5 px-3 rounded-lg transition-all text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            >
              {chapter.title}
            </a>
          ))}
          <a
            href="#faqs"
            className="block py-1.5 px-3 rounded-lg transition-all bg-blue-600 text-white font-semibold"
          >
            10+ Expert FAQs
          </a>
        </nav>
      </div>
    </aside>
  );
};
