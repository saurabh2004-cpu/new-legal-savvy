import AboutService from "@/components/service-details/AboutService";
import ServiceFooterActions from "@/components/service-details/ServiceFooterActions";
import OurServices from "@/components/common/OurServices";
import AssistanceSection from "@/components/service-details/AssistanceSection";
import BookConsultation from "@/components/common/BookConsultationSection";
import Locations from "@/components/common/Locations";
import QnaSection from "@/components/contact-us/QnaSection";
import FAQJsonLd from "@/components/common/FAQJsonLd";

import type { Metadata } from "next";
import { getServiceById, getServiceBySlug, getAllServices } from "@/services/serviceServices";
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

const getFrontImageUrl = (imagePath: string) => {
    if (!imagePath) return "/service/service-card-1.png";
    if (imagePath.startsWith("http")) return imagePath;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
    const baseUrl = backendUrl.replace(/\/api\/v1\/?$/, "");
    return `${baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

export default async function page({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const { id } = await searchParams;

    let serviceresponse = null;
    if (id) {
        serviceresponse = await getServiceById(id);
    } else if (slug) {
        serviceresponse = await getServiceBySlug(slug);
    }

    const services = await getAllServices();
    const currentServiceId = serviceresponse?._id || serviceresponse?.id;

    // const related = (services || [])
    //     .filter((s: any) => s.showOnHomePage && (s._id || s.id) !== currentServiceId)
    //     .sort((a: any, b: any) => (a.sequence || 0) - (b.sequence || 0))
    //     .slice(0, 2);
    const related = (services || [])
        .filter((s: any) => (s._id || s.id) !== currentServiceId)
        .sort((a: any, b: any) => (a.sequence || 0) - (b.sequence || 0));

    const servicesData = related.map((s: any) => {
        return {
            tag: s.homePage?.tag || "SERVICE",
            tagBg: "#FF3030",
            tagColor: "#FFFFFF",
            title: s.homePage?.title || s.title,
            description: s.homePage?.description || s.description,
            image: s.homePage?.image ? getFrontImageUrl(s.homePage.image) : getFrontImageUrl(s.image),
            stats: s.homePage?.stats || [],
            cta: "Consult our Expert",
            ctaBg: "bg-[#FF3030] hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30",
            ctaIconBg: "bg-white",
            slug: s.slug
        };
    });

    return (
        <main className="bg-[#FFFFFF]">
            <Hero5
                service={serviceresponse}
                className="h-[85vh] lg:h-screen min-h-[600px]" />
            <AboutService service={serviceresponse} />
            <ServiceFooterActions />
            {serviceresponse?.faqs && serviceresponse.faqs.length > 0 && (
                <>
                    <FAQJsonLd faqs={serviceresponse.faqs} />
                    <QnaSection faqs={serviceresponse.faqs} />
                </>
            )}
            <OurServices
                servicesData={servicesData}
                heading="Related Services"
                className="bg-[#1D2540] pb-12"
            />
            {/* <AssistanceSection /> */}
            <BookConsultation />
            <Locations variant="cards" className="py-2" />
        </main>
    );
}
