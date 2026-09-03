import FAQJsonLd from "@/components/utils/FAQJsonLd";
import Hero4 from "@/components/ui/Hero4";
import ServiceCards from "@/components/service/ServiceCards";
import AboutUs from "@/components/utils/AboutUs";
import QnaSection from "@/components/utils/QnaSection";
import ConsultationSolution from "@/components/ui/ConsultationSolution";
import ImageGalleryStrip from "@/components/ui/ImageGallery";

import type { Metadata } from "next";
import { faqs } from "@/data/faq";

import assets, { CTA_ASSETS } from "@/data/assets";

export const metadata: Metadata = {
    title: "Personal & Business Loan Settlement in India | Legal Savvy",
    description:
        "Legal Savvy handles personal, business, credit card, and NBFC loan settlement across India, guided by a licensed legal team under RBI’s Fair Practices Code.",
}

export default function page() {
    const abotSectionParagraph1 =
        "Legal Savvy structures every settlement, personal, business, or NBFC, as a One-Time Settlement (OTS) negotiated in writing and reviewed by a licensed advocate before you sign anything.";

    return (
        // <main className="bg-[#FBF8F5]">
        <main className="bg-[#FFFFFF]">
            <FAQJsonLd faqs={faqs.service} />
            <Hero4 title="LOAN SETTLEMENT SERVICES"
                description="Legal Savvy Handles Personal, Business, Credit Card, And NBFC Loan Settlement Across India, With Every Offer Documented And Every Step Explained."
                image={assets.about.hero}
                className="h-[85vh] lg:h-screen min-h-[600px]" />
            {/* <LegalServicesBanner />   */}
            <ServiceCards />
            <AboutUs
                buttonText1={"OUR"}
                buttonText2={"APPROACH"}
                paragraph={abotSectionParagraph1}
                paragraphClass="xl:text-4xl"
                className="pt-2 py-1"
            />
            <QnaSection faqs={faqs.service} />
            <ConsultationSolution
                // image={'/service/service-cultation-img.png'}
                image={CTA_ASSETS["radial-text"]}
                className="pb-0 lg:pb-0"
            />
            <ImageGalleryStrip />
        </main>
    );
}
