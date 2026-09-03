'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { getStateLabels } from "@/services/labelsServices";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/utils/getImageUrl";
import { isLocalBackendImage } from "@/utils/isLocalBackendImage";
import assets from "@/data/assets";

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
            console.log("images", labels)
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
        <section className={`relative z-20 w-full py-1 px-2 ${className}`}>
            <div className="max-w-8xl mx-auto rounded-xl bg-[#1B223C] flex items-center justify-center p-6 md:p-8 overflow-hidden">
                {/* Outer container — navy background strip */}
                <div className="w-full relative overflow-hidden py-5">
                    {/* Left/Right Fade Gradients for smooth entrance/exit */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-48 bg-gradient-to-r from-[#1B223C] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-48 bg-gradient-to-l from-[#1B223C] to-transparent z-10 pointer-events-none"></div>
                    
                    <style>{`
                        @keyframes marquee {
                            0% { transform: translateX(0%); }
                            100% { transform: translateX(-50%); }
                        }
                    `}</style>
                    <div
                        className="flex gap-4 w-max"
                        style={{
                            animation: "marquee 55s linear infinite",
                            animationPlayState: hovered ? "paused" : "running",
                        }}
                    >
                        {duplicatedImages.map((img, idx) => (
                            <button
                                key={`${img._id}-${idx}`}
                                onClick={() => handleNavigation(img.slug, img._id)}
                                onMouseEnter={() => setHovered(img._id)}
                                onMouseLeave={() => setHovered(null)}
                                className="relative rounded-xl overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 shrink-0 w-[15rem] md:w-[18.9rem] cursor-pointer"
                                style={{
                                    aspectRatio: "4/3",
                                    transform:
                                        hovered === img._id || selected === img._id
                                            ? "scale(1.03)"
                                            : "scale(1)",
                                }}
                            >
                                <Image
                                    src={img.image ? getImageUrl(img.image) : assets.service.imageGallery}
                                    alt={img.name ? `Loan Settlement in ${img.name}` : "Loan Settlement"}
                                    width={337}
                                    height={302}
                                    className="object-cover h-full w-full rounded-xl object-top transition-transform duration-500"
                                    draggable={false}
                                    unoptimized={isLocalBackendImage(img.image)}
                                />

                                {/* Black overlay for better text visibility */}
                                <div className="absolute inset-0 bg-black/45 pointer-events-none" />

                                {/* Additional bottom gradient */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background:
                                            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 100%)",
                                    }}
                                />

                                {/* Centered text */}
                                <div className="absolute inset-0 flex items-center justify-center px-5 text-center pointer-events-none">
                                    <span className="text-white font-medium text-lg md:text-xl lg:text-2xl leading-tight drop-shadow-lg">
                                        Loan Settlement in {img.name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}