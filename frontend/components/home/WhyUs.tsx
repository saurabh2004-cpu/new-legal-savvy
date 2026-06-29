"use client";

import React from "react";
import { motion } from "framer-motion";

interface WhyUsCard {
  title: string;
  description: string;
  image: string;
  bullets: string[];
}

const cardsData: WhyUsCard[] = [
  {
    title: "RBI-Compliant Process",
    description: "We exclusively follow Reserve Bank of India guidelines for legal loan settlements, ensuring every step is compliant and secure.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070&auto=format&fit=crop",
    bullets: ["Secure Verification", "Proper Documentation", "Regulatory Approval"]
  },
  {
    title: "Expert Legal Team",
    description: "Negotiations are handled directly by our expert legal team and experienced financial professionals, not by ordinary agents.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
    bullets: ["Secure Verification", "Proper Documentation", "Regulatory Approval"]
  },
  {
    title: "Zero Harassment Policy",
    description: "Once LegalSavvy takes over your case, our legal team immediately steps in to handle communication with banks, lenders, and recovery representatives.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    bullets: ["Secure Verification", "Proper Documentation", "Regulatory Approval"]
  },
  {
    title: "Expert Negotiation",
    description: "Our experienced legal team works directly with banks, lenders, and financial institutions to negotiate your outstanding loan amount in a professional and lawful manner.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    bullets: ["Secure Verification", "Proper Documentation", "Regulatory Approval"]
  }
];

export default function WhyUs() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-3 lg:py-16 px-2 md:px-3 md:m-4 bg-[#E3DDD9] rounded-lg flex flex-col items-center justify-center overflow-hidden"
    >
      <div className=" w-full mx-auto">

        {/* Why Us Centered Heading with Red Accent Underline */}
        <div className="flex flex-col items-center mb-6 lg:mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-semibold text-[2.25rem] leading-none tracking-normal text-black relative inline-block pb-3"
          >
            Why Us
            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[1px]">
              <span className="w-full h-[2.5px] bg-[#FF3030]"></span>
              <span className="w-full h-[2.5px] bg-[#FF3030]"></span>
            </div>
          </motion.h2>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-2 w-full ">
          {cardsData.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F0ECE7] w-full h-[35.0625rem] rounded-[1.5625rem] p-2 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-black/5 mx-auto"
            >

              {/* Card Media (Image) */}
              <div className="w-full  rounded-[1.5rem] overflow-hidden mb-6 relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover origin-center hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              <div className="px-6">
                {/* Card Content Header */}
                <h3 className="font-sans font-semibold text-xl leading-none tracking-normal text-[#0F172A] mb-3">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans font-normal text-base leading-none tracking-normal text-black mb-6 flex-grow">
                  {card.description}
                </p>

                {/* Status List (Bullets) with circular checkmarks */}
                <div className="flex flex-col gap-3 pt-4 border-t border-black/10 mt-auto">
                  {card.bullets.map((bullet, bulletIdx) => (
                    <div key={bulletIdx} className="flex items-center gap-3">
                      {/* Outline Circular Checkmark Icon */}
                      <div className="w-4.5 h-4.5 rounded-full border-4 border-black/80 flex items-center justify-center flex-shrink-0">
                        {/* <div className="w-1.5 h-1.5 rounded-full bg-black/40"></div>  */}
                      </div>
                      <span className="font-sans font-normal text-[0.9375rem] leading-none tracking-normal text-black/85">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}
