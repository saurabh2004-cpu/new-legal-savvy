"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface StatItem {
  label: string;
  value: string;
  description: string;
}

interface ProvenResultsBannerProps {
  title?: string;
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  {
    label: "YEARS",
    value: "10+",
    description: "Legal excellence.",
  },
  {
    label: "SATISFICATION",
    value: "97%",
    description: "Trusted by clients",
  },
  {
    label: "SATISFICATION",
    value: "97%",
    description: "Trusted by clients",
  },
];

export default function ProvenResultsBanner({
  title = "Proven results in\nmodern dentistry",
  stats = defaultStats,
}: ProvenResultsBannerProps) {
  // Container entrance animation
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  } as const;

  // Element entrance animations
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as const;

  // Hover transitions for individual stat columns
  const lineVariants = {
    rest: { backgroundColor: "rgba(255, 255, 255, 0.2)", scaleX: 1 },
    hover: { backgroundColor: "#f5f5f5ff", scaleX: 1.02 },
  };

  const textVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.03 },
  };

  return (
    <section className="w-full max-w-[97vw] mx-auto py-4 sm:pt-6 md:pt-8   font-sans overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="group/banner relative w-full rounded-[1.875rem]  text-white min-h-[480px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[46.6875rem] flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 border border-white/5  overflow-hidden cursor-default select-none"
      >
        {/* Background Image Asset */}
        <div className="absolute inset-0 z-0 lg:w-[104.5rem] lg:h-[58.8125rem]">
          <Image
            src="/about/about-hero-img.png"
            alt="Proven results"
            fill
            sizes="100vw"
            className="object-cover object-right-top md:object-right transition-transform duration-[1.2s] ease-out group-hover/banner:scale-[1.03]"
            priority
          />
        </div>


        {/* Heading Section */}
        <div className="relative z-10 flex-1 flex items-center w-full">
          <motion.h2
            variants={itemVariants}
            className="font-[Geist] text-lg md:text-[2rem] lg:text-[4.18875rem] font-black leading-none tracking-normal text-white whitespace-pre-line"
          >
            {title}
          </motion.h2>
        </div>

        {/* Stats Column Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 w-full pt-10 md:pt-14 mt-auto mb-6 lg:mb-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="flex flex-col items-center text-center w-full group/stat cursor-pointer"
            >
              {/* Stat Category Label */}
              <span className="font-[Geist] text-[0.8125rem] sm:text-[0.875rem] lg:text-[1rem] font-normal leading-none tracking-normal text-center text-white/90 uppercase">
                {stat.label}
              </span>

              {/* Glowing Interactive Divider Line */}
              <motion.div
                variants={lineVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-[0.1px] w-full my-4 sm:my-5 lg:my-6"
              />

              {/* Giant Metric Value */}
              <motion.span
                variants={textVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="font-[Geist] text-[2.5rem] sm:text-[2.6rem] lg:text-[2.629375rem] font-normal leading-none tracking-normal text-center text-white select-none"
              >
                {stat.value}
              </motion.span>

              {/* Metric Description */}
              <span className="font-[Geist] text-[1rem] sm:text-[1.125rem] lg:text-[1.25rem] font-light leading-none tracking-normal text-center text-white/90 mt-2 sm:mt-3">
                {stat.description}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
