import Link from "next/link";

interface Hero7Props {
    bankName?: string;
    className?: string;
}

export default function Hero7({ bankName = "Tirap", className = "" }: Hero7Props) {
    return (
        <section
            className={`relative text-white pt-32 pb-24 px-4 md:px-8 overflow-hidden ${className}`}
            style={{
                backgroundColor: "#132042",
                backgroundImage: "radial-gradient(circle at top right, #243A8D 0%, #132042 70%)",
            }}
        >
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-10 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-[97vw] mx-auto z-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <div className="inline-block px-4 py-2 bg-blue-900 bg-opacity-50 border border-blue-400 rounded-full text-blue-200 font-semibold text-sm mb-6 backdrop-blur-sm">
                            Updated for 2026 RBI Guidelines
                        </div>
                        <h1
                            className="font-semibold text-[2.4rem] sm:text-[3rem] md:text-[3.4rem] lg:text-[3.886rem] leading-[100%] tracking-[0%] mb-6"
                        >
                            Legally Settle Your <br />
                            <span className="text-white bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                                Debt in {bankName}
                            </span>
                        </h1>
                        <p className="font-regular text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.2] tracking-[0%] text-right uppercase text-white mb-8 text-start max-w-2xl">
                            Facing severe financial hardship in {bankName}? Stop the endless cycle of
                            minimum payments and aggressive recovery calls. Our legal experts negotiate
                            directly with banks to reduce your outstanding principal and waive off penal
                            interest.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="https://www.credsettle.com/contact"
                                className="bg-white text-blue-900 px-8 py-4 rounded-xl font-medium text-[1.125rem] leading-[100%] tracking-[0%] hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-2"
                            >
                                Get Your Free Debt Audit

                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </Link>

                            <a
                                href="tel:+918800226635"
                                className="px-8 py-4 rounded-xl font-medium text-[1.125rem] leading-[100%] tracking-[0%] text-white border border-gray-600 hover:border-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                            >
                                Call +91-8800226635
                            </a>
                        </div>
                    </div>

                    <div className="hidden lg:block relative">
                        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl relative shadow-2xl">
                            <h3
                                className="font-medium text-[2rem] md:text-[2.5rem] leading-[100%] tracking-[0%] text-start mb-6 text-white border-b border-slate-600 pb-4"
                            >
                                Is Settlement Right For You?
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-6 h-6 text-green-400 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <span
                                        className="font-normal text-[1rem] leading-[100%] tracking-[0%] text-gray-300"
                                    >
                                        Missed 3+ EMIs on personal loans or credit cards?
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-6 h-6 text-green-400 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <span
                                        className="font-normal text-[1rem] leading-[100%] tracking-[0%] text-gray-300"
                                    >
                                        Harassing calls from recovery agents in {bankName}?
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-6 h-6 text-green-400 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <span
                                        className="font-normal text-[1rem] leading-[100%] tracking-[0%] text-gray-300"
                                    >
                                        Received legal notices under SARFAESI or Sec 138?
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
