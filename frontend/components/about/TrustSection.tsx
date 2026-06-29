"use client";

import React from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

interface TrustCard {
  title: string;
  description: string;
}

interface TrustSectionProps {
  imageSrc?: string;
  cards?: TrustCard[];
}

const defaultCards: TrustCard[] = [
  {
    title: "Clear Legal Guidance",
    description:
      "We simplify complex legal matters with practical advice, transparent communication, and step-by-step support so you can make confident legal decisions.",
  },
  {
    title: "Reliable Legal Support",
    description:
      "From digital consultation to strategic contract review, we plan and approve every step with you before starting any formal process.",
  },
  {
    title: "Expert Legal Minds",
    description:
      "Our multidisciplinary team covers corporate, property, and financial laws under one roof — no waiting lists, referrals, or fragmented care.",
  },
  {
    title: "Transparent Pricing",
    description:
      "Every contract and service includes a detailed written quote. No hidden fees, no surprises — just clear, honest communication from day one.",
  },
  {
    title: "Modern Tech Stack",
    description:
      "Modern digital signature systems, secured document vaults, and quick online support mean faster processing with fewer physical meetings.",
  },
  {
    title: "Proven Results",
    description:
      "Over thousands of cases resolved and successful loan settlements with a measurable record of clinical excellence and long-term security.",
  },
];

const AsteriskIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 520 520"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="feature-sticky-icon text-[#363D4F] w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
  >
    <motion.path
      d="M496 254L268.6 254L484.9 183.7L483.6 179.9L267.4 250.2L451.3 116.6L449 113.3L265 247L398.7 63L395.4 60.7L261.8 244.6L332.1 28.4L328.3 27.1L258 243.4L258 16L254 16L254 243.4L183.7 27.1L179.9 28.4L250.2 244.6L116.6 60.7L113.3 63L247 247L63 113.3L60.7 116.6L244.6 250.2L28.4 179.9L27.1 183.7L243.4 254L16 254L16 258L243.4 258L27.1 328.3L28.4 332.1L244.6 261.8L60.7 395.4L63 398.7L247 265L113.3 449L116.6 451.3L250.2 267.4L179.9 483.6L183.7 484.9L254 268.6L254 496L258 496L258 268.6L328.3 484.9L332.1 483.6L261.8 267.4L395.4 451.3L398.7 449L265 265L449 398.7L451.3 395.4L267.4 261.8L483.6 332.1L484.9 328.3L268.6 258L496 258L496 254Z"
      fill="currentColor"
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      style={{ originX: "256px", originY: "256px" }}
    />
  </svg>
);

export default function TrustSection({
  imageSrc,
  cards = defaultCards,
}: TrustSectionProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const isCentredInViewport =
        rect.top <= 100 && rect.bottom >= viewportHeight - 100;

      if (isCentredInViewport) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

        const scrollingDown = e.deltaY > 0;
        const scrollingUp = e.deltaY < 0;

        let shouldTrap = false;

        if (
          scrollingDown &&
          scrollTop + clientHeight < scrollHeight - 1
        ) {
          shouldTrap = true;
        } else if (scrollingUp && scrollTop > 1) {
          shouldTrap = true;
        }

        if (shouldTrap) {
          e.preventDefault();

          scrollContainer.scrollBy({
            top: e.deltaY,
            behavior: "auto",
          });
        }
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // ── Smooth Scroll Animation ─────────────────────────────
  const { scrollY } = useScroll({
    container: scrollContainerRef,
  });

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 80,
    damping: 22,
    mass: 0.35,
  });

  const contentY = useTransform(
    smoothScrollY,
    (value) => value * -0.02
  );

  return (
    <section
      ref={sectionRef}
      className=" rounded-xl flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-[97rem] mx-auto w-full">
        {/* GRID CONTAINER */}
        <div className="w-full flex flex-wrap md:gap-8 xl:px-4 lg:grid lg:grid-cols-[auto_1fr] lg:gap-16">

          {/* LEFT COLUMN */}
          <div className="w-full lg:w-auto py-5">
            <div className="relative overflow-hidden w-full h-[350px] rounded-[1.875rem] shadow-[0_20px_40px_-15px_rgba(29,35,49,0.15)] border border-white/20 lg:sticky lg:top-8 lg:w-[45.4375rem] lg:max-w-full lg:h-[45.8125rem] lg:z-[9]">
              <Image
                src={imageSrc || "/home/human-approach-1.png"}
                alt="Professional legal guidance consultation"
                className="w-full h-full object-cover select-none pointer-events-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                fill
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-auto">
            <motion.div
              ref={scrollContainerRef}
              style={{ y: contentY }}
              className="flex flex-col items-start justify-start w-full lg:w-[90%] lg:mx-auto lg:h-[45.8125rem] lg:overflow-y-auto scrollbar-hide lg:pr-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#1D2331]/15 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#1D2331]/30"
            >
              {/* Badge Labels */}
              <div className="flex  flex-row items-center justify-start  my-12 text-[#1D2331] font-sans font-bold text-xs tracking-wider">
                <span className="uppercase bg-[#F0ECE7] px-4 rounded-md py-2">CLARITY</span>

                <div className="flex items-center justify-center px-4 py-2 rounded-md bg-[#363D4F] text-white">
                  <span className="uppercase font-bold">
                    TRUST
                  </span>
                </div>
              </div>

              {/* Cards */}
              <div className="w-full">
                <div role="list" className="flex flex-col w-full gap-6">
                  {cards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      role="listitem"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.8,
                        delay: idx * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="w-full p-9 rounded-[2rem] bg-[#E4DDD9] border border-white/30 shadow-[0_10px_30px_-10px_rgba(29,35,49,0.05)] cursor-pointer transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] gap-16 group hover:-translate-y-1 hover:bg-[#EDE7E3] hover:shadow-[0_20px_40px_-15px_rgba(29,35,49,0.1)] hover:border-white/60 flex flex-col justify-between items-start"
                    >
                      <div className="flex items-center justify-between w-full">
                        <AsteriskIcon />
                      </div>

                      <div className="flex flex-col justify-start items-start gap-3">
                        <h2 className="text-2xl font-semibold text-[#1D2331] leading-tight m-0">
                          {card.title}
                        </h2>

                        <p className="text-[0.9375rem] text-[#1D2331]/80 leading-relaxed m-0">
                          {card.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}