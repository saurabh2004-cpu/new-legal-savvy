"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/common/Navbar';

interface ResourceHeroProps {
    title: string;
    publishedDate: string;
    readTime: string;
    author: string;
    category: string;
    image: string;
}

export default function ResourceHero({
    title,
    publishedDate,
    readTime,
    author,
    category,
    image
}: ResourceHeroProps) {
    const [hoveredMenu, setHoveredMenu] = useState<"services" | "locations" | null>(null);

    const scrollToContent = () => {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    };

    return (
        <section className="relative w-full h-[80vh] md:h-[90vh] lg:h-[100vh] min-h-[500px] overflow-hidden rounded-xl ">
            {/* Navbar */}
            <Navbar hoveredMenu={hoveredMenu} onHoverMenuChange={setHoveredMenu} />
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={image || "/about/about-hero-img.png"}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061D31]/90 via-[#061D31]/40 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 h-full flex flex-col justify-end items-start pb-8 sm:pb-12 lg:pb-16 z-10">

                {/* Published Date Labels */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
                >
                    <div
                        className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full border border-white/5 backdrop-blur-md"
                        style={{ background: 'linear-gradient(90deg, rgba(51, 58, 77, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%)' }}
                    >
                        <span className="font-mono text-[12px] sm:text-[14px] lg:text-[16px] font-normal leading-none tracking-normal text-white uppercase">
                            Published
                        </span>
                    </div>
                    <div
                        className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full border border-white/5 backdrop-blur-md"
                        style={{ background: 'linear-gradient(90deg, rgba(51, 58, 77, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%)' }}
                    >
                        <span className="font-mono text-[12px] sm:text-[14px] lg:text-[16px] font-normal leading-none tracking-normal text-white uppercase">
                            {publishedDate}
                        </span>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="w-full max-w-4xl mb-4 sm:mb-6"
                >
                    <h1 className="font-sans text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-tight lg:leading-none tracking-normal text-white">
                        {title}
                    </h1>
                </motion.div>

                {/* Bottom Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full gap-4 sm:gap-6"
                >
                    {/* Highlights */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div
                            className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full border border-white/5 backdrop-blur-md"
                            style={{ background: 'linear-gradient(90deg, rgba(51, 58, 77, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%)' }}
                        >
                            <span className="font-mono text-[12px] sm:text-[14px] lg:text-[16px] font-normal leading-none tracking-normal text-white uppercase">
                                {readTime}
                            </span>
                        </div>
                        <div
                            className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full border border-white/5 backdrop-blur-md"
                            style={{ background: 'linear-gradient(90deg, rgba(51, 58, 77, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%)' }}
                        >
                            <span className="font-mono text-[12px] sm:text-[14px] lg:text-[16px] font-normal leading-none tracking-normal text-white uppercase">
                                {author}
                            </span>
                        </div>
                        <div
                            className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full border border-white/5 backdrop-blur-md"
                            style={{ background: 'linear-gradient(90deg, rgba(51, 58, 77, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%)' }}
                        >
                            <span className="font-mono text-[12px] sm:text-[14px] lg:text-[16px] font-normal leading-none tracking-normal text-white uppercase">
                                {category}
                            </span>
                        </div>
                    </div>

                    {/* Explore Button */}
                    {/* <button
                        onClick={scrollToContent}
                        className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 bg-[#E5DEDB] hover:bg-white transition-colors rounded-full flex items-center justify-center shrink-0 group cursor-pointer shadow-lg mb-2 sm:mr-2"
                        aria-label="Explore content"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-black group-hover:translate-y-1 transition-transform duration-300"
                        >
                            <path d="M12 5v14" />
                            <path d="m19 12-7 7-7-7" />
                        </svg>
                    </button> */}
                </motion.div>
            </div>
        </section>
    );
}
