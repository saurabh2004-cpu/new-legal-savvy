"use client";

import React, { useState, useEffect } from "react";
import { getAllBlogs, generateSlug } from "@/services/blogServices";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../utils/SectionHeading";

interface Article {
    id: string;
    title: string;
    category: string;
    image: string;
    href: string;
}

function LatestArticleCard({ article }: { article: Article }) {
    const [isHovered, setIsHovered] = React.useState(false);

    return (

        <Link
            href={article.href}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full h-[220px] xs:h-[260px] sm:h-[320px] md:h-[23.4375rem] cursor-pointer flex-shrink-0 select-none block"
        >
            {/* Image Container (shrinks and shifts to top-right on hover) */}
            <motion.div
                animate={{
                    width: isHovered ? "88%" : "100%",
                    height: isHovered ? "88%" : "100%",
                    boxShadow: isHovered
                        ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="absolute right-0 top-0 rounded-[1.875rem] overflow-hidden flex-shrink-0"
            >
                <motion.div
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={article.image || ""}
                        alt={article.title}
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Bottom Dark Gradient Overlay */}
                <motion.div
                    animate={{ opacity: isHovered ? 0 : 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"
                />
            </motion.div>

            {/* Content Container / Text Card (shifts left-down and turns beige with rounded corners on hover, reduces width on hover) */}
            <motion.div
                animate={{
                    backgroundColor: isHovered ? "rgb(229, 222, 219)" : "rgba(229, 222, 219, 0)", // #E5DEDB
                    borderRadius: isHovered ? "24px" : "0px",
                    boxShadow: isHovered
                        ? "0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.06)"
                        : "none",
                    x: isHovered ? "-12px" : "0px",
                    y: isHovered ? "12px" : "0px",
                    width: isHovered ? "80%" : "100%"
                }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="absolute bottom-0 left-0 p-5 sm:p-8 md:p-10 flex flex-col justify-end z-10 text-left"
            >
                {/* Heading */}
                <motion.h3
                    animate={{ color: isHovered ? "#1D2331" : "#ffffff" }}
                    transition={{ duration: 0.3 }}
                    className="text-[1.125rem] sm:text-[1.4375rem] lg:text-[1.2rem] xl:text-[1.625rem] leading-none tracking-normal mb-3 sm:mb-4 max-w-[95%] sm:max-w-[90%]"
                >
                    {article.title}
                </motion.h3>

                {/* Details */}
                <motion.div
                    animate={{ color: isHovered ? "rgba(29, 35, 49, 0.8)" : "rgba(255, 255, 255, 0.8)" }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-y-2 geist-mono-medium text-[0.875rem] sm:text-[1rem] lg:text-[1.125rem] leading-none tracking-normal uppercase"
                >
                    <div className="flex gap-1.5">
                        <span className="text-[0.875rem] sm:text-[1rem] lg:text-[0.9rem] xl:text-[1.125rem] leading-none tracking-normal">
                            Category:
                        </span>

                        <motion.span
                            animate={{ color: isHovered ? "#1D2331" : "rgba(255, 255, 255, 0.8)" }}
                            transition={{ duration: 0.3 }}
                            className="text-[0.875rem] sm:text-[1rem] lg:text-[0.9rem] xl:text-[1.125rem] leading-none tracking-normal"
                        >
                            {article.category}
                        </motion.span>
                    </div>
                </motion.div>
            </motion.div>
        </Link>
    );
}

export default function LatestArticlesSection() {
    const INITIAL_ARTICLES: Article[] = [
        {
            id: "1",
            title: "Dealing with Debt: Strategies for Financial Recovery ",
            category: "Dental Treatments",
            image: "/resources/resources-1.png",
            href: "#",
        },
        {
            id: "2",
            title: "Dealing with Debt: Strategies for Financial Recovery ",
            category: "Oral Health & Prevention",
            image: "/resources/resources-2.png",
            href: "#",
        },
    ];

    const [latestArticles, setLatestArticles] = useState<Article[]>(INITIAL_ARTICLES);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const data = await getAllBlogs();
                if (data && data.length > 0) {
                    const latestTwo = data.slice(0, 2);
                    const mappedArticles = latestTwo.map((blog: any) => {
                        const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace("/api/v1", "");
                        const imagePath = blog.image?.startsWith("http")
                            ? blog.image
                            : `${baseUrl}${blog.image}`;

                        return {
                            id: blog._id,
                            title: blog.title,
                            category: blog.category || "Uncategorized",
                            image: imagePath,
                            href: `/resources/${generateSlug(blog.title)}`,
                        };
                    });
                    setLatestArticles(mappedArticles);
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
        hidden: { opacity: 0, y: 30 },
        visible: (idx: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] as const },
        }),
    };

    return (
        <section className="w-full py-1 px-2">
            <div className="w-full max-w-8xl mx-auto py-6 md:py-8 lg:px-16 lg:mt-12 rounded-xl flex flex-col">
                {/* Section Heading with Double Red Underline */}
                <SectionHeading title="Latest articles" align="left" titleClassName="text-2xl md:text-[36px] text-[#1D2331]" underlineColor="#ED3D3D" containerClassName="mb-12" />

                {/* 2-Column Responsive Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {latestArticles.map((article, idx) => (
                        <motion.div
                            key={article.id}
                            custom={idx}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={cardVariants}
                            className="w-full max-w-[39.9375rem]"
                        >
                            <LatestArticleCard article={article} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
