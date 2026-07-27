import AboutUs from "@/components/common/AboutUs";
import Hero4 from "@/components/common/Hero4";
import ConsultationSolution from "@/components/common/ConsultationSolution";
import ImageGalleryStrip from "@/components/service/ImageGallery";
import ServiceCards from "@/components/service/ServiceCards";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services Legal Savvy- Debt Settlement Services",
    description:
        "Get expert legal debt settlement services across India. Reduce your loan burden and get relief from harassment with proven settlement strategies.",
}

export default function page() {
    const abotSectionParagraph1 =
        "Professional legal and loan management solutions built on transparency, accuracy, and trust. We simplify complex paperwork and guide you toward secure financial decisions.";

    return (
        // <main className="bg-[#FBF8F5]">
        <main className="bg-[#FFFFFF]">
            <Hero4 title="OUR LEGAL SERVICES"
                description="From Business Setup To Legal Documentation, Legal Savvy Provides Simple, Reliable, And Professional Legal Support For Individuals, Startups, And Businesses."
                image="/about/about-hero-img.png"
                className="h-[85vh] lg:h-screen min-h-[600px]" />
            {/* <LegalServicesBanner />    */}
            <ServiceCards />
            <AboutUs
                buttonText1={"OUR"}
                buttonText2={"APPROACH"}
                paragraph={abotSectionParagraph1}
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