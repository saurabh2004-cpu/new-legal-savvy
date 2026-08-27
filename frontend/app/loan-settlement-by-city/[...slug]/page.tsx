import Navbar from "@/components/common/Navbar";
import Hero7 from "@/components/common/Hero7";
import ContentSection from "@/components/loan-settlement-by-city/ContentSection";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;

    const rawCity = slug?.length > 0 ? slug[slug.length - 1] : "";

    const cityName = rawCity
        ? rawCity
            .split("-")
            .map(
                (word) => word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ")
        : "Tirap";

    return {
        title: `Loan Settlement Services in ${cityName} | Legal Savvy`,
        description:
            `Behind on loan or credit card dues in ${cityName}? Legal Savvy negotiates a written One-Time Settlement under the RBI Fair Practices Code. Book a call.`,
    };
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
            <ContentSection cityName={cityName} />
        </div>
    );
} 
