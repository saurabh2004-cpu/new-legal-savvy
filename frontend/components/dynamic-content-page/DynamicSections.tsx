import React from 'react';

export const DynamicSections = ({ data }: { data: any[] }) => {
  if (!data || !Array.isArray(data)) return null;

  return (
    <>
      {data.map((section, index) => (
        <React.Fragment key={section.id}>
          <h2
            id={section.id}
            className={`font-[Geist] text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 scroll-mt-24 ${index > 0 ? 'text-blue-900 tracking-tighter uppercase italic' : ''}`}
          >
            {index === 0 && section.title.toLowerCase() !== 'introduction' ? `Introduction: ${section.title}` : section.title}
          </h2>

          {section.content?.map((paragraph: string, i: number) => (
            <p key={i} className={`text-gray-700 leading-relaxed mb-10 ${index === 0 && i === 0 ? 'text-xl font-light' : ''} ${index === 0 && i === 1 ? 'border-l-4 border-blue-600 pl-6 italic text-blue-900 bg-blue-50/30 p-8 rounded-r-3xl' : ''}`}>
              {paragraph}
            </p>
          ))}

          {section.calloutBox && (
            <div className="bg-blue-600 text-white p-10 rounded-[2.5rem] mb-12 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-all"></div>
              <h4 className="font-[Geist] text-xl md:text-2xl lg:text-3xl font-black mb-6 flex items-center gap-3 uppercase tracking-widest text-xs italic">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {section.calloutBox.title}
              </h4>
              <p className="text-4xl md:text-5xl font-black mb-6 tracking-tighter italic">
                {section.calloutBox.statistic}
              </p>
              <p className="opacity-90 leading-relaxed font-light text-lg">
                {section.calloutBox.description}
              </p>
            </div>
          )}

          {section.numberedPoints && section.numberedPoints.length > 0 && (
            <ul className="space-y-6 mb-12 list-none p-0">
              {section.numberedPoints.map((point: any, i: number) => (
                <li key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors group">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform italic">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed font-light italic m-0">
                    **{point.title}**: {point.description}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {section.quoteBox && (
            <div className="p-10 bg-gray-900 text-blue-100 rounded-[2.5rem] mb-14 shadow-2xl relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-24 -mb-24 blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
              <h5 className="font-[Geist] text-lg md:text-xl lg:text-2xl font-black mb-6 text-blue-400 italic">
                {section.quoteBox.title}
              </h5>
              <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8 italic">
                "{section.quoteBox.quote}"
              </p>
            </div>
          )}

          {section.alertBox && (
            <div className="p-8 bg-red-50 rounded-3xl border border-red-100 mb-10 group hover:shadow-lg transition-all">
              <p className="text-red-900 font-bold mb-4 flex items-center gap-2">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 font-bold">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {section.alertBox.title}:
              </p>
              <p className="text-red-800 italic m-0">
                "{section.alertBox.description}"
              </p>
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};
