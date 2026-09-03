import Hero11 from "@/components/ui/Hero11";
import Locations from "@/components/loan-sattelments/Locations";
import DirectionsSection from "@/components/ui/DirectionsSections";

import type { Metadata } from "next";
import { getLabelsByType } from "@/services/labelsServices";
import assets from "@/data/assets";

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
                img={assets.about.hero}
                className="h-[50vh] md:h-[70vh] lg:h-[80vh] min-h-[400px]"
            />
            <Locations labels={labels} />
            <DirectionsSection />
        </main>
    );
}