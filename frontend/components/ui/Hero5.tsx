"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "../common/Navbar";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button2 from "../utils/Button2";
import Button from "../utils/Button";
import PillTag from "../utils/PillTag";
import { getImageUrl } from "@/utils/getImageUrl";
import { isLocalBackendImage } from "@/utils/isLocalBackendImage";
import assets from "@/data/assets";

const IMAGES = [
    assets.serviceDetails.hero,
    assets.serviceDetails.hero,
    assets.serviceDetails.hero,
    assets.serviceDetails.hero,
    assets.serviceDetails.hero,
    assets.serviceDetails.hero,
];

interface Hero5Props {
    service?: {
        title: string;
        description: string;
        image?: string;
    } | null;
    className?: string;
}

export default function Hero5({ service, className }: Hero5Props) {
    const [hoveredMenu, setHoveredMenu] = useState<"services" | "locations" | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollDistance, setScrollDistance] = useState(0);

    useEffect(() => {
        const updateDistance = () => {
            if (containerRef.current) {
                const container = containerRef.current;
                const distance = container.scrollHeight - container.clientHeight;
                setScrollDistance(distance > 0 ? distance : 0);
            }
        };

        // Initial calculation
        updateDistance();

        // Re-calculate on window resize
        window.addEventListener("resize", updateDistance);
        return () => window.removeEventListener("resize", updateDistance);
    }, []);

    const handleScrollDown = () => {
        const nextSection = document.querySelector("section")?.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
            });
        }
    };

    const imagesToRender = service?.image
        ? Array(6).fill(getImageUrl(service.image))
        : IMAGES;

    return (
        <section className={`w-full p-2 ${className}`}>
            <div className="relative max-w-8xl mx-auto pb-10 xl:pb-0 rounded-xl w-full h-full bg-[#1B223C] overflow-hidden flex flex-col justify-center font-sans">
                {/* Background Glow */}
                <div className="absolute top-40 -left-[10%] w-[400px] h-[200px] bg-white/30 blur-[120px] rounded-full pointer-events-none" />

                {/* Navbar */}
                <Navbar onHoverMenuChange={setHoveredMenu} hoveredMenu={hoveredMenu} />

                <div className="absolute top-0 -left-[10%] w-[97vw] h-[70px] bg-black blur-[60px] rounded-full pointer-events-none" />

                {/* Main Content */}
                <div className="w-full px-6 md:px-11 z-10 relative flex-1 flex flex-col justify-center">
                    {/* White Fade Effect Under Navbar */}
                    <div className="grid grid-cols-1 order-1 xl:otrder-1 xl:grid-cols-12 gap-10 items-center h-full">

                        {/* Left Column: Title and Pills */}
                        <div className="lg:col-span-4 order-2 xl:order-1 flex flex-col items-center gap-10">
                            {/* Toggle Pills */}
                            <PillTag buttonText1="About" buttonText2="Service" />

                            <h1 className="geist-semibold text-white text-2xl md:text-2xl lg:text-3xl xl:text-[36px] leading-none tracking-normal text-center w-full max-w-xs">
                                {service ? service.title : "Service Title"}
                            </h1>
                        </div>

                        {/* Center Column: Image Stack (Infinite scroll) */}
                        <div
                            ref={containerRef}
                            className="lg:col-span-4 xl:order-1 relative w-full h-[70vh] lg:h-[800px] flex items-start justify-center overflow-hidden"
                        >
                            {/* Top & Bottom Fade Effects to blend images into the dark background */}
                            <div className="absolute top-0 left-0 right-0 h-45 bg-gradient-to-b from-[#1F2432] via-[#1F2432]/90 to-transparent pointer-events-none z-20" />

                            <motion.div
                                className="flex flex-col gap-6 py-8 items-center w-full"
                                animate={scrollDistance > 0 ? { y: [0, -scrollDistance] } : {}}
                                transition={{
                                    duration: 25,
                                    ease: "linear",
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            >
                                {imagesToRender.map((src, idx) => (
                                    <div
                                        key={idx}
                                        className="relative overflow-hidden shadow-2xl shrink-0"
                                        style={{
                                            width: "38.0088rem",
                                            height: "21.2142rem",
                                            maxWidth: "100%",
                                            borderRadius: "1.3rem"
                                        }}
                                    >
                                        <Image
                                            src={src}
                                            alt={`Gallery image ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            unoptimized={src.startsWith("/") ? true : isLocalBackendImage(src)}
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right Column: Paragraph and Buttons */}
                        <div className="lg:col-span-4 order-2 xl:order-1 flex flex-col items-center gap-8">
                            <p className="geist-regular text-[#C4C7CC] text-sm md:text-base lg:text-[16px] leading-[1.4] tracking-normal text-center">
                                {service ? service.description : "Get Reliable Support For Personal Loan Applications, Eligibility Checks, Document Verification, Repayment Guidance, And Loan Process Assistance. Legal Savvy Helps Individuals Choose The Right Loan Option Based On Their Financial Needs."}
                            </p>

                            <div className="flex items-center justify-center gap-4">
                                <Button2 onClick={handleScrollDown} />
                                <Button text="Get Consultation" href="/contact-us" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
