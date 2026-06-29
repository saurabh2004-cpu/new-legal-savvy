'use client'
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Labels {
    name: string;
    slug?: string;
    _id?: string;
    type?: string;
    isFeatured?: boolean;
}

export default function Locations({ labels }: { labels: Labels[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    const normalizedlabels = useMemo(() => {
        if (!labels || !Array.isArray(labels)) return [];
        return labels.map(city => {
            const slug = city.slug || city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return {
                ...city,
                slug
            };
        });
    }, [labels]);

    const filteredlabels = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return normalizedlabels;
        return normalizedlabels.filter(
            (city) =>
                city.name.toLowerCase().includes(query) ||
                city.slug.toLowerCase().includes(query)
        );
    }, [searchQuery, normalizedlabels]);


    const router = useRouter();

    const handleLabelClick = (type: string, slug: string) => {
        if (!type || !slug) return;
        switch (type) { 
            case 'city':
                router.push(`/loan-settlement-by-city/${slug}`)
                break;

            case 'state':
                router.push(`/loan-settlement-by-state/${slug}`)
                break;

            case 'bank':
                router.push(`/loan-settlement-by-bank/${slug}`)
                break;
            default:
                break;
        }

    }

    return (
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-gray-100 pb-6 gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-[Geist]">
                            Select Your Location
                        </h2>
                        <p className="text-gray-500 text-sm mt-1 font-[Geist]">
                            Find legal debt settlement services in your city
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-xs font-bold text-blue-700 border border-blue-100">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        {normalizedlabels.length} ACTIVE labels
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Search your city..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 text-sm font-[Geist]"
                        />
                        <svg
                            className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* labels Grid */}
                {filteredlabels.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredlabels.map((label) => (
                            <button
                                key={label.slug}
                                // href={`/loan-settlement-by-city/${city.slug}`} 
                                onClick={() => handleLabelClick(label.type || "", label.slug || "")}
                                className="group flex items-center p-4 border border-gray-100 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                            >
                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 truncate font-[Geist]">
                                    Settlement in {label.name}
                                </span>
                                <svg
                                    className="w-4 h-4 ml-auto text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <svg
                            className="w-12 h-12 text-gray-300 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="text-gray-500 text-sm font-[Geist]">No locations found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </section>
    );
}
