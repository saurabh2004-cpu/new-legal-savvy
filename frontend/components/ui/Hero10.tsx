"use client";

import React, { useState } from "react";
import Navbar from "../common/Navbar";

interface Hero10Props {
  heading: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

export default function Hero10({
  heading,
  description,
  ctaText = "Get Professional Protection Now",
  ctaLink = "https://www.credsettle.com/contact",
  className = "",
}: Hero10Props) {
  const [hoveredMenu, setHoveredMenu] = useState<"services" | "locations" | null>(null);

  return (
    <section
      style={{
        backgroundColor: "#132042",
        backgroundImage: "radial-gradient(circle at top right, #243A8D 0%, #132042 70%)",
      }}
      className={`relative text-white pt-36 pb-20 px-4 md:px-8 min-h-[91vh] flex flex-col items-center justify-center transition-all duration-300 ${hoveredMenu ? "overflow-visible" : "overflow-hidden"
        } ${className}`}
    >
      {/* Navbar passing hover state and callback */}
      <Navbar hoveredMenu={hoveredMenu} onHoverMenuChange={setHoveredMenu} />

      {/* Inner wrapper that blurs when navbar is hovered */}
      <div
        className={`max-w-6xl mx-auto text-center z-10 w-full flex flex-col items-center justify-center transition-all duration-500 ease-out ${hoveredMenu ? "opacity-50 blur-[2px] pointer-events-none" : "opacity-100 blur-0"
          }`}
      >
        <h1
          className="font-[Geist] font-black text-[1.5rem] md:text-[2.5rem] lg:text-[3.5rem] leading-[1] tracking-[0] mb-6"
          dangerouslySetInnerHTML={{ __html: heading }}
        />
        {description && (
          <p className="font-[Geist] font-semibold text-[1.25rem] leading-[1.1] tracking-[0] text-center capitalize opacity-90 mb-10 max-w-4xl mx-auto">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-5 justify-center w-full">
          <a
            className="font-[Geist] font-medium text-[1.125rem] leading-[1] tracking-[0] bg-white text-blue-900 px-10 py-4 rounded-full hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-block text-center cursor-pointer"
            href={ctaLink}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
