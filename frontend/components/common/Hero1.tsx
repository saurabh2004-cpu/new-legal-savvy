"use client";

import React, { useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import Button from "../utils/Button";
import Button2 from "../utils/Button2";

interface HeroProps {
  Heading: string;
  description?: string;
  img: string;
  className?: string;
}

export default function Hero1({ Heading, description, img, className = "h-[100vh] lg:h-screen min-h-[600px]" }: HeroProps) {
  const [hoveredMenu, setHoveredMenu] = useState<"services" | "locations" | null>(null);
  const pathname = usePathname();

  const isHeadingCenter = pathname === "/loan-settlement-by-bank" || pathname === "/loan-settlement-by-city" || pathname === "/loan-settlement-by-state" || pathname === "/resources";

  // Scroll Position Hooks
  const { scrollY } = useScroll();

  // 1. Scroll-linked Background Parallax Zoom (1.0x to 1.18x)
  const bgScale = useTransform(scrollY, [0, 600], [1, 1.18]);

  // 2. Scroll-linked Content Exit (Lift up and fade out)
  const contentY = useTransform(scrollY, [0, 450], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0]);

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

  return (
    <section className={`w-full p-2 ${className}`}>
      <div className={`relative flex flex-col justify-between w-full h-full rounded-xl ${hoveredMenu ? "overflow-visible" : "overflow-hidden"} shadow-2xl bg-black`}>
        {/* Background Image Container with hover transition */}
        <div
          className={`absolute inset-0 w-full h-full z-0 transition-all duration-500 ease-out overflow-hidden rounded-xl ${hoveredMenu
            ? "blur-[3px] opacity-70 scale-[1.01]"
            : "blur-0 opacity-100 scale-100"
            }`}
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/65 to-black/35 md:from-black/85 md:via-black/55 md:to-black/25"></div>
          {/* Framer Motion image for scroll parallax zoom */}
          <motion.img
            src={img}
            alt="Hero Background"
            className="w-full h-full object-cover origin-center"
            style={{ scale: bgScale }}
          />
        </div>

        {/* Navbar passing hover state and callback */}
        <Navbar hoveredMenu={hoveredMenu} onHoverMenuChange={setHoveredMenu} />

        {/* Scroll-Linked Motion Content Container */}
        <motion.div
          className={`${isHeadingCenter ? "absolute inset-0 md:relative md:inset-auto" : "relative"} z-20 flex-1 flex flex-col justify-end pt-6 md:pt-0 pb-8 md:pb-10 px-5 sm:px-8 md:px-11`}
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {/* Inner Wrapper for Navbar hover-blur/fade transition */}
          <div
            className={`w-full transition-all duration-500 ease-out ${hoveredMenu ? "opacity-50 blur-[1px]" : "opacity-100 blur-0"
              }`}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full gap-6 md:gap-10 lg:gap-28">
              {/* Left Content Column */}
              <div className={`${isHeadingCenter ? "w-full text-center" : "max-w-4xl w-full"} `}>
                <h1 className="text-[24px] sm:text-[36px] md:text-[54px] lg:text-[38px] xl:text-[67.02px] text-white leading-[105%] md:leading-[100%] tracking-normal mb-4 md:mb-8 geist-semibold max-w-xl">
                  {/* <h1 className="text-[24px] sm:text-[36px] md:text-[54px] lg:text-[38px] xl:text-[52.02px] text-white leading-[105%] md:leading-[100%] tracking-normal mb-4 md:mb-8 geist-semibold max-w-xl"> */}
                  {Heading}
                </h1>

                {pathname === '/' && <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6 mt-2 md:mt-0">
                  <img className="h-10 sm:h-12 md:h-[4.55rem] w-auto object-contain" src="/home/hero-customers-image.png" alt="Customers" />
                  <div className="flex flex-col text-white gap-1">
                    <span className="text-[11px] sm:text-xs md:text-base font-normal geist-mono-regular uppercase tracking-normal leading-tight md:leading-none opacity-90">
                      Helping Borrowers <br /> Across India
                    </span>
                    <div className="flex items-center gap-1 text-white">
                      {/* Stars */}
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>}
              </div>

              {/* Right Content Column */}
              {pathname === '/' && <div className="max-w-xl lg:max-w-3xl flex flex-col items-start lg:items-end text-left lg:text-right w-full mt-2 lg:mt-0">
                <p className="text-gray-300 text-xs sm:text-base md:text-lg lg:text-xl tracking-normal leading-relaxed lg:leading-none mb-6 md:mb-8 text-left lg:text-right">
                  {description}
                </p>

                <div className="flex items-center gap-3 sm:gap-4 w-full justify-start lg:justify-end">
                  <Button2 onClick={handleScrollDown} />
                  <Button text="Get a Consultation" />
                </div>
              </div>}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
