"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Navbar from "../common/Navbar";
import Button2 from "../ui/Button2";

function AnimatedCharacter({
  char,
  startScroll,
  endScroll,
  scrollYProgress,
  isForeground
}: {
  char: string;
  startScroll: number;
  endScroll: number;
  scrollYProgress: MotionValue<number>;
  isForeground: boolean;
}) {
  const opacity = useTransform(scrollYProgress, (pos) => {
    if (pos <= startScroll) return 0;
    if (pos >= endScroll) return 1;
    return (pos - startScroll) / (endScroll - startScroll);
  });

  const yVal = useTransform(scrollYProgress, (pos) => {
    if (pos <= startScroll) return 40;
    if (pos >= endScroll) return 0;
    return 40 - ((pos - startScroll) / (endScroll - startScroll)) * 40;
  });

  return (
    <motion.span
      style={{
        opacity,
        y: yVal,
        ...(isForeground
          ? { color: "rgba(255, 255, 255, 0.95)" }
          : { WebkitTextStroke: "1px rgba(255, 255, 255, 0.9)", color: "transparent" })
      }}
      className={`text-[14vw] md:text-[11vw] lg:text-[12vw] font-light uppercase leading-[0.95] tracking-tight`}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

interface ServiceHeroProps {
  title: string;
  description: string;
  image: string;
  className?: string;
}

export default function ServiceHero({ title, description, image, className }: ServiceHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredMenu, setHoveredMenu] = useState<"services" | "locations" | null>(null);

  // We use h-[400vh] to give plenty of scroll distance so each stage is distinct
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --------------------------------------------------------
  // STAGE 1 & 2: Initial Text, Navbar & Overlay completely fade out
  // --------------------------------------------------------
  const titleOpacity = useTransform(scrollYProgress, [0, 0.20], [1, 0], { clamp: true });
  const titleY = useTransform(scrollYProgress, [0, 0.20], ["0px", "-100px"], { clamp: true });

  const descOpacity = useTransform(scrollYProgress, [0, 0.20], [1, 0], { clamp: true });
  const descY = useTransform(scrollYProgress, [0, 0.20], ["0px", "-80px"], { clamp: true });

  const ctaOpacity = useTransform(scrollYProgress, [0, 0.20], [1, 0], { clamp: true });
  const ctaY = useTransform(scrollYProgress, [0, 0.20], ["0px", "-60px"], { clamp: true });

  const arrowOpacity = useTransform(scrollYProgress, [0, 0.20], [1, 0], { clamp: true });
  const arrowY = useTransform(scrollYProgress, [0, 0.20], ["0px", "40px"], { clamp: true });
  const arrowScale = useTransform(scrollYProgress, [0, 0.20], [1, 0.8], { clamp: true });

  const navOpacity = useTransform(scrollYProgress, [0, 0.20], [1, 0], { clamp: true });
  const navY = useTransform(scrollYProgress, [0, 0.20], ["0px", "-40px"], { clamp: true });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.20], [0.65, 0], { clamp: true });

  // Ensure fully hidden and unclickable when scrolled past stage 1
  const initialVisibility = useTransform(scrollYProgress, pos => pos >= 0.20 ? "hidden" : "visible");
  const initialPointerEvents = useTransform(scrollYProgress, pos => pos >= 0.20 ? "none" : "auto");

  // --------------------------------------------------------
  // STAGE 3 & 4: Image Focus & Shrinking
  // --------------------------------------------------------
  const imageScale = useTransform(scrollYProgress, [0.35, 0.55], [1, 0.75], { clamp: true });
  const imageRadius = useTransform(scrollYProgress, [0.35, 0.55], ["0px", "32px"], { clamp: true });

  // We animate a clip path for the foreground text container so it EXACTLY matches 
  // the bounding box of the scaled-down image.
  // 1 - 0.75 scale = 0.25 difference -> 12.5% inset on all sides.
  // Border radius 32px * 0.75 = 24px visual radius.
  const textClipPath = useTransform(
    scrollYProgress,
    [0.35, 0.55],
    ["inset(0% 0% 0% 0% round 0px)", "inset(12.5% 12.5% 12.5% 12.5% round 24px)"],
    { clamp: true }
  );

  // Bulletproof fix to ensure the giant typography is 100% hidden during early stages
  const typoVisibility = useTransform(scrollYProgress, pos => pos < 0.65 ? "hidden" : "visible");

  // --------------------------------------------------------
  // STAGE 5: Giant Typography Reveal (Dual Layer)
  // --------------------------------------------------------
  const words = title.split(" ").filter(word => word.length > 0);
  const totalChars = title.replace(/\s/g, "").length;

  const AnimatedTypography = ({ isForeground }: { isForeground: boolean }) => (
    <motion.div
      style={isForeground ? { clipPath: textClipPath, visibility: typoVisibility } : { visibility: typoVisibility }}
      className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 ${isForeground ? 'z-[15]' : 'z-0'}`}
    >
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex overflow-hidden">
          {word.split("").map((char, charIndex) => {
            let pastChars = 0;
            for (let i = 0; i < wordIndex; i++) {
              pastChars += words[i].length;
            }
            pastChars += charIndex;

            // Fades in *after* the image finishes shrinking (0.65 to 0.90)
            const startScroll = 0.65 + (pastChars / totalChars) * 0.20;
            const endScroll = startScroll + 0.05;

            return (
              <AnimatedCharacter
                key={charIndex}
                char={char}
                startScroll={startScroll}
                endScroll={endScroll}
                scrollYProgress={scrollYProgress}
                isForeground={isForeground}
              />
            );
          })}
        </div>
      ))}
    </motion.div>
  );

  return (
    <section className="w-full p-2">
      <div ref={containerRef} className={`relative h-[400vh] rounded-xl`}>
        <div className={`sticky top-2 h-screen w-full overflow-hidden flex items-center justify-center rounded-xl ${className}`}>
          {/* ========================================================= */}
          {/* NAVBAR (Z-30)                                             */}
          {/* ========================================================= */}
          <motion.div
            style={{
              opacity: navOpacity,
              y: navY,
              visibility: initialVisibility,
              pointerEvents: initialPointerEvents
            }}
            className="absolute top-0 left-0 right-0 w-full z-30"
          >
            <Navbar onHoverMenuChange={setHoveredMenu} hoveredMenu={hoveredMenu} />
          </motion.div>

          {/* ========================================================= */}
          {/* BACKGROUND TYPOGRAPHY (Z-0) - Transparent with White Stroke */}
          {/* Shows outside the image bounds */}
          {/* ========================================================= */}
          <AnimatedTypography isForeground={false} />

          {/* ========================================================= */}
          {/* MAIN IMAGE (Z-10)                                         */}
          {/* ========================================================= */}
          <motion.div
            style={{
              scale: imageScale,
              borderRadius: imageRadius,
            }}
            className="absolute inset-0 z-10 overflow-hidden transform-gpu origin-center shadow-2xl"
          >
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            />
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-black"
            />
          </motion.div>

          {/* ========================================================= */}
          {/* FOREGROUND TYPOGRAPHY (Z-[15]) - Solid White              */}
          {/* Clipped to exactly match the image container dimensions   */}
          {/* ========================================================= */}
          <AnimatedTypography isForeground={true} />

          {/* ========================================================= */}
          {/* FOREGROUND INITIAL TEXT (Z-20)                            */}
          {/* ========================================================= */}
          <motion.div
            style={{ visibility: initialVisibility, pointerEvents: initialPointerEvents }}
            className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto"
          >
            <motion.h1
              style={{ opacity: titleOpacity, y: titleY }}
              className="text-5xl md:text-[5rem] lg:text-[6rem] font-bold text-white tracking-tight uppercase leading-[1.1]"
            >
              {title}
            </motion.h1>
            <motion.p
              style={{ opacity: descOpacity, y: descY }}
              className="text-lg md:text-[1.3rem] text-white mt-6 mb-12 font-normal max-w-[900px] leading-relaxed"
            >
              {description}
            </motion.p>

            {/* <motion.button 
            style={{ opacity: ctaOpacity, y: ctaY }} 
            className="px-10 py-4 mb-6 bg-white text-black text-sm md:text-base font-semibold tracking-wide rounded-full hover:bg-white/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
          >
            Consult our Expert
          </motion.button> */}

            {/* <motion.button
            style={{ opacity: arrowOpacity, y: arrowY, scale: arrowScale }}
            className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
          </motion.button> */}

            <Button2 />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
