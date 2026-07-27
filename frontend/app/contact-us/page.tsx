import Hero3 from "@/components/common/Hero3";
import BookConsultation from "@/components/common/BookConsultationSection";
import ComfortGallerySection from "@/components/contact-us/ConfortGallerySection";
import QnaSection from "@/components/contact-us/QnaSection";

import type { Metadata } from "next";
import DirectionsSection from "@/components/loan-sattelments/DirectionsSections";
import Locations from "@/components/common/Locations";

export const metadata: Metadata = {
    title: "Contact Legal Savvy - Debt Settlement Services",
    description:
        "Contact Legal Savvy for expert legal and loan management solutions. Reach out for assistance with personal loans, business loans, credit cards, and anti-harassment services across India.",
};

export default function page() {
    return (
        // <main className="bg-[#FBF8F5]">
        <main className="bg-[#FFFFFF]">
            <Hero3 className="h-[50vh] md:h-[70vh] lg:h-[80vh] min-h-[400px]" />
            <BookConsultation />
            <DirectionsSection />
            <Locations variant="parallax" />
            <QnaSection />
            <ComfortGallerySection />
        </main>
    );
}