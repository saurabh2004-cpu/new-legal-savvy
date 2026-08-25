"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { getAllServices } from "@/services/serviceServices";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Button from "../utils/Button";
import { isLocalBackendImage } from "@/utils/isLocalBackendImage";
import { getImageUrl } from "@/utils/getImageUrl";

/* ─── Types ─────────────────────────────────────────────── */

interface RelatedService {
    id: number | string;
    label: string;
}

interface ServiceCardData {
    id: number | string;
    tag: string;
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
    relatedServices: RelatedService[];
}

interface ServiceCardProps {
    card: ServiceCardData;
}

/* ─── Data ───────────────────────────────────────────────── */

const SERVICE_CARDS: ServiceCardData[] = [
    {
        id: 1,
        tag: "SERVICE",
        imageSrc: "/service/service-card-1.png",
        imageAlt: "Personal Loan Assistance",
        title: "Personal Loan Assistance",
        description:
            "Get reliable support for personal loan applications, eligibility checks, document verification, repayment guidance, and loan process assistance. Legal Savvy helps individuals choose the right loan option based on their financial needs.",
        buttonLabel: "Apply Now",
        buttonHref: "#",
        relatedServices: [
            { id: 1, label: "Loan Eligibility Check" },
            { id: 2, label: "Loan Eligibility Check" },
            { id: 3, label: "EMI Guidance" },
            { id: 4, label: "EMI Guidance" },
        ],
    },
    {
        id: 2,
        tag: "SERVICE",
        imageSrc: "/service/service-card-1.png",
        imageAlt: "Business Loan Assistance",
        title: "Business Loan Assistance",
        description:
            "Legal Savvy helps business owners, startups, and self-employed professionals with business loan guidance, required documents, eligibility support, and application assistance for smooth loan processing.",
        buttonLabel: "Apply Now",
        buttonHref: "#",
        relatedServices: [
            { id: 1, label: "MSME Loan Support" },
            { id: 2, label: "Startup Loan Guidance" },
            { id: 3, label: "Business Document Review" },
            { id: 4, label: "Loan Application Assistance" },
        ],
    },
    {
        id: 3,
        tag: "SERVICE",
        imageSrc: "/service/service-card-1.png",
        imageAlt: "Business Loan Assistance",
        title: "Business Loan Assistance",
        description:
            "Legal Savvy helps business owners, startups, and self-employed professionals with business loan guidance, required documents, eligibility support, and application assistance for smooth loan processing.",
        buttonLabel: "Apply Now",
        buttonHref: "#",
        relatedServices: [
            { id: 1, label: "MSME Loan Support" },
            { id: 2, label: "Startup Loan Guidance" },
            { id: 3, label: "Business Document Review" },
            { id: 4, label: "Loan Application Assistance" },
        ],
    },
    {
        id: 4,
        tag: "SERVICE",
        imageSrc: "/service/service-card-1.png",
        imageAlt: "Business Loan Assistance",
        title: "Business Loan Assistance",
        description:
            "Legal Savvy helps business owners, startups, and self-employed professionals with business loan guidance, required documents, eligibility support, and application assistance for smooth loan processing.",
        buttonLabel: "Apply Now",
        buttonHref: "#",
        relatedServices: [
            { id: 1, label: "MSME Loan Support" },
            { id: 2, label: "Startup Loan Guidance" },
            { id: 3, label: "Business Document Review" },
            { id: 4, label: "Loan Application Assistance" },
        ],
    },
];

/* ─── Sub-components ─────────────────────────────────────── */

function BulletIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 mt-0.5"
        >
            <circle cx="9" cy="9" r="8" stroke="#555" strokeWidth="1.4" fill="none" />
            <circle cx="9" cy="9" r="3" fill="#555" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
        >
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

const AsteriskIcon = () => (
    <svg
        width="30"
        height="30"
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="feature-sticky-icon text-[#363D4F] w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
    >
        <path
            d="M496 254L268.6 254L484.9 183.7L483.6 179.9L267.4 250.2L451.3 116.6L449 113.3L265 247L398.7 63L395.4 60.7L261.8 244.6L332.1 28.4L328.3 27.1L258 243.4L258 16L254 16L254 243.4L183.7 27.1L179.9 28.4L250.2 244.6L116.6 60.7L113.3 63L247 247L63 113.3L60.7 116.6L244.6 250.2L28.4 179.9L27.1 183.7L243.4 254L16 254L16 258L243.4 258L27.1 328.3L28.4 332.1L244.6 261.8L60.7 395.4L63 398.7L247 265L113.3 449L116.6 451.3L250.2 267.4L179.9 483.6L183.7 484.9L254 268.6L254 496L258 496L258 268.6L328.3 484.9L332.1 483.6L261.8 267.4L395.4 451.3L398.7 449L265 265L449 398.7L451.3 395.4L267.4 261.8L483.6 332.1L484.9 328.3L268.6 258L496 258L496 254Z"
            fill="currentColor"
        />
    </svg>
);

