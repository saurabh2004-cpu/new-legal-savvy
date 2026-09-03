"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PillTag from "../utils/PillTag";
import assets from "@/data/assets";

interface StandardOfCareProps {
  title?: string;
  imageSrc?: string;
  label1?: string;
  label2?: string;
}

const features = [
  "Experienced Legal Guidance You Can Trust",
  "Clear Advice At Every Step Of Your Case",
  "Transparent Fees, No Hidden Charges",
  "Dedicated Legal Experts For Every Matter",
  "Proven Expertise Across Legal Matters",
  "Clear Communication And Upfront Pricing",
];

export default function StandardOfCareSection({
  title = "Real cases that reflect our standard of legal excellence",
  imageSrc = assets.resources.legalCareOffice,
  label1 = "PROVEN",
  label2 = "CARE",
}: StandardOfCareProps) {
  return (
    <section className="w-full py-1 px-2">
      <div className="w-full max-w-8xl mx-auto flex flex-col gap-2">
        {/* ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          {/* CARD 1 (Top-Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-[#E6DCD6] rounded-xl p-8 sm:p-12 lg:p-16 flex flex-col gap-8 justify-center items-center text-center min-h-[380px] lg:min-h-[460px]"
          >
            {/* Labels */}
            <PillTag buttonText1={label1} buttonText2={label2} />

            {/* Heading */}
            <h2 className="text-[1.65rem] sm:text-[2.2rem] lg:text-[2.5rem] leading-[1.2] tracking-normal text-center text-[#0F172A] max-w-[17ch]">
              {title}
            </h2>
          </motion.div>

          {/* CARD 2 (Top-Right Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative lg:col-span-7 w-full h-[22rem] sm:h-[30rem] lg:h-full min-h-[380px] lg:min-h-[460px] rounded-xl overflow-hidden group"
          >
            <Image
              src={imageSrc}
              alt="Legal care"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          {/* CARD 3 (Bottom-Left Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative lg:col-span-7 w-full h-[22rem] sm:h-[30rem] lg:h-full min-h-[380px] lg:min-h-[460px] rounded-xl overflow-hidden group"
          >
            <Image
              src={imageSrc}
              alt="Legal office"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* CARD 4 (Bottom-Right Features) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
            className="lg:col-span-5 rounded-xl p-8 sm:p-12 lg:p-16 flex flex-col justify-center min-h-[380px] lg:min-h-[460px]"
          >
            <div className="flex flex-col gap-5 sm:gap-6 lg:gap-10 w-full max-w-[28rem] mx-auto">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: "easeOut" },
                    },
                  }}
                  className="flex items-center gap-3.5"
                >
                  <div className="w-5 h-5 rounded-full bg-[#363D4F] text-white flex items-center justify-center shrink-0">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>

                  <p className="geist-regular text-[0.95rem] sm:text-[1.05rem] lg:text-[1.125rem] leading-snug tracking-normal text-[#0F172A]">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}