'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Button from '../utils/Button';
import SectionHeading from '../utils/SectionHeading';

const galleryImages = [
    '/contact-us/gallery-1.png',
    '/contact-us/gallery-1.png',
    '/contact-us/gallery-1.png',
    '/contact-us/gallery-1.png',
    '/contact-us/gallery-1.png',
    '/contact-us/gallery-1.png',
    '/contact-us/gallery-1.png',
    '/contact-us/gallery-1.png',
];

export default function ComfortGallerySection() {
    return (
        <section className="w-full py-1 px-2">
            <div className="w-full max-w-8xl mx-auto mt-4 sm:mt-8 rounded-xl bg-[#CDC2BB] py-10 md:py-14 lg:py-12 space-y-6 sm:space-y-8 lg:space-y-10">
                {/* HEADER */}
                <div className="flex flex-col items-center justify-center gap-6">
                    <SectionHeading title="Designed for comfort and precision" />
                    <Button text='View full gallery' />
                </div>

                {/* IMAGE GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 px-4 sm:px-6 md:px-8 lg:px-10">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="relative overflow-hidden rounded-[18.43px] w-full h-[12.4375rem] group">
                            <Image
                                src={image}
                                alt={`Gallery Image ${index + 1}`}
                                fill
                                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}