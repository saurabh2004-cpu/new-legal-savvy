'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaEnvelope, FaLinkedin, FaInfo } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface TeamMember {
    id: number;
    name: string;
    title: string;
    description: string;
    image: string;
    email: string;
    linkedin: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: 'Dr. James Whitfield',
        title: 'Corporate Law Consultant',
        description: 'Founder of Legal Savvy with 20+ years of experience in business law, contracts, company compliance, and legal advisory for growing businesses.',
        image: '/about/our-team-1.png',
        email: 'james@legalsavvy.com',
        linkedin: 'https://linkedin.com/in/james-whitfield',
    },
    {
        id: 2,
        name: 'Dr. James Whitfield',
        title: 'Corporate Law Consultant',
        description: 'Founder of Legal Savvy with 20+ years of experience in business law, contracts, company compliance, and legal advisory for growing businesses.',
        image: '/about/our-team-1.png',
        email: 'james@legalsavvy.com',
        linkedin: 'https://linkedin.com/in/james-whitfield',
    },
    {
        id: 3,
        name: 'Dr. James Whitfield',
        title: 'Corporate Law Consultant',
        description: 'Founder of Legal Savvy with 20+ years of experience in business law, contracts, company compliance, and legal advisory for growing businesses.',
        image: '/about/our-team-1.png',
        email: 'james@legalsavvy.com',
        linkedin: 'https://linkedin.com/in/james-whitfield',
    },
    {
        id: 4,
        name: 'Dr. James Whitfield',
        title: 'Corporate Law Consultant',
        description: 'Founder of Legal Savvy with 20+ years of experience in business law, contracts, company compliance, and legal advisory for growing businesses.',
        image: '/about/our-team-1.png',
        email: 'james@legalsavvy.com',
        linkedin: 'https://linkedin.com/in/james-whitfield',
    },
    {
        id: 5,
        name: 'Dr. James Whitfield',
        title: 'Corporate Law Consultant',
        description: 'Founder of Legal Savvy with 20+ years of experience in business law, contracts, company compliance, and legal advisory for growing businesses.',
        image: '/about/our-team-1.png',
        email: 'james@legalsavvy.com',
        linkedin: 'https://linkedin.com/in/james-whitfield',
    },
    {
        id: 6,
        name: 'Dr. James Whitfield',
        title: 'Corporate Law Consultant',
        description: 'Founder of Legal Savvy with 20+ years of experience in business law, contracts, company compliance, and legal advisory for growing businesses.',
        image: '/about/our-team-1.png',
        email: 'james@legalsavvy.com',
        linkedin: 'https://linkedin.com/in/james-whitfield',
    },
];

function CardWithAnimation({ member }: { member: TeamMember }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="rounded-2xl overflow-hidden flex flex-col gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Team Photo */}
            <div className="relative w-[90vw] h-[19.375rem] md:h-[18.125rem] lg:h-[22.125rem] xl:h-[22.125rem] 2xl:h-[24.125rem] md:w-[43.5vw] lg:w-[39.5vw] xl:w-[28.5vw] 2xl:w-[28.2vw] overflow-hidden rounded-xl">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>

            {/* Team Info */}
            <div className="p-6 md:p-7 bg-[#cdc2bb] rounded-xl overflow-hidden relative">
                {/* Name and Title */}
                <div className="mb-4 flex flex-col gap-3">
                    <h3 className="font-[Geist] text-[1.25rem] font-medium leading-[100%] tracking-[0%] text-black mb-1">
                        {member.name}
                    </h3>

                    <p className="font-mono text-[1rem] font-medium leading-[100%] tracking-[0%] uppercase text-black">
                        {member.title}
                    </p>
                </div>

                {/* Description - always visible */}
                <p className="font-[Geist] text-[1rem] font-normal leading-[100%] tracking-[0%] text-black mb-6">
                    {member.description}
                </p>

                {/* Contact Links - appears on hover */}
                <motion.div
                    className="flex gap-4 pt-4 text-black/67"
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 20,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ pointerEvents: isHovered ? "auto" : "none" }}
                >
                    <a
                        href="#"
                        className="flex items-center gap-2 font-mono text-[0.875rem] font-medium leading-[100%] tracking-[0%] underline transition-colors hover:text-slate-900"
                    >
                        <FaInfo className="w-4 h-4" />
                        <span>ABOUT</span>
                    </a>

                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-mono text-[0.875rem] font-medium leading-[100%] tracking-[0%] underline transition-colors hover:text-slate-900"
                    >
                        <FaLinkedin className="w-4 h-4" />
                        <span>SOCIAL</span>
                    </a>

                    <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 font-mono text-[0.875rem] font-medium leading-[100%] tracking-[0%] underline transition-colors hover:text-slate-900"
                    >
                        <FaEnvelope className="w-4 h-4" />
                        <span>EMAIL</span>
                    </a>
                </motion.div>
            </div>
        </div>
    );
}

export default function TeamSection() {
    const [activeTab, setActiveTab] = useState('team');

    return (
        <section className="w-full   ">
            <div className="max-w-[97vw] rounded-xl  bg-[#D8D0CA] mx-auto px-4 sm:px-6 lg:px-18 py-12">
                {/* Header with Tabs */}
                <div className="flex justify-center mb-8 md:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center overflow-hidden"
                    >
                        <span className="bg-[#CDC2BB] text-black px-4.5 py-2 rounded-lg font-mono font-medium text-base leading-none tracking-normal uppercase">
                            OUR
                        </span>
                        <span className="bg-[#363D4F] text-white px-4.5 py-2 rounded-lg font-mono font-medium text-base leading-none tracking-normal uppercase">
                            TEAM
                        </span>
                    </motion.div>

                </div>

                {/* Content Block */}
                <div className="text-center mb-12 md:mb-16 text-black">
                    <h2 className="font-[Geist] text-[1.3rem] md:text-[1.5rem] lg:text-[2rem] xl:text-[2.5rem] 2xL:text-[2.5rem] font-medium leading-[120%] tracking-[0%] text-center  mb-4 md:mb-6">
                        Smart legal guidance focused on clarity and trust
                    </h2>

                    <p className="font-[Geist] text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] 2xl:text-[1rem] font-normal leading-[100%] tracking-[0%] text-center  max-w-5xl mx-auto">
                        Legal Savvy provides practical legal support for individuals and businesses with a clear, client-first approach. From consultation and documentation to contracts, compliance, and dispute guidance, we help you make confident legal decisions.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {teamMembers.map((member) => (
                        <CardWithAnimation key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
}
