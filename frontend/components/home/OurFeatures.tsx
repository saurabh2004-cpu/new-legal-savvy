'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    id: 1,
    title: "Loan Settlement Assistance",
    description: "We use the latest anaesthesia techniques and gentle protocols so every visit is as comfortable as possible, even for anxious patients."
  },
  {
    id: 2,
    title: "Loan Settlement Assistance",
    description: "From 3D CBCT scans to smile design simulations, you see and approve your treatment outcome before we begin any clinical work."
  },
  {
    id: 3,
    title: "Loan Settlement Assistance",
    description: "Our multidisciplinary team covers all dental fields under one roof — no waiting lists, no referrals, no fragmented care."
  },
  {
    id: 4,
    title: "Loan Settlement Assistance",
    description: "Every treatment plan includes a detailed written quote. No hidden fees, no surprises — just clear, honest communication from day one."
  },
  {
    id: 5,
    title: "Loan Settlement Assistance",
    description: "Our clinic is equipped with modern technology and structured processes that ensure accurate diagnosis, efficient treatments, and a comfortable patient experience."
  }
];

export default function OurFeatures() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [mainImage, setMainImage] = useState<string>("/home/our-features-1.png");

  const images = [
    "/home/our-features-1.png",
    "/home/our-featutes-2.png",
    "/home/human-approach-1.png",
    "/service/service-card-1.png"
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    }
  };

  const thumbnailContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.25
      }
    }
  };

  const thumbnailItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="py-6 xl:py-16 bg-[#CDC2BB] xl:pl-[89px] xl:pr-[89px] px-4 xl:px-12 w-full  mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 xl:gap-20 items-center">

        {/* Left Column - Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col w-full"
        >
          <motion.div variants={itemVariants} className="mb-10 w-full">
            <h2 className="text-4xl md:text-[2.75rem] font-sans font-bold text-[#1D2331] inline-block relative mb-6 lg:w-[599px] lg:h-[47px] lg:leading-[47px] w-full h-auto opacity-100 rotate-0">
              <span className="relative inline-block">
                Our Features
                <div className="absolute left-0 -bottom-3 w-full flex flex-col space-y-[1px]">
                  <div className="w-full h-[2.5px] bg-[#ED3D3D]"></div>
                  <div className="w-full h-[2.5px] bg-[#ED3D3D]"></div>
                </div>
              </span>
            </h2>
            <p className="text-[#1D2331]/90 font-sans font-normal text-[16px] lg:text-[20px] leading-[125%] lg:leading-[100%] tracking-normal max-w-lg mt-2">
              Our platform is designed with legal guidance, structured documentation, and transparent support to make loan settlement and debt resolution easier, safer, and more stress-free.
            </p>
          </motion.div>

          <div className="flex flex-col space-y-4">
            {features.map((feature, idx) => {
              const isActive = activeId === feature.id;
              return (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  className="flex items-center lg:items-start gap-4 w-full"
                >
                  {/* Number Box */}
                  <div className="flex-shrink-0 w-8 h-8 lg:w-12 lg:h-12 bg-[#363D4F] text-white rounded-md flex items-center justify-center font-bold text-sm lg:text-lg shadow-sm">
                    {idx + 1}
                  </div>

                  {/* Accordion Box */}
                  <div className="flex-1 bg-[#F0ECE7] rounded-md overflow-hidden transition-all duration-300 shadow-sm">
                    <button
                      onClick={() => setActiveId(isActive ? null : feature.id)}
                      className="w-full flex items-center justify-between px-5 py-2 lg:py-3.5 text-left hover:bg-[#EAE5DF] transition-colors"
                    >
                      <span className="font-mono font-medium text-[#1D2331] text-[12px] lg:text-[18px] leading-[100%] tracking-normal">
                        {feature.title}
                      </span>
                      <span className="text-[#ED3D3D] text-2xl font-bold ml-4 leading-none">
                        {isActive ? '-' : '+'}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
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
        <div className="flex flex-col w-full gap-2 lg:gap-3 pt-4 lg:pt-0 lg:sticky lg:top-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-[320px] md:h-[450px] lg:h-[550] xl:h-[648px] rounded-3xl overflow-hidden relative shadow-lg bg-gray-300"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={mainImage}
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
              className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 z-10 grid grid-cols-4 gap-3 h-20 lg:h-28 xl:h-[110px]"
            >
              {images.map((img, idx) => {
                const isSelected = mainImage === img;
                return (
                  <motion.div
                    key={idx}
                    variants={thumbnailItemVariants}
                    onClick={() => setMainImage(img)}
                    className={`w-full h-full rounded-2xl overflow-hidden relative shadow-md cursor-pointer transition-all duration-300 bg-gray-700 ${isSelected ? 'ring-4  scale-95' : 'hover:scale-[1.02] hover:opacity-90'
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`Feature thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      fill
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
