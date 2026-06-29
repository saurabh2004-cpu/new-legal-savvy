// import Image from "next/image";
// import React from "react";

// const stats = [
//     {
//         label: "YEARS",
//         value: "10+",
//         description: "Legal excellence.",
//         image: '/about/stats-1.png',
//         imageheading: 'Years In Legal Savvy',
//         imageDescription: 'Over 10 years of successfully helping clients navigate complex legal matters.'
//     },
//     {
//         label: "SATISFACTION",
//         value: "97%",
//         description: "Trusted by clients.",
//         image: '/about/stats-1.png',
//         imageheading: 'Years In Legal Savvy',
//         imageDescription: 'Over 10 years of successfully helping clients navigate complex legal matters.'
//     },
//     {
//         label: "SATISFACTION",
//         value: "97%",
//         description: "Trusted by clients.",
//         image: '/about/stats-1.png',
//         imageheading: 'Years In Legal Savvy',
//         imageDescription: 'Over 10 years of successfully helping clients navigate complex legal matters.'
//     },
// ];

// export default function StatsSection() {
//     return (
//         <section className="w-full  py-10 sm:py-12 ">
//             <div className="mx-auto w-full max-w-[120rem] px-4 sm:px-6 lg:px-8">

//                 {/* Stats grid — 1 col mobile, 3 col desktop */}
//                 <div className="grid grid-cols-1  sm:grid-cols-3 ">
//                     {stats.map((stat, idx) => (
//                         <div
//                             key={idx}
//                             className="flex flex-col gap-10 items-center gap-3 px-6 py-8 sm:py-6 text-center"
//                         >
//                             <div className="w-full flex flex-col items-center gap-3 px-6 py-8 sm:py-6 text-center">
//                                 {/* Label — tiny spaced caps */}
//                                 <span
//                                     className="font-[Geist] text-[1rem] font-normal leading-[100%] tracking-[0%] text-center text-[#6b6560]"
//                                 >
//                                     {stat.label}
//                                 </span>

//                                 {/* Thin full-width rule */}
//                                 <div className="w-full h-px bg-[#B8B2AC]" />

//                                 {/* Large stat number */}
//                                 <span
//                                     className="font-[Geist] text-[2.629375rem] font-normal leading-[100%] tracking-[0%] text-center text-[#1a1714]"
//                                 >
//                                     {stat.value}
//                                 </span>

//                                 {/* Description */}
//                                 <span
//                                     className="font-[Geist] text-[1.25rem] font-light leading-[100%] tracking-[0%] text-center text-[#1B223C]"
//                                 >
//                                     {stat.description}
//                                 </span>
//                             </div>

//                             <div className="relative h-[41.375rem] w-[27.6875rem] overflow-hidden rounded-[1.875rem]">

//                                 {/* IMAGE */}
//                                 <Image
//                                     src={stat.image}
//                                     alt=""
//                                     fill
//                                     className="object-cover"
//                                 />

//                                 {/* DARK BOTTOM GRADIENT SHADOW */}
//                                 <div
//                                     className="absolute inset-x-0 bottom-0 z-[2] h-[45%]"
//                                     style={{
//                                         background:
//                                             "linear-gradient(180deg, rgba(70, 49, 192, 0) 0%, rgba(6, 31, 80, 0.25) 35%, rgba(2, 37, 109, 0.75) rgba(5, 33, 88, 0.95) 100%)",
//                                     }}
//                                 />

//                                 {/* OPTIONAL BLUE GLOW OVERLAY */}
//                                 <div
//                                     className="absolute inset-0 z-[1]"
//                                     style={{
//                                         background:
//                                             "linear-gradient(180deg, rgba(16, 99, 207, 0) 45%, rgba(14, 81, 174, 0.18) 70%, rgba(5, 40, 106, 0.55) 100%)",
//                                     }}
//                                 />

//                                 {/* CONTENT */}
//                                 <div className="absolute inset-0 z-[3] flex flex-col justify-end p-8 text-white">
//                                     <h3 className="text-[2.25rem] font-semibold leading-[100%] tracking-[0%]">
//                                         {stat.imageheading}
//                                     </h3>

//                                     {/* BOTTOM LINE */}
//                                     <div className="mt-8 h-[1px] w-full bg-white/40" />
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </section>
//     );
// }

"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const stats = [
    {
        label: "YEARS",
        value: "10+",
        description: "Legal excellence.",
        image: "/about/stats-1.png",
        imageheading: "Years In Legal Savvy",
        imageDescription:
            "Over 10 years of successfully helping clients navigate complex legal matters.",
    },
    {
        label: "SATISFACTION",
        value: "97%",
        description: "Trusted by clients.",
        image: "/about/stats-1.png",
        imageheading: "Patient Satisfaction",
        imageDescription:
            "Measured through post-treatment surveys, our satisfaction rate reflects our commitment to patient-centred care.",
    },
    {
        label: "SATISFACTION",
        value: "97%",
        description: "Trusted by clients.",
        image: "/about/stats-1.png",
        imageheading: "Patient Satisfaction",
        imageDescription:
            "Measured through post-treatment surveys, our satisfaction rate reflects our commitment to patient-centred care.",
    },
];

