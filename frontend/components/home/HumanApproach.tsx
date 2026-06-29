'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

const stats = [
  {
    id: 1,
    title: "YEARS",
    value: "18+",
    description: "Legal excellence.",
    image: "/home/human-approach-1.png", // Placeholder image path
    icon: (
      <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1.07 3.036L10.395 12 4.14 9.176a8.03 8.03 0 016.79-4.14zM3.46 10.985l6.512 2.946-2.946 6.512a8.03 8.03 0 01-3.566-9.458zm8.685 9.54l.535-6.964 6.255 2.824a8.03 8.03 0 01-6.79 4.14zm8.395-5.51l-6.512-2.946 2.946-6.512a8.03 8.03 0 013.566 9.458z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "SATISFACTION",
    value: "98%",
    description: "Client satisfaction.",
    image: "/home/human-approach-1.png",
    icon: (
      <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1.07 3.036L10.395 12 4.14 9.176a8.03 8.03 0 016.79-4.14zM3.46 10.985l6.512 2.946-2.946 6.512a8.03 8.03 0 01-3.566-9.458zm8.685 9.54l.535-6.964 6.255 2.824a8.03 8.03 0 01-6.79 4.14zm8.395-5.51l-6.512-2.946 2.946-6.512a8.03 8.03 0 013.566 9.458z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "SERVICES",
    value: "98%",
    description: "Case resolutions.",
    image: "/home/human-approach-1.png",
    icon: (
      <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1.07 3.036L10.395 12 4.14 9.176a8.03 8.03 0 016.79-4.14zM3.46 10.985l6.512 2.946-2.946 6.512a8.03 8.03 0 01-3.566-9.458zm8.685 9.54l.535-6.964 6.255 2.824a8.03 8.03 0 01-6.79 4.14zm8.395-5.51l-6.512-2.946 2.946-6.512a8.03 8.03 0 013.566 9.458z" />
      </svg>
    )
  }
];

export default function HumanApproach() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll progress for premium feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <section className=" pt-6 lg:py-4 w-full px-4  relative">
      <div className=" bg-[#E3DDD9] mx-auto pt-6 px-4 md:px-8 lg:px-16 rounded-xl">

        {/* Section Header */}
        <div className="flex flex-col items-center mb-6 lg:mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans font-bold text-2xl md:text-3xl lg:text-[36px] md:text-[52px] text-[#1D2331] leading-none tracking-normal inline-block relative mb-4"
          >
            <span className="relative inline-block">
              Human Approach
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="absolute left-0 -bottom-3 w-full flex flex-col space-y-[1px] origin-left"
              >
                <div className="w-full h-[2.5px] bg-[#ED3D3D]"></div>
                <div className="w-full h-[2.5px] bg-[#ED3D3D]"></div>
              </motion.div>
            </span>
          </motion.h2>
        </div>

        {/* 2-Column Sticky Scroll Layout */}
        <div
          ref={containerRef}
          className="relative flex flex-col xl:flex-row gap-12 lg:gap-24 items-start"
        >
          {/* Left Column - Scrolling Images & Interleaved Mobile Cards */}
          <div className="w-full lg:w-1/2 flex flex-col  lg:pb-[8vh]">
            {stats.map((stat, i) => (
              <div key={`group-${stat.id}`} className="flex flex-col w-full">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`w-full lg:w-[39.1875rem] h-[300px] sm:h-[400px] lg:h-[35.5625rem] rounded-[32px] md:rounded-[40px] overflow-hidden bg-gray-200 relative group shadow-lg flex-shrink-0 mb-6 lg:mb-0 ${i !== stats.length - 1 ? 'lg:mb-[5vh]' : ''}`}
                >
                  {/* Fallback image structure. Replace src with real images */}
                  <div className="absolute inset-0 bg-[#363D4F]/10 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
                  <Image
                    src={stat.image}
                    alt={stat.title}
                    fill
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </motion.div>

                {/* Interleaved Card (Only Visible on Mobile & Tablet) */}
                <motion.div
                  className="lg:hidden w-full mb-12 flex justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <Card stat={stat} />
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right Column - Sticky Cards (Desktop Only) */}
          <div className="hidden lg:flex w-full lg:w-1/2 sticky top-[15vh] h-auto flex-col justify-start items-start gap-6 relative pb-12">
            {stats.map((stat, i) => {
              // Custom staggered logic: Each card starts appearing when its corresponding left-side card has scrolled 10%
              const startFadeIn = 0.10 + (i * 0.33);
              const fullOpaqueStart = 0.35 + (i * 0.33);

              const opacity = useTransform(
                smoothProgress,
                [startFadeIn, fullOpaqueStart],
                [0, 1]
              );

              return (
                <motion.div
                  key={`card-desktop-${stat.id}`}
                  style={{ opacity }}
                  className="w-full flex justify-start pointer-events-none"
                >
                  <Card stat={stat} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Inner Card Component
function Card({ stat }: { stat: any }) {
  return (
    <div className="w-full 2xlmax-w-[550px] 2xl:w-[500px] h-[150px] sm:h-[180px] bg-[#363D4F] rounded-[24px] p-3 flex justify-between shadow-lg pointer-events-auto border border-white/5">

      {/* Left Content Area */}
      <div className="flex flex-col justify-between pt-2 pb-2 sm:pt-3 sm:pb-3 pl-2 sm:pl-4 flex-1">
        <div className="text-white/80 mt-1 scale-90 sm:scale-100 origin-left">
          {stat.icon}
        </div>
        <p className="font-sans font-medium text-[15px] sm:text-[18px] lg:text-[20px] leading-snug sm:leading-none text-white/90 mb-1">
          {stat.description}
        </p>
      </div>

      {/* Right Box Area */}
      <div className="bg-[#F0ECE7] rounded-[20px] w-[42%] sm:w-[45%] lg:w-[210px] h-full flex flex-col justify-end items-end p-3  relative shadow-inner">
        <div className="flex flex-col items-end">
          <h3 className="font-sans font-medium text-[#1D2331]/60 text-[10px] sm:text-[12px] uppercase tracking-wider w-[50px] sm:w-[66px] h-[20px] sm:h-[26px] flex items-center justify-end mb-1">
            {stat.title}
          </h3>
          <span className="font-mono font-semibold text-[36px] sm:text-[46px] lg:text-[55.56px] text-[#ED3D3D] leading-none tracking-tight">
            {stat.value}
          </span>
        </div>
      </div>
    </div>
  );
}
