import StatsSection from "@/components/about/Stats"
import AboutUs from "@/components/common/AboutUs"
import Hero from "@/components/common/Hero"
import AddressesSection from "@/components/about/Address"
import LegalExpertise from "@/components/about/LegalExpertise"
import BankSettlements from "@/components/common/BankSettlements"
import TrustSection from "@/components/about/TrustSection"
import ConsultationSection from "@/components/about/CunsultationSection"
import TeamSection from "@/components/about/TeamSection"
import LocationsSection from "@/components/common/LocationSection"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Legal Savvy - Debt Settlement Services",
    description:
        "Learn about Legal Savvy, a trusted provider of legal and loan management solutions across India. Expert guidance for personal loans, business loans, credit cards, and anti-harassment services.",
};

export default function About() {

    const abotSectionParagraph1 = [
        "Professional legal and loan management",
        "solutions built on transparency, accuracy, and trust.",
        "We simplify complex paperwork and guide",
        "you toward secure financial decisions."
    ]



    return (
        <div className="bg-[#D8D0CA] min-h-screen">
            <Hero
                Heading={"TRUSTED LEGAL & LOAN SOLUTIONS FOR EVERY NEED"}
                img={"/about/about-hero-img.png"}
                className="bg-[#061D31] md:h-[calc(70vh-3rem)] lg:h-[calc(40vh-3rem)]  xl:h-[calc(105vh-3rem)]"
            />
            <AboutUs
                buttonText1={"About"}
                buttonText2={"Us"}
                buttonText3={"More about us"}
                paragraph={abotSectionParagraph1}
            />
            <StatsSection />
            <AddressesSection />
            <LegalExpertise />
            <BankSettlements
                circleHeading={"Book Consultation"}
                innerCircleBgColour="#363D4F"
                outerCircleBgColour="#E6DCD6"
                className=" bg-[#1B223C]  "
            />
            <TrustSection />
            <ConsultationSection />
            <TeamSection />
            <LocationsSection className="pt-8 md:pt-12" />
        </div>
    )
}