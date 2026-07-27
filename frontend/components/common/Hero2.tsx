"use client";

import React, { useState, useEffect } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/common/Navbar";

interface Hero2Props {
  Heading: string;
  img?: string;
  className?: string;
}

const CONSULTANTS = [
  { src: "/home/human-1.avif", alt: "Expert Consultant 1" },
  { src: "/home/human-2.avif", alt: "Expert Consultant 2" },
  { src: "/home/human-3.avif", alt: "Expert Consultant 3" },
  { src: "/about/about-hero-img.png", alt: "Expert Consultant 4" },
];

export default function Hero2({ Heading, className = "" }: Hero2Props) {
  const [hoveredMenu, setHoveredMenu] = useState<"services" | "locations" | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-switch background image every 4 seconds (resets on manual selection)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CONSULTANTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  // Scroll Position Hooks
  const { scrollY } = useScroll();

  // Scroll-linked Background Parallax Zoom (1.0x to 1.18x)
  const bgScale = useTransform(scrollY, [0, 600], [1, 1.18]);

  // Scroll-linked Content Exit (Lift up and fade out)
  const contentY = useTransform(scrollY, [0, 450], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section className={`w-full p-2 ${className}`}>
        <div className={`relative flex flex-col justify-between w-full h-full rounded-2xl ${hoveredMenu ? "overflow-visible" : "overflow-hidden"} shadow-2xl bg-black`}>

          {/* Background Image Container */}
          <div
            className={`absolute inset-0 w-full h-full z-0 transition-all duration-500 ease-out overflow-hidden rounded-2xl ${hoveredMenu ? "blur-sm opacity-70 scale-[1.01]" : ""
              }`}
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />

            {/* Framer Motion image with smooth zoom in/out transition */}
            <motion.div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ scale: bgScale }}
            >
              <AnimatePresence>
                <motion.img
                  key={currentImageIndex}
                  src={CONSULTANTS[currentImageIndex].src}
                  alt={CONSULTANTS[currentImageIndex].alt}
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.15 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Navbar */}
          <Navbar hoveredMenu={hoveredMenu} onHoverMenuChange={setHoveredMenu} />

          {/* Scroll-Linked Motion Content Container */}
          <motion.div
            className="relative z-20 flex-1 flex flex-col justify-end pt-10 md:pt-0 pb-12 md:pb-10 px-6 md:px-11"
            style={{ y: contentY, opacity: contentOpacity }}
          >
            <div className={`w-full transition-all duration-500 ease-out my-auto ${hoveredMenu ? "opacity-50 blur-sm" : ""}`}>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full gap-10 lg:gap-28">

                {/* Heading */}
                <div className="max-w-4xl w-full">
                  <h1 className="geist-semibold text-[26px] sm:text-[36px] md:text-[54px] lg:text-[38px] xl:text-[67px] text-white leading-none tracking-normal mb-6 md:mb-8">
                    {Heading}
                  </h1>
                </div>

                {/* Consultant Thumbnails */}
                <div className="flex justify-start lg:justify-end mt-4 lg:mt-0">
                  <div className="flex flex-row lg:flex-col gap-2 p-2 bg-white/20 backdrop-blur-md rounded-full items-center">
                    {CONSULTANTS.map((avatar, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-14 h-14 rounded-full border-2 overflow-hidden cursor-pointer transition-all duration-300 shadow-md ${i === currentImageIndex
                          ? "border-white scale-110 shadow-white/30 shadow-lg ring-2 ring-white/50"
                          : "border-white/20 opacity-70 hover:opacity-100 hover:scale-105 hover:border-white/60"
                          }`}
                      >
                        <img
                          src={avatar.src}
                          alt={avatar.alt}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
    </section>
  );
}
