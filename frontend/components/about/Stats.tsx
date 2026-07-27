"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const STATS_DATA = [
  {
    label: "YEARS",
    value: "10+",
    description: "Legal excellence.",
    image: "/about/stats-1.png",
    imageheading: "Years In Legal Savvy",
    imageDescription:
      "Over 10 years of successfully helping clients navigate complex legal matters.",
  },
  {
    label: "SATISFACTION",
    value: "97%",
    description: "Trusted by clients.",
    image: "/about/stats-1.png",
    imageheading: "Patient Satisfaction",
    imageDescription:
      "Measured through post-treatment surveys, our satisfaction rate reflects our commitment to patient-centred care.",
  },
  {
    label: "SATISFACTION",
    value: "97%",
    description: "Trusted by clients.",
    image: "/about/stats-1.png",
    imageheading: "Patient Satisfaction",
    imageDescription:
      "Measured through post-treatment surveys, our satisfaction rate reflects our commitment to patient-centred care.",
  },
];

const CARD_VARIANTS = {
  image: {
    rest: { scale: 1 },
    hover: { scale: 1.06 },
  },
  overlaySm: {
    rest: { height: "100%", opacity: 1 },
    hover: { height: "100%", opacity: 1 },
  },
  overlay: {
    rest: { height: "50%", opacity: 0.9 },
    hover: { height: "100%", opacity: 1 },
  },
  title: {
    rest: { y: 0 },
    hover: { y: -8 },
  },
  descriptionSm: {
    rest: { opacity: 1, y: 0, height: "auto", marginTop: "1.25rem" },
    hover: { opacity: 1, y: 0, height: "auto", marginTop: "1.25rem" },
  },
  description: {
    rest: { opacity: 0, y: 40, height: 0, marginTop: 0 },
    hover: { opacity: 1, y: 0, height: "auto", marginTop: "1.25rem" },
  },
  line: {
    rest: { opacity: 0.45, marginTop: "2rem" },
    hover: { opacity: 1, marginTop: "2.5rem" },
  },
};

export default function StatsSection() {
  const [isSmUp, setIsSmUp] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");

    const handleChange = () => setIsSmUp(media.matches);

    handleChange();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <section className="w-full py-1 px-2">
      <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2 pt-6">
        {STATS_DATA.map((stat, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center text-center"
          >
            <div className="flex w-full flex-col items-center px-6 py-8 text-center sm:py-6 overflow-hidden">
              {/* Label */}
              <span
                className="geist-regular text-base lg:text-2xl xl:text-base text-[#6b6560] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3"
              >
                {stat.label}
              </span>

              {/* Animated Line */}
              <div className="relative h-px w-full my-2 overflow-hidden bg-[#B8B2AC]">
                <div className="absolute inset-0 origin-left scale-x-0 bg-[#1B223C] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </div>

              {/* Bottom Content */}
              <div
                className="flex flex-col items-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-3"
              >
                <span className="text-[2.63rem] lg:text-[3.4rem] xl:text-[2.63rem] geist-regular text-[#1a1714]">
                  {stat.value}
                </span>

                <span className="mt-1 geist-regular text-xl lg:text-2xl xl:text-xl text-[#1B223C]">
                  {stat.description}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="max-w-8xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-2 pt-6">
        {STATS_DATA.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center space-y-6 text-center"
          >
            {/* Image Card */}
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group relative h-[20rem] md:h-[24rem] xl:h-[45.375rem] w-full overflow-hidden rounded-lg cursor-pointer"
            >
              {/* Image */}
              <motion.div
                variants={CARD_VARIANTS.image}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={stat.image}
                  alt={stat.imageheading}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Main Gradient Overlay */}
              <motion.div
                variants={isSmUp ? CARD_VARIANTS.overlay : CARD_VARIANTS.overlaySm}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-b from-[#011624]/0 via-[#011624]/65 to-[#011624]/80"
              />

              {/* Content */}
              <div className="absolute inset-0 z-[3] flex flex-col justify-end items-start p-8 text-white">
                {/* Title */}
                <motion.h3
                  variants={CARD_VARIANTS.title}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl md:text-4xl leading-none tracking-normal"
                >
                  {stat.imageheading}
                </motion.h3>

                {/* Description */}
                <motion.p
                  variants={isSmUp ? CARD_VARIANTS.description : CARD_VARIANTS.descriptionSm}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden geist-regular text-base leading-relaxed text-white/75 text-left"
                >
                  {stat.imageDescription}
                </motion.p>

                {/* Bottom Line */}
                <motion.div
                  variants={CARD_VARIANTS.line}
                  transition={{ duration: 0.4 }}
                  className="h-px w-full bg-white/40"
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}