'use client';

import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../utils/Button';
import PillTag from '../utils/PillTag';
import assets from '@/data/assets';

export default function ConsultationSection() {
    const [hoveredImage, setHoveredImage] = useState<number | null>(null);

    const galleryImages = [
        {
            id: 1,
            src: assets.about.consultantMain,
            alt: 'Professional consultant main',
        },
        {
            id: 2,
            src: assets.about.consultation2,
            alt: 'Consultation view 2',
        },
        {
            id: 3,
            src: assets.about.ourTeam1,
            alt: 'Our team',
        },
        {
            id: 4,
            src: assets.about.hero,
            alt: 'About hero banner',
        },
        {
            id: 5,
            src: assets.about.stats1,
            alt: 'Statistics and achievements',
        },
    ];

    const [activeImage, setActiveImage] = useState(galleryImages[0].src);

    return (
        <section className="w-full py-1 px-2">
            <div className="max-w-8xl mx-auto overflow-hidden rounded-xl bg-[#1D2540]">
                {/* MAIN WRAPPER */}
                <div className="flex flex-col gap-12 px-5 py-8 sm:px-8 sm:py-10 md:px-12 xl:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-20 lg:py-14">
                    {/* LEFT CONTENT */}
                    <div className="flex w-full flex-col items-center gap-6 text-center lg:max-w-xl lg:gap-8 lg:pl-16">
                        {/* Dual-Colored Brand Pill Tag */}
                        <PillTag buttonText1={"LEGAL"} buttonText2={"EXPERTISE"} />

                        {/* HEADING */}
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="geist-regular text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[3rem] leading-[115%] text-white sm:text-[2.5rem] md:text-[3rem] lg:text-[3.4rem]"
                        >
                            Loan settlement lawyers,
                            <span className="block">
                                not call-centre agents
                            </span>
                        </motion.h2>

                        {/* BUTTON */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Button text='Talk to a Lawyer' href='/contact-us' />
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
                            className="relative h-[24rem] w-full max-w-[20rem] overflow-hidden sm:h-[30rem] sm:max-w-[24rem] md:h-[34rem] md:max-w-[26rem] xl:h-[43.125rem] xl:w-[31.875rem] md:max-w-none rounded-xl"
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
                        <div className="flex w-full max-w-full jus gap-2 overflow-x-auto scrollbar-hide md:w-auto xl:flex-col xl:overflow-visible">
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
                                    className={`group relative h-[5rem] min-w-[5rem] overflow-hidden rounded-xl sm:h-[5.8rem] sm:min-w-[5.8rem] md:h-[6.2rem] md:min-w-[6.2rem] lg:h-[6.808rem] lg:w-[7.751rem] lg:min-w-[7.751rem] cursor-pointer transition-all duration-300 ${activeImage === image.src
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