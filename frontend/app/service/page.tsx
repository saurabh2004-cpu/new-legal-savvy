import AboutUs from "@/components/common/AboutUs";
import Hero from "@/components/common/Hero";
import { CTA_ASSETS } from "@/components/home/assets";
import ConsultationSolution from "@/components/common/ConsultationSolution";
import ImageGalleryStrip from "@/components/service/ImageGallery";
import LegalServicesBanner from "@/components/service/LegalServicesBanner";
import ServiceCards from "@/components/service/ServiceCards";
import type { Metadata } from "next";
import ServiceHero from "@/components/service-details/ServiceHero";

export const metadata: Metadata = {
    title: "Services Legal Savvy- Debt Settlement Services",
    description:
        "Get expert legal debt settlement services across India. Reduce your loan burden and get relief from harassment with proven settlement strategies.",
}

export default function page() {
    const abotSectionParagraph1 = [
        'Professional legal and loan management solutions',
        'built on transparency, accuracy, and trust. We',
        'simplify complex paperwork and guide you toward',
        'secure financial decisions.'
    ]
    return (
        <div className="bg-[#D8D0CA] min-h-screen">
            {/* <Hero
                Heading={"OUR LEGAL SERVICES"}
                description={"From Business Setup To Legal Documentation, Legal Savvy Provides Simple, Reliable, And Professional Legal Support For Individuals, Startups, And Businesses."}
                img={"/about/about-hero-img.png"}
                className="bg-[#061D31] md:h-[calc(70vh-3rem)] lg:h-[calc(40vh-3rem)]  xl:h-[calc(105vh-3rem)]"
            /> */}
            <ServiceHero
                title="OUR LEGAL SERVICES"
                description="From Business Setup To Legal Documentation, Legal Savvy Provides Simple, Reliable, And Professional Legal Support For Individuals, Startups, And Businesses."
                image="/about/about-hero-img.png"
            />
            {/* <LegalServicesBanner />    */}
            <ServiceCards />
            <AboutUs
                buttonText1={"OUR"}
                buttonText2={"APPROACH"}
                paragraph={abotSectionParagraph1}
            />
            <ConsultationSolution
                image={'/service/service-cultation-img.png'}
                className="pb-0 lg:pb-0"
            />
            <ImageGalleryStrip />

        </div>
    );
}