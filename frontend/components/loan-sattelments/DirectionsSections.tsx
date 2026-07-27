'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const teamMembers = [
    '/locations/directions-1.png',
    '/locations/directions-1.png',
    '/locations/directions-1.png',
];

export default function DirectionsSection() {
    return (
        <section className="w-full py-1 px-2">
            <div className="w-full max-w-8xl mx-auto rounded-xl overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative overflow-hidden min-h-[18rem] sm:min-h-[20rem] md:min-h-[22rem] lg:min-h-[24rem]"
                >
                    {/* REAL MAP BACKGROUND */}
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps?q=Hyderabad&output=embed"
                        className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        scale-[1.02]
                    "
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-[#D6CEC9]/40" />

                    {/* BLUR */}
                    <div className="absolute inset-0 backdrop-blur-[1px]" />

                    {/* SOFT GRADIENT */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D8D0CA]/40 via-[#D8D0CA]/30 to-[#D8D0CA]/40" />
                    {/* CONTENT */}
                    <div className="absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center gap-6 px-5 py-8 text-center sm:px-8 sm:gap-7 md:flex-row md:items-center md:justify-between md:px-12 md:py-0 md:text-left mx-auto lg:px-20">
                        {/* LEFT */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.7,
                                delay: 0.1,
                            }}
                            className="flex justify-center md:justify-start"
                        >
                            <h2 className="geist-semibold text-[1.7rem] leading-[120%] text-black text-[2rem] md:text-[1.2rem] xl:text-[2.5rem]"
                            >
                                Find your location
                            </h2>
                        </motion.div>

                        {/* CENTER AVATARS */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.7,
                                delay: 0.2,
                            }}
                            className="flex items-center justify-center"
                        >
                            {teamMembers.map((member, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{
                                        y: -6,
                                        scale: 1.05,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                    className={`relative overflow-hidden rounded-full border-[3px] border-white shadow-lg w-[3.7rem] h-[3.7rem] sm:w-[4.5rem] sm:h-[4.5rem] xl:w-[5.5rem] xl:h-[5.5rem] ${index !== 0 ? '-ml-4 md:-ml-5' : ''}
                                `}
                                >
                                    <Image
                                        src={member}
                                        alt={`Member ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* RIGHT */}
                        <motion.button
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.7,
                                delay: 0.3,
                            }}
                            whileHover={{
                                scale: 1.03,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            className="group flex items-center justify-center gap-2 sm:gap-3 text-black"
                        >
                            <span className="geist-regular text-[1.7rem] leading-[120%] sm:text-[2rem] md:text-[1.2rem] xl:text-[2.5rem]">
                                Get Directions
                            </span>

                            <motion.div
                                whileHover={{
                                    rotate: 45,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11"
                            >
                                <ArrowUpRight className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                            </motion.div>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}