import React from 'react';

export const DynamicFAQ = ({ data }: { data: { title: string, faqs: { question: string, answer: string }[] } }) => {
  if (!data || !data.faqs) return null;
  
  return (
    <>
      <h2 id="faqs" className="font-[Geist] text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-10 scroll-mt-14 border-b-2 border-blue-600 pb-2 italic tracking-tighter uppercase">
        {data.title}
      </h2>
      <div className="space-y-4 mb-20">
        {data.faqs.map((faq, i) => (
          <details key={i} className="group p-6 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-white hover:shadow-md">
            <summary className="font-[Geist] flex justify-between items-center cursor-pointer list-none font-bold text-gray-900 text-base md:text-lg group-hover:text-blue-600 transition-colors italic uppercase tracking-tighter leading-snug">
              {faq.question}
              <span className="text-blue-500 transform group-open:rotate-180 transition-transform">
                v
              </span>
            </summary>
            <p className="mt-6 text-gray-600 leading-relaxed font-light italic text-lg m-0">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </>
  );
};
