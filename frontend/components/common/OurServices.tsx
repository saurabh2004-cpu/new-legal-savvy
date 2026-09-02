"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Button from "../utils/Button";
import SectionHeading from "../utils/SectionHeading";


export default function OurServices({ servicesData, heading, className }: { servicesData: any[], heading: string, className?: string }) {

  const pathname = usePathname();
  const isServiceDetailsPage = pathname.includes("/service/");

  // State to track if the screen is large (desktop: width >= 1024px)
  const [isLargeScreen, setIsLargeScreen] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section className="w-full py-1 px-2">
      <div
        className={`max-w-8xl mx-auto rounded-xl flex flex-col items-center justify-center py-10 lg:py-14 overflow-hidden space-y-6 md:space-y-8 lg:space-y-10 ${className}`}
      >
        {/* Centered Heading with Custom Double Red Underline */}
        <SectionHeading
          title={heading}
          titleClassName={heading === "Related Services" ? "text-white text-4xl" : "text-black text-4xl"}
          underlineColor={heading === "Related Services" ? "transparent" : "#FF3030"}
        />

        {/* 2-Column Responsive Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 overflow-hidden">
          {servicesData?.map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: 40 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 1.0, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              className="group w-full overflow-hidden transition-all duration-300 flex flex-col cursor-pointer gap-1"
            >

              {/* Card Media (Image Block) */}
              <div className="w-full h-[15rem] md:h-[21.25rem] aspect-[3/2] rounded-[0.9375rem] overflow-hidden relative mx-auto">

                {/* Category Tag */}
                <span
                  style={{ backgroundColor: item.tagBg, color: item.tagColor }}
                  className="absolute top-0 left-4 font-medium text-base leading-none tracking-normal uppercase px-3 py-3 rounded-b-lg z-10"
                >
                  {item.tag}
                </span>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover origin-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Stats Glassmorphism Overlay */}
                {item.stats && (
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-[1rem] bg-blue/1 backdrop-blur-[16px] px-8 py-5.5 grid grid-cols-3 gap-4 text-left border-t border-white/30 z-10 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                  >
                    {item.stats.map((stat: any, statIdx: any) => (
                      <div key={statIdx} className="flex flex-col text-left">
                        <div className="overflow-hidden flex flex-col geist-mono-medium">
                          <motion.span
                            initial={{ y: "100%", opacity: 0 }}
                            whileInView={{ y: "0%", opacity: 1 }}
                            // viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="font-medium text-base tracking-wider text-white uppercase leading-none mb-2"
                          >
                            {stat.label}
                          </motion.span>

                          <motion.span
                            initial={{ y: "100%", opacity: 0 }}
                            whileInView={{ y: "0%", opacity: 1 }}
                            // viewport={{ once: true }}
                            transition={{
                              duration: 0.7,
                              delay: 0.1,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="font-medium text-base tracking-wider text-white uppercase leading-none"
                          >
                            {stat.value}
                          </motion.span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Text Content Block */}
              <div className="p-4 sm:p-6 md:px-8 flex flex-col flex-grow text-left bg-transparent rounded-lg relative overflow-hidden z-0">
                {/* Smooth Animated Background Fill */}
                <motion.div
                  className="absolute inset-0 bg-[#CDC2BB] -z-10 rounded-lg"
                  variants={{
                    hidden: { scale: 0.92, opacity: 0 },
                    visible: { scale: 0.92, opacity: 0 },
                    hover: { scale: 1, opacity: 1 }
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0.5, originY: 0.5 }}
                />

                <h3 className={`relative z-10 text-2xl md:text-[32px] leading-none tracking-normal transition-colors duration-500 ease-in-out mb-3 ${isServiceDetailsPage ? 'text-white group-hover:text-black' : 'text-[#0F172A]'}`}>
                  {item.title}
                </h3>

                <p className={`relative z-10 geist-regular text-base md:text-xl leading-xs tracking-normal flex-grow transition-colors duration-500 ease-in-out mb-3 ${isServiceDetailsPage ? 'text-white group-hover:text-black' : 'text-black'}`}>
                  {item.description}
                </p>

                {/* Call To Action Button (Matches Card Configuration) */}
                {item.cta && item.ctaBg && (
                  <div className="relative z-10 w-full flex justify-start">
                    <motion.div
                      className="origin-center"
                      variants={{
                        hidden: {
                          opacity: isLargeScreen ? 0 : 1,
                          y: isLargeScreen ? 15 : 0,
                          pointerEvents: isLargeScreen ? "none" : "auto",
                        },
                        visible: {
                          opacity: isLargeScreen ? 0 : 1,
                          y: isLargeScreen ? 15 : 0,
                          pointerEvents: isLargeScreen ? "none" : "auto",
                        },
                        hover: {
                          opacity: 1,
                          y: 0,
                          pointerEvents: "auto",
                        }
                      }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="inline-block">
                        <Button text={item.cta} href={`/service/${item.slug}`} />
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
