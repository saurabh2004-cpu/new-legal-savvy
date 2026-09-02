'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getStateLabels } from "@/services/labelsServices";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/utils/getImageUrl";
import { isLocalBackendImage } from "@/utils/isLocalBackendImage";

type ImageGalleryProps = {
    className?: string;
}

export default function ImageGalleryStrip({ className }: ImageGalleryProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const [images, setImages] = useState<Label[]>([]);
    // Simple label type for the gallery
    type Label = {
        _id: string;
        name?: string;
        image?: string;
        slug?: string;
    };
    const router = useRouter();

    useEffect(() => {
        const fetchLabels = async () => {
            const labels = await getStateLabels();
            setImages(labels || []);
        };
        fetchLabels();
    }, []);

    const handleNavigation = (slug: string | undefined, id: string) => {
        setSelected(selected === id ? null : id);
        if (slug) {
            router.push(`/loan-settlement-by-state/${slug}`);
        }
    };

    if (images.length === 0) return null;

    // Duplicate the array enough times to ensure seamless scrolling on large screens.
    let duplicatedImages = [...images];
    while (duplicatedImages.length < 12 && duplicatedImages.length > 0) {
        duplicatedImages = [...duplicatedImages, ...images];
    }

    return (
        <section className={`w-full py-1 px-2 ${className}`}>
            <div className="max-w-8xl mx-auto rounded-xl bg-[#1B223C] flex items-center justify-center p-6 md:p-8 overflow-hidden">
                {/* Outer container — navy background strip */}
                <div className="w-full relative overflow-hidden py-5">
                    {/* Left/Right Fade Gradients for smooth entrance/exit */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-48 bg-gradient-to-r from-[#1B223C] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-48 bg-gradient-to-l from-[#1B223C] to-transparent z-10 pointer-events-none"></div>
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
                                key={`${img._id}-${idx}`}
                                onClick={() => handleNavigation(img.slug, img._id)}
                                onMouseEnter={() => setHovered(img._id)}
                                onMouseLeave={() => setHovered(null)}
                                className="relative rounded-xl overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 shrink-0 w-[15rem] md:w-[18.9rem]"
                                style={{
                                    aspectRatio: "4/3",
                                    transform:
                                        hovered === img._id || selected === img._id
                                            ? "scale(1.03)"
                                            : "scale(1)",
                                }}
                            >
                                <Image
                                    src={img.image ? getImageUrl(img.image) : "/service/image-gallery.png"}
                                    alt={img.name || "Gallery Image"}
                                    width={337}
                                    height={302}
                                    className="object-cover h-full w-full rounded-xl object-top transition-transform duration-500"
                                    draggable={false}
                                    unoptimized={isLocalBackendImage(img.image)}
                                />

                                {/* Subtle gradient overlay at bottom */}
                                <div
                                    className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                                    style={{
                                        background:
                                            "linear-gradient(to top, rgba(10,18,35,0.55) 0%, transparent 100%)",
                                    }}
                                />

                                <div className="absolute bottom-4 left-4 right-4 text-white text-left font-semibold text-lg md:text-xl drop-shadow-md">
                                    {img.name}
                                </div>

                                {/* Selected checkmark badge */}
                                {selected === img._id && (
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
        </section>
    );
}