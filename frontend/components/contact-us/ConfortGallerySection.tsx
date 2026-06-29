'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

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
        <section className="max-w-[97vw] mx-auto rounded-xl my-4 bg-[#d6cec8] py-10 md:py-14 lg:py-12">
            <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="mb-8 flex flex-col items-center justify-center">

                    {/* HEADING */}
                    <h2
                        className="
                        inline-block
                        font-[Geist]
                        font-semibold
                        text-[1.8rem]
                        md:text-[2.25rem]
                        leading-[100%]
                        tracking-[0%]
                        text-center
                        text-black
                        "
                    >
                        Designed for comfort and precision

                        <div className="flex flex-col gap-[1px] mt-3 w-full">
                            <div className="h-[2.5px] w-full bg-[#ff3b30]" />
                            <div className="h-[2.5px] w-full bg-[#ff3b30]" />
                        </div>
                    </h2>

                    {/* RED LINE */}
                    {/* BUTTON */}
                    <button
                        className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#ff3b30]
              px-5
              py-2.5
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[#e6362c]
            "
                    >
                        <span
                            className="
                font-[Geist]
                font-medium
                text-[0.95rem]
                md:text-[1.125rem]
                leading-[100%]
                tracking-[0%]
                text-white
              "
                        >
                            View full gallery
                        </span>

                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                            <ArrowUpRight className="h-4 w-4 text-black" />
                        </div>
                    </button>
                </div>

                {/* IMAGE GRID */}
                <div
                    className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
            md:gap-5
          "
                >
                    {galleryImages.map((image, index) => (
                        <div
                            key={index}
                            className="
                relative
                overflow-hidden
                rounded-[18.43px]
                w-full
                h-[12.4375rem]
                group
              "
                        >
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