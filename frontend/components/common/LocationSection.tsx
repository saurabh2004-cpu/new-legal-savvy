'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Location {
    id: number;
    name: string;
    address: string;
    suite: string;
    weekdayHours: string;
    weekendHours: string;
    image: string;
}

const locations: Location[] = [
    {
        id: 1,
        name: 'Hyderabad',
        address: '405 Lexington Avenue',
        suite: 'Suite 2600',
        weekdayHours: 'Mon – Fri: 7:30 AM – 6:00 PM',
        weekendHours: 'Sat – Sun: Closed',
        image: '/about/location-1.png',
    },
    {
        id: 2,
        name: 'Chh. Sambhajinagar',
        address: '405 Lexington Avenue',
        suite: 'Suite 2600',
        weekdayHours: 'Mon – Fri: 7:30 AM – 6:00 PM',
        weekendHours: 'Sat – Sun: Closed',
        image: '/about/location-2.png',
    },
];

export default function LocationsSection({ className }: { className?: string }) {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section className={`w-full py-1 px-2 ${className}`}>
            <div className="max-w-8xl mx-auto space-y-2">
                {locations.map((location, index) => {
                    const isHovered = hoveredId === location.id;

                    return (
                        <motion.div
                            key={location.id}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.08,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            onMouseEnter={() => setHoveredId(location.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="relative w-full overflow-hidden rounded-xl group"
                        >
                            {/* IMAGE */}
                            <div className="relative h-[24rem] md:h-[32rem] lg:h-[38rem] w-full overflow-hidden">

                                <motion.div
                                    animate={{
                                        scale: isHovered ? 1 : 1.04,
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={location.image}
                                        alt={location.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>

                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-black/20" />

                                {/* SOFT GRADIENT */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent" />
                            </div>

                            {/* CENTER CARD */}
                            <motion.div
                                animate={{
                                    y: isHovered ? -8 : 0,
                                    scale: isHovered ? 1.015 : 1,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="absolute left-1/2 top-1/2 z-10 w-[90%] max-w-[40rem] md:max-w-[34rem] lg:max-w-[40rem] -translate-x-1/2 -translate-y-1/2"
                            >
                                <div
                                    className="
                                    rounded-[1.75rem]
                                    border border-white/20
                                    px-6 py-6 md:px-8 md:py-7
                                    bg-gradient-to-b
                                    from-[#F0ECE7]/40
                                    via-[#CDC2BB]/30
                                    to-[#E6DCD6]/40
                                    backdrop-blur-[10px]
                                    backdrop-saturate-150
                                    bg-white/10
                                    shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                                    "
                                >
                                    {/* HEADER */}
                                    <div className="md:mb-8 flex items-start justify-between gap-4">
                                        <motion.h3
                                            animate={{
                                                y: isHovered ? -2 : 0,
                                            }}
                                            transition={{
                                                duration: 0.4,
                                            }}
                                            className="
                                                font-[Geist]
                                                font-medium
                                                text-[1rem]
                                                md:text-[1.5rem]
                                                xl:text-[1.625rem]
                                                2xl:text-[1.625rem]
                                                leading-[100%]
                                                tracking-[0%]
                                                text-black
                                            "
                                        >
                                            {location.name}
                                        </motion.h3>

                                        <motion.button
                                            animate={{
                                                rotate: isHovered ? 45 : 0,
                                                scale: isHovered ? 1.08 : 1,
                                            }}
                                            transition={{
                                                duration: 0.45,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-black transition-colors hover:bg-black/10"
                                        >
                                            <ArrowUpRight className="h-5 w-5 " />
                                        </motion.button>
                                    </div>

                                    {/* ADDRESS */}
                                    <motion.div
                                        animate={{
                                            y: isHovered ? -2 : 0,
                                        }}
                                        transition={{
                                            duration: 0.45,
                                            delay: 0.04,
                                        }}
                                        className="md:mb-6"
                                    >
                                        <p
                                            className="
                                            font-mono
                                            font-medium
                                            text-[0.875rem]
                                            md:text-[1.125rem]
                                            leading-[100%]
                                            tracking-[0%]
                                            text-black/80
                                            "
                                        >
                                            {location.address}, {location.suite}
                                        </p>
                                    </motion.div>

                                    {/* HOURS */}
                                    <motion.div
                                        animate={{
                                            opacity: isHovered ? 1 : 0.9,
                                            y: isHovered ? 0 : 4,
                                        }}
                                        transition={{
                                            duration: 0.45,
                                            delay: 0.08,
                                        }}
                                        className=" flex align-center  pt-4"
                                    >
                                        <p
                                            className="
                                            font-mono
                                            font-normal
                                            text-[0.875rem]
                                            md:text-[1rem]
                                            leading-[100%]
                                            tracking-[0%]
                                            text-black/60
                                            "
                                        >
                                            {location.weekdayHours} {location.weekendHours}
                                        </p>

                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}