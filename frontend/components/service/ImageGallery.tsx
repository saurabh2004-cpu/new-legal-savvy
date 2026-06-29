
'use client'
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const images = [
    {
        id: 1,
        src: "/service/image-gallery.png",
        alt: "Dental consultation",
    },
    {
        id: 2,
        src: "/service/image-gallery.png",
        alt: "Dental procedure",
    },
    {
        id: 3,
        src: "/service/image-gallery.png",
        alt: "Dental checkup",
    },
    {
        id: 4,
        src: "/service/image-gallery.png",
        alt: "Dentist at work",
    },
];

// Duplicate the array enough times to ensure seamless scrolling on large screens.
const duplicatedImages = [...images, ...images, ...images, ...images];

export default function ImageGalleryStrip() {
    const [selected, setSelected] = useState<number | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="max-w-[97vw] mx-auto rounded-xl my-4 bg-[#1B223C] flex items-center justify-center p-6 md:p-8 overflow-hidden">
            {/* Outer container — navy background strip */}
            <div className="w-full relative overflow-hidden py-5">
                <motion.div
                    className="flex gap-4 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 35, // Adjust for speed
                    }}
                >
                    {duplicatedImages.map((img, idx) => (
                        <button
                            key={`${img.id}-${idx}`}
                            onClick={() => setSelected(selected === img.id ? null : img.id)}
                            onMouseEnter={() => setHovered(img.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative rounded-xl overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 shrink-0 w-[15rem] md:w-[18.9rem]"
                            style={{
                                aspectRatio: "4/3",
                                transform:
                                    hovered === img.id || selected === img.id
                                        ? "scale(1.03)"
                                        : "scale(1)",
                            }}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={337}
                                height={302}
                                className="object-cover h-full w-full rounded-xl object-top transition-transform duration-500"
                                draggable={false}
                            />

                            {/* Subtle gradient overlay at bottom */}
                            <div
                                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                                style={{
                                    background:
                                        "linear-gradient(to top, rgba(10,18,35,0.55) 0%, transparent 100%)",
                                }}
                            />

                            {/* Selected checkmark badge */}
                            {selected === img.id && (
                                <span
                                    className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white"
                                    style={{ fontSize: 13, fontWeight: 700 }}
                                    aria-label="Selected"
                                >
                                    ✓
                                </span>
                            )}
                        </button>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}