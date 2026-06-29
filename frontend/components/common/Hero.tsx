"use client";

import React, { useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Navbar from "../common/Navbar";
import { usePathname } from "next/navigation";

interface HeroProps {
  Heading: string;
  img: string;
  className?: string;
  description?: string;
}

export default function Hero({ Heading, img, className, description }: HeroProps) {
  const [hoveredMenu, setHoveredMenu] = useState<"services" | "locations" | null>(null);
  const pathname = usePathname();

  const isServicePage = pathname === "/service";
  const isHeadingCenter = pathname === "/contact-us" || pathname === "/loan-settlement-by-bank" || pathname === "/loan-settlement-by-city" || pathname === "/loan-settlement-by-state" || pathname === "/resources" || isServicePage;


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
    <div className={`py-3 md:py-2 px-2 md:px-2  ${isHeadingCenter ? "h-full" : "xl:min-h-screen"} ${isServicePage ? "xl:min-h-screen" : ""}`}>
      <section className={`relative flex flex-col md:block w-full h-auto  rounded-[1rem] md:rounded-[1.rem] ${hoveredMenu ? "overflow-visible" : "overflow-hidden"} shadow-2xl  md:bg-black ${className}`}>

        {/* Background Image Container with hover transition */}
        <div
          className={`relative md:absolute md:inset-0 w-full h-[280px] sm:h-[350px] md:h-full z-0 transition-all duration-500 ease-out overflow-hidden rounded-b-[1.2rem] md:rounded-b-none ${hoveredMenu
            ? "blur-[3px] opacity-70 scale-[1.01]"
            : "blur-0 opacity-100 scale-100"
            }`}
        >
          <div className={`absolute inset-0 z-10 ${isServicePage ? "bg-black/60 md:bg-black/50" : "bg-gradient-to-r from-black/85 via-black/55 to-black/25"}`}></div>
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
          className={`${isHeadingCenter ? "absolute inset-0 md:relative md:inset-auto" : "relative"} z-20 md:h-full flex flex-col ${isServicePage ? "justify-center items-center text-center" : "justify-end"} pt-10 md:pt-0 pb-12 md:pb-10 px-6 md:px-11`}
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {/* Inner Wrapper for Navbar hover-blur/fade transition */}
          <div
            className={`w-full transition-all duration-500 ease-out ${hoveredMenu ? "opacity-50 blur-[1px]" : "opacity-100 blur-0"
              }`}
          >
            {isServicePage ? (
              <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto pt-30md:pt-24">
                <h1 className="text-[26px] md:text-[54px] lg:text-[67.02px] font-black text-white leading-[110%] tracking-normal mb-6 md:mb-8 font-sans drop-shadow-lg uppercase">
                  {Heading}
                </h1>
                {description && (
                  <p className="text-white text-xs sm:text-lg md:text-xl lg:text-2xl font-normal tracking-normal leading-relaxed opacity-90 mb-8 max-w-3xl font-sans">
                    {description}
                  </p>
                )}
                <button
                  onClick={handleScrollDown}
                  className="w-6 h-6 md:h-12 md:w-12  bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg active:scale-95 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full gap-10 lg:gap-28">

                {/* Left Content Column */}
                <div className={`${isHeadingCenter ? "w-full text-center" : "max-w-4xl w-full"} `}>
                  <h1 className="text-[26px] sm:text-[36px] md:text-[54px] lg:text-[38px] xl:text-[67.02px] font-black text-white leading-[100%] tracking-normal mb-6 md:mb-8 font-sans drop-shadow-lg uppercase">
                    {Heading}
                  </h1>

                  {pathname === '/' && < div className="flex flex-row items-center gap-4 md:gap-6 mt-2 md:mt-0">
                    <img className="h-12 md:h-[4.55rem] w-auto object-contain" src="/home/hero-customers-image.png" alt="Customers" />
                    <div className="flex flex-col text-white gap-1">
                      <span className="text-xs sm:text-sm md:text-base font-normal font-mono uppercase tracking-normal leading-tight md:leading-none opacity-90">
                        Trusted by thousands of<br />satisfied customers
                      </span>
                      <div className="flex items-center gap-1 text-white">
                        {/* Stars */}
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>}
                </div>

                {/* Right Content Column */}
                {pathname === '/' && <div className="max-w-xl lg:max-w-[35.1875rem] flex flex-col items-start lg:items-end text-left lg:text-right w-full mt-4 lg:mt-0">
                  <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-normal leading-relaxed lg:leading-none opacity-95 mb-8 text-left lg:text-right font-sans uppercase">
                    SIMPLIFYING LEGAL PAPERWORK AND LOAN MANAGEMENT WITH TRUSTED ADVICE, TRANSPARENT PROCESSES, AND PROFESSIONAL SUPPORT.
                  </p>

                  <div className="flex items-center gap-4 w-full justify-start lg:justify-end">
                    <button
                      onClick={handleScrollDown}
                      className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg active:scale-95 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
                    </button>
                    <button className="bg-[#E64A19] hover:bg-red-600 text-white px-6 md:px-7 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-red-500/20 active:scale-95">
                      <span className="text-base md:text-lg font-medium font-sans leading-none tracking-normal">Get Consultation</span>
                      <div className="bg-black p-1 rounded-full ml-1 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                      </div>
                    </button>
                  </div>
                </div>}

                {pathname === '/about' && (
                  <div className="flex justify-start lg:justify-end  mt-4 lg:mt-0">
                    <div className="flex flex-row lg:flex-col gap-1 p-2 bg-[#D9D9D9]/20 backdrop-blur-md rounded-[2.5rem] items-center">
                      {[
                        { src: "/home/human-1.avif", alt: "Expert Consultant 1" },
                        { src: "/home/human-2.avif", alt: "Expert Consultant 2" },
                        { src: "/home/human-3.avif", alt: "Expert Consultant 3" },
                        { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop", alt: "Expert Consultant 4" },
                      ].map((img, i) => (
                        <div
                          key={i}
                          className="w-[3.6rem] h-[3.6rem]  rounded-full border-2 border-white/20 overflow-hidden cursor-pointer hover:scale-105 hover:border-white/60 transition-all duration-300 shadow-md"
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}


              </div>
            )}
          </div>
        </motion.div>
      </section>
    </div >
  );
}
