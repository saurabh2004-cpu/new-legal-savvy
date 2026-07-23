"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

type Stat = {
  id: number;
  title: string;
  value: string;
  description: string;
  image: string;
  icon: React.ReactNode;
};

const stats: Stat[] = [
  {
    id: 1,
    title: "YEARS",
    value: "18+",
    description: "Legal excellence.",
    image: "/home/human-approach-1.png",
    icon: (
      <svg
        className="size-[18px] text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10S17.523 22 12 22 2 17.523 2 12 6.477 2 12 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "SATISFACTION",
    value: "98%",
    description: "Client satisfaction.",
    image: "/home/human-approach-1.png",
    icon: (
      <svg
        className="size-[18px] text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10S17.523 22 12 22 2 17.523 2 12 6.477 2 12 2z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "SERVICES",
    value: "98%",
    description: "Case resolutions.",
    image: "/home/human-approach-1.png",
    icon: (
      <svg
        className="size-[18px] text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10S17.523 22 12 22 2 17.523 2 12 6.477 2 12 2z" />
      </svg>
    ),
  },
];

export default function HumanApproach2() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // offset: ["start center", "end end"],
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 24,
  });

  return (
    <section className="w-full py-1 px-2">
      <div className="max-w-8xl mx-auto rounded-xl bg-[#E3DDD9] px-4 py-6 md:px-8 lg:px-14 lg:py-16">
        {/* Header */}
        <div className="mb-10 lg:mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative inline-block text-3xl font-bold text-[#1D2331] lg:text-5xl"
          >
            Human Approach
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -bottom-3 left-0 origin-left space-y-[2px]"
            >
              <div className="h-[2px] w-full bg-[#ED3D3D]" />
              <div className="h-[2px] w-full bg-[#ED3D3D]" />
            </motion.div>
          </motion.h2>
        </div>

        <div
          ref={containerRef}
          className="flex flex-col items-start xl:flex-row"
        >
          {/* LEFT SIDE */}
          <div className="flex w-full flex-col gap-3 lg:w-1/2">
            {stats.map((stat, i) => (
              <div key={stat.id} className="">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="group relative min-h-[380px] overflow-hidden rounded-xl w-full aspect-square"
                >
                  <Image
                    src={stat.image}
                    alt={stat.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Mobile Card */}
                <motion.div
                  className="flex justify-center lg:hidden mt-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <Card stat={stat} />
                </motion.div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="sticky top-24 hidden lg:pl-28 lg:flex lg:w-1/2 flex-col gap-2">
            {stats.map((stat, i) => {
              // easier animation timing
              const start = i * 0.28;
              const end = start + 0.18;

              const opacity = useTransform(
                smoothProgress,
                [start, end],
                [0, 1],
              );

              const y = useTransform(smoothProgress, [start, end], [40, 0]);

              return (
                <motion.div
                  key={stat.id}
                  style={{
                    opacity,
                    y,
                  }}
                  className="pointer-events-none"
                >
                  <Card stat={stat} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Inner Card Component
type CardProps = {
  stat: Stat;
};

function Card({ stat }: CardProps) {
  return (
    <div className="pointer-events-auto flex h-52 w-full max-w-[500px] justify-between rounded-xl border border-white/5 bg-[#333A4D] p-4">
      {/* Left */}
      <div className="flex flex-1 flex-col justify-between pr-4">
        <div className="text-white/80">{stat.icon}</div>

        <p className="text-base font-medium leading-snug text-[#E9E4E1] md:text-lg lg:text-xl">
          {stat.description}
        </p>
      </div>

      {/* Right */}
      <div className="flex w-[42%] flex-col gap-4 justify-end rounded-xl bg-[#F0ECE7] p-4 shadow-inner lg:w-[220px]">
        <span className="text-right text-sm font-medium uppercase text-[#1D2540]">
          {stat.title}
        </span>

        <span className="text-right font-mono text-4xl font-medium leading-none tracking-tight text-[#E64A19] md:text-5xl">
          {stat.value}
        </span>
      </div>
    </div>
  );
}
