import React from 'react';

export default function Loading() {
    return (
        <div className="bg-[#D8D0CA] min-h-screen animate-pulse">
            <div className="px-2 pt-2">
                {/* Hero Skeleton */}
                <div className="w-full h-[80vh] md:h-[90vh] lg:h-[100vh] min-h-[500px] bg-black/10 rounded-xl"></div>
            </div>
            
            <section className="w-full max-w-[97vw] mx-auto px-6 xl:px-12 sm:px-8 py-6 xl:pt-22">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Left Sidebar Skeleton */}
                    <div className="col-span-1 lg:col-span-4">
                        <div className="flex flex-col gap-6">
                            <div className="bg-black/5 h-[140px] rounded-[1.5rem]"></div>
                            <div className="bg-black/5 h-[200px] rounded-[1.5rem]"></div>
                        </div>
                    </div>

                    {/* Right Content Skeleton */}
                    <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
                        <div className="h-10 md:h-12 bg-black/10 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-black/10 rounded w-full"></div>
                        <div className="h-4 bg-black/10 rounded w-full"></div>
                        <div className="h-4 bg-black/10 rounded w-5/6"></div>
                        
                        <div className="mt-8 flex flex-col gap-4">
                            <div className="h-4 bg-black/10 rounded w-3/4"></div>
                            <div className="h-4 bg-black/10 rounded w-4/5"></div>
                            <div className="h-4 bg-black/10 rounded w-2/3"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
