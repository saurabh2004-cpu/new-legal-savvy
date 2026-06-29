import FeaturedBlogs from "@/components/common/FeaturedBlogs";
import Hero from "@/components/common/Hero";
import LatestArticlesSection from "@/components/resources/LatestArticles";
import AllArticlesSection from "@/components/resources/AllArticles";
import CasesSection from "@/components/resources/CasesSection";
import ProvenResultsBanner from "@/components/resources/ProvenResultsBanner";
import BankSettlements from "@/components/common/BankSettlements";
import StandardOfCareSection from "@/components/resources/StandardOfCareSection";
import ScheduleVisitSection from "@/components/resources/ScheduleVisitSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "resources Legal Savvy- Debt Settlement Services",
  description:
    "Get expert legal debt settlement services across India. Reduce your loan burden and get relief from harassment with proven settlement strategies.",
}

export default function page() {
  return (
    <div className="bg-[#D8D0CA] min-h-screen pb-16">
      <Hero
        Heading={"BLOGS & CASES"}
        img={"/about/about-hero-img.png"}
        className="bg-[#061D31] md:h-[calc(70vh-3rem)] lg:h-[calc(40vh-3rem)]  xl:h-[calc(105vh-3rem)]"
      />
      <FeaturedBlogs />
      <LatestArticlesSection />
      <AllArticlesSection />
      <ProvenResultsBanner />
      <CasesSection />
      <BankSettlements
        circleHeading={"Settlements Achieved With Banks"}
        innerCircleBgColour="#363D4F"
        outerCircleBgColour="#1B223C"
        className="bg-none"
      />
      <StandardOfCareSection />
      <ScheduleVisitSection />
    </div>
  );
}