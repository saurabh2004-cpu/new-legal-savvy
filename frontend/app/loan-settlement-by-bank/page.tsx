
import BookConsultation from "@/components/common/BookConsultationSection";
import Hero1 from "@/components/common/Hero1";
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

    const labels = await getLabelsByType("bank")

    return (
        <div className="bg-[#D8D0CA] min-h-screen">
            <Hero1
                Heading={"LOAN SETTLEMENT BY BANKS"}
                img={"/about/about-hero-img.png"}
                className="h-[50vh] md:h-[70vh] lg:h-[80vh] min-h-[400px]"
            />
            <Locations labels={labels} />
            <DirectionsSection />
        </div>
    );
}