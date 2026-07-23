'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024);

        check();
        window.addEventListener("resize", check);

        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <motion.div
            key={isDesktop ? "desktop" : "mobile"}
            className="group flex flex-col gap-1 rounded-xl overflow-hidden"
            initial={isDesktop ? "rest" : false}
            whileHover={isDesktop ? "hover" : undefined}
        >
            {/* Team Photo */}
            <div className="relative w-full h-[19.375rem] md:h-[18.125rem] lg:h-[22.125rem] 2xl:h-[24.125rem] overflow-hidden rounded-xl">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>

            {/* Info Card */}
            <div className="relative p-4 md:p-6 bg-[#cdc2bb] rounded-xl overflow-hidden min-h-[200px] flex flex-col justify-between">
                {/* Content */}
                <motion.div
                    variants={
                        isDesktop
                            ? {
                                rest: { y: 0 },
                                hover: {
                                    y: -32,
                                    transition: {
                                        duration: 0.75,
                                        ease: [0.22, 1, 0.36, 1],
                                    },
                                },
                            }
                            : undefined
                    }
                >
                    {/* Name */}
                    <h3 className="font-[Geist] text-[1.25rem] font-medium text-black mt-4">
                        {member.name}
                    </h3>

                    {/* Title */}
                    <p className="font-mono text-[1rem] font-medium uppercase text-black mb-3 opacity-70">
                        {member.title}
                    </p>

                    {/* Description */}
                    <p className="font-[Geist] text-[1rem] text-black mb-3">
                        {member.description}
                    </p>

                    {/* Contact Links */}
                    <motion.div
                        className="flex gap-5 text-black/70 mt-4"
                        variants={
                            isDesktop
                                ? {
                                    rest: {},
                                    hover: {
                                        transition: {
                                            staggerChildren: 0.08,
                                        },
                                    },
                                }
                                : undefined
                        }
                    >
                        {/* ABOUT */}
                        <motion.a
                            variants={
                                isDesktop
                                    ? {
                                        rest: { opacity: 0, y: 15 },
                                        hover: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.45,
                                                ease: [0.22, 1, 0.36, 1],
                                            },
                                        },
                                    }
                                    : undefined
                            }
                            className="font-mono text-sm underline hover:text-black transition-colors"
                            href="#"
                        >
                            ABOUT
                        </motion.a>

                        {/* SOCIAL */}
                        <motion.a
                            variants={
                                isDesktop
                                    ? {
                                        rest: { opacity: 0, y: 15 },
                                        hover: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.45,
                                                ease: [0.22, 1, 0.36, 1],
                                            },
                                        },
                                    }
                                    : undefined
                            }
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-sm underline hover:text-black transition-colors"
                        >
                            SOCIAL
                        </motion.a>

                        {/* EMAIL */}
                        <motion.a
                            variants={
                                isDesktop
                                    ? {
                                        rest: { opacity: 0, y: 15 },
                                        hover: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.45,
                                                ease: [0.22, 1, 0.36, 1],
                                            },
                                        },
                                    }
                                    : undefined
                            }
                            href={`mailto:${member.email}`}
                            className="font-mono text-sm underline hover:text-black transition-colors"
                        >
                            EMAIL
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function TeamSection() {
    return (
        <section className="w-full py-1 px-2">
            <div className="max-w-8xl mx-auto rounded-xl bg-[#D8D0CA] px-4 sm:px-6 lg:px-[72px] py-12">
                {/* Header with Tabs */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center overflow-hidden"
                    >
                        <span className="bg-[#CDC2BB] text-black px-[18px] py-2 rounded-lg font-mono font-medium text-base leading-none tracking-normal uppercase">
                            OUR
                        </span>
                        <span className="bg-[#363D4F] text-white px-[18px] py-2 rounded-lg font-mono font-medium text-base leading-none tracking-normal uppercase">
                            TEAM
                        </span>
                    </motion.div>
                </div>

                {/* Content Block */}
                <div className="text-center mb-12 md:mb-16 text-black">
                    <h2 className="font-[Geist] text-[1.3rem] md:text-[1.5rem] lg:text-[2rem] xl:text-[2.5rem] font-medium leading-[120%] tracking-[0%] text-center mb-4">
                        Smart legal guidance focused on clarity and trust
                    </h2>

                    <p className="font-[Geist] text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] 2xl:text-[1rem] font-normal leading-[100%] tracking-[0%] text-center max-w-5xl mx-auto">
                        Legal Savvy provides practical legal support for individuals and businesses with a clear, client-first approach. From consultation and documentation to contracts, compliance, and dispute guidance, we help you make confident legal decisions.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {teamMembers.map((member) => (
                        <CardWithAnimation key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
}
