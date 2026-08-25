"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../utils/Button";

import PillTag from "../utils/PillTag";

interface AboutUsProps {
  buttonText1: string;
  buttonText2: string;
  buttonText3?: string;
  buttonText3Href?: string;
  paragraph: string;
  paragraphMaxWidth?: string;
  className?: string;
}

export default function AboutUs({ buttonText1, buttonText2, buttonText3, buttonText3Href, paragraph, paragraphMaxWidth, className = "" }: AboutUsProps) {
  const words = paragraph ? paragraph.split(" ") : [];

  return (
    <section className={`w-full pb-1 px-2 ${className}`}>
      <div className="max-w-8xl mx-auto py-10 lg:py-40 px-6 md:px-12 bg-[#E3DDD9] rounded-xl flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Dual-Colored Brand Pill Tag */}
          <PillTag buttonText1={buttonText1} buttonText2={buttonText2} />

          {/* High-Impact Central Description */}
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
            className={`text-xl md:text-2xl lg:text-3xl xl:text-5xl text-[#0F172A] leading-[1] tracking-normal text-center mt-5 mb-5 ${paragraphMaxWidth}`}
          >
            {words.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: -30 },
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

          {/* Primary CTA Button */}
          {buttonText3 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button text={buttonText3} href={buttonText3Href} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
