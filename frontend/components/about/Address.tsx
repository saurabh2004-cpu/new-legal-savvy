"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import AboutUs from "../common/AboutUs";

const BulletIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1D2331"
        strokeWidth="4"
        className="w-3.5 h-3.5 text-[#1D2331] bg-white rounded-full"
    >
        <circle cx="12" cy="12" r="10" />
    </svg>
);

export default function AddressesSection() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
            },
        },
    };

    const abotSectionParagraph2 = [
        "Legal Savvy provides reliable legal support with a clear, client-focused ",
        "approach. From legal consultation to documentation and dispute .",
        "guidance, we simplify complex legal matters and help you make ",
        "informed decisions with confidence."
    ]

    return (
        <section className="pb-6 md:pb-12 xl:pb-16 px-6 md:px-12  bg-[#D8D0CA]  overflow-hidden flex flex-col items-center">
            <AboutUs
                buttonText1={"About"}
                buttonText2={"Legal"}
                paragraph={abotSectionParagraph2}
                className="bg-[#D8D0CA]"
            />
            <div className="w-full max-w-[84rem] mx-auto flex flex-col items-center">

                {/* 3-Column Responsive Grid Layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 w-full"
                >

                    {/* COLUMN 1: Services List Card (aligned to bottom on desktop) */}
                    <div className="lg:col-span-1 flex flex-col gap-6 lg:gap-8 justify-end h-full">

                        {/* Image replacing the empty spacer on Desktop */}
                        <motion.div
                            className="hidden xl:block w-full h-[18.125rem] rounded-[24px] overflow-hidden relative shadow-lg"
                            variants={cardVariants}
                        >
                            <Image
                                src="/about/about-hero-img.png"
                                alt="Address Image Placeholder"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Services List Card (width: 426px, height: 290px on desktop) */}
                        <motion.div
                            variants={cardVariants}
                            className="p-8 rounded-[1.875rem] bg-[#CDC2BB]/70 border border-white/20 shadow-lg backdrop-blur-md flex flex-col gap-5 w-full xl:w-[26.625rem] h-auto lg:h-[18.125rem] justify-center"

                        >
                            {[
                                { label: "Legal Consultation", index: 1 },
                                { label: "Contract Drafting", index: 2 },
                                { label: "Business & Corporate Law", index: 3 },
                                { label: "Dispute Resolution", index: 4 },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between pb-4 border-b-2 border-[#1D2331]/15 last:border-0 last:pb-0 last:mb-0"
                                >
                                    <div className="flex items-center gap-4 ">
                                        <BulletIcon />
                                        <span className="font-sans font-normal text-[20px] text-black leading-[100%] tracking-normal">
                                            {item.label}
                                        </span>
                                    </div>
                                    <span className="font-sans font-normal text-[20px] text-black leading-[100%] tracking-normal">
                                        {item.index}
                                    </span>
                                </div>
                            ))}
                        </motion.div>

                    </div>

                    {/* COLUMNS 2 & 3: Locations Card (Top) & Portraits Card (Bottom) */}
                    <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">




                        {/* Locations Address Card (width: 868px, height: 290px on desktop) */}
                        <motion.div
                            variants={cardVariants}
                            className="p-8 sm:p-10 rounded-[1.875rem] bg-[#E6DCD6] flex flex-col sm:flex-row gap-8 justify-around items-center w-full lg:w-[54.25rem] h-auto lg:h-[18.125rem]"
                        // style={{
                        //     background:
                        //         "linear-gradient(180deg, rgba(240, 236, 231, 0.7) 0%, rgba(205, 194, 187, 0.7) 63.46%, rgba(230, 220, 214, 0.7) 100%)",
                        // }}
                        >
                            {[
                                {
                                    badge: "HYDERABAD",
                                    city: "Telangana",
                                    lines: [
                                        "405 Lexington Avenue,",
                                        "Suite 2600"
                                    ],
                                },
                                {
                                    badge: "MAHARASHTRA",
                                    city: "Chh Sambhajinagar",
                                    lines: [
                                        "405 Lexington Avenue,",
                                        "Suite 2600"
                                    ],
                                },
                            ].map((office, i) => (
                                <div key={i} className="flex flex-col gap-3 items-center text-center flex-1">
                                    <div className="bg-[#363D4F] text-white text-[16px] font-mono tracking-normal leading-[100%] px-5 py-2.5 rounded-[1.25rem] font-medium uppercase shadow-sm flex items-center justify-center min-w-[7.5rem]">
                                        {office.badge}
                                    </div>
                                    <h3 className="font-sans font-light text-[28.95px] leading-[100%] text-[#1D2331] tracking-normal mt-2 text-center">
                                        {office.city}
                                    </h3>
                                    <div className="flex flex-col gap-1.5 mt-2 text-[#1D2331]/80">
                                        {office.lines.map((line, lIdx) => (
                                            <p
                                                key={lIdx}
                                                className="font-mono font-medium text-[18px] leading-[100%] tracking-normal text-center"
                                            >
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Media/Portraits Row Card (Two images: 426px width, 290px height each on desktop) */}
                        <motion.div
                            variants={cardVariants}
                            className="flex flex-col sm:flex-row gap-6 w-full lg:w-[54.25rem]"
                        >
                            {[
                                { src: "/home/human-1.avif", alt: "Consultant Portrait 1" },
                                { src: "/home/human-2.avif", alt: "Consultant Portrait 2" },
                            ].map((img, i) => (
                                <div
                                    key={i}
                                    className="relative w-full sm:w-[26.625rem] h-[18.125rem] rounded-[1.875rem] border border-white/20 shadow-md overflow-hidden group cursor-pointer"
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </motion.div>

                    </div>

                </motion.div>
            </div>
        </section>
    );
}