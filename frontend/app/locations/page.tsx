import BookConsultation from "@/components/common/BookConsultationSection";
import Hero3 from "@/components/common/Hero3";
import DirectionsSection from "@/components/loan-sattelments/DirectionsSections";
import { getLabelsByType } from "@/services/labelsServices";
import type { Metadata } from "next";
import Locations from "@/components/common/Locations";

export const metadata: Metadata = {
    title: "Locations Legal Savvy- Debt Settlement Services",
    description:
        "Get expert legal debt settlement services across India. Reduce your loan burden and get relief from harassment with proven settlement strategies.",
}


export default async function page() {
    const cities = await getLabelsByType("city")
    console.log("cities fetched", cities)

    return (
        // <main className="bg-[#FBF8F5]">
        <main className="bg-[#FFFFFF]">
            <Hero3
                Heading={"LOCATIONS"}
                img={"/about/about-hero-img.png"}
                className="h-[50vh] md:h-[70vh] lg:h-[80vh] min-h-[400px]"
            />
            <Locations variant="cards" />
            <BookConsultation />
            <DirectionsSection />
        </main>
    );
}