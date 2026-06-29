'use client';

import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ConsultationSection() {
    const [hoveredImage, setHoveredImage] = useState<number | null>(null);

    const galleryImages = [
        {
            id: 1,
            src: '/about/consultant-main.png',
            alt: 'Professional consultant main',
        },
        {
            id: 2,
            src: '/about/consultation-2.png',
            alt: 'Consultation view 2',
        },
        {
            id: 3,
            src: '/about/our-team-1.png',
            alt: 'Our team',
        },
        {
            id: 4,
            src: '/about/about-hero-img.png',
            alt: 'About hero banner',
        },
        {
            id: 5,
            src: '/about/stats-1.png',
            alt: 'Statistics and achievements',
        },
    ];

    const [activeImage, setActiveImage] = useState(galleryImages[0].src);

    return (
        <section className="w-full px-4 py-6 md:py-6">
            <div className="mx-auto max-w-[120rem] overflow-hidden rounded-xl bg-[#1B223C]">

                {/* MAIN WRAPPER */}
                <div className="flex flex-col gap-12 px-5 py-8 sm:px-8 sm:py-10 md:px-12 xl:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-20 lg:py-14">

                    {/* LEFT CONTENT */}
                    <div className="flex w-full flex-col items-center gap-6 text-center lg:max-w-[32rem]   lg:gap-8">

                        {/* Dual-Colored Brand Pill Tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex items-center overflow-hidden"
                        >
                            <span className="bg-[#CDC2BB] text-black px-4.5 py-2 rounded-lg font-mono font-medium text-base leading-none tracking-normal uppercase">
                                LEGAL
                            </span>
                            <span className="bg-[#363D4F] text-white px-4.5 py-2 rounded-lg font-mono font-medium text-base leading-none tracking-normal uppercase">
                                EXPERTISE
                            </span>
                        </motion.div>

                        {/* HEADING */}
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[3rem] leading-[115%] font-medium font-[Geist] text-white sm:text-[2.5rem] md:text-[3rem] lg:text-[3.4rem]"
                        >
                            From legal advice to
                            <span className="block">
                                smart protection
                            </span>
                        </motion.h2>

                        {/* BUTTON */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <button className="group inline-flex items-center gap-3 rounded-full bg-[#FF2D20] px-5 py-3 text-white transition-all duration-300 hover:bg-[#ff3f34] sm:px-6">
                                <span className="text-[0.9rem] font-medium sm:text-[0.95rem]">
                                    Explore Services
                                </span>

                                <div className="flex h-5 w-5 -rotate-45 items-center justify-center rounded-full bg-white text-black">
                                    <FaArrowRight className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-[2px]" />
                                </div>
                            </button>
                        </motion.div>
                    </div>

                    {/* RIGHT VISUAL SECTION */}
                    <div className="flex w-full flex-col items-center gap-4 sm:gap-5 xl:flex-row md:items-center  md:justify-center lg:w-auto lg:gap-6">

                        {/* MAIN IMAGE */}
                        <motion.div
                            key={activeImage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative h-[24rem] w-full max-w-[20rem] overflow-hidden rounded-[1.8rem] sm:h-[30rem] sm:max-w-[24rem] md:h-[34rem] md:max-w-[26rem] xl:h-[43.125rem] xl:w-[31.875rem] md:max-w-none lg:rounded-[2.14875rem]"
                        >
                            <Image
                                src={activeImage}
                                alt="Active consultant view"
                                fill
                                priority
                                className="object-cover"
                            />
                        </motion.div>

                        {/* RIGHT STACK IMAGES */}
                        <div className="flex w-full max-w-full jus gap-3 overflow-x-auto pb-2 scrollbar-hide md:w-auto xl:flex-col xl:overflow-visible md:pb-0 md:gap-4">
                            {galleryImages.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.08,
                                    }}
                                    onMouseEnter={() => setHoveredImage(image.id)}
                                    onMouseLeave={() => setHoveredImage(null)}
                                    onClick={() => setActiveImage(image.src)}
                                    className={`group relative h-[5rem] min-w-[5rem] overflow-hidden rounded-[1.2rem] sm:h-[5.8rem] sm:min-w-[5.8rem] md:h-[6.2rem] md:min-w-[6.2rem] lg:h-[6.808rem] lg:w-[7.751rem] lg:min-w-[7.751rem] lg:rounded-[1.57125rem] cursor-pointer transition-all duration-300 ${activeImage === image.src
                                        ? 'border-4 border-gray-300 scale-95 shadow-lg'
                                        : 'border-4 border-transparent hover:border-white/50'
                                        }`}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className={`object-cover transition-transform duration-500 ${hoveredImage === image.id
                                            ? 'scale-110'
                                            : 'scale-100'
                                            }`}
                                    />

                                    <div
                                        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${hoveredImage === image.id
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                            }`}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}