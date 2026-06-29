"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface CaseStat {
  label: string;
  value: string;
}

interface CaseItem {
  id: string;
  images: string[];
  title: string;
  description: string;
  link: string;
  stats: CaseStat[];
}

const casesData: CaseItem[] = [
  {
    id: "1",
    images: ["/about/about-hero-img.png", "/about/about-hero-img.png"],
    title: "Debt harassment resolved with legal guidance",
    description:
      "A Client Facing Repeated Recovery Calls And Repayment Pressure Received Proper Legal Guidance, Documentation Support, And Step-By-Step Assistance To Handle The Issue Professionally And Confidently.",
    link: "#",
    stats: [
      { label: "DURATION", value: "4 weeks" },
      { label: "CLIENT AGE", value: "38" },
      { label: "SERVICE", value: "Anti-Harassment\nSupport" },
    ],
  },
  {
    id: "2",
    images: ["/about/about-hero-img.png", "/about/about-hero-img.png"],
    title: "Debt harassment resolved with legal guidance",
    description:
      "A Client Facing Repeated Recovery Calls And Repayment Pressure Received Proper Legal Guidance, Documentation Support, And Step-By-Step Assistance To Handle The Issue Professionally And Confidently.",
    link: "#",
    stats: [
      { label: "DURATION", value: "4 weeks" },
      { label: "CLIENT AGE", value: "38" },
      { label: "SERVICE", value: "Anti-Harassment\nSupport" },
    ],
  },
  {
    id: "3",
    images: ["/about/about-hero-img.png", "/about/about-hero-img.png"],
    title: "Debt harassment resolved with legal guidance",
    description:
      "A Client Facing Repeated Recovery Calls And Repayment Pressure Received Proper Legal Guidance, Documentation Support, And Step-By-Step Assistance To Handle The Issue Professionally And Confidently.",
    link: "#",
    stats: [
      { label: "DURATION", value: "4 weeks" },
      { label: "CLIENT AGE", value: "38" },
      { label: "SERVICE", value: "Anti-Harassment\nSupport" },
    ],
  },
];

export default function CasesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as const;

  return (
    <section className="w-full max-w-[97vw] mx-auto  font-sans overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col gap-6 md:gap-4"
      >
        {casesData.map((caseItem, index) => (
          <motion.div
            key={caseItem.id}
            variants={cardVariants}
            className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl bg-[#E6DCD6] overflow-hidden ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
          >
            {/* Images Column */}
            <div className="flex w-full xl:w-1/2 gap-3 sm:gap-4 h-[220px] sm:h-[350px] xl:h-auto min-h-[220px] sm:min-h-[350px] lg:min-h-[450px]">
              {caseItem.images.map((imgSrc, imgIdx) => (
                <div
                  key={imgIdx}
                  className="relative flex-1 h-full rounded-[1.25rem] overflow-hidden group"
                >
                  <Image
                    src={imgSrc}
                    alt={`Case image ${imgIdx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={`object-cover transition duration-700 ease-out group-hover:scale-105 ${imgIdx === 0 ? "grayscale group-hover:grayscale-0" : ""
                      }`}
                  />
                </div>
              ))}
            </div>

            {/* Content Column */}
            <div className="flex flex-col w-full lg:w-2/5 justify-center pt-6 lg:pt-0">
              <h3 className="font-[Geist] text-[1.5rem] sm:text-[1.75rem] lg:text-[1.875rem] font-medium leading-none tracking-normal text-[#0F172A] mb-5">
                {caseItem.title}
              </h3>
              <p className="font-[Geist] text-[0.95rem] sm:text-[1.0625rem] lg:text-[1.1875rem] font-normal leading-[1.3] tracking-normal capitalize text-black mb-8">
                {caseItem.description}
              </p>

              <div className="mb-10 lg:mb-16">
                <Link href={caseItem.link}>
                  <span className="inline-flex items-center gap-3 bg-[#FF3030] text-[#F0ECE7] pl-5 pr-1.5 py-1.5 rounded-full font-[Geist] font-medium text-[0.875rem] sm:text-[1rem] lg:text-[1.125rem] leading-none tracking-normal transition-all duration-300 hover:scale-[1.03] hover:bg-[#e62b2b] shadow-md shadow-red-500/20">
                    View case detail

                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-black shadow-sm">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17l9.2-9.2M17 17V7H7" />
                      </svg>
                    </div>
                  </span>
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-auto">
                {caseItem.stats.map((stat, statIdx) => (
                  <div
                    key={statIdx}
                    className="flex flex-col items-center text-center w-full"
                  >
                    <span className="font-[Geist] text-[0.65rem] sm:text-[0.875rem] lg:text-[1rem] font-normal leading-none tracking-normal text-center text-[#0F172A]/60 uppercase">
                      {stat.label}
                    </span>
                    <div className="w-full h-[1px] bg-black/10 my-2.5 lg:my-3"></div>
                    <span className="font-[Geist] text-[0.7rem] sm:text-[1.125rem] lg:text-[1.25rem] font-medium leading-none tracking-normal text-center text-[#0F172A] whitespace-pre-line">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
