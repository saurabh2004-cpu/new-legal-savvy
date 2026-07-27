"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CTA_ASSETS } from "../home/assets";

export interface LocationItem {
  id?: number | string;
  city: string;
  address: string | string[];
  suite?: string;
  hours?: string | string[];
  weekdayHours?: string;
  weekendHours?: string;
  image?: string;
  link?: string;
}

export interface LocationsProps {
  variant?: "parallax" | "cards";
  className?: string;
  locationsData?: LocationItem[];
}

const DEFAULT_OFFICES: LocationItem[] = [
  {
    id: 1,
    city: "Hyderabad",
    address: ["405 Lexington Avenue, Suite 2600"],
    suite: "Suite 2600",
    hours: ["Mon - Fri: 7:30 AM - 6:00 PM  Sat - Sun: Closed"],
    weekdayHours: "Mon – Fri: 7:30 AM – 6:00 PM",
    weekendHours: "Sat – Sun: Closed",
    image: "/about/location-1.png",
    link: "https://caliora-dentist-template.webflow.io/location/new-york-usa",
  },
  {
    id: 2,
    city: "Chh. Sambhajinagar",
    address: ["405 Lexington Avenue, Suite 2600"],
    suite: "Suite 2600",
    hours: ["Mon - Fri: 7:30 AM - 6:00 PM  Sat - Sun: Closed"],
    weekdayHours: "Mon – Fri: 7:30 AM – 6:00 PM",
    weekendHours: "Sat – Sun: Closed",
    image: "/about/location-2.png",
    link: "https://caliora-dentist-template.webflow.io/location/miami-usa",
  },
];

// Reusable Glassmorphic Location Card Component
function LocationCardItem({ location }: { location: LocationItem }) {
  const [isHovered, setIsHovered] = useState(false);

  const addressText = Array.isArray(location.address)
    ? location.address.join(", ")
    : location.address;

  const hoursText = Array.isArray(location.hours)
    ? location.hours.join(" ")
    : `${location.weekdayHours || ""} ${location.weekendHours || ""}`.trim();

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.015 : 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative w-full h-full"
    >
      <a
        href={location.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="
          block h-full
          rounded-[1.75rem]
          border border-white/20
          px-6 py-6 md:px-8 md:py-7
          bg-gradient-to-b
          from-[#F0ECE7]/60
          via-[#CDC2BB]/50
          to-[#E6DCD6]/60
          hover:from-[#F0ECE7]/85
          hover:via-[#CDC2BB]/75
          hover:to-[#E6DCD6]/85
          backdrop-blur-[10px]
          backdrop-saturate-150
          bg-white/10
          shadow-[0_10px_40px_rgba(0,0,0,0.12)]
          hover:shadow-[0_20px_50px_rgba(0,0,0,0.22)]
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          select-none cursor-pointer flex flex-col justify-between
        "
      >
        {/* HEADER */}
        <div className="mb-6 md:mb-8 flex items-start justify-between gap-4">
          <motion.h3
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              text-[1.25rem]
              md:text-[1.5rem]
              xl:text-[1.625rem]
              2xl:text-[1.625rem]
              leading-[100%]
              tracking-[0%]
              text-black
            "
          >
            {location.city}
          </motion.h3>

          <motion.div
            animate={{
              rotate: isHovered ? 45 : 0,
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-black transition-colors group-hover:bg-black/10 shrink-0"
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.div>
        </div>

        {/* ADDRESS & HOURS */}
        <div className="mt-auto space-y-4">
          <motion.div
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.04,
            }}
          >
            <p className="geist-mono-medium text-[0.875rem] md:text-[1.125rem] leading-[130%] tracking-[0%] text-black/80">
              {addressText} {location.suite ? `, ${location.suite}` : ""}
            </p>
          </motion.div>

          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0.9,
              y: isHovered ? 0 : 4,
            }}
            transition={{
              duration: 0.45,
              delay: 0.08,
            }}
          >
            <p className="geist-mono-medium text-[0.875rem] md:text-[1rem] leading-[130%] tracking-[0%] text-black/60">
              {hoursText}
            </p>
          </motion.div>
        </div>
      </a>
    </motion.div>
  );
}

// Sub-component for "cards" variant
function CardsLocations({
  className = "",
  locationsData,
}: {
  className?: string;
  locationsData: LocationItem[];
}) {
  return (
    <section className={`w-full py-1 px-2 ${className}`}>
      <div className="max-w-8xl mx-auto space-y-2">
        {locationsData.map((location, index) => (
          <motion.div
            key={location.id || index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full overflow-hidden rounded-xl group"
          >
            {/* IMAGE */}
            <div className="relative h-[24rem] md:h-[32rem] lg:h-[38rem] w-full overflow-hidden">
              <Image
                src={location.image || "/about/location-1.png"}
                alt={location.city}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent" />
            </div>

            {/* CENTER CARD */}
            <div className="absolute left-1/2 top-1/2 z-10 w-[90%] max-w-[40rem] md:max-w-[34rem] lg:max-w-[40rem] -translate-x-1/2 -translate-y-1/2">
              <LocationCardItem location={location} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Sub-component for "parallax" variant
function ParallaxLocations({
  className = "",
  locationsData,
}: {
  className?: string;
  locationsData: LocationItem[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div className={`w-full py-1 px-2 ${className}`}>
      <motion.section
        ref={containerRef}
        // className="relative -mt-20 md:-mt-58 xl:-mt-38 rounded-xl overflow-hidden pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 lg:pb-16 flex flex-col justify-end items-center min-h-[42rem] z-20"
        className="relative rounded-xl overflow-hidden pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 lg:pb-16 flex flex-col justify-end items-center min-h-[42rem] z-20"
        id="locations-section"
      >
        {/* Parallax Background Layer */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
          <motion.img
            src={CTA_ASSETS["locations-bg"]}
            alt="Premium locations office environment background"
            className="absolute inset-0 w-full h-[120%] object-cover origin-center scale-110"
            style={{ y }}
          />
        </div>

        {/* Content Grid Container */}
        <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full"
          >
            {locationsData.map((office, index) => (
              <motion.div
                key={office.id || index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
              >
                <LocationCardItem location={office} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

// Main Export Component
export default function Locations({
  variant = "parallax",
  className = "",
  locationsData = DEFAULT_OFFICES,
}: LocationsProps) {
  if (variant === "cards") {
    return <CardsLocations className={className} locationsData={locationsData} />;
  }

  return <ParallaxLocations className={className} locationsData={locationsData} />;
}
