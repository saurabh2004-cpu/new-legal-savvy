"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  UserCheck,
  FileText,
  Award,
  Handshake,
  Briefcase,
  Scale,
  Check,
} from "lucide-react";

interface BulletItem {
  text: string;
  icon?: React.ElementType;
}

interface WhyUsCard {
  title: string;
  description: string;
  image: string;
  bullets: BulletItem[];
}

const cardsData: WhyUsCard[] = [
  {
    title: "RBI-Compliant Process",
    description: "We exclusively follow Reserve Bank of India guidelines for legal loan settlements, ensuring every step is compliant and secure.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070&auto=format&fit=crop",
    bullets: [
      { text: "Secure Verification", icon: ShieldCheck },
      { text: "Proper Documentation", icon: FileCheck },
      { text: "Regulatory Approval", icon: CheckCircle2 },
    ]
  },
  {
    title: "Expert Legal Team",
    description: "Negotiations are handled directly by our expert legal team and experienced financial professionals, not by ordinary agents.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
    bullets: [
      { text: "Secure Verification", icon: UserCheck },
      { text: "Proper Documentation", icon: FileText },
      { text: "Regulatory Approval", icon: Award },
    ]
  },
  {
    title: "Zero Harassment Policy",
    description: "Once LegalSavvy takes over your case, our legal team immediately steps in to handle communication with banks, lenders, and recovery representatives.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    bullets: [
      { text: "Secure Verification", icon: ShieldCheck },
      { text: "Proper Documentation", icon: FileText },
      { text: "Regulatory Approval", icon: Handshake },
    ]
  },
  {
    title: "Expert Negotiation",
    description: "Our experienced legal team works directly with banks, lenders, and financial institutions to negotiate your outstanding loan amount in a professional and lawful manner.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    bullets: [
      { text: "Secure Verification", icon: Briefcase },
      { text: "Proper Documentation", icon: FileText },
      { text: "Regulatory Approval", icon: Scale },
    ]
  }
];

export default function WhyUs2() {
  return (
    <section className="w-full py-1 px-2">
      <div
        className="max-w-8xl mx-auto rounded-xl flex flex-col items-center justify-center pt-10 overflow-hidden space-y-6 md:space-y-8 lg:space-y-10"
      >
        {/* Why Us Centered Heading with Red Accent Underline */}
        <div className="flex flex-col items-center text-center">
          <h2
            className="font-sans font-semibold text-[2.25rem] leading-none tracking-normal text-black relative inline-block pb-3"
          >
            Why Us
            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[1px]">
              <span className="w-full h-[2.5px] bg-[#FF3030]"></span>
              <span className="w-full h-[2.5px] bg-[#FF3030]"></span>
            </div>
          </h2>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
          {cardsData.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#CDC2BB] w-full h-full rounded-xl p-4 transition-all duration-300 flex flex-col border border-black/5 mx-auto"
            >

              {/* Card Media (Image) */}
              <div className="w-full rounded-xl overflow-hidden mb-4 relative aspect-[16/10]">
                <motion.img
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  // viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover origin-center"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              <div className="flex flex-col flex-grow">
                {/* Card Content Header */}
                <motion.h3
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  // viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="geist-semibold text-lg sm:text-xl text-[#0F172A] mb-2"
                >
                  {card.title}
                </motion.h3>

                {/* Card Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  // viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="geist-regular text-base leading-relaxed text-black/80 mb-3 flex-grow"
                >
                  {card.description}
                </motion.p>

                {/* Status List (Bullets) with icon badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  // viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col gap-2.5 mt-auto"
                >
                  {card.bullets.map((bullet, bulletIdx) => {
                    const IconComponent = bullet.icon || Check;
                    return (
                      <div
                        key={bulletIdx}
                        className="flex items-center gap-2.5 group/bullet"
                      >
                        {/* Glassmorphism / Styled Icon Badge Container */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/10 backdrop-blur-md border border-black/10 flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover/bullet:scale-110">
                          <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F172A]" />
                        </div>
                        <span className="geist-regular text-base leading-tight text-gray-700 font-medium">
                          {bullet.text}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>

  );
}

