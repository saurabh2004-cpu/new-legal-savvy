"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Users, Sparkles, Tag, Check, Mail, Phone, User, Compass, Headphones } from "lucide-react";

interface AboutServiceProps {
    service?: {
        name: string;
        title: string;
        description: string;
        clientsAssisted?: string;
        highlight?: string;
        startingFrom?: string;
        fullDescription?: string;
        shortDescriptionPoints?: string[];
    } | null;
}

export default function AboutService({ service }: AboutServiceProps) {
    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 60, damping: 15 },
        },
    } as const;

    const textVariants = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 60, damping: 15 },
        },
    } as const;

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const listItemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    } as const;

    const footerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    } as const;

    const checklist = [
        "Eligibility Checking Based On Income, Credit Score, Employment Type, And Existing Loans.",
        "Guidance For Salaried, Self-Employed, And Business Applicants",
        "Assistance With Document Preparation And Application Form Support",
        "Help In Comparing Loan Offers, Interest Rates, Processing Fees, And Repayment Terms",
        "Support For Rejected Or Delayed Loan Applications By Identifying Possible Issues",
        "Clear Explanation Of EMI, Tenure, Repayment Schedule, And Loan Responsibilities",
    ];

    return (
        <motion.section
            className="w-full max-w-[97vw] mx-auto pt-16 pb-3 px-4 md:px-6 xl:px-0 font-sans"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
        >
            <div className="w-full  px-0 sm:px-6   mx-auto flex flex-col gap-16">

                {/* Top Section: Summary Card and About Content */}
                <div className="grid grid-cols-1 xl:grid-cols-16 gap-8 lg:gap-26 items-start xl:items-start">

                    {/* Left Column: Info Summary Card */}
                    <motion.div
                        className="w-full max-w-2xl xl:max-w-none mx-auto lg:mx-0 xl:col-span-6 bg-[#E6DCD6] rounded-[1.2rem] px-6 sm:px-8 py-6 sm:py-8"
                        variants={cardVariants}
                    >
                        <div className="flex flex-col">

                            {/* Service Row */}
                            <div className="flex justify-between items-start sm:items-center pb-5 mb-5 border-b border-black/10">
                                <div className="flex items-center gap-2.5 opacity-60">
                                    <FileText size={18} strokeWidth={1.5} className="shrink-0 text-black" />
                                    <span className="font-mono text-[11px] sm:text-[13px] font-bold tracking-[0.15em] uppercase text-black">Condition</span>
                                </div>
                                <span className="font-sans text-[16px] sm:text-[18px] font-normal leading-tight lg:leading-none tracking-normal text-black text-right pl-4">
                                    {service ? service.title : "Restorative Dentistry"}
                                </span>
                            </div>

                            {/* Clients Assisted Row */}
                            <div className="flex justify-between items-center py-3">
                                <div className="flex items-center gap-2.5 opacity-60">
                                    <Users size={18} strokeWidth={1.5} className="shrink-0 text-black" />
                                    <span className="font-mono text-[11px] sm:text-[13px] font-bold tracking-[0.15em] uppercase text-black">Patients Treated</span>
                                </div>
                                <span className="font-sans text-[16px] sm:text-[18px] font-normal leading-tight lg:leading-none tracking-normal text-black text-right pl-4">
                                    {service ? (service.clientsAssisted || "-") : "6,200+"}
                                </span>
                            </div>

                            {/* Highlight Row */}
                            <div className="flex justify-between items-center py-3">
                                <div className="flex items-center gap-2.5 opacity-60">
                                    <Sparkles size={18} strokeWidth={1.5} className="shrink-0 text-black" />
                                    <span className="font-mono text-[11px] sm:text-[13px] font-bold tracking-[0.15em] uppercase text-black">Highlight</span>
                                </div>
                                <span className="font-sans text-[16px] sm:text-[18px] font-normal leading-tight lg:leading-none tracking-normal text-black text-right pl-4">
                                    {service ? (service.highlight || "-") : "Function restored"}
                                </span>
                            </div>

                            {/* Starting From Row */}
                            <div className="flex justify-between items-center py-3">
                                <div className="flex items-center gap-2.5 opacity-60">
                                    <Tag size={18} strokeWidth={1.5} className="shrink-0 text-black" />
                                    <span className="font-mono text-[11px] sm:text-[13px] font-bold tracking-[0.15em] uppercase text-black">Starting From</span>
                                </div>
                                <span className="font-sans text-[16px] sm:text-[18px] font-normal leading-tight lg:leading-none tracking-normal text-black text-right pl-4">
                                    {service ? (service.startingFrom || "-") : "€80"}
                                </span>
                            </div>

                        </div>
                    </motion.div>

                    {/* Right Column: Text Content and Checklist */}
                    <motion.div
                        className="lg:col-span-8 flex flex-col gap-6 text-black"
                        variants={textVariants}
                    >
                        <h2 className="text-black font-sans text-[28px] md:text-[32px] lg:text-[36px] font-semibold leading-tight lg:leading-none tracking-normal">
                            About the service
                        </h2>

                        {service ? (
                            <p className="font-sans text-[15px] md:text-[17px] lg:text-[19px] font-normal leading-[1.4] lg:leading-[1.3] tracking-normal">
                                {service.fullDescription || service.description}
                            </p>
                        ) : (
                            <>
                                <p className="font-sans text-[15px] md:text-[17px] lg:text-[19px] font-normal leading-[1.4] lg:leading-[1.3] tracking-normal capitalize">
                                    Personal Loan Assistance Helps Individuals Understand Their Loan Eligibility, Prepare The Required Documents, Compare Available Lending Options, And Complete The Application Process Smoothly, Whether You Need Funds For Medical Expenses, Education, Travel, Home Renovation, Debt Consolidation, Or Urgent Personal Needs. Proper Guidance Can Help You Avoid Delays, Rejection, And Unnecessary Confusion.
                                </p>

                                <p className="font-sans text-[15px] md:text-[17px] lg:text-[19px] font-normal tracking-normal capitalize leading-[1.4] lg:leading-[1.3]">
                                    At Legal Savvy, Personal Loan Assistance Begins With A Clear Review Of Your Income, Credit Profile, Existing Obligations, And Loan Requirement. Our Team Helps You Understand The Suitable Loan Amount, Possible Repayment Options, Required Documentation, And Lender Conditions Before You Apply. We Focus On Transparency So That You Know The Process, Charges, And Responsibilities Involved.
                                </p>
                            </>
                        )}

                        {/* Checklist */}
                        <motion.ul
                            className="flex flex-col gap-4 my-2"
                            variants={listVariants}
                        >
                            {((service && service.shortDescriptionPoints && service.shortDescriptionPoints.length > 0) ? service.shortDescriptionPoints : checklist).map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start lg:items-center gap-3.5 font-sans text-[15px] md:text-[17px] lg:text-[19px] font-normal leading-none tracking-normal text-black"
                                    variants={listItemVariants}
                                >
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-[3px] border-black text-black shrink-0 mt-1 lg:mt-0.5">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    <span className="leading-[1.3] lg:leading-[1.2] tracking-normal">{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        {!service && (
                            <p className="font-sans text-[15px] md:text-[17px] lg:text-[19px] font-normal leading-[1.4] lg:leading-[1.3] tracking-normal capitalize">
                                Personal Loan Assistance At Legal Savvy Is Designed To Make The Borrowing Process Simple, Transparent, And Stress-Free. We Do Not Promise Guaranteed Approval, But We Help You Apply With The Right Documents, Correct Information, And Better Understanding Of Available Options So You Can Make An Informed Financial Decision.
                            </p>
                        )}
                    </motion.div>

                </div>


            </div>
            {/* Bottom Section: Footer Actions Container */}
            <motion.div
                className="bg-[#E6DCD6] w-full mt-12 rounded-xl p-3 sm:p-5 md:p-8"
                variants={footerVariants}
            >
                {/* Card 1: Contact Row */}
                <div className="flex flex-col gap-4 max-w-[1250px] mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:p-4 md:px-8 bg-[#FAF6F0] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.005] transition-all duration-300">
                        <div className="flex items-center gap-3.5 text-black font-semibold">
                            <User size={18} strokeWidth={2} className="text-black/80 shrink-0" />
                            <span className="font-sans text-[16px] md:text-[18px] lg:text-[20px] font-medium leading-none tracking-normal">Contact</span>
                        </div>
                        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                            <button className="flex items-center gap-2 border border-black/20 hover:bg-black/5 hover:border-black/50 rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 text-black transition-all active:scale-95">
                                <Mail size={16} strokeWidth={2} className="shrink-0" />
                                <span className="font-sans text-[14px] md:text-[16px] lg:text-[18px] font-normal leading-[1.2] tracking-normal">Email us</span>
                            </button>
                            <button className="flex items-center gap-2 border border-black/20 hover:bg-black/5 hover:border-black/50 rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 text-black transition-all active:scale-95">
                                <Phone size={16} strokeWidth={2} className="shrink-0" />
                                <span className="font-sans text-[14px] md:text-[16px] lg:text-[18px] font-normal leading-[1.2] tracking-normal">Call our advisor</span>
                            </button>
                        </div>
                    </div>

                    {/* Card 2: Easy Process Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:p-4 md:px-8 bg-[#FAF6F0] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.005] transition-all duration-300">
                        <div className="flex items-center gap-3.5 text-black font-semibold shrink-0">
                            <Compass size={18} strokeWidth={2} className="text-black/80 shrink-0" />
                            <span className="font-sans text-[16px] md:text-[18px] lg:text-[20px] font-medium leading-none tracking-normal">Easy Process</span>
                        </div>
                        <p className="font-sans text-[15px] md:text-[17px] lg:text-[20px] font-medium leading-[1.4] lg:leading-none tracking-normal text-[#2D3139] text-left sm:text-right">
                            Share your details online or visit our office for easy loan guidance.
                        </p>
                    </div>

                    {/* Card 3: Quick Support Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:p-4 md:px-8 bg-[#FAF6F0] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.005] transition-all duration-300">
                        <div className="flex items-center gap-3.5 text-black font-semibold shrink-0">
                            <Headphones size={18} strokeWidth={2} className="text-black/80 shrink-0" />
                            <span className="font-sans text-[16px] md:text-[18px] lg:text-[20px] font-medium leading-none tracking-normal">Quick Support</span>
                        </div>
                        <p className="font-sans text-[15px] md:text-[17px] lg:text-[20px] font-medium leading-[1.4] lg:leading-none tracking-normal text-[#2D3139] text-left sm:text-right">
                            Get quick support for eligibility, documents, EMI, and loan application guidance.
                        </p>
                    </div>
                </div>

            </motion.div>
        </motion.section>
    );
}
