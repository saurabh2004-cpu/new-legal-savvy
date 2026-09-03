import Image from "next/image";
import assets from "@/data/assets";

interface LegalServicesBannerProps {
    imageSrc?: string;
    imageAlt?: string;
    heading?: string;
}

export default function LegalServicesBanner({
    imageSrc = assets.service.legalServices,
    imageAlt = "Legal Services Office",
    heading = "LEGAL\nSERVICES",
}: LegalServicesBannerProps) {
    return (
        <section className="w-full px-3 py-4 sm:px-4 md:px-6 lg:px-0">
            <div
                className="
                    mx-auto
                    flex
                    w-full
                    max-w-[97vw]
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#1B223C]
                    p-3
                    sm:p-4
                    md:p-6
                    lg:p-8
                "
            >
                {/* Banner Container */}
                <div
                    className="
                        relative
                        w-full
                        max-w-[1014.91px]
                        overflow-hidden
                        aspect-[1014.91/458.17]

                        rounded-t-[16px]
                        rounded-b-none

                        sm:rounded-t-[20px]

                        md:rounded-t-[25px]
                    "
                >
                    {/* Background Image */}
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 1015px"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#1B223C]/60" />

                    {/* Heading */}
                    <div className="absolute inset-0 flex items-center justify-center px-4">
                        <h1
                            className="
                                whitespace-pre-line
                                text-center
                                uppercase
                                text-white

                                font-[Geist]
                                font-bold
                                leading-[100%]
                                tracking-[0%]

                                text-[2rem]

                                sm:text-[3rem]

                                md:text-[4.5rem]

                                lg:text-[6.831875rem]
                            "
                        >
                            {heading}
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
}