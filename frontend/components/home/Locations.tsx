"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CTA_ASSETS } from "./assets";

const LocationArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    className="w-6 h-6 fill-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
  >
    <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
  </svg>
);

export default function Locations() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Position Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Translates vertical background position relative to scroll progress
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const offices = [
    {
      city: "Hyderabad",
      address: ["405 Lexington Avenue, Suite 2600"],
      hours: ["Mon - Fri: 7:30 AM - 6:00 PM  Sat - Sun: Closed"],
      link: "https://caliora-dentist-template.webflow.io/location/new-york-usa",
    },
    {
      city: "Chh. Sambhajinagar",
      address: ["405 Lexington Avenue, Suite 2600"],
      hours: ["Mon - Fri: 7:30 AM - 6:00 PM  Sat - Sun: Closed"],
      link: "https://caliora-dentist-template.webflow.io/location/miami-usa",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative -mt-20 md:-mt-58 xl:-mt-38 md:m-4 rounded-xl overflow-hidden pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 lg:pb-16 flex flex-col justify-end items-center min-h-[42rem] z-20"
      id="locations-section"
      whileHover="hover"
    >
      {/* 1. Parallax Background Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <div className="absolute inset-0  z-10" />
        <motion.img
          src={CTA_ASSETS["locations-bg"]}
          alt="Premium locations office environment background"
          className="absolute inset-0 w-full h-[120%] object-cover origin-center scale-110"
          style={{ y }}
          variants={{
            hover: {
              scale: 0.95,
            },
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      {/* 2. Content Grid Container */}
      <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full"
        >
          {offices.map((office, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative"
            >
              <motion.a
                href={office.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 sm:p-8 rounded-[2rem] border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer flex flex-col justify-between min-h-[12rem] sm:min-h-[14rem] backdrop-blur-md"
                style={{
                  background: "linear-gradient(180deg, rgba(240, 236, 231, 0.7) 0%, rgba(205, 194, 187, 0.7) 63.46%, rgba(230, 220, 214, 0.7) 100%)"
                }}
                whileHover={{
                  background: "linear-gradient(180deg, rgba(240, 236, 231, 0.85) 0%, rgba(205, 194, 187, 0.85) 63.46%, rgba(230, 220, 214, 0.85) 100%)"
                }}
              >
                {/* Location Header with City Name and Diagonal Arrow */}
                <div>
                  <div className="flex items-center justify-between mb-6 relative">
                    <h2 className="font-sans font-medium text-[26px] leading-[100%] text-[#1D2331] tracking-normal relative">
                      {office.city}
                    </h2>
                    <div className="text-[#1D2331] transition-colors duration-300">
                      <LocationArrow />
                    </div>
                  </div>

                </div>

                {/* Opening Hours */}
                <div className="mt-auto pt-2">
                  {/* Location Address */}
                  <div className="mb-6">
                    {office.address.map((line, idx) => (
                      <p
                        key={idx}
                        className="font-mono font-medium text-[18px] text-black leading-[100%] tracking-normal"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  {office.hours.map((line, idx) => (
                    <p
                      key={idx}
                      className="font-mono font-normal text-[16px] text-[#000000]/77 leading-[100%] tracking-normal"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
