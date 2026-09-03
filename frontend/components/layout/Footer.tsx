import Image from "next/image";
import Link from "next/link";
import assets from "@/data/assets";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

// ── Navigation Data ─────────────────────────────────────────────
const navColumns = [
    [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/service" },
        { label: "Blogs", href: "/resources" },
        { label: "Contact Us", href: "/contact-us" },
        // { label: "Locations", href: "/locations" },
    ],
    [
        { label: "Loan Settlement By Bank", href: "/loan-settlement-by-bank" },
        { label: "Loan Settlement By State", href: "/loan-settlement-by-state" },
        { label: "Loan Settlement By City", href: "/loan-settlement-by-city" },
    ],
];

// ── Footer ──────────────────────────────────────────────────────
export default function Footer() {
    return (
        <footer className="w-full py-1 px-2 bg-[#FFFFFF]">
            <div
                className="max-w-8xl mx-auto overflow-hidden rounded-xl px-5 py-8 md:py-10 lg:pt-24 lg:pb-16 lg:px-16 space-y-8 md:space-y-10 lg:space-y-12"
                style={{
                    background:
                        "radial-gradient(circle at 0% 30%, rgba(100,35,55,.6) 0%, rgba(15,18,35,0) 45%), radial-gradient(circle at 100% 80%, rgba(100,35,55,.5) 0%, rgba(15,18,35,0) 45%), #0f1223",
                }}
            >
                {/* Logo  */}
                <div className="flex justify-start">
                    <Image
                        src={assets.logo.main}
                        alt="Logo"
                        width={220}
                        height={100}
                        className="-ml-2 h-auto w-40 object-contain sm:w-48 md:w-52 lg:w-56"
                    />
                </div>

                {/* Navigation */}
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] space-y-8 lg:space-y-16">
                    {/* Contact & Location */}
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <span className="text-[0.85rem] md:text-[0.95rem] geist-mono-medium uppercase tracking-widest text-[#8a8f9a]">
                                Contact
                            </span>

                            <Link
                                href="/contact-us"
                                className="geist-light text-base md:text-lg lg:text-2xl tracking-wide text-[#e0e2ec] transition-colors duration-200 hover:text-white"
                            >
                                Book a Consultation
                            </Link>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="text-[0.85rem] md:text-[0.95rem] geist-mono-medium uppercase tracking-widest text-[#8a8f9a]">
                                Locations
                            </span>

                            <Link
                                href="/location/hyderabad"
                                className="geist-light text-base md:text-lg lg:text-2xl tracking-wide text-[#e0e2ec] transition-colors duration-200 hover:text-white"
                            >
                                Hyderabad
                            </Link>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-20">
                        {navColumns.map((col, index) => (
                            <div
                                key={index}
                                className={`flex flex-col gap-5 lg:gap-3 ${index === 1 ? "sm:col-span-1 lg:col-span-2" : ""
                                    }`}
                            >
                                {col.map((item) => (
                                    <Link
                                        key={`${item.label}-${index}`}
                                        href={item.href}
                                        className="geist-light text-base md:text-lg lg:text-2xl text-white/80 transition-colors duration-200 hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="w-full space-y-6 lg:space-y-12">
                    {/* Nav Links */}
                    <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16 border-b  border-white/20 pb-1">
                        {/* Terms & Security Row */}
                        <div className="flex flex-col justify-between w-full sm:flex-row sm:flex-wrap gap-4 sm:gap-8 items-start sm:items-center px-1">
                            <div className="flex gap-4 md:gap-8">
                                <Link
                                    href="/terms"
                                    className="text-[0.85rem] md:text-[0.95rem] geist-mono-medium text-[#8a8f9a] hover:text-[#c0c4d8] transition-colors duration-200 uppercase"
                                >
                                    Terms &amp; Conditions
                                </Link>
                                <Link
                                    href="/privacy"
                                    className="text-[0.85rem] md:text-[0.95rem] geist-mono-medium text-[#8a8f9a] hover:text-[#c0c4d8] transition-colors duration-200 uppercase"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                            {/* <Link
                                href="/security"
                                className="text-[0.85rem] md:text-[0.95rem] geist-mono-medium text-[#8a8f9a] hover:text-[#c0c4d8] transition-colors duration-200 uppercase"
                            >
                                Security
                            </Link> */}
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center items-center gap-6">
                        {[
                            { label: "Facebook", href: "https://www.facebook.com/people/The-Legal-Savvy/61570740873562/", Icon: FaFacebook },
                            { label: "Instagram", href: "https://www.instagram.com/thelegal.savvy/", Icon: RiInstagramFill },
                            { label: "LinkedIn", href: "https://www.linkedin.com/company/the-legal-savvy/", Icon: FaLinkedin },
                        ].map(({ label, href, Icon }) => (
                            <Link
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="text-[#c0c4d8] hover:text-white transition-transform hover:scale-110 duration-200"
                            >
                                <Icon size={24} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

