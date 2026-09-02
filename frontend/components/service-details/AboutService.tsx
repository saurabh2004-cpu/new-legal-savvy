"use client";

import React from "react";
import {
    FileText,
    Users,
    Sparkles,
    Tag,
    CheckCircle2,
} from "lucide-react";

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
    const checklist = [
        "Eligibility Checking Based On Income, Credit Score, Employment Type, And Existing Loans.",
        "Guidance For Salaried, Self-Employed, And Business Applicants",
        "Assistance With Document Preparation And Application Form Support",
        "Help In Comparing Loan Offers, Interest Rates, Processing Fees, And Repayment Terms",
        "Support For Rejected Or Delayed Loan Applications By Identifying Possible Issues",
        "Clear Explanation Of EMI, Tenure, Repayment Schedule, And Loan Responsibilities",
    ];

    const pointsToRender =
        service?.shortDescriptionPoints && service.shortDescriptionPoints.length > 0
            ? service.shortDescriptionPoints
            : checklist;

    return (
        <section className="w-full py-1 px-2">
            <div className="w-full max-w-8xl mx-auto py-8 sm:py-12 md:py-16 px-4 md:px-8 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Sidebar Info Card */}
                    <div className="flex flex-col gap-5 lg:sticky lg:top-2">
                        <div className="w-full max-w-xl bg-[#D4C8C0] rounded-[1.5rem] p-6 sm:p-8 flex flex-col gap-5">
                            {/* Row 1: Condition / Service */}
                            <div className="flex items-end justify-between">
                                <div className="flex items-center gap-3 text-black/60 pb-3">
                                    <FileText size={18} strokeWidth={1.5} />
                                    <span className="geist-mono-medium text-[16px] leading-none text-center text-[#00000094]">
                                        Service
                                    </span>
                                </div>
                                <div className="border-b border-black/15 pb-3 flex-1 ml-6 flex justify-end">
                                    <span className="geist-regular text-[17px] leading-none text-right text-[#000000B0]">
                                        {service ? service.title : "Restorative Dentistry"}
                                    </span>
                                </div>
                            </div>

                            {/* Row 2: Patients Treated */}
                            {service?.clientsAssisted && (
                                <div className="flex items-end justify-between">
                                    <div className="flex items-center gap-3 text-black/60 pb-3">
                                        <Users size={18} strokeWidth={1.5} />
                                        <span className="geist-mono-medium text-[16px] leading-none text-center text-[#00000094]">
                                            Patients Treated
                                        </span>
                                    </div>
                                    <div className="border-b border-black/15 pb-3 flex-1 ml-6 flex justify-end">
                                        <span className="geist-regular text-[17px] leading-none text-right text-[#000000B0]">
                                            {service ? service.clientsAssisted || "-" : "6,200+"}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Row 3: Highlight */}
                            {service?.highlight && (
                                <div className="flex items-end justify-between">
                                    <div className="flex items-center gap-3 text-black/60 pb-3">
                                        <Sparkles size={18} strokeWidth={1.5} />
                                        <span className="geist-mono-medium text-[16px] leading-none text-center text-[#00000094]">
                                            Highlight
                                        </span>
                                    </div>
                                    <div className="border-b border-black/15 pb-3 flex-1 ml-6 flex justify-end">
                                        <span className="geist-regular text-[17px] leading-none text-right text-[#000000B0]">
                                            {service ? service.highlight || "-" : "Function restored"}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Row 4: Starting From */}
                            {service?.startingFrom && (
                                <div className="flex items-end justify-between">
                                    <div className="flex items-center gap-3 text-black/60 pb-3">
                                        <Tag size={18} strokeWidth={1.5} />
                                        <span className="geist-mono-medium text-[16px] leading-none text-center text-[#00000094]">
                                            Starting From
                                        </span>
                                    </div>
                                    <div className="border-b border-black/15 pb-3 flex-1 ml-6 flex justify-end">
                                        <span className="geist-regular text-[17px] leading-none text-right text-[#000000B0]">
                                            {service ? service.startingFrom || "-" : "€80"}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Main Content */}
                    <div className="flex flex-col">
                        <h2 className="geist-semibold text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] text-black mb-8">
                            About the service
                        </h2>

                        <div className="geist-regular text-[16px] md:text-[18px] lg:text-[19px] leading-none text-black/80 flex flex-col gap-6">
                            {service ? (
                                <p className="leading-[1.4]">{service.fullDescription || service.description}</p>
                            ) : (
                                <>
                                    <p className="leading-[1.4]">
                                        Personal Loan Assistance helps individuals understand their loan eligibility,
                                        prepare the required documents, compare available lending options, and complete
                                        the application process smoothly, whether you need funds for medical expenses,
                                        education, travel, home renovation, debt consolidation, or urgent personal
                                        needs. Proper guidance can help you avoid delays, rejection, and unnecessary
                                        confusion.
                                    </p>

                                    <p className="leading-[1.4]">
                                        At Legal Savvy, Personal Loan Assistance begins with a clear review of your
                                        income, credit profile, existing obligations, and loan requirement. Our team
                                        helps you understand the suitable loan amount, possible repayment options,
                                        required documentation, and lender conditions before you apply. We focus on
                                        transparency so that you know the process, charges, and responsibilities
                                        involved.
                                    </p>
                                </>
                            )}

                            {/* Checklist */}
                            <ul className="flex flex-col gap-6 my-4">
                                {pointsToRender.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="shrink-0 mt-1">
                                            <CheckCircle2 size={22} strokeWidth={1.5} className="text-black" />
                                        </div>
                                        <span className="leading-snug">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {!service && (
                                <p className="leading-[1.4]">
                                    Personal Loan Assistance at Legal Savvy is designed to make the borrowing process
                                    simple, transparent, and stress-free. We do not promise guaranteed approval, but we
                                    help you apply with the right documents, correct information, and better
                                    understanding of available options so you can make an informed financial
                                    decision.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
