import BookConsultation from "@/components/common/BookConsultationSection";
import Hero from "@/components/common/Hero";
import DirectionsSection from "@/components/loan-sattelments/DirectionsSections";
import { getLabelsByType } from "@/services/labelsServices";
import type { Metadata } from "next";
import LocationsSection from "@/components/common/LocationSection";
import ContactHero from "@/components/contact-us/ContactHero";

export const metadata: Metadata = {
    title: "Locations Legal Savvy- Debt Settlement Services",
    description:
        "Get expert legal debt settlement services across India. Reduce your loan burden and get relief from harassment with proven settlement strategies.",
}


export default async function page() {

    const cities = await getLabelsByType("city")

    console.log("cities fetched", cities)

    return (
        <div className="bg-[#D9D9D9] min-h-screen">
            <ContactHero
                Heading={"LOCATIONS"}
                img={"/about/about-hero-img.png"}
                className="h-h-[calc(40vh-3rem)] md:h-[calc(70vh-3rem)] lg:h-[calc(40vh-3rem)]  xl:h-[calc(85vh-3rem)]"
            />
            <LocationsSection />
            <BookConsultation />
            <DirectionsSection />
        </div>
    );
}