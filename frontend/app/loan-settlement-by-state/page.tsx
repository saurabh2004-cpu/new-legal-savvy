import BookConsultation from "@/components/common/BookConsultationSection";
import Hero11 from "@/components/common/Hero11";
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
        <main className="bg-[#FFFFFF]">
            <Hero11
                Heading={"LOAN SETTLEMENT BY STATES"}
                img={"/about/about-hero-img.png"}
                className="h-[50vh] md:h-[70vh] lg:h-[80vh] min-h-[400px]"
            />
            <Locations labels={labels} />
            <DirectionsSection />
        </main>
    );
}