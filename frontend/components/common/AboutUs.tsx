"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

interface AboutUsProps {
  buttonText1: string;
  buttonText2: string;
  buttonText3?: string;
  paragraph: string;
  paragraphMaxWidth?: string;
  className?: string;
}

export default function AboutUs({ buttonText1, buttonText2, buttonText3, paragraph, paragraphMaxWidth, className = "" }: AboutUsProps) {
  const words = paragraph ? paragraph.split(" ") : [];

  return (
    <section className={`w-full pb-1 px-2 ${className}`}>
      <div className={`max-w-8xl mx-auto py-10 lg:py-12 px-6 md:px-12 bg-[#E3DDD9] rounded-xl flex items-center justify-center overflow-hidden ${className}`}>
        <div className="flex flex-col items-center text-center">
          {/* Dual-Colored Brand Pill Tag */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center overflow-hidden"
          >
            <span className="bg-[#CDC2BB] text-black px-5 py-3 rounded-lg font-mono font-normal text-sm md:text-base leading-none tracking-normal uppercase">
              {buttonText1}
            </span>
            {buttonText2 && (
              <span className="bg-[#363D4F] text-white px-5 py-3 rounded-lg font-mono font-normal text-sm md:text-base leading-none tracking-normal uppercase">
                {buttonText2}
              </span>
            )}
          </motion.div>

          {/* High-Impact Central Description */}
          <motion.h2
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.03,
                  delayChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            // viewport={{ once: true, margin: "-100px" }}
            className={`geist-medium text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#0F172A] leading-[1] tracking-normal text-center mt-5 mb-5 ${paragraphMaxWidth}`}
          >
            {words.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: -30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          {/* Primary CTA Button */}
          {buttonText3 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button text={buttonText3} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}


// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { usePathname } from "next/navigation";
// import Button from "../ui/button";

// interface AboutUsProps {
//   buttonText1: string;
//   buttonText2: string;
//   buttonText3?: string;
//   paragraph: string[];
//   className?: string;
// }

// export default function AboutUs({ buttonText1, buttonText2, buttonText3, paragraph, className }: AboutUsProps) {
//   const pathname = usePathname()
//   const isAboutPage = pathname === "/about"

//   return (
//     <section className="w-full pb-1 px-2">
//       <div className={`max-w-8xl mx-auto py-10 lg:py-12 px-6 md:px-12 bg-[#E3DDD9] rounded-xl flex items-center justify-center overflow-hidden ${className}`}>
//         <div className="flex flex-col items-center text-center">
//           {/* Dual-Colored Brand Pill Tag */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//             className="inline-flex items-center overflow-hidden"
//           >
//             <span className="bg-[#CDC2BB] text-black px-5 py-3 rounded-lg font-mono font-normal text-sm md:text-base leading-none tracking-normal uppercase">
//               {buttonText1}
//             </span>
//             {buttonText2 && (
//               <span className="bg-[#363D4F] text-white px-5 py-3 rounded-lg font-mono font-normal text-sm md:text-base leading-none tracking-normal uppercase">
//                 {buttonText2}
//               </span>
//             )}
//           </motion.div>

//           {/* High-Impact Central Description */}
//           <motion.h2
//             variants={{
//               hidden: { opacity: 0 },
//               visible: {
//                 opacity: 1,
//                 transition: {
//                   staggerChildren: 0.18,
//                   delayChildren: 0.1,
//                 }
//               }
//             }}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             className="geist-medium text-xl md:text-3xl lg:text-5xl text-[#0F172A] leading-[1] md:leading-[1] tracking-normal text-center mt-5 mb-5 flex flex-col items-center gap-1.5"
//           >
//             {paragraph?.map((line, idx) => (
//               <span key={idx} className="block overflow-hidden py-1 font-geist-medium">
//                 <motion.span
//                   variants={{
//                     hidden: { opacity: 0, y: -30 },
//                     visible: {
//                       opacity: 1,
//                       y: 0,
//                       transition: {
//                         duration: 0.8,
//                         ease: [0.16, 1, 0.3, 1]
//                       }
//                     }
//                   }}
//                   className="block"
//                 >
//                   {line}
//                 </motion.span>
//               </span>
//             ))}
//           </motion.h2>

//           {/* Primary CTA Button with interactive animation */}
//           {buttonText3 && (
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
//             >
//               <Button text={buttonText3} />
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
