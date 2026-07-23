import ContactHero from "@/components/contact-us/ContactHero";
import BookConsultation from "@/components/common/BookConsultationSection";
import ComfortGallerySection from "@/components/contact-us/ConfortGallerySection";
import QnaSection from "@/components/contact-us/QnaSection";

import type { Metadata } from "next";
import DirectionsSection from "@/components/loan-sattelments/DirectionsSections";
import LocationsSection from "@/components/common/LocationSection";

export const metadata: Metadata = {
    title: "Contact Legal Savvy - Debt Settlement Services",
    description:
        "Contact Legal Savvy for expert legal and loan management solutions. Reach out for assistance with personal loans, business loans, credit cards, and anti-harassment services across India.",
};

export default function page() {
    return (
        <div className="bg-[#D9D9D9] min-h-screen">
            <ContactHero />
            <BookConsultation />
            <DirectionsSection />
            <LocationsSection />
            <QnaSection />
            <ComfortGallerySection />
        </div>
    );
}