import { Metadata } from "next";
import Hero10 from "@/components/common/Hero10";
import { axiosInstance } from "../utils/axios";
import { getPageData } from "@/services/pageContentService";
import { DynamicBreadcrumb } from "@/components/dynamic-content-page/DynamicBreadcrumb";
import { DynamicSidebar } from "@/components/dynamic-content-page/DynamicSidebar";
import { DynamicSections } from "@/components/dynamic-content-page/DynamicSections";
import { DynamicFAQ } from "@/components/dynamic-content-page/DynamicFAQ";
import { DynamicTestimonials } from "@/components/dynamic-content-page/DynamicTestimonials";
import { DynamicRightSidebar } from "@/components/dynamic-content-page/DynamicRightSidebar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawData = await getPageData(slug);

  if (!rawData || !rawData.pagecontent) {
    return {
      title: "Legal Savvy",
      description: "Professional legal advocacy firm.",
    };
  }

  let data: any = rawData.pagecontent;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (e) {
      return { title: "Legal Savvy" };
    }
  }

  return {
    title: data.meta?.title || "Legal Savvy",
    description: data.meta?.description || "Professional legal advocacy firm.",
    keywords: data.meta?.keywords?.join(", "),
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const rawData = await getPageData(slug);

  if (!rawData || !rawData.pagecontent) {
    return (
      <main className="bg-[#f0ece7] min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">Page not found</h1>
      </main>
    );
  }

  let data: any = rawData.pagecontent;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse pagecontent", e);
      return (
        <main className="bg-[#f0ece7] min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-700">Error parsing page content</h1>
        </main>
      );
    }
  }

  return (
    <main className="bg-[#f0ece7] min-h-screen">
      <Hero10
        heading={data.hero?.heading || data.heading}
        description={data.hero?.description || data.description}
        ctaText={data.hero_cta_text || "Get Professional Protection Now"}
        ctaLink={data.hero_cta_link || "https://www.credsettle.com/contact"}
      />

      <DynamicBreadcrumb data={data.breadcrumb} />

      <div className="max-w-[1440px] mx-auto px-4 py-8 lg:py-16">
        <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm -mx-4 px-4 py-3 mb-8 flex items-center overflow-x-auto no-scrollbar sf-hidden"></div>
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <DynamicSidebar data={data.leftSidebar} />

          <main className="lg:w-2/4 xl:w-3/5 w-full">
            <article className="prose prose-lg max-w-none bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 font-sans">
              <DynamicSections data={data.sections} />
              
              {data.conclusion && (
                <>
                  <h2 className="font-[Geist] text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 scroll-mt-24 italic border-l-4 border-blue-600 pl-4 uppercase">
                    {data.conclusion.title}
                  </h2>
                  <p className="font-sans text-gray-700 leading-relaxed mb-10 font-light text-xl md:text-2xl italic">
                    {data.conclusion.shortQuote}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-10 font-bold uppercase tracking-widest text-xs text-blue-600">
                    {data.conclusion.commitmentTitle}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-10 text-base md:text-lg">
                    {data.conclusion.content}
                  </p>
                </>
              )}

              <DynamicFAQ data={data.faqSection} />
              <DynamicTestimonials data={data.testimonials} />
            </article>
          </main>

          <DynamicRightSidebar data={data.rightSidebar} />
        </div>
      </div>
    </main>
  );
}