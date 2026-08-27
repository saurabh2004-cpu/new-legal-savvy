import FeaturedBlogs from "@/components/common/FeaturedBlogs";
import Hero3 from "@/components/common/Hero3";
import LatestArticlesSection from "@/components/resources/LatestArticles";
import AllArticlesSection from "@/components/resources/AllArticles";
import CasesSection from "@/components/resources/CasesSection";
import ProvenResultsBanner from "@/components/resources/ProvenResultsBanner";
import BankSettlements from "@/components/common/BankSettlements";
import StandardOfCareSection from "@/components/resources/StandardOfCareSection";
import ScheduleVisitSection from "@/components/resources/ScheduleVisitSection";
import type { Metadata } from "next";
import QnaSection from "@/components/contact-us/QnaSection";
import { faqs } from "@/data/faq";
import FAQJsonLd from "@/components/common/FAQJsonLd";

export const metadata: Metadata = {
  title: "Resources Legal Savvy- Debt Settlement Services",
  description:
    "Get expert legal debt settlement services across India. Reduce your loan burden and get relief from harassment with proven settlement strategies.",
}

export default function page() {
  return (
    // <main className="bg-[#FBF8F5]">
    <main className="bg-[#FFFFFF]">
      <FAQJsonLd faqs={faqs.resources} />
      <Hero3
        Heading={"BLOGS & CASES"}
        img={"/about/about-hero-img.png"}
        className="h-[100vh] lg:h-screen min-h-[600px]"
      />
      {/* <FeaturedBlogs /> */}
      <LatestArticlesSection />
      <AllArticlesSection />
      <ProvenResultsBanner />
      {/* <CasesSection /> */}
      <BankSettlements
        circleHeading={"Settlements Achieved With Banks"}
        innerCircleBgColour="#363D4F"
        outerCircleBgColour="#1B223C"
        className="bg-none py-12 sm:py-16"
      />
      <StandardOfCareSection />
      <QnaSection faqs={faqs.resources} />
      <ScheduleVisitSection />
    </main>
  );
}
