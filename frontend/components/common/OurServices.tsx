"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";


export default function OurServices({ servicesData, heading, className }: { servicesData: any[], heading: string, className?: string }) {

  const pathname = usePathname();
  const isServiceDetailsPage = pathname.includes("/service/");

  return (
    <section className={` py-6  2xl:py-12 px-3 xl:px-12 md:m-4 rounded-xl flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <div className="w-full max-w-[75rem] mx-auto">

        {/* Centered Heading with Custom Double Red Underline */}
        <div className="flex flex-col items-center  mb-6 lg:mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`font-sans font-semibold text-4xl leading-none tracking-normal text-black relative inline-block pb-3.5 ${heading === "Related Services" ? "text-white" : ""}`}
          >
            {heading}
            {heading !== "Related Services" && <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[1px]">
              <span className="w-full h-[2.5px] bg-[#FF3030]"></span>
              <span className="w-full h-[2.5px] bg-[#FF3030]"></span>
            </div>}
          </motion.h2>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
          {servicesData?.map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              className="group w-full max-w-[35.875rem] mx-auto rounded-[1.625rem] overflow-hidden transition-all duration-300 flex flex-col cursor-pointer gap-4"
            >

              {/* Card Media (Image Block) */}
              <div className="w-full max-w-[35.875rem] h-[15rem] md:h-[21.25rem] rounded-[0.9375rem] overflow-hidden relative mx-auto">

                {/* Category Tag */}
                <span
                  style={{ backgroundColor: item.tagBg, color: item.tagColor }}
                  className="absolute top-0 left-4 font-sans font-medium text-base leading-none tracking-normal uppercase px-3 py-3 rounded-b-lg z-10"
                >
                  {item.tag}
                </span>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover origin-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Stats Glassmorphism Overlay */}
                {item.stats && (
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-[1rem] bg-blue/1 backdrop-blur-[16px] px-8 py-5.5 grid grid-cols-3 gap-4 text-left border-t border-white/30 z-10 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                  >
                    {item.stats.map((stat: any, statIdx: any) => (
                      <div key={statIdx} className="flex flex-col text-left">
                        <span className="font-sans font-medium text-base  tracking-wider text-white  leading-none mb-2">
                          {stat.label}
                        </span>
                        <span className="font-mono font-medium text-base  leading-none tracking-wider text-white">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Text Content Block */}
              <div className="p-6 md:p-8 flex flex-col flex-grow text-left bg-transparent hover:bg-[#D9D9D9] group-hover:bg-[#F0ECE7] transition-colors duration-300 ease-in-out rounded-lg">
                <h3 className={`font-sans font-semibold text-2xl md:text-[32px] leading-none tracking-normal my-6 transition-colors duration-300 ease-in-out ${isServiceDetailsPage ? 'text-white group-hover:text-black' : 'text-[#0F172A]'}`}>
                  {item.title}
                </h3>

                <p className={`font-sans font-normal text-base md:text-xl leading-xs tracking-normal mb-6 flex-grow transition-colors duration-300 ease-in-out ${isServiceDetailsPage ? 'text-white group-hover:text-black' : 'text-black'}`}>
                  {item.description}
                </p>

                {/* Call To Action Button (Matches Card Configuration) */}
                {item.cta && item.ctaBg && (
                  <button className={`${item.ctaBg} px-6 py-3 rounded-full flex items-center justify-center gap-2 self-start transition-all duration-500 ease-out active:scale-95 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0`}>
                    <span className="font-sans font-medium text-base md:text-lg leading-none tracking-normal">{item.cta}</span>
                    <div className={`${item.ctaIconBg} p-1 rounded-full flex items-center justify-center shadow-sm`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
