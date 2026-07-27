"use client";

import React from "react";
import { motion } from "framer-motion";

interface PillTagProps {
  buttonText1: string;
  buttonBg1?: string;
  buttonText2?: string;
  buttonBg2?: string;
  className?: string;
}

export default function PillTag({ buttonText1, buttonBg1 = "bg-[#CDC2BB]", buttonText2, buttonBg2 = "bg-[#363D4F]", className = "" }: PillTagProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center overflow-hidden ${className}`}
    >
      <span className={`${buttonBg1} text-black px-5 py-3 rounded-lg geist-mono-medium font-normal text-sm md:text-base leading-none tracking-normal uppercase`}>
        {buttonText1}
      </span>
      {buttonText2 && (
        <span className={`${buttonBg2} text-white px-5 py-3 rounded-lg geist-mono-medium font-normal text-sm md:text-base leading-none tracking-normal uppercase`}>
          {buttonText2}
        </span>
      )}
    </motion.div>
  );
}
