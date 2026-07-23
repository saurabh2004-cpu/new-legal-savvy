"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LegalExpertise() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this section to rotate the asterisk icon
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const roles = [
    "Legal Consultant",
    "Corporate Law Advisor",
    "Contract Drafting Specialist",
    "Dispute Resolution Expert",
    "Compliance Consultant",
    "Client Legal Advisor",
  ];

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as const;

  return (
    <section className="w-full py-1 px-2">
      <div
        ref={containerRef}
        className="max-w-8xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-2 items-stretch py-6 md:py-6 lg:pb-16 px-6 md:px-12 bg-[#D8D0CA] rounded-xl overflow-hidden"
      >
        {/* LEFT COLUMN: Asterisk & Subtext */}
        <div className="flex flex-col justify-end items-start xl:min-h-[12rem] h-full py-2">

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-normal text-[20px] leading-[100%] tracking-normal text-center text-[#1D2331] mt-8 md:mt-0"
          >
            Practical legal expertise
          </motion.p>
        </div>

        {/* RIGHT COLUMN: Roles List */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col justify-center gap-1"
        >
          {roles.map((role, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ x: 10, color: "#1D2331" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="py-1 md:py-1.5 last:border-0 cursor-pointer group"
            >
              <span
                className="geist-medium text-2xl md:text-5xl bg-gradient-to-r from-[#0E1429] to-[#2E4286] bg-clip-text text-transparent"
              >
                {role}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
