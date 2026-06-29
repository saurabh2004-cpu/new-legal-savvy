import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

// ── Nav data ──────────────────────────────────────────────────────────────────
const navColumns = [
    [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Gallery", href: "/gallery" },
    ],
    [
        { label: "Blogs", href: "/blogs" },
        { label: "Contact Us", href: "/contact" },
        { label: "Services", href: "/services" },
        { label: "Gallery", href: "/gallery" },
    ],
    [
        { label: "Blogs", href: "/blogs" },
        { label: "Contact Us", href: "/contact" },
        { label: "Services", href: "/services" },
        { label: "Gallery", href: "/gallery" },
    ],
];

// ── Social Icons ──────────────────────────────────────────────────────────────
const FacebookIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M15.5 8.5h-2a1 1 0 0 0-1 1v2h3l-.5 3h-2.5V21" />
    </svg>
);

const InstagramIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
);

const LinkedInIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

// ── Footer Component ──────────────────────────────────────────────────────────
export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden  bg-[#d8d0ca] pt-6">
            {/* ── MAIN CONTENT ── */}
            <div
                className="relative z-10 m-auto     "

            >
                <div className="max-w-[97vw] px-4 md:px-8 lg:px-12 xl:px-16 py-10 mx-auto rounded-xl"
                    style={{
                        background: "radial-gradient(circle at 0% 30%, rgba(100, 35, 55, 0.6) 0%, rgba(15, 18, 35, 0) 45%), radial-gradient(circle at 100% 80%, rgba(100, 35, 55, 0.5) 0%, rgba(15, 18, 35, 0) 45%), #0f1223"
                    }}
                >
                    <div className="flex flex-col gap-16  lg:justify-between lg:gap-20">

                        <div className="flex items-center justify-start">
                            <Image
                                src="/home/logo.png"
                                alt="Logo"
                                width={220}
                                height={100}
                                className="h-auto w-[11rem] sm:w-[13rem] md:w-[14rem] object-contain"
                            />
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between ">
                            <div className="flex flex-col gap-12 lg:w-[40%]">
                                {/* Logo */}
                                {/* Contact and Locations */}
                                <div className="flex flex-col gap-10">
                                    {/* Contact block */}
                                    <div className="flex flex-col gap-4">
                                        <span className="font-mono text-[0.85rem] md:text-[0.95rem] font-medium tracking-widest text-[#8a8f9a] uppercase">
                                            Contact
                                        </span>
                                        <Link
                                            href="/contact"
                                            className="font-mono text-[1rem] md:text-[1.15rem] font-medium tracking-wide text-[#e0e2ec] hover:text-white transition-colors duration-200"
                                        >
                                            Schedule a Consultation
                                        </Link>
                                    </div>

                                    {/* Locations block */}
                                    <div className="flex flex-col gap-4">
                                        <span className="font-mono text-[0.85rem] md:text-[0.95rem] font-medium tracking-widest text-[#8a8f9a] uppercase">
                                            Locations
                                        </span>
                                        <Link
                                            href="/location/hyderabad"
                                            className="font-mono text-[1rem] md:text-[1.15rem] font-medium tracking-wide text-[#e0e2ec] hover:text-white transition-colors duration-200"
                                        >
                                            Hyderabad
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* LEFT COLUMN: Logo & Contact Info */}

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-20 pt-2 lg:pt-0">
                                {navColumns.map((col, ci) => (
                                    <div key={ci} className="flex flex-col gap-6">
                                        {col.map((item) => (
                                            <Link
                                                key={`${item.label}-${ci}`}
                                                href={item.href}
                                                className="font-sans text-[1rem] md:text-[1.05rem] font-medium text-[#c0c4d8] hover:text-white transition-colors duration-200"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM SECTION */}
                    <div className="mt-20 md:mt-28 flex flex-col w-full">
                        {/* RIGHT COLUMN: Nav Links */}

                        <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-10 lg:gap-16">
                            {/* Terms & Security Row */}
                            <div className="flex flex-col justify-between w-full sm:flex-row sm:flex-wrap gap-4 sm:gap-8 items-start sm:items-center px-1">
                                <div>
                                    <Link
                                        href="/terms"
                                        className="font-mono text-[0.85rem] md:text-[0.9rem] font-medium text-[#8a8f9a] hover:text-[#c0c4d8] transition-colors duration-200"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                    <Link
                                        href="/privacy"
                                        className="font-mono text-[0.85rem] md:text-[0.9rem] font-medium text-[#8a8f9a] hover:text-[#c0c4d8] transition-colors duration-200"
                                    >
                                        Policy And Privacy
                                    </Link>
                                </div>
                                <Link
                                    href="/security"
                                    className="font-mono text-[0.85rem] md:text-[0.9rem] font-medium text-[#8a8f9a] hover:text-[#c0c4d8] transition-colors duration-200"
                                >
                                    Security
                                </Link>
                            </div>
                        </div>

                        {/* Horizontal Line */}
                        <div className="w-full h-[1px] bg-white/20" />

                        {/* Social Icons */}
                        <div className="flex justify-center items-center gap-6 mt-6">
                            {[
                                { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
                                { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
                                { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedInIcon },
                            ].map(({ label, href, Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="text-[#c0c4d8] hover:text-white transition-transform hover:scale-110 duration-200"
                                >
                                    <Icon />
                                </Link>
                            ))}
                        </div>


                    </div>
                </div>
            </div>
        </footer>
    );
}