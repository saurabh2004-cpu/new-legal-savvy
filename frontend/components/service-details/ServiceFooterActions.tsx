"use client";

import React from "react";
import { User, Mail, Phone, Compass, Headphones } from "lucide-react";

export default function ServiceFooterActions() {
    return (
        <section className="w-full py-1 px-2">
            <div className="w-full max-w-8xl mx-auto rounded-xl p-3 sm:p-5 md:p-8 lg:px-16 bg-[#E6DCD6]">
                <div className="w-full flex flex-col gap-4 geist-medium">
                    {/* Card 1: Contact Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:p-4 md:px-8 bg-[#FAF6F0] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.005] transition-all duration-300">
                        <div className="flex items-center gap-3.5 text-black">
                            <User size={18} strokeWidth={2} className="text-black/80 shrink-0" />
                            <span className="text-[16px] md:text-[18px] lg:text-[20px] leading-none tracking-normal">
                                Contact
                            </span>
                        </div>
                        <div className=" geist-regular flex items-center gap-2.5 sm:gap-3 flex-wrap">
                            <button className="flex items-center gap-2 border border-black/20 hover:bg-black/5 hover:border-black/50 rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 text-black transition-all active:scale-95">
                                <Mail size={16} strokeWidth={2} className="shrink-0" />
                                <span className="text-[14px] md:text-[16px] lg:text-[18px] leading-[1.2] tracking-normal">
                                    Email us
                                </span>
                            </button>
                            <button className="flex items-center gap-2 border border-black/20 hover:bg-black/5 hover:border-black/50 rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 text-black transition-all active:scale-95">
                                <Phone size={16} strokeWidth={2} className="shrink-0" />
                                <span className="text-[14px] md:text-[16px] lg:text-[18px] leading-[1.2] tracking-normal">
                                    Call our advisor
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Card 2: Easy Process Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:p-4 md:px-8 bg-[#FAF6F0] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.005] transition-all duration-300">
                        <div className="flex items-center gap-3.5 text-black shrink-0">
                            <Compass size={18} strokeWidth={2} className="text-black/80 shrink-0" />
                            <span className="text-[16px] md:text-[18px] lg:text-[20px] leading-none tracking-normal">
                                Easy Process
                            </span>
                        </div>
                        <p className="text-[15px] md:text-[17px] lg:text-[20px] leading-[1.4] lg:leading-none tracking-normal text-[#2D3139] text-left sm:text-right">
                            Share your details online or visit our office for easy loan guidance.
                        </p>
                    </div>

                    {/* Card 3: Quick Support Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:p-4 md:px-8 bg-[#FAF6F0] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.005] transition-all duration-300">
                        <div className="flex items-center gap-3.5 text-black shrink-0">
                            <Headphones size={18} strokeWidth={2} className="text-black/80 shrink-0" />
                            <span className="text-[16px] md:text-[18px] lg:text-[20px] leading-none tracking-normal">
                                Quick Support
                            </span>
                        </div>
                        <p className="text-[15px] md:text-[17px] lg:text-[20px] leading-[1.4] lg:leading-none tracking-normal text-[#2D3139] text-left sm:text-right">
                            Get quick support for eligibility, documents, EMI, and loan application guidance.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
