import React from "react";
import Hero1 from "@/components/common/Hero1";
import AboutUs from "@/components/common/AboutUs";
import WhyUs from "@/components/home/WhyUs";
import OurServices from "@/components/common/OurServices";
import BankSettlements from "@/components/common/BankSettlements";
import OurFeatures from "@/components/home/OurFeatures";
import Testimonials from "@/components/home/Testimonials";
import HumanApproach from "@/components/home/HumanApproach";
import FeaturedBlogs from "@/components/common/FeaturedBlogs";
import ConsultationSolution from "@/components/common/ConsultationSolution";
import Locations from "@/components/common/Locations";
import { CTA_ASSETS } from "@/components/home/assets";
import type { Metadata } from "next";
import { getAllServices } from "@/services/serviceServices";
import QnaSection from "@/components/contact-us/QnaSection";
import { faqs } from "@/data/faq";
import FAQJsonLd from "@/components/common/FAQJsonLd";
import ImageGalleryStrip from "@/components/service/ImageGallery";

export const metadata: Metadata = {
  title: "Legal Loan Settlement Company in India | LegalSavvy",
  description:
    "Legal Savvy is an RBI-compliant loan settlement company serving borrowers across India. Speak with our legal team about a One-Time Settlement (OTS) plan today.",
};

const getFrontImageUrl = (imagePath: string) => {
  if (!imagePath) return "/service/service-card-1.png";
  if (imagePath.startsWith("http")) return imagePath;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  const baseUrl = backendUrl.replace(/\/api\/v1\/?$/, "");
  return `${baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

export default async function Home() {
  const abotSectionParagraph =
    "Legal Savvy is a legal loan settlement company serving borrowers across India, working within RBI Fair Practices Code guidelines to negotiate fair, documented settlements.";

  const services = await getAllServices();

  const homePageServices = (services || [])
    .filter((s: any) => s.showOnHomePage)
    .sort((a: any, b: any) => (a.sequence || 0) - (b.sequence || 0));

  const servicesData = homePageServices.map((s: any) => {
    return {
      tag: s.homePage?.tag || "SERVICE",
      tagBg: "#E64A19",
      tagColor: "#FFFFFF",
      title: s.homePage?.title || s.title,
      description: s.homePage?.description || s.description,
      image: s.homePage?.image ? getFrontImageUrl(s.homePage.image) : getFrontImageUrl(s.image),
      stats: s.homePage?.stats || [],
      cta: "Consult our Expert",
      ctaBg: "bg-[#FF3030] hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30",
      ctaIconBg: "bg-white",
      slug: s.slug
    };
  });

  return (
    <main className="bg-[#FFFFFF]">
      <FAQJsonLd faqs={faqs.home} />
      <Hero1
        Heading={"Legal Loan Settlement Company in India"}
        description={"RBI-compliant loan and debt settlement services for borrowers across India, handled by a licensed legal team, not recovery agents"}
        img={"/about/about-hero-img.png"}
        className="h-[100vh] lg:h-screen min-h-[600px]"
      />
      <AboutUs
        buttonText1={"About"}
        buttonText2={"Us"}
        buttonText3={"More About Us"}
        buttonText3Href={"/about"}
        paragraph={abotSectionParagraph}
        paragraphClass="xl:text-5xl max-w-6xl" />
      <WhyUs />
      <OurServices servicesData={servicesData} heading="Our Services" />
      <BankSettlements
        circleHeading={"RBI-Regulated Banks & NBFCs"}
        innerCircleBgColour="#333A4D"
        outerCircleBgColour="#1D2540"
      />
      <OurFeatures />
      <Testimonials />
      <HumanApproach />
      <FeaturedBlogs />
      <QnaSection faqs={faqs.home} />
      <ConsultationSolution image={CTA_ASSETS["radial-text"]} className="pb-16 lg:pb-24" />
      {/* <Locations variant="parallax" className="-mt-20 md:-mt-52 xl:-mt-24" /> */}
      <ImageGalleryStrip className="-mt-20 md:-mt-52 xl:-mt-26" />
    </main>
  );
}
