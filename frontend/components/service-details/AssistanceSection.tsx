"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

interface AssistanceCard {
  title: string;
  image: string;
  points: string[];
}

export default function AssistanceSection() {
  const cards: AssistanceCard[] = [
    {
      title: "Personal Loan Assistance",
      image: "/service-details/assistence.png",
      points: ["Eligibility Check", "Document Guidance", "EMI & Tenure Support"],
    },
    {
      title: "Business Loan Assistance",
      image: "/service-details/assistence.png",
      points: ["Financial Audit", "Collateral Evaluation", "Repayment Structuring"],
    },
    {
      title: "Legal Consultation",
      image: "/service-details/assistence.png",
      points: ["Case Analysis", "Agreement Review", "Dispute Resolution"],
    },
    {
      title: "Debt Settlement",
      image: "/service-details/assistence.png",
      points: ["Creditor Negotiation", "Haircut Strategy", "Legal Protection"],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="max-w-[97vw] mx-auto my-4 py-6 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 rounded-xl bg-[#1B223C] font-sans text-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        {/* Centered Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center mb-12 md:mb-16 max-w-2xl"
        >
          <h2 className="font-[Geist] text-xl md:text-[2.25rem] font-semibold leading-none tracking-normal text-center text-white">
            Comprehensive Legal & Financial Assistance
          </h2>
        </motion.div>

        {/* 2-Column Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8  w-full justify-items-center"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative w-full max-w-[35.875rem] h-[15rem] md:h-[21.25rem] rounded-[1.25rem] overflow-hidden cursor-pointer shadow-lg transition-shadow duration-300 hover:shadow-black/40"
            >
              {/* Background Image */}
              <Image
                src={card.image || ""}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark Overlay (Gradient for optimal legibility) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25 transition-opacity duration-300 group-hover:opacity-95" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 md:px-10 lg:px-14">
                {/* Title */}
                <h3 className="font-sans font-semibold text-lg md:text-xl lg:text-[24px] leading-none tracking-normal text-white mb-5 transition-transform duration-300 group-hover:translate-x-1">
                  {card.title}
                </h3>

                {/* Bullet Points */}
                <ul className="flex flex-col gap-3 md:gap-3.5">
                  {card.points.map((point, pointIdx) => (
                    <motion.li
                      key={pointIdx}
                      variants={itemVariants}
                      className="flex items-center gap-3 text-white/90"
                    >
                      {/* Checkmark Icon Container */}
                      <span className="flex items-center justify-center w-5 h-5 rounded-full border-3 border-white text-white shrink-0 transition-all duration-300 group-hover:border-white group-hover:scale-105">
                        <Check size={11} strokeWidth={3.5} />
                      </span>
                      <span className="font-sans font-medium text-[16px] leading-none tracking-normal">
                        {point}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
