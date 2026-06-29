import Hero from "@/components/common/Hero";
import BookConsultation from "@/components/common/BookConsultationSection";
import ComfortGallerySection from "@/components/contact-us/ConfortGallerySection";
import QnaSection from "@/components/contact-us/QnaSection";

import type { Metadata } from "next";
import DirectionsSection from "@/components/loan-sattelments/DirectionsSections";

export const metadata: Metadata = {
    title: "Contact Legal Savvy - Debt Settlement Services",
    description:
        "Contact Legal Savvy for expert legal and loan management solutions. Reach out for assistance with personal loans, business loans, credit cards, and anti-harassment services across India.",
};

export default function page() {
    return (
        <div className="bg-[#D8D0CA] min-h-screen">
            <Hero
                Heading={"CONTACT US"}
                img={"/about/about-hero-img.png"}
                className="h-h-[calc(40vh-3rem)] md:h-[calc(70vh-3rem)] lg:h-[calc(40vh-3rem)]  xl:h-[calc(85vh-3rem)]"
            />

            <BookConsultation />
            <DirectionsSection />
            <QnaSection />
            <ComfortGallerySection />
        </div>
    );
}