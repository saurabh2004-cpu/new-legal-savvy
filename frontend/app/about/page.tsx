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
import QnaSection from "@/components/contact-us/QnaSection";
import { faqs } from "@/data/faq";
import FAQJsonLd from "@/components/common/FAQJsonLd";

export const metadata: Metadata = {
    title: "Loan Settlement Lawyers in India | About Legal Savvy",
    description:
        "Meet the legal team behind Legal Savvy, a debt settlement company serving borrowers across India. Book a consultation with our loan settlement lawyers today.",
};

export default function About() {

    const abotSectionParagraph1 =
        "Legal Savvy is a debt settlement company in India built around a licensed legal team, not a call centre. Every negotiation, letter, and settlement offer is handled by an advocate you can speak with directly.";

    return (
        // <main className="bg-[#FBF8F5]">
        <main className="bg-[#FFFFFF]">
            <FAQJsonLd faqs={faqs.about} />
            <Hero2
                Heading={"Meet Your Loan Settlement Lawyers in India"}
                img={"/about/about-hero-img.png"}
                className="h-[85vh] lg:h-screen min-h-[600px]"
            />
            <AboutUs
                buttonText1={"About"}
                buttonText2={"Us"}
                buttonText3={"Talk to a Lawyer"}
                buttonText3Href="/contact-us"
                paragraph={abotSectionParagraph1}
                paragraphClass="xl:text-5xl max-w-6xl"
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
            {/* <TeamSection /> */}
            <QnaSection faqs={faqs.about} />
            <Locations variant="cards" />
        </main>
    )
}
