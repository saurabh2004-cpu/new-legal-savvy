import ServiceHero from "@/components/service-details/ServiceHero";
import AboutService from "@/components/service-details/AboutService";
import ServiceFooterActions from "@/components/service-details/ServiceFooterActions";
import OurServices from "@/components/common/OurServices";
import AssistanceSection from "@/components/service-details/AssistanceSection";
import BookConsultation from "@/components/common/BookConsultationSection";
import LocationsSection from "@/components/common/LocationSection";

import type { Metadata } from "next";
import { getServiceById, getAllServices } from "@/services/serviceServices";
import Hero from "@/components/service-details/Hero";

// export const metadata: Metadata = {
//     title: "Services Details Legal Savvy- Debt Settlement Services",
//     description:
//         "Get expert legal debt settlement services across India. Reduce your loan burden and get relief from harassment with proven settlement strategies.",
// }

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const { id } = await searchParams;

    let serviceresponse = null;
    if (id) {
        serviceresponse = await getServiceById(id);
    }

    if (!serviceresponse || !serviceresponse.title) {
        return {
            title: "Legal Savvy",
            description: "Professional legal advocacy firm.",
        };
    }

    return {
        title: serviceresponse.title.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
        description: serviceresponse.description || "Professional legal advocacy firm.",
    };
}

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ id?: string }>;
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
    }

    // Fallback to match slug if ID was not provided or not found
    if (!serviceresponse && slug) {
        const allServices = await getAllServices();
        if (allServices) {
            serviceresponse = allServices.find((s: any) => {
                const sSlug = (s.title || s.title || "")
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
                return sSlug === slug;
            });
        }
    }

    return (
        <div className="bg-[#D9D9D9] min-h-screen">
            <Hero service={serviceresponse} className="md:h-[calc(70vh-3rem)] lg:h-[calc(40vh-3rem)] xl:h-[calc(105vh-3rem)]" />
            <AboutService service={serviceresponse} />
            <ServiceFooterActions />
            <OurServices
                servicesData={servicesData}
                heading="Related Services"
                className="bg-[#1D2540] pb-12"
            />
            <AssistanceSection />
            <BookConsultation />
            <LocationsSection className="py-2" />
        </div>
    );
}