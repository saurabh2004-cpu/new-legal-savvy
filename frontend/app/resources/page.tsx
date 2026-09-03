import FAQJsonLd from "@/components/utils/FAQJsonLd";
import Hero3 from "@/components/ui/Hero3";
import LatestArticlesSection from "@/components/resources/LatestArticles";
import AllArticlesSection from "@/components/resources/AllArticles";
import ProvenResultsBanner from "@/components/resources/ProvenResultsBanner";
import BankSettlements from "@/components/utils/BankSettlements";
import StandardOfCareSection from "@/components/resources/StandardOfCareSection";
import QnaSection from "@/components/utils/QnaSection";
import ScheduleVisitSection from "@/components/resources/ScheduleVisitSection";
import ImageGalleryStrip from "@/components/ui/ImageGallery";

import type { Metadata } from "next";
import { faqs } from "@/data/faq";
import assets from "@/data/assets";

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
        img={assets.about.hero}
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
      <ImageGalleryStrip />
    </main>
  );
}
