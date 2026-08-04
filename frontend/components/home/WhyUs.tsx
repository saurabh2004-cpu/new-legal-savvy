"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  UserCheck,
  FileText,
  Check,
} from "lucide-react";

import SectionHeading from "../utils/SectionHeading";

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
    title: "RBI-Compliant Settlement",
    description: "Every settlement we negotiate follows the RBI Fair Practices Code, so the process stays lawful, documented, and traceable at each step.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070&auto=format&fit=crop",
    bullets: [
      { text: "Written Confirmation", icon: FileText },
      { text: "RBI-Aligned Process", icon: ShieldCheck },
      { text: "Licensed Advocates", icon: UserCheck },
    ]
  },
  {
    title: "Licensed Legal Team",
    description: "Your case is handled by qualified advocates, not call-centre agents, so negotiations with your bank or NBFC carry legal weight.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
    bullets: [
      { text: "Written Confirmation", icon: FileText },
      { text: "RBI-Aligned Process", icon: ShieldCheck },
      { text: "Licensed Advocates", icon: UserCheck },
    ]
  },
  {
    title: "Zero Harassment Policy",
    description: "Once we take your case, our team becomes your point of contact with lenders and recovery agents, in line with RBI recovery-agent norms.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    bullets: [
      { text: "Written Confirmation", icon: FileText },
      { text: "RBI-Aligned Process", icon: ShieldCheck },
      { text: "Licensed Advocates", icon: UserCheck },
    ]
  },
  {
    title: "Direct Lender Negotiation",
    description: "We negotiate directly with your bank or NBFC on your behalf, and every offer or reply is confirmed to you in writing.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    bullets: [
      { text: "Written Confirmation", icon: FileText },
      { text: "RBI-Aligned Process", icon: ShieldCheck },
      { text: "Licensed Advocates", icon: UserCheck },
    ]
  }
];

export default function WhyUs2() {
  return (
    <section className="w-full py-1 px-2">
      <div
        className="max-w-8xl mx-auto rounded-xl flex flex-col items-center justify-center py-10 lg:py-12 overflow-hidden space-y-6 md:space-y-8 lg:space-y-10"
      >
        {/* Why Us Centered Heading with Red Accent Underline */}
        <SectionHeading title="Why Us" />

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
                  className="text-lg sm:text-xl text-[#0F172A] mb-2 font-semibold"
                >
                  {card.title}
                </motion.h3>

                {/* Card Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  // viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-base leading-relaxed text-black/80 mb-3 flex-grow"
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
                        <span className="text-base leading-tight text-gray-700">
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

