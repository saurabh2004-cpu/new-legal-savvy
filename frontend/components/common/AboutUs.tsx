"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface AboutUsProps {
  buttonText1: string;
  buttonText2: string;
  buttonText3?: string;
  paragraph: string[];
  className?: string;
}

export default function AboutUs({ buttonText1, buttonText2, buttonText3, paragraph, className }: AboutUsProps) {
  const pathname = usePathname()
  const isAboutPage = pathname === "/about"

  return (
    <section className={`py-10 lg:py-16 px-6 md:px-12 ${isAboutPage ? 'md:m-2 bg-[#D8D0CA]' : 'md:m-4 bg-[#E3DDD9]'}   rounded-xl  flex items-center justify-center overflow-hidden ${className}`}>
      <div className="max-w-[97vw] mx-auto flex flex-col items-center text-center">

        {/* Dual-Colored Brand Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center overflow-hidden"
        >
          <span className="bg-[#CDC2BB] text-black px-4.5 py-2 rounded-lg font-mono font-medium text-base leading-none tracking-normal uppercase">
            {buttonText1}
          </span>
          {buttonText2 && (
            <span className="bg-[#363D4F] text-white px-4.5 py-2 rounded-lg font-mono font-medium text-base leading-none tracking-normal uppercase">
              {buttonText2}
            </span>
          )}
        </motion.div>

        {/* High-Impact Central Description */}
        <motion.h2
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.1,
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="font-sans text-base md:text-2xl lg:text-3xl  font-semibold text-[#0F172A] leading-[1] md:leading-[1] tracking-normal text-center mt-10 mb-12 flex flex-col items-center gap-1.5"
        >
          {paragraph?.map((line, idx) => (
            <span key={idx} className="block overflow-hidden py-1">
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: -30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }
                }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        {/* Primary CTA Button with interactive animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {buttonText3 && <button className="bg-[#FF3030] hover:bg-red-600 text-white px-7 py-3.5 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 active:scale-95">
            <span className="font-sans font-medium text-lg leading-none tracking-normal">
              {buttonText3 || "More about us"}
            </span>
            <div className="bg-white p-1 rounded-full ml-1 flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </div>
          </button>}
        </motion.div>

      </div>
    </section>
  );
}
