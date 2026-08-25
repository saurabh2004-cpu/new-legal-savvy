import AboutService from "@/components/service-details/AboutService";
import ServiceFooterActions from "@/components/service-details/ServiceFooterActions";
import OurServices from "@/components/common/OurServices";
import AssistanceSection from "@/components/service-details/AssistanceSection";
import BookConsultation from "@/components/common/BookConsultationSection";
import Locations from "@/components/common/Locations";

import type { Metadata } from "next";
import { getServiceById, getServiceBySlug } from "@/services/serviceServices";
import Hero5 from "@/components/common/Hero5";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ id?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const { id } = await searchParams;

    let serviceresponse = null;
    if (id) {
        serviceresponse = await getServiceById(id);
    } else if (slug) {
        serviceresponse = await getServiceBySlug(slug);
    }

    if (!serviceresponse || !serviceresponse.title) {
        return {
            title: "Legal Savvy",
            description: "Professional legal advocacy firm.",
        };
    }

    return {
        title: serviceresponse.metaTitle || serviceresponse.title || "Legal Savvy",

        description:
            serviceresponse.metaDescription ||
            serviceresponse.description ||
            "Professional legal advocacy firm.",
    };
}

export default async function page({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const { id } = await searchParams;

    const servicesData = [
        {
            tag: "LOAN ISSUES",
            tagBg: "#FF3030",
            tagColor: "#FFFFFF",
            title: "Personal Loan Settlement",
            description: "If loan payments are piling up and causing stress, we've got your back. Our team works with you to find solutions, negotiate with creditors, and ease the burden. Let's tackle it together and get your finances back on track!",
            image: "/home/personal-loan-settlement.png",
            stats: [
                { label: "CASES", value: "2,500+" },
                { label: "EXPERTISE", value: "10+ YEARS" },
                { label: "SETTLEMENT RATE", value: "98.2%" }
            ],
            cta: "Consult our Expert",
            ctaBg: "bg-[#FF3030] hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30",
            ctaIconBg: "bg-white"
        },
        {
            tag: "BUSINESS LOAN ISSUES",
            tagBg: "#FF3030",
            tagColor: "#FFFFFF",
            title: "Business Loan Settlement",
            description: "If business loan payments are overwhelming you, we're here to help. Our team collaborates with you to find effective solutions, negotiate with lenders, and reduce your financial stress. Together, we can ease the burden and get your business.",
            image: "/home/business-loan-settlement.png",
            stats: [
                { label: "CASES", value: "1,400+" },
                { label: "EXPERTISE", value: "12+ YEARS" },
                { label: "DEBT RELIEF", value: "₹45 CR+" }
            ],
            cta: "Consult our Expert",
            ctaBg: "bg-[#DFD4CB] hover:bg-[#d3c7be] text-black",
            ctaIconBg: "bg-white/90"
        },
    ];

    let serviceresponse = null;
    if (id) {
        serviceresponse = await getServiceById(id);
    } else if (slug) {
        serviceresponse = await getServiceBySlug(slug);
    }

    return (
        <main className="bg-[#FFFFFF]">
            <Hero5
                service={serviceresponse}
                className="h-[85vh] lg:h-screen min-h-[600px]" />
            <AboutService service={serviceresponse} />
            <ServiceFooterActions />
            <OurServices
                servicesData={servicesData}
                heading="Related Services"
                className="bg-[#1D2540] pb-12"
            />
            <AssistanceSection />
            <BookConsultation />
            <Locations variant="cards" className="py-2" />
        </main>
    );
}