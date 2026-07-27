"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../utils/SectionHeading";

interface FaqItem {
    question: string;
    answer: string;
}

const FAQ_DATA: FaqItem[] = [
    {
        question: "What treatments do you offer?",
        answer: "We offer a full range of dental treatments under one roof, including dental implants, orthodontics (Invisalign and fixed braces), teeth whitening, porcelain veneers, smile design, crowns and bridges, composite bonding, and preventive and general dentistry. Our multidisciplinary team covers all dental specialties without the need for external referrals."
    },
    {
        question: "How do I book as a new patient?",
        answer: "We accept new patients and welcome patients from all backgrounds, including those who have not visited a dentist in a long time. We recommend booking an initial consultation as a first step — this gives us time to carry out a full assessment, understand your dental history and goals, and discuss all available treatment options without pressure. You can book online or call our reception team directly."
    },
    {
        question: "How does the treatment planning process work?",
        answer: "Every treatment begins with a thorough examination, intraoral photographs, and the relevant diagnostic imaging (digital X-rays or 3D CBCT scan). From this assessment, we prepare a written treatment plan outlining all proposed procedures, sequencing, expected timelines, and full cost breakdown before any clinical work begins. You are never committed to anything without your explicit agreement."
    },
    {
        question: "How long does treatment take?",
        answer: "It depends on the treatment. Teeth whitening and composite bonding can often be completed in a single appointment. Porcelain veneers typically require two to three visits. Dental implants involve a phased process over three to six months, depending on bone condition and the restoration chosen. Orthodontic treatment ranges from six months to two years. We will give you a clear timeline at your consultation."
    }
];

export default function QnaSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <section className="w-full py-1 px-2">
            <div className="w-full max-w-8xl mx-auto py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-[#CDC2BB] rounded-xl overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <SectionHeading title="Frequently asked questions" />
                    </div>

                    {/* FAQ Accordions List */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {FAQ_DATA.map((item, idx) => {
                            const isOpen = openIndex === idx;

                            return (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                                        }
                                    }}
                                    className="flex gap-4 items-center"
                                >
                                    {/* Left Index Badge */}
                                    <div className="bg-[#363D4F] transition-colors duration-300 rounded-[1rem] px-5 py-4 sm:px-7 sm:py-5 flex flex-col cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                                        {idx + 1}
                                    </div>

                                    {/* Accordion Box */}
                                    <div onClick={() => toggleIndex(idx)} className="flex-1 bg-[#E6DCD6] transition-colors duration-300 rounded-[1rem] px-5 py-4 sm:px-7 sm:py-5 flex flex-col cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                                        {/* Question & Toggle Icon */}
                                        <div className="flex justify-between items-center gap-4">
                                            <p className="geist-regular text-[0.9rem] md:text-[1.125rem] lg:text-[1.25rem] xl:text-[1.5rem] leading-[100%] tracking-[0%] text-black">
                                                {item.question}
                                            </p>

                                            <motion.div
                                                animate={{ rotate: isOpen ? 45 : 0 }}
                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                className="shrink-0 flex items-center justify-center"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current text-[#ff3b30]"
                                                >
                                                    <path d="M23 11H13V1a1 1 0 0 0-1-1 1 1 0 0 0-1 1v10H1a1 1 0 0 0-1 1 1 1 0 0 0 1 1h10v10a1 1 0 0 0 1 1 1 1 0 0 0 1-1V13h10a1 1 0 0 0 1-1 1 1 0 0 0-1-1Z" />
                                                </svg>
                                            </motion.div>
                                        </div>

                                        {/* Expandable Answer */}
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-4 text-black/70 geist-regular leading-relaxed text-[0.9rem] sm:text-[0.98rem]">
                                                        {item.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
