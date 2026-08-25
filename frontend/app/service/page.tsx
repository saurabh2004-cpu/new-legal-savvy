import AboutUs from "@/components/common/AboutUs";
import Hero4 from "@/components/common/Hero4";
import ConsultationSolution from "@/components/common/ConsultationSolution";
import ImageGalleryStrip from "@/components/service/ImageGallery";
import ServiceCards from "@/components/service/ServiceCards";
import type { Metadata } from "next";

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
            <Hero4 title="LOAN SETTLEMENT SERVICES"
                description="Legal Savvy Handles Personal, Business, Credit Card, And NBFC Loan Settlement Across India, With Every Offer Documented And Every Step Explained."
                image="/about/about-hero-img.png"
                className="h-[85vh] lg:h-screen min-h-[600px]" />
            {/* <LegalServicesBanner />    */}
            <ServiceCards />
            <AboutUs
                buttonText1={"OUR"}
                buttonText2={"APPROACH"}
                paragraph={abotSectionParagraph1}
                paragraphClass="xl:text-4xl"
                className="pt-2 py-1"
            />
            <ConsultationSolution
                image={'/service/service-cultation-img.png'}
                className="pb-0 lg:pb-0"
            />
            <ImageGalleryStrip />
        </main>
    );
}