function ServiceTag({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-5 mb-4">
            {/* Decorative snowflake / asterisk icon */}
            <div className="bg-[#E6DCD6] rounded-xl p-3">
                <AsteriskIcon />
            </div>
            <span className="text-[#555] tracking-[0%] uppercase font-sans font-medium text-[20px] leading-[100%]">
                {label}
            </span>
        </div>
    );
}

function ServiceCard({ card }: ServiceCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "start center"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 20,
        restDelta: 0.001,
    });

    const y = useTransform(smoothProgress, [0, 1], [100, 0]);
    const opacity = useTransform(smoothProgress, [0, 0.8], [0, 1]);

    return (
        <motion.div
            ref={cardRef}
            style={{ y, opacity }}
            className="bg-[#CDC2BB] rounded-xl p-5 sm:p-7 lg:p-12 flex flex-col lg:flex-row gap-5 lg:gap-6"
        >
            {/* LEFT — image + content */}
            <div className="flex flex-col sm:flex-row lg:flex-row gap-5 flex-1 min-w-0">
                {/* Image */}
                <div className="relative flex-shrink-0 w-full sm:w-[240px] xl:h-[26.5rem] lg:w-[280px] xl:w-[29.5rem] rounded-[30px] overflow-hidden aspect-[473/425]">
                    <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        unoptimized={isLocalBackendImage(card.imageSrc)}
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 240px, 320px"
                    />
                </div>

                {/* Text content */}
                <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                    <div>
                        <ServiceTag label={card.tag} />
                    </div>
                    <div>
                        <h2 className="text-[#1a1a1a] mb-3 text-[24px] leading-[100%] leading-sung">
                            <Link href={card.buttonHref} className="hover:underline">
                                {card.title}
                            </Link>
                        </h2>

                        <p className="geist-regular text-[#555] mb-6 text-[16px] leading-[100%] leading-[120%]">
                            {card.description}
                        </p>

                        <div>
                            <Button text={card.buttonLabel} href={card.buttonHref} />
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT — related services panel */}
            {card.relatedServices.length > 0 && <div
                className="bg-[#C6BAB2] min-h-40 rounded-[18px] p-5 lg:w-[220px] xl:w-[300px] flex flex-col justify-between flex-shrink-0"
            >
                <p className="geist-regular text-[#444] text-[20px] leading-[100%] leading-sung">
                    Related Services:
                </p>

                <ul className="flex flex-wrap gap-4 mt-8">
                    {card.relatedServices.map((service) => (
                        <li key={service.id} className="flex items-center gap-2.5">
                            <BulletIcon />
                            <span className="text-[#000000b5] geist-regular text-[15px]">
                                {service.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>}
        </motion.div>
    );
}

/* ─── Main export ────────────────────────────────────────── */
interface ServiceCardsProps {
    cards?: ServiceCardData[];
}

export default function ServiceCards({ cards: initialCards }: ServiceCardsProps) {
    const [cards, setCards] = useState<ServiceCardData[]>(initialCards || SERVICE_CARDS);
    const [loading, setLoading] = useState(!initialCards);

    useEffect(() => {
        if (initialCards) return;

        async function fetchServices() {
            try {
                const data = await getAllServices();
                if (data && data.length > 0) {
                    const mappedCards = data.map((s: any, index: number) => {
                        return {
                            id: s._id || index,
                            tag: s.name || "SERVICE",
                            imageSrc: s.image ? getImageUrl(s.image) : "/service/service-card-1.png",
                            imageAlt: s.title,
                            title: s.title,
                            description: s.description,
                            buttonLabel: "Apply Now",
                            buttonHref: `/service/${s.slug}`,
                            relatedServices: (s.relatedServices || []).map((rs: any, rsIndex: number) => ({
                                id: rs._id || rsIndex,
                                label: rs.title || rs.name,
                            })),
                        };
                    });
                    setCards(mappedCards);
                }
            } catch (error) {
                console.error("Error fetching services", error);
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, [initialCards]);

    if (loading) {
        return <div className="w-full flex justify-center p-10 text-[#555]">Loading services...</div>;
    }

    return (
        <section className="w-full px-2 lg:pt-8 flex flex-col gap-2">
            {cards.map((card) => (
                <ServiceCard key={card.id} card={card} />
            ))}
        </section>
    );
}

export type { ServiceCardData, RelatedService };