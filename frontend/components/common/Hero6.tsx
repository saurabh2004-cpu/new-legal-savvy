"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from './Navbar';
import { isLocalBackendImage } from '@/utils/isLocalBackendImage';

interface Hero6Props {
    title: string;
    publishedDate: string;
    readTime: string;
    author: string;
    category: string;
    image: string;
    className?: string;
}

export default function Hero6({
    title,
    publishedDate,
    readTime,
    author,
    category,
    image,
    className = ""
}: Hero6Props) {
    const [hoveredMenu, setHoveredMenu] = useState<"services" | "locations" | null>(null);

    return (
        <section className={`w-full p-2 ${className}`}>
            <div className={`relative flex flex-col justify-between w-full h-full rounded-xl ${hoveredMenu ? "overflow-visible" : "overflow-hidden"} shadow-2xl bg-black`}>
                {/* Navbar */}
                <Navbar hoveredMenu={hoveredMenu} onHoverMenuChange={setHoveredMenu} />

                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={image || "/about/about-hero-img.png"}
                        alt={title}
                        fill
                        unoptimized={isLocalBackendImage(image)}
                        className="object-cover object-top"
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
                            <span className="geist-mono-regular text-[12px] sm:text-[14px] lg:text-[16px] leading-none tracking-normal text-white uppercase">
                                Published
                            </span>
                        </div>
                        <div
                            className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full border border-white/5 backdrop-blur-md"
                            style={{ background: 'linear-gradient(90deg, rgba(51, 58, 77, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%)' }}
                        >
                            <span className="geist-mono-regular text-[12px] sm:text-[14px] lg:text-[16px] leading-none tracking-normal text-white uppercase">
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
                        <h1 className="text-[28px] sm:text-[36px] lg:text-[48px] leading-tight lg:leading-none tracking-normal text-white">
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
                                <span className="geist-mono-regular text-[12px] sm:text-[14px] lg:text-[16px] leading-none tracking-normal text-white uppercase">
                                    {readTime}
                                </span>
                            </div>
                            <div
                                className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full border border-white/5 backdrop-blur-md"
                                style={{ background: 'linear-gradient(90deg, rgba(51, 58, 77, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%)' }}
                            >
                                <span className="geist-mono-regular text-[12px] sm:text-[14px] lg:text-[16px] leading-none tracking-normal text-white uppercase">
                                    {author}
                                </span>
                            </div>
                            <div
                                className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full border border-white/5 backdrop-blur-md"
                                style={{ background: 'linear-gradient(90deg, rgba(51, 58, 77, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%)' }}
                            >
                                <span className="geist-mono-regular text-[12px] sm:text-[14px] lg:text-[16px] leading-none tracking-normal text-white uppercase">
                                    {category}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
