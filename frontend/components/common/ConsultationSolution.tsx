"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useInView } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ConsultationSolution({ image, className }: { image: string, className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isWider, setIsWider] = useState(false);
  const isInView = useInView(sectionRef, { once: false });
  const pathName = usePathname()

  const isServicePage = pathName === "/service"

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.66) {
      setIsWider(true);
    } else {
      setIsWider(false);
    }
  });

  const listItems = [
    "RBI-compliant settlement process",
    "Complete protection from harassment",
    "100% legal, transparent, & secure",
  ];

  return (
    <div className="w-full py-1 px-2 bg-[#D9D9D9]">
      <section ref={sectionRef} className={`rounded-xl relative z-10 overflow-hidden ${className}`}>
        <div className="px-4 sm:px-6 lg:px-8">

          {/* Main Radial CTA Box */}
          <div className="w-full flex flex-col justify-center items-center relative">

            {/* 3-Column Content Grid */}
            <div className="w-full px-2 lg:px-6 pt-3 pb-24 lg:py-3 md:pb-32 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center relative z-10">

              {/* Left Column: Heading & Large Link Block */}
              <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left lg:max-w-sm xl:max-w-md mx-auto lg:mx-0">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans font-medium text-[24px] md:text-[28px] lg:text-[22px] xl:text-[36px] leading-[100%] tracking-normal text-[#1D2331]"
                >
                  Begin your path to debt-free living today
                </motion.h2>

                <motion.a
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  href="#consultation"
                  className="large-link-block w-inline-block group flex items-center justify-between gap-4 py-3 border-b border-[#1D2331] w-full lg:max-w-sm xl:max-w-md cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  <span style={{ fontFamily: "font-1, var(--font-geist-sans), sans-serif" }} className="text-[20px] font-normal leading-[100%] tracking-normal text-[#1D2331] transition-transform duration-300 group-hover:translate-x-1">
                    Book Free Call
                  </span>

                  {/* Arrow Icon */}
                  <motion.div
                    className="w-7 h-7 flex items-center justify-center rounded-full  transition-transform duration-300 group-hover:translate-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      viewBox="0 -960 960 960"
                      width="18"
                      fill="#000000"
                    >
                      <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                    </svg>
                  </motion.div>
                </motion.a>
              </div>

              {/* Middle Column: Stacked Circular Images */}
              <div className="flex justify-center items-center relative h-[170px] lg:h-[250px] lg:h-[350px]">

                {/* Image 3 (Foreground Left) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -40 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.05, zIndex: 12, transition: { duration: 0.3 } }}
                  className="absolute w-[8rem] h-[8rem]  md:w-[11.5rem] md:h-[11.5rem] lg:w-[8rem] lg:h-[8rem] xl:w-[11.5rem] xl:h-[11.5rem] z-10 rounded-full border-4 border-[#E3DDD9] bg-cover bg-center shadow-lg cursor-pointer -translate-x-[75px] sm:-translate-x-[110px]"
                  style={{
                    backgroundImage: `url('/home/consultation-solition-person-1.png')`,
                  }}
                />

                {/* Image 2 (Foreground Right) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 40 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.05, zIndex: 12, transition: { duration: 0.3 } }}
                  className="absolute w-[8rem] h-[8rem] md:w-[11.5rem] md:h-[11.5rem] lg:w-[8rem] lg:h-[8rem] xl:w-[11.5rem] xl:h-[11.5rem] z-10 rounded-full border-4 border-[#E3DDD9] bg-cover bg-center shadow-lg cursor-pointer translate-x-[75px] sm:translate-x-[110px]"
                  style={{
                    backgroundImage: `url('/home/consultation-solition-person-2.png')`,
                  }}
                />

                {/* Image 1 (Centered Background) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.05, zIndex: 12, transition: { duration: 0.3 } }}
                  className="relative w-[8rem] h-[8rem] md:w-[11.5rem] md:h-[11.5rem] lg:w-[8rem] lg:h-[8rem] xl:w-[11.5rem] xl:h-[11.5rem] z-0 rounded-full border-4 border-[#E3DDD9] bg-cover bg-center shadow-md cursor-pointer"
                  style={{
                    backgroundImage: `url('/home/consultation-solition-person-3.png')`,
                  }}
                />
              </div>

              {/* Right Column: Key Benefits / Bullet list */}
              <div className="flex flex-col gap-4 items-start max-w-md mx-auto lg:mx-0 lg:ml-auto w-full">
                <div className="w-full flex flex-col ">
                  {listItems.map((text, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      className="flex items-center gap-4 p-4 lg:p-2 xl:p-4 rounded-xl transition-all duration-300 w-full"
                    >
                      {/* SVG Checkmark Icon */}
                      <div className="w-6 h-6 rounded-full bg-[#E8420B] flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-3.5 h-3.5"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="font-sans text-[20px] lg:text-[14px] xl:text-[20px] font-medium leading-[100%] tracking-normal text-[#1D2331]">
                        {text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Curved Arched Text (Overlapping Text Marquee on absolute bottom) */}
            {isInView && (
              <motion.div
                animate={{ scale: isWider ? 1.6 : 1.0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`w-[70vw] xl:w-[70rem] max-w-none ${isServicePage ? 'h-[3.4rem] sm:h-[14rem] md:h-[7rem] lg:h-[9rem] xl:h-[14rem]' : 'h-[4rem] sm:h-[15rem]'} -mt-16 sm:-mt-12 pointer-events-none select-none z-0 relative flex justify-center overflow-visible `}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 2.4 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1.15 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative flex justify-center overflow-visible"
                >
                  <Image
                    src={image}
                    alt="Radial Schedule your visit Text"
                    className="w-full h-full object-contain object-top opacity-85"
                    fill
                  />
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}