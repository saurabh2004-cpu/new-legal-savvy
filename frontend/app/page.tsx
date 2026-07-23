import React from "react";
import Hero from "../components/common/Hero";
import AboutUs from "@/components/common/AboutUs";
import WhyUs from "@/components/home/WhyUs";
import OurServices from "@/components/common/OurServices";
import BankSettlements from "@/components/common/BankSettlements";
import OurFeatures from "@/components/home/OurFeatures";
import Testimonials from "@/components/home/Testimonials";
import HumanApproach from "@/components/home/HumanApproach";
import FeaturedBlogs from "@/components/common/FeaturedBlogs";
import ConsultationSolution from "@/components/common/ConsultationSolution";
import Locations from "@/components/home/Locations";
import Footer from "../components/common/Footer";
import { CTA_ASSETS } from "@/components/home/assets";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Savvy - Debt Settlement Services",
  description:
    "Get expert legal debt settlement services across India. Reduce loan burden and stop recovery harassment.",
};


export default function Home() {

  const abotSectionParagraph =
    "Professional legal and loan management solutions built on transparency, accuracy, and trust. We simplify complex paperwork and guide you toward secure financial decisions.";

  const servicesData = [
    {
      tag: "LOAN ISSUES",
      tagBg: "#E64A19",
      tagColor: "#FFFFFF",
      title: "Personal Loan Settlement",
      description: "If loan payments are piling up and causing stress, we've got your back. Our team works with you to find solutions, negotiate with creditors, and ease the burden. Let's tackle it together and get your finances back on track!",
      image: "/home/personal-loan-settlement.png",
      stats: [
        { label: "CASES", value: "2,500+" },
        { label: "EXPERTISE", value: "10+ YEARS" },
        { label: "SETTLEMENT RATE", value: "98.2%" }
      ],
      cta: "Consult our Expert",
      ctaBg: "bg-[#FF3030] hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30",
      ctaIconBg: "bg-white"
    },
    {
      tag: "BUSINESS LOAN ISSUES",
      tagBg: "#E64A19",
      tagColor: "#FFFFFF",
      title: "Business Loan Settlement",
      description: "If business loan payments are overwhelming you, we're here to help. Our team collaborates with you to find effective solutions, negotiate with lenders, and reduce your financial stress. Together, we can ease the burden and get your business.",
      image: "/home/business-loan-settlement.png",
      stats: [
        { label: "CASES", value: "1,400+" },
        { label: "EXPERTISE", value: "12+ YEARS" },
        { label: "DEBT RELIEF", value: "₹45 CR+" }
      ],
      cta: "Consult our Expert",
      ctaBg: "bg-[#FF3030] hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30",
      ctaIconBg: "bg-white"
    },
    {
      tag: "CREDIT CARD ISSUES",
      tagBg: "#E64A19",
      tagColor: "#FFFFFF",
      title: "Credit Card Loan Settlement",
      description: "Struggling with credit card debt? We're here to help you find the right path forward. Our team negotiates with your creditors to reduce your debt, making payments more manageable. Let's work together to clear the burden and get your financial.",
      image: "/home/credit-card-loan-settlement.png",
      stats: [
        { label: "CASES", value: "3,100+" },
        { label: "EXPERTISE", value: "8+ YEARS" },
        { label: "MIN. SAVINGS", value: "50%+" }
      ],
      cta: "Consult our Expert",
      ctaBg: "bg-[#FF3030] hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30",
      ctaIconBg: "bg-white"
    },
    {
      tag: "ANTI-HARASSMENT ISSUES",
      tagBg: "#E64A19",
      tagColor: "#FFFFFF",
      title: "Anti-Harassment Services",
      description: "If you're dealing with harassment, you don't have to face it alone. Our team is here to provide the support you need, guiding you through legal options and ensuring your safety. Let's work together to resolve the issue and protect your rights.",
      image: "/home/anti-harrasement-service.png",
      stats: [
        { label: "CASES", value: "1,800+" },
        { label: "PROTECTION", value: "IMMEDIATE" },
        { label: "LEGAL TEAM", value: "24/7 SUPPORT" }
      ],
      cta: "Consult our Expert",
      ctaBg: "bg-[#FF3030] hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30",
      ctaIconBg: "bg-white"
    }
  ];


  return (
    <main className="bg-[#D9D9D9] min-h-screen">
      <Hero
        Heading={"Smart Legal & Loan Solutions"}
        img={"/about/about-hero-img.png"}
        className="bg-[#061D31] md:h-[calc(70vh-3rem)] lg:h-[calc(40vh-3rem)] xl:h-[calc(105vh-3rem)]"
      />
      <AboutUs buttonText1={"About"} buttonText2={"Us"} buttonText3={"More about us"} paragraph={abotSectionParagraph} paragraphMaxWidth="max-w-5xl" />
      <WhyUs />
      <OurServices servicesData={servicesData} heading="Our Services" />
      <BankSettlements
        circleHeading={"Settlements Achieved With Banks"}
        innerCircleBgColour="#333A4D"
        outerCircleBgColour="#1D2540"
      />
      <OurFeatures />
      <Testimonials />
      <HumanApproach />
      <FeaturedBlogs />
      <ConsultationSolution image={CTA_ASSETS["radial-text"]} className="pb-16 lg:pb-24" />
      <Locations />
      {/* <Footer /> */}
    </main>
  );
}


