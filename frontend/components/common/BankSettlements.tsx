'use client';

import React from 'react';
import { motion, useTime, useTransform } from 'framer-motion';

const bankFiles = [
  "airtel.svg", "american express.svg", "au small.svg", "axis.svg", "bandhan.svg", "bank of india.svg",
  "bank of maharashtra.svg", "baroda.svg", "canara.svg", "central.svg", "citibank.svg", "federal.svg",
  "hdfc.svg", "idbi.svg", "idfc first.svg", "indian oversees.svg", "indian post.svg", "indusland.svg",
  "kotak.svg", "paytm.svg", "pnb.svg", "punjab.svg", "rbl.svg", "sbi.svg", "union.svg", "yes bank.svg"
];

// Split the 26 logos: 16 in the outer ring, 10 in the inner ring
const outerBanks = bankFiles.slice(0, 16).map((file, i) => ({
  id: `outer-${i}`,
  name: file.replace('.svg', ''),
  img: `/home/banks/${file}`,
  ring: "outer"
}));

const innerBanks = bankFiles.slice(16).map((file, i) => ({
  id: `inner-${i}`,
  name: file.replace('.svg', ''),
  img: `/home/banks/${file}`,
  ring: "inner"
}));

const getOrbitPosition = (index: number, total: number, radius: number) => {
  // Start from top (-PI/2) and distribute evenly
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    top: `${50 + radius * Math.sin(angle)}%`,
    left: `${50 + radius * Math.cos(angle)}%`
  };
};

interface BankSettlementsProps {
  circleHeading: string;
  innerCircleBgColour: string;
  outerCircleBgColour: string;
  className?: string;
}

export default function BankSettlements({ circleHeading, innerCircleBgColour, outerCircleBgColour, className }: BankSettlementsProps) {
  // Using a single unified timeline guarantees perfect synchronization 
  // between the orbit rotation and the child counter-rotation.
  const time = useTime();

  // Outer rotates CW over 50 seconds
  const rotateOuter = useTransform(time, t => (t / 50000) * 360);
  const rotateOuterReverse = useTransform(time, t => -(t / 50000) * 360);

  // Inner rotates CCW over 40 seconds
  const rotateInner = useTransform(time, t => -(t / 40000) * 360);
  const rotateInnerReverse = useTransform(time, t => (t / 40000) * 360);

  return (
    <section className="w-full py-1 px-2">
      <div className={`max-w-8xl mx-auto rounded-xl flex flex-col items-center justify-center pt-10 overflow-hidden space-y-6 md:space-y-8 lg:space-y-10 p-6 ${className}`}>
        {/* Main Circular UI */}
        <div className="relative w-[75%] max-w-[45rem] aspect-square mx-auto my-14 md:my-16 flex items-center justify-center">

          {/* Outer Navy Circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[111.7%] h-[111.7%] rounded-full shadow-xl"
            style={{ backgroundColor: outerCircleBgColour }}
          />

          {/* Inner Slate Circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[64.4%] h-[64.4%] rounded-full shadow-lg flex items-center justify-center text-center z-10"
            style={{ backgroundColor: innerCircleBgColour }}
          >
            <div className="flex flex-col items-center justify-center px-2 md:px-6">
              <h2 className="text-white max-w-[80%] font-sans xl:font-semibold xl:text-[25px] lg:text-[20px] md:text-[20px] text-[12px] leading-snug tracking-normal text-center capitalize ">
                {circleHeading}
              </h2>
            </div>
          </motion.div>

          {/* Outer Orbit Container (Rotates CW) */}
          <motion.div
            style={{ rotate: rotateOuter }}
            className="absolute w-full h-full z-20 pointer-events-none"
          >
            {outerBanks.map((bank, idx) => {
              const pos = getOrbitPosition(idx, outerBanks.length, 55.85);
              return (
                <div
                  key={bank.id}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute w-[14%] h-[14%] md:w-[12%] md:h-[12%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                >
                  {/* Counter-Rotating Child Wrapper - PERFECTLY SYNCED */}
                  <motion.div
                    style={{ rotate: rotateOuterReverse }}
                    className="w-full h-full rounded-full bg-[#E6DCD6] shadow-sm flex items-center justify-center p-2 sm:p-3"
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.2 + (idx * 0.03), ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={bank.img}
                        alt={bank.name}
                        className="w-[90%] h-[90%] object-contain select-none pointer-events-none"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Inner Orbit Container (Rotates CCW) */}
          <motion.div
            style={{ rotate: rotateInner }}
            className="absolute w-full h-full z-30 pointer-events-none"
          >
            {innerBanks.map((bank, idx) => {
              const pos = getOrbitPosition(idx, innerBanks.length, 32.2);
              return (
                <div
                  key={bank.id}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute w-[16%] h-[16%] md:w-[14%] md:h-[14%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                >
                  {/* Counter-Rotating Child Wrapper - PERFECTLY SYNCED */}
                  <motion.div
                    style={{ rotate: rotateInnerReverse }}
                    className="w-full h-full rounded-full flex items-center justify-center p-2 sm:p-3 bg-[#E6DCD6] shadow-md border border-gray-100"
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.2 + (idx * 0.05), ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={bank.img}
                        alt={bank.name}
                        className="w-[90%] h-[90%] object-contain select-none pointer-events-none"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
