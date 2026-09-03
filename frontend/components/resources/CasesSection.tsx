"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "../utils/Button";
import assets from "@/data/assets";

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
    images: [assets.about.hero, assets.about.hero],
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
    images: [assets.about.hero, assets.about.hero],
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
    images: [assets.about.hero, assets.about.hero],
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
    <section className="w-full py-1 px-2">
      <div className="w-full max-w-8xl mx-auto rounded-xl overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full space-y-2"
        >
          {casesData.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              variants={cardVariants}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl bg-[#CDC2BB] overflow-hidden"
            >
              {/* Images Column */}
              <div
                className={`flex w-full gap-3 sm:gap-4 h-[220px] sm:h-[350px] lg:h-full min-h-[220px] sm:min-h-[350px] lg:min-h-[450px] lg:col-span-7 xl:col-span-6 ${index % 2 !== 0 ? "lg:order-2" : "lg:order-1"
                  }`}
              >
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
              <div
                className={`flex flex-col w-full justify-between pt-6 lg:pt-0 lg:col-span-5 xl:col-span-6 ${index % 2 !== 0 ? "lg:order-1" : "lg:order-2"
                  }`}
              >
                <div className="lg:max-w-xl">
                  {/* Title */}
                  <h3 className="text-[1.5rem] sm:text-[1.85rem] lg:text-[2.1rem] leading-[1.15] tracking-normal text-[#0F172A] mb-4 md:mb-5">
                    {caseItem.title}
                  </h3>

                  {/* Description */}
                  <p className="geist-regular text-[0.95rem] sm:text-[1.05rem] lg:text-[1.125rem] leading-[1.45] tracking-normal text-[#1E293B]/90 mb-6 md:mb-8">
                    {caseItem.description}
                  </p>

                  {/* Action Button */}
                  <div className="mb-8 md:mb-12">
                    <Button text="View case details" />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-auto">
                  {caseItem.stats.map((stat, statIdx) => (
                    <div
                      key={statIdx}
                      className="flex flex-col items-center text-center w-full"
                    >
                      <span className="geist-medium text-[0.7rem] sm:text-[0.85rem] lg:text-[0.95rem] leading-none tracking-wider text-[#0F172A]/70 uppercase text-center">
                        {stat.label}
                      </span>
                      <div className="w-full h-[1px] bg-black/15 my-2 sm:my-3"></div>
                      <span className="geist-medium text-[0.95rem] sm:text-[1.15rem] lg:text-[1.3rem] leading-tight text-center text-[#0F172A] whitespace-pre-line">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
