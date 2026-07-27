import StatsSection from "@/components/about/Stats"
import AboutUs from "@/components/common/AboutUs"
import Hero2 from "@/components/common/Hero2"
import AddressesSection from "@/components/about/Address"
import LegalExpertise from "@/components/about/LegalExpertise"
import BankSettlements from "@/components/common/BankSettlements"
import TrustSection from "@/components/about/TrustSection"
import ConsultationSection from "@/components/about/CunsultationSection"
import TeamSection from "@/components/about/TeamSection"
import Locations from "@/components/common/Locations"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Legal Savvy - Debt Settlement Services",
    description:
        "Learn about Legal Savvy, a trusted provider of legal and loan management solutions across India. Expert guidance for personal loans, business loans, credit cards, and anti-harassment services.",
};

export default function About() {

    const abotSectionParagraph1 =
        "Professional legal and loan management solutions built on transparency, accuracy, and trust. We simplify complex paperwork and guide you toward secure financial decisions.";

    return (
        // <main className="bg-[#FBF8F5]">
        <main className="bg-[#FFFFFF]">
            <Hero2
                Heading={"Trusted Legal & Loan Solutions For Every Need"}
                img={"/about/about-hero-img.png"}
                className="h-[85vh] lg:h-screen min-h-[600px]"
            />
            <AboutUs
                buttonText1={"About"}
                buttonText2={"Us"}
                buttonText3={"More about us"}
                paragraph={abotSectionParagraph1}
                paragraphMaxWidth="max-w-6xl"
            />
            <StatsSection />
            <AddressesSection />
            <LegalExpertise />
            <BankSettlements
                circleHeading={"Book Consultation"}
                innerCircleBgColour="#333A4D"
                outerCircleBgColour="#E6DCD6"
                className="bg-[#1D2540] md:py-16 lg:py-20"
            />
            <TrustSection />
            <ConsultationSection />
            <TeamSection />
            <Locations variant="cards" />
        </main>
    )
}