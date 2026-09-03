"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PillTag from "../utils/PillTag";
import assets from "@/data/assets";

const BulletIcon = () => (
  <div className="w-7 h-7 rounded-full bg-[#CDC2BB] flex items-center justify-center text-[#1D2331] shrink-0">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
  </div>
);

export default function AddressesSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const heading =
    "Legal Savvy provides reliable legal support for loan and debt settlement across India, with a clear, client-focused approach. From consultation to negotiation and settlement letters, we simplify the process and help you make informed decisions with confidence.";

  const words = heading.split(" ");

  return (
    <section className="w-full py-1 px-2 border">
      <div className="max-w-8xl mx-auto py-12 px-6 lg:px-12 bg-[#CDC2BB] rounded-xl space-y-6 lg:space-y-12 overflow-hidden">
        {/* Header Pill & Title Inline */}
        <div className="flex flex-col items-center text-center">
          <PillTag buttonText1={"About"} buttonBg1="bg-[#E6DCD6]" buttonText2={"Legal"} />

          <motion.h2
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.03,
                  delayChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            // viewport={{ once: true, margin: "-100px" }}
            className="max-w-7xl mx-auto geist-medium text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#0F172A] leading-[1] tracking-normal text-center mt-5 mb-5 text-center"
          >
            {words.map((word, index) => (
              <span key={index} className="inline-block overflow-hidden">
                <motion.span
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -30,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Bento Layout matching reference image */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4"
        >
          {/* LEFT COLUMN (Width: ~35% or 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-full">
            {/* Top-Left Image */}
            <motion.div
              variants={cardVariants}
              className="relative w-full h-[20rem] sm:h-[22rem] lg:h-[24rem] rounded-2xl overflow-hidden shadow-sm min-h-[16rem]"
            >
              <Image
                src={assets.about.hero}
                alt="Client Consultation"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Bottom-Left Services List Card */}
            <motion.div
              variants={cardVariants}
              className="p-6 lg:p-7 rounded-2xl bg-[#E6DCD6] flex flex-col justify-between h-auto min-h-[14rem] lg:h-0 lg:flex-[2] shadow-sm"
            >
              {[
                { label: "Loan & Debt Settlement", index: 1 },
                { label: "Legal Consultation", index: 2 },
                { label: "Contract Drafting", index: 3 },
                { label: "Dispute Resolution", index: 4 },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between pb-2.5 border-b border-[#1D2331]/15 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="geist-regular text-sm sm:text-base lg:text-lg text-[#1D2331]">
                      {item.label}
                    </span>
                  </div>
                  <span className="geist-regular text-sm sm:text-base lg:text-lg text-[#1D2331]/80">
                    {item.index}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN (Width: ~65% or 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Top-Right Locations Card */}
            {/* <motion.div
              variants={cardVariants}
              className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#E6DCD6] flex flex-col sm:flex-row gap-6 sm:gap-8 justify-around items-center h-auto py-8 sm:py-0 sm:h-[22rem] lg:h-auto lg:flex-1 shadow-sm min-h-[18rem]"
            >
              {[
                {
                  badge: "HYDERABAD",
                  city: "Telangana",
                  lines: ["405 Lexington Avenue,", "Suite 2600"],
                },
                {
                  badge: "MAHARASHTRA",
                  city: "Chh. Sambhajinagar",
                  lines: ["405 Lexington Avenue,", "Suite 2600"],
                },
              ].map((office, i) => (
                <div key={i} className="flex flex-col items-center text-center flex-1">
                  <div className="bg-[#333A4D] geist-mono-medium text-white text-sm sm:text-base tracking-wider px-4 py-2 rounded-lg uppercase mb-3 sm:mb-4">
                    {office.badge}
                  </div>
                  <h3 className="geist-light text-2xl sm:text-3xl lg:text-4xl text-[#0F2D4A] tracking-tight mb-2 text-center">
                    {office.city}
                  </h3>
                  <div className="flex flex-col gap-1 text-[#1D2331]/70 geist-regular text-sm sm:text-base">
                    {office.lines.map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div> */}
            <motion.div
              variants={cardVariants}
              className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#E6DCD6] flex items-center justify-center min-h-[18rem] sm:h-[22rem] lg:h-auto lg:flex-1 shadow-sm"
            >
              <motion.h2
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                className="max-w-4xl mx-auto geist-medium text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#0F172A] leading-[1.15] tracking-normal text-center"
              >
                {`We bring together thoughtful strategy, creative design, and technology to build digital experiences that make a lasting impact.`
                  .split(" ")
                  .map((word, index) => (
                    <span key={index} className="inline-block overflow-hidden">
                      <motion.span
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: -30,
                          },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.6,
                              ease: [0.16, 1, 0.3, 1],
                            },
                          },
                        }}
                        className="inline-block mr-[0.25em]"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
              </motion.h2>
            </motion.div>

            {/* Bottom-Right 2 Cards (Avatars Card + Feature Image Card) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-auto sm:h-[16.5rem] shrink-0">
              {/* Card 1: Overlapping Circular Avatars on Dark Navy Background */}
              {/* <motion.div
                variants={cardVariants}
                className="bg-[#0B1E36] rounded-2xl p-6 flex items-center justify-center relative overflow-hidden shadow-sm h-[13rem] sm:h-full"
              >
                <div className="flex items-center justify-center -space-x-5">
                  {[
                    { src: "/home/human-1.avif", alt: "Consultant 1", z: "z-10" },
                    { src: "/home/human-2.avif", alt: "Consultant 2", z: "z-20 scale-105" },
                    { src: "/home/human-3.avif", alt: "Consultant 3", z: "z-10" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border-4 border-[#0B1E36] overflow-hidden relative shadow-lg"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </motion.div> */}
              <motion.div
                variants={cardVariants}
                className="bg-[#0B1E36] rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-sm h-[13rem] sm:h-full"
              >
                <div className="flex items-center justify-center -space-x-5">
                  {[
                    { src: assets.home.human1, alt: "Consultant 1" },
                    { src: assets.home.human2, alt: "Consultant 2" },
                    { src: assets.home.human3, alt: "Consultant 3" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border-4 border-[#0B1E36] overflow-hidden relative shadow-lg ${i === 1 ? "z-20 scale-105" : "z-10"
                        }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="text-center mt-5">
                  <p className="geist-regular text-white/70 text-sm sm:text-base">
                    Trusted by
                  </p>
                  <p className="geist-medium text-white text-xl sm:text-2xl lg:text-3xl">
                    23,000+ clients
                  </p>
                </div>
              </motion.div>

              {/* Card 2: Feature Image Card */}
              <motion.div
                variants={cardVariants}
                className="relative w-full h-[13rem] sm:h-full rounded-2xl overflow-hidden shadow-sm group cursor-pointer"
              >
                <Image
                  src={assets.home.human2}
                  alt="Legal Excellence"
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section >
  );
}