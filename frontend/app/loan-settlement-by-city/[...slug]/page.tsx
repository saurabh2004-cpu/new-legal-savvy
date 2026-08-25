import Navbar from "@/components/common/Navbar";
import Hero8 from "@/components/common/Hero8";
// import ContentSection from "@/components/loan-settlement-by-city/ContentSection";
import type { Metadata } from "next";
import Hero7 from "@/components/common/Hero7";
import ContentSection from "@/components/loan-settlement-by-bank/ContentSection";

export const metadata: Metadata = {
    title: "Loan Settlement By City - Debt Settlement Services",
    description:
        "Get expert legal debt settlement services across India. Reduce your loan burden and get relief from harassment with proven settlement strategies.",
};

interface PageProps {
    params: Promise<{ slug: string[] }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    // Convert slug (e.g. "tirap" or "new-delhi") into capitalized city name
    const rawCity = slug && slug.length > 0 ? slug[slug.length - 1] : "";
    const cityName = rawCity
        ? rawCity
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "Tirap";



    return (
        <div className="bg-[#f0ece7] min-h-screen">
            <Navbar />
            <Hero7 bankName={cityName} />
            {/* <ContentSection cityName={cityName} /> */}
            <ContentSection bankName={cityName} />
        </div>
    );
} 