export default function StatsSection() {
    return (
        <section className="w-full md:-10 ">
            <div className="mx-auto w-full max-w-[100vw] bg-[#D8D0CA]">

                <div className="grid grid-cols-1 xl:grid-cols-3">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center gap-3 py-8 text-center sm:py-6"
                        >
                            {/* TOP STATS */}
                            <div className="flex  w-full flex-col items-center gap-3 px-6 py-8 text-center sm:py-6">

                                <span className="font-[Geist] text-[1rem] lg:text-[1.5rem] xl:text-[1rem] font-normal leading-[100%] tracking-[0%] text-center text-[#6b6560]">
                                    {stat.label}
                                </span>

                                <div className="h-px w-full bg-[#B8B2AC]" />

                                <span className="font-[Geist] text-[2.629375rem] lg:text-[3.4rem] xl:text-[2.629375rem] font-normal leading-[100%] tracking-[0%] text-center text-[#1a1714]">
                                    {stat.value}
                                </span>

                                <span className="font-[Geist] text-[1.25rem] lg:text-[1.5rem] xl:text-[1.25rem] font-light leading-[100%] tracking-[0%] text-center text-[#1B223C]">
                                    {stat.description}
                                </span>
                            </div>

                            {/* IMAGE CARD */}
                            <motion.div
                                initial="rest"
                                whileHover="hover"
                                animate="rest"
                                className="group relative h-[30rem] w-[98vw] md:h-[50rem]  lg:-h-[60] lg:w-[45rem]  xl:h-[47.375rem] xl:w-[30.5rem] 2xl:w-[32vw]  overflow-hidden rounded-[0.575rem] cursor-pointer"
                            >
                                {/* IMAGE */}
                                <motion.div
                                    variants={{
                                        rest: { scale: 1 },
                                        hover: { scale: 1.06 },
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={stat.image}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>

                                {/* MAIN DARK OVERLAY */}
                                <motion.div
                                    variants={{
                                        rest: {
                                            height: "50%",
                                            opacity: 0.9,
                                        },
                                        hover: {
                                            height: "100%",
                                            opacity: 1,
                                        },
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="absolute inset-x-0 bottom-0 z-[2]"
                                    style={{
                                        background:
                                            "linear-gradient(180deg, rgba(51, 51, 55, 0) 0%, rgba(23, 27, 35, 0.28) 35%, rgba(9, 10, 13, 0.82) 72%, rgba(6, 6, 6, 0.98) 100%)",
                                    }}
                                />

                                {/* BLUE GLOW */}
                                <motion.div
                                    variants={{
                                        rest: { opacity: 0.45 },
                                        hover: { opacity: 0.72 },
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 z-[1]"
                                // style={{
                                //     background:
                                //         "linear-gradient(180deg, rgba(16,99,207,0) 45%, rgba(14,81,174,0.22) 70%, rgba(5,40,106,0.65) 100%)",
                                // }}
                                />

                                {/* CONTENT */}
                                <div className="absolute inset-0 z-[3] flex flex-col justify-end items-start p-8 text-white">

                                    {/* TITLE */}
                                    <motion.h3
                                        variants={{
                                            rest: {
                                                y: 0,
                                            },
                                            hover: {
                                                y: -8,
                                            },
                                        }}
                                        transition={{
                                            duration: 0.45,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="text-[1.5rem] md:text-[2.25rem] font-semibold leading-[100%] tracking-[0%]"
                                    >
                                        {stat.imageheading}
                                    </motion.h3>

                                    {/* DESCRIPTION */}
                                    <motion.p
                                        variants={{
                                            rest: {
                                                opacity: 0,
                                                y: 40,
                                                height: 0,
                                                marginTop: 0,
                                            },
                                            hover: {
                                                opacity: 1,
                                                y: 0,
                                                height: "auto",
                                                marginTop: "1.25rem",
                                            },
                                        }}
                                        transition={{
                                            duration: 0.55,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="overflow-hidden text-[1rem] leading-[170%] text-white/75 text-left"
                                    >
                                        {stat.imageDescription}
                                    </motion.p>

                                    {/* BOTTOM LINE */}
                                    <motion.div
                                        variants={{
                                            rest: {
                                                opacity: 0.45,
                                                marginTop: "2rem",
                                            },
                                            hover: {
                                                opacity: 1,
                                                marginTop: "2.5rem",
                                            },
                                        }}
                                        transition={{ duration: 0.4 }}
                                        className="h-[1px] w-full bg-white/40"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}