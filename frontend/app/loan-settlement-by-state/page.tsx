import BookConsultation from "@/components/common/BookConsultationSection";
import Hero from "@/components/common/Hero";
import Locations from "@/components/loan-sattelments/Locations";
import DirectionsSection from "@/components/loan-sattelments/DirectionsSections";
import { getLabelsByType } from "@/services/labelsServices";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Locations Legal Savvy- Debt Settlement Services",
    description:
        "Get expert legal debt settlement services across India. Reduce your loan burden and get relief from harassment with proven settlement strategies.",
}


export default async function page() {

    const labels = await getLabelsByType("state")

    return (
        <div className="bg-[#D8D0CA] min-h-screen">
            <Hero
                Heading={"LOAN SETTLEMENT BY STATES"}
                img={"/about/about-hero-img.png"}
                className="h-h-[calc(40vh-3rem)] md:h-[calc(70vh-3rem)] lg:h-[calc(40vh-3rem)]  xl:h-[calc(85vh-3rem)]"
            />
            <Locations labels={labels} />
            <DirectionsSection />
        </div>
    );
}