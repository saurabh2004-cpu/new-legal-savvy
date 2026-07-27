"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";
import SectionHeading from "../utils/SectionHeading";

const features = [
  {
    id: 1,
    title: "Loan Settlement Assistance",
    description:
      "We use the latest anaesthesia techniques and gentle protocols so every visit is as comfortable as possible, even for anxious patients.",
    image: "/home/our-features-1.png",
  },
  {
    id: 2,
    title: "Loan Settlement Assistance",
    description:
      "From 3D CBCT scans to smile design simulations, you see and approve your treatment outcome before we begin any clinical work.",
    image: "/home/our-featutes-2.png",
  },
  {
    id: 3,
    title: "Loan Settlement Assistance",
    description:
      "Our multidisciplinary team covers all dental fields under one roof — no waiting lists, no referrals, no fragmented care.",
    image: "/home/human-approach-1.png",
  },
  {
    id: 4,
    title: "Loan Settlement Assistance",
    description:
      "Every treatment plan includes a detailed written quote. No hidden fees, no surprises — just clear, honest communication from day one.",
    image: "/service/service-card-1.png",
  },
  {
    id: 5,
    title: "Loan Settlement Assistance",
    description:
      "Our clinic is equipped with modern technology and structured processes that ensure accurate diagnosis, efficient treatments, and a comfortable patient experience.",
    image: "/home/our-features-1.png",
  },
];

export default function OurFeatures2() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [currentFeature, setCurrentFeature] = useState(features[0]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  const thumbnailContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.25,
      },
    },
  };

  const thumbnailItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="w-full py-1 px-2">
      <div  className="max-w-8xl mx-auto rounded-xl flex flex-col items-center justify-center py-10 lg:py-12 overflow-hidden space-y-6 md:space-y-8 lg:space-y-10 bg-[#CDC2BB] p-4 lg:py-16 lg:px-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 xl:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col w-full space-y-6"
          >
            <motion.div variants={itemVariants} className="flex flex-col gap-8">
              <SectionHeading title="Our Features" align="left" titleClassName="text-4xl text-[#1D2331]" underlineColor="#ED3D3D" />

              <p className="text-[#1D2331]/90 geist-regular text-[16px] lg:text-[20px] leading-[125%] lg:leading-[100%] tracking-normal max-w-lg">
                Our platform is designed with legal guidance, structured
                documentation, and transparent support to make loan settlement and
                debt resolution easier, safer, and more stress-free.
              </p>
            </motion.div>

            <div className="flex flex-col space-y-3 geist-regular">
              {features.map((feature, idx) => {
                const isActive = activeId === feature.id;
                return (
                  <motion.div
                    key={feature.id}
                    variants={itemVariants}
                    className="flex items-center lg:items-start gap-3 w-full"
                  >
                    {/* Number Box */}
                    <div className="flex-shrink-0 w-8 h-8 lg:w-12 lg:h-12 bg-[#333A4D] text-white rounded-md flex items-center justify-center font-bold text-sm lg:text-lg shadow-sm">
                      {idx + 1}
                    </div>

                    {/* Accordion Box */}
                    <div className="flex-1 bg-[#F0ECE7] rounded-md overflow-hidden transition-all duration-300 shadow-sm">
                      <button
                        onClick={() => {
                          if (isActive) {
                            setActiveId(null);
                          } else {
                            setActiveId(feature.id);
                            setCurrentFeature(feature);
                          }
                        }}
                        className="w-full flex items-center justify-between px-5 py-2 lg:py-3.5 text-left hover:bg-[#EAE5DF] transition-colors cursor-pointer"
                      >
                        <span className="text-[#1D2331] text-[12px] lg:text-[18px] leading-[100%] tracking-normal">
                          {feature.title}
                        </span>
                        <Plus className={`w-5 h-5 text-[#1D2331] transition-all duration-300 ${isActive ? "rotate-[45deg]" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-5 pb-4 pt-1 text-[#1D2331]/80 text-sm leading-relaxed">
                              {feature.description}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-[320px] md:h-[450px] lg:h-[600px] xl:h-[800px] rounded-3xl overflow-hidden relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={currentFeature.image}
                    alt="Feature Visual"
                    className="w-full h-full object-cover grayscale"
                    fill
                  />
                </motion.div>
              </AnimatePresence>

              <motion.div
                variants={thumbnailContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 z-10 grid grid-cols-5 gap-3 h-20 lg:h-28 xl:h-[110px]"
              >
                {features.map((feature, idx) => {
                  const isSelected = currentFeature.id === feature.id;

                  return (
                    <motion.div
                      key={feature.id}
                      variants={thumbnailItemVariants}
                      onClick={() => {
                        setCurrentFeature(feature);
                        setActiveId(feature.id);
                      }}
                      className={`relative w-full h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${isSelected
                          ? "ring-4 ring-white scale-95"
                          : "hover:scale-[1.02] hover:opacity-90"
                        }`}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
