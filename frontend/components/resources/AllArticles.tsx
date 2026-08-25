"use client";

import React, { useState, useEffect } from "react";
import { getAllBlogs } from "@/services/blogServices";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../utils/SectionHeading";
import { isLocalBackendImage } from "@/utils/isLocalBackendImage";
import { getImageUrl } from "@/utils/getImageUrl";

interface Article {
    id: string;
    title: string;
    category: string;
    readTime: string;
    image: string;
    href: string;
}

function AllArticleCard({ article }: { article: Article }) {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <Link
            href={article.href}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex flex-col w-full max-w-[26.25rem] cursor-pointer select-none group text-left"
        >
            {/* Image Container with lift and shadow transition */}
            <motion.div
                animate={{
                    y: isHovered ? -8 : 0,
                    boxShadow: isHovered
                        ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
                }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-full aspect-[1.6] rounded-[1.875rem] overflow-hidden mb-5 bg-[#CDC2BB]/20"
            >
                <div className="relative w-[26.0625rem] h-[16.4375rem] rounded-[1.0625rem] overflow-hidden">
                    <motion.div
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            unoptimized={isLocalBackendImage(article.image)}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </motion.div>

            {/* Content info: Title, Category, Read Time */}
            <div className="flex flex-col px-1">
                <motion.h3
                    animate={{ color: "#0F172A" }}
                    transition={{ duration: 0.3 }}
                    className="text-[1.125rem] sm:text-[1.25rem] lg:text-[1.625rem] leading-none tracking-normal mb-4 lg:min-h-[3.25rem] line-clamp-2"
                >
                    {article.title}
                </motion.h3>

                <div className="flex flex-col gap-1.5 geist-mono-medium text-[0.8125rem] sm:text-[0.875rem] leading-none tracking-normal text-[#00000070] uppercase">
                    <div className="flex gap-1.5 text-[1.125rem] leading-none tracking-normal text-black/77 uppercase">
                        <span>CATEGORY:</span>
                        <motion.span
                            animate={{ color: "#1D2331" }}
                            transition={{ duration: 0.3 }}
                            className="text-[0.875rem] sm:text-[1rem] lg:text-[0.9rem] xl:text-[1.125rem] leading-none tracking-normal"
                        >
                            {article.category}
                        </motion.span>
                    </div>

                    <div className="flex gap-1.5 text-[1.125rem] leading-none tracking-normal text-black/77 uppercase">
                        <span>READ:</span>
                        <motion.span
                            animate={{ color: "#1D2331" }}
                            transition={{ duration: 0.3 }}
                            className="text-[0.875rem] sm:text-[1rem] lg:text-[0.9rem] xl:text-[1.125rem] leading-none tracking-normal"
                        >
                            {article.readTime}
                        </motion.span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function AllArticlesSection() {
    const INITIAL_ARTICLES: Article[] = [
        {
            id: "1",
            title: "Dealing with Debt: Strategies for Financial Recovery",
            category: "Credit Card",
            readTime: "5 min",
            image: "/home/human-approach-1.png",
            href: "#",
        },
        {
            id: "2",
            title: "Understanding Personal Loans: A Complete Guide",
            category: "Personal Loans",
            readTime: "8 min",
            image: "/resources/resources-1.png",
            href: "#",
        },
        {
            id: "3",
            title: "Business Debt Settlement: How It Works",
            category: "Business Debt",
            readTime: "6 min",
            image: "/resources/resources-2.png",
            href: "#",
        },
        {
            id: "4",
            title: "Credit Repair: Steps to Rebuild Your Score",
            category: "Credit Score",
            readTime: "7 min",
            image: "/resources/resources-1.png",
            href: "#",
        },
        {
            id: "5",
            title: "Legal Rights Against Harassment from Creditors",
            category: "Legal Rights",
            readTime: "10 min",
            image: "/resources/resources-2.png",
            href: "#",
        },
        {
            id: "6",
            title: "Debt Consolidation vs. Bankruptcy: Which is Right?",
            category: "Financial Strategy",
            readTime: "9 min",
            image: "/home/human-approach-1.png",
            href: "#",
        },
    ];

    const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const data = await getAllBlogs();
                if (data && data.length > 0) {
                    const mappedArticles = data.map((blog: any) => {
                        return {
                            id: blog._id,
                            title: blog.title,
                            category: blog.category || "Uncategorized",
                            readTime: blog.readTime || "5 min",
                            image: getImageUrl(blog.image),
                            href: `/resources/${blog.slug}`,
                        };
                    });
                    setArticles(mappedArticles);

                }
            } catch (error) {
                console.error("Error fetching blogs", error);
            }
        }
        fetchBlogs();
    }, []);

    const headerVariants = {
        hidden: { opacity: 0, x: -25 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
    } as const;

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 35 },
        visible: (idx: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: (idx % 3) * 0.15, ease: [0.16, 1, 0.3, 1] as const },
        }),
    };

    return (
        <section className="w-full py-1 px-2">
            <div className="w-full max-w-8xl mx-auto py-6 md:py-8 lg:px-16 lg:my-12 rounded-xl flex flex-col">
                {/* Section Heading with Double Red Underline */}
                <SectionHeading title="All articles" align="left" titleClassName="text-2xl md:text-[36px] text-[#1D2331]" underlineColor="#ED3D3D" containerClassName="mb-12" />

                {/* 3-Column Responsive Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
                    {articles.map((article, idx) => (
                        <motion.div
                            key={article.id}
                            custom={idx}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={cardVariants}
                            className="w-full flex justify-center"
                        >
                            <AllArticleCard article={article} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
