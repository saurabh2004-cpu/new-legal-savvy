"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  UserCheck,
  FileText,
  Calculator,
  Building2,
  ShieldCheck,
  TrendingUp,
  Scale,
  FileCheck,
  Handshake,
  Briefcase,
  Coins,
  Check,
} from "lucide-react";
import Image from "next/image";
import SectionHeading from "../utils/SectionHeading";
import assets from "@/data/assets";

interface PointItem {
  text: string;
  icon: React.ElementType;
}

interface AssistanceCard {
  title: string;
  image: string;
  points: PointItem[];
}

export default function AssistanceSection() {
  const cards: AssistanceCard[] = [
    {
      title: "Personal Loan Assistance",
      image: assets.serviceDetails.assistance,
      points: [
        { text: "Eligibility Check", icon: UserCheck },
        { text: "Document Guidance", icon: FileText },
        { text: "EMI & Tenure Support", icon: Calculator },
      ],
    },
    {
      title: "Business Loan Assistance",
      image: assets.serviceDetails.assistance,
      points: [
        { text: "Financial Audit", icon: Building2 },
        { text: "Collateral Evaluation", icon: ShieldCheck },
        { text: "Repayment Structuring", icon: TrendingUp },
      ],
    },
    {
      title: "Legal Consultation",
      image: assets.serviceDetails.assistance,
      points: [
        { text: "Case Analysis", icon: Scale },
        { text: "Agreement Review", icon: FileCheck },
        { text: "Dispute Resolution", icon: Handshake },
      ],
    },
    {
      title: "Debt Settlement",
      image: assets.serviceDetails.assistance,
      points: [
        { text: "Creditor Negotiation", icon: Briefcase },
        { text: "Haircut Strategy", icon: Coins },
        { text: "Legal Protection", icon: ShieldCheck },
      ],
    },
  ];

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const pointsListVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-1 px-2">
      <div className="w-full max-w-8xl mx-auto rounded-xl py-10 lg:py-14 bg-[#0B1727]">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center overflow-hidden space-y-8 md:space-y-12 text-white">
          {/* Centered Heading */}
          <SectionHeading
            title="Comprehensive Legal & Financial Assistance"
            titleClassName="text-white text-4xl"
            underlineColor="transparent"
            containerClassName="max-w-xl mx-auto"
          />

          {/* 2-Column Responsive Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="group relative w-full h-[15rem] sm:h-[16.5rem] md:h-[17.5rem] rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
              >
                {/* Background Image (Covering Full Card) */}
                <Image
                  src={card.image || ""}
                  alt={card.title}
                  fill
                  className="object-cover object-right transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Overlay: Fully covers top border and rounded corners while keeping right image clear */}
                <div className="absolute -left-1 -top-1 -bottom-1 w-full sm:w-[20%] bg-gradient-to-r from-[#0B1727] via-[#0B1727]/95 to-transparent z-10 pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-12 max-w-[85%] sm:max-w-[70%] lg:max-w-[65%]">
                  {/* Title */}
                  <h3 className="geist-semibold text-lg sm:text-xl lg:text-[22px] leading-tight text-white mb-4 sm:mb-5 tracking-tight group-hover:text-blue-100 transition-colors duration-300">
                    {card.title}
                  </h3>

                  {/* Points List */}
                  <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={pointsListVariants}
                    className="flex flex-col gap-2.5 sm:gap-3"
                  >
                    {card.points.map((point, pointIdx) => {
                      const IconComponent = point.icon || Check;
                      return (
                        <motion.li
                          key={pointIdx}
                          variants={itemVariants}
                          className="flex items-center gap-3 group/item"
                        >
                          {/* Glassmorphism Icon Badge Container */}
                          <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-md border border-white/25 text-white shrink-0 shadow-sm transition-transform duration-300 group-hover/item:scale-110 group-hover/item:bg-white/30">
                            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                          </span>
                          <span className="geist-medium text-sm md:text-lg text-white/90 leading-snug">
                            {point.text}
                          </span>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

