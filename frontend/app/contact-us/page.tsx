import FAQJsonLd from "@/components/utils/FAQJsonLd";
import Hero3 from "@/components/ui/Hero3";
import BookConsultation from "@/components/ui/BookConsultationSection";
import DirectionsSection from "@/components/ui/DirectionsSections";
import QnaSection from "@/components/utils/QnaSection";
import ImageGalleryStrip from "@/components/ui/ImageGallery";

import type { Metadata } from "next";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
    title: "Contact Legal Savvy - Debt Settlement Services",
    description:
        "Contact Legal Savvy for expert legal and loan management solutions. Reach out for assistance with personal loans, business loans, credit cards, and anti-harassment services across India.",
};

export default function page() {
    return (
        // <main className="bg-[#FBF8F5]">
        <main className="bg-[#FFFFFF]">
            <FAQJsonLd faqs={faqs.contact} />
            <Hero3 className="h-[50vh] md:h-[70vh] lg:h-[80vh] min-h-[400px]" />
            <BookConsultation />
            <DirectionsSection />
            {/* <Locations variant="parallax" /> */}
            <QnaSection faqs={faqs.contact} />
            <ImageGalleryStrip />
            {/* <ComfortGallerySection /> */}
        </main>
    );
}
