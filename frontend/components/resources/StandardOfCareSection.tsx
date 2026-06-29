"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, CircleCheck } from "lucide-react";

interface StandardOfCareProps {
  title?: string;
  imageSrc?: string;
  label1?: string;
  label2?: string;
}

const features = [
  "Experienced Legal Guidance You Can Trust",
  "Clear Advice At Every Step Of Your Case",
  "Transparent Fees, No Hidden Charges",
  "Dedicated Legal Experts For Every Matter",
  "Proven Expertise Across Legal Matters",
  "Clear Communication And Upfront Pricing",
];

export default function StandardOfCareSection({
  title = "Real cases that reflect our standard of legal excellence",
  imageSrc = "/resources/legal_care_office.png",
  label1 = "PROVEN",
  label2 = "CARE",
}: StandardOfCareProps) {
  return (
    <section className="w-full max-w-[97vw] mx-auto  flex flex-col gap-4 sm:gap-6">
      {/* ROW 1 */}
      <div className="flex flex-col-reverse xl:flex-row gap-4 sm:gap-6">
        {/* CARD 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full xl:w-[40%] bg-[#E6DCD6] rounded-[1.875rem] py-8 sm:py-12 lg:py-16 flex flex-col gap-8 justify-center items-center text-center md:min-h-[320px] lg:min-h-[420px]"
        >
          {/* Labels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center overflow-hidden"
          >
            <span className="bg-[#CDC2BB] text-black px-4.5 py-2 rounded-lg font-mono font-medium text-base leading-none tracking-normal uppercase">
              {label1}
            </span>

            <span className="bg-[#363D4F] text-white px-4.5 py-2 rounded-lg font-mono font-medium text-base leading-none tracking-normal uppercase">
              {label2}
            </span>
          </motion.div>

          {/* Heading */}
          <h2
            className="
            font-[Geist]
            font-semibold
            text-[1.5rem]
            md:text-[2.25rem]
            lg:text-[2.5rem]
            leading-[120%]
            tracking-[0%]
            text-center
            text-[#0F172A]
            max-w-[16ch]
          "
          >
            {title}
          </h2>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            relative
            w-full
            h-[20rem]
            md:h-[30rem]
            xl:w-[50.4375rem]
            xl:h-[36.5rem]
            rounded-[1.875rem]
            overflow-hidden
            group
          "
        >
          <Image
            src={imageSrc}
            alt="Legal care"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      </div>

      {/* ROW 2 */}
      <div className="flex  flex-col xl:flex-row gap-4 sm:gap-6">
        {/* CARD 3 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="
              relative
              w-full
              h-[20rem]
              md:h-[30rem]
              xl:w-[50.4375rem]
              xl:h-[36.5rem]
              rounded-[1.875rem]
              overflow-hidden
              group
            "
        >
          <Image
            src={imageSrc}
            alt="Legal office"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>

        {/* CARD 4 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="w-full xl:w-[40%] bg-[#F3EFEA] rounded-[1.875rem] py-6 md:py-0 flex flex-col justify-center min-h-[320px] lg:min-h-[420px]"
        >
          <div className="flex flex-col divide-y divide-[#0F172A]/10 w-full max-w-[28rem] mx-auto">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="flex items-center gap-4 py-4 lg:py-8"
              >
                <div className="shrink-0">
                  <CircleCheck
                    size={25}
                    className="text-[#F3EFEA] fill-[#363D4F]"
                  />
                </div>

                <p
                  className="
                  font-[Geist]
                  font-normal
                  text-[1.1875rem]
                  leading-[100%]
                  tracking-[0%]
                  capitalize
                  text-[#0F172A]
                "
                >
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}