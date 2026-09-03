"use client";

import React, { useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Navbar from "../common/Navbar";

interface HeroProps {
  Heading: string;
  description?: string;
  img: string;
  className?: string;
}

export default function Hero11({
  Heading,
  description,
  img,
  className = "h-[100vh] lg:h-screen min-h-[600px]",
}: HeroProps) {
  const [hoveredMenu, setHoveredMenu] = useState<
    "services" | "locations" | null
  >(null);

  // Scroll Position Hooks
  const { scrollY } = useScroll();

  // Scroll-linked Background Parallax Zoom
  const bgScale = useTransform(scrollY, [0, 600], [1, 1.18]);

  // Scroll-linked Content Exit
  const contentY = useTransform(scrollY, [0, 450], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section className={`w-full p-2 ${className}`}>
      <div
        className={`relative flex flex-col justify-between w-full h-full rounded-xl ${hoveredMenu ? "overflow-visible" : "overflow-hidden"
          } shadow-2xl bg-black`}
      >
        {/* Background Image Container with hover transition */}
        <div
          className={`absolute inset-0 w-full h-full z-0 transition-all duration-500 ease-out overflow-hidden rounded-xl ${hoveredMenu ? "blur-[3px] opacity-70 scale-[1.01]" : "blur-0 opacity-100 scale-100"
            }`}
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/25"></div>
          {/* Framer Motion image for scroll parallax zoom */}
          <motion.img
            src={img}
            alt="Contact Hero Background"
            className="w-full h-full object-cover origin-center"
            style={{ scale: bgScale }}
          />
        </div>

        {/* Navbar passing hover state and callback */}
        <Navbar hoveredMenu={hoveredMenu} onHoverMenuChange={setHoveredMenu} />

        {/* Scroll-Linked Motion Content Container */}
        <motion.div
          className="relative z-20 flex-1 flex flex-col justify-end pt-10 md:pt-0 pb-12 md:pb-10 px-6 md:px-11"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {/* Inner Wrapper for Navbar hover-blur/fade transition */}
          <div
            className={`w-full transition-all duration-500 ease-out ${hoveredMenu ? "opacity-50 blur-[1px]" : "opacity-100 blur-0"
              }`}
          >
            <div className="flex justify-center items-center lg:items-end w-full gap-10 lg:gap-28">
              <div className="w-fit mx-auto text-center">
                <h1 className="text-[24px] sm:text-[36px] md:text-[54px] lg:text-[38px] xl:text-[67.02px] text-white leading-[105%] md:leading-[100%] tracking-normal mb-4 md:mb-8 geist-semibold max-w-xl">
                  {Heading}
                </h1>
                {description && (
                  <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-normal tracking-normal leading-relaxed opacity-90 max-w-3xl mx-auto">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}