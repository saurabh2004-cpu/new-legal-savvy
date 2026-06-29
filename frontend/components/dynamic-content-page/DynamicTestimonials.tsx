import React from 'react';

export const DynamicTestimonials = ({ data }: { data: { title: string, reviews: { name: string, location: string, review: string, rating: number }[] } }) => {
  if (!data || !data.reviews) return null;

  return (
    <>
      <h2 className="font-[Geist] text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 scroll-mt-14">
        {data.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {data.reviews.map((review, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400 mr-2">
                {Array.from({ length: Number(review.rating) || 5 }).map((_, j) => (
                  <svg key={j} viewBox="0 0 20 20" className="w-5 h-5 fill-current">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))} 
              </div>
            </div>
            <p className="text-gray-700 italic mb-4 leading-relaxed font-light text-sm md:text-base m-0">
              "{review.review}"
            </p>
            <div className="flex justify-between items-center text-xs font-bold text-blue-900 mt-4">
              <span>{review.name}</span>
              <span className="opacity-60">{review.location}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
