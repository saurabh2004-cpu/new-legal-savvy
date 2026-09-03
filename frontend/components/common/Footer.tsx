import Image from "next/image";
import Link from "next/link";
import assets from "@/data/assets";

// ── Navigation Data ─────────────────────────────────────────────
const navColumns = [
    [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/service" },
        { label: "Gallery", href: "/gallery" },
    ],
    [
        { label: "Blogs", href: "/blogs" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Services", href: "/service" },
        { label: "Gallery", href: "/gallery" },
    ],
    [
        { label: "Blogs", href: "/blogs" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Services", href: "/service" },
        { label: "Gallery", href: "/gallery" },
    ],
];

// ── Social Icons ────────────────────────────────────────────────
const FacebookIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M15.5 8.5h-2a1 1 0 0 0-1 1v2h3l-.5 3h-2.5V21" />
    </svg>
);

const InstagramIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
);

const LinkedInIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

// ── Footer ──────────────────────────────────────────────────────
export default function Footer() {
    return (
        <footer className="w-full py-1 px-2 bg-[#FFFFFF]">
            <div
                className="mx-auto max-w-8xl overflow-hidden rounded-xl px-5 py-8 md:py-10 lg:pt-20 border"
                style={{
                    background:
                        "radial-gradient(circle at 0% 30%, rgba(100,35,55,.6) 0%, rgba(15,18,35,0) 45%), radial-gradient(circle at 100% 80%, rgba(100,35,55,.5) 0%, rgba(15,18,35,0) 45%), #0f1223",
                }}
            >
                <div className="mx-auto flex max-w-6xl flex-col space-y-8 lg:space-y-12">
                    {/* Logo */}
                    <div className="flex justify-start">
                        <Image
                            src={assets.logo.main}
                            alt="Logo"
                            width={220}
                            height={100}
                            className="h-auto w-40 object-contain sm:w-48 md:w-52 lg:w-56"
                        />
                    </div>

                    {/* Contact & Navigation */}
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6 lg:gap-10">

                        {/* Contact & Location */}
                        <div className="flex flex-col gap-10 lg:col-span-2">

                            {/* Contact */}
                            <div className="flex flex-col gap-4">
                                <span className="text-[0.85rem] md:text-[0.95rem] font-medium uppercase tracking-widest text-[#8a8f9a]">
                                    Contact
                                </span>

                                <Link
                                    href="/contact-us"
                                    className="text-base md:text-lg font-medium tracking-wide text-[#e0e2ec] transition-colors duration-200 hover:text-white"
                                >
                                    Schedule a Consultation
                                </Link>
                            </div>

                            {/* Location */}
                            <div className="flex flex-col gap-4">
                                <span className="text-[0.85rem] md:text-[0.95rem] geist-mono-medium uppercase tracking-widest text-[#8a8f9a]">
                                    Locations
                                </span>

                                <Link
                                    href="/location/hyderabad"
                                    className="text-base md:text-lg geist-mono-medium tracking-wide text-[#e0e2ec] transition-colors duration-200 hover:text-white"
                                >
                                    Hyderabad
                                </Link>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:col-span-4 lg:gap-x-20">
                            {navColumns.map((col, ci) => (
                                <div
                                    key={ci}
                                    className="flex flex-col gap-5 lg:ml-auto lg:gap-6"
                                >
                                    {col.map((item) => (
                                        <Link
                                            key={`${item.label}-${ci}`}
                                            href={item.href}
                                            className="text-[15px] md:text-base lg:text-lg text-[#c0c4d8] transition-colors duration-200 hover:text-white"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* BOTTOM SECTION */}
                    <div className="mt-2 flex flex-col w-full">
                        {/* RIGHT COLUMN: Nav Links */}
                        <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-10 lg:gap-16">
                            {/* Terms & Security Row */}
                            <div className="flex flex-col justify-between w-full sm:flex-row sm:flex-wrap gap-4 sm:gap-8 items-start sm:items-center px-1">
                                <div className="flex gap-4 md:gap-8">
                                    <Link
                                        href="/terms"
                                        className="text-[0.85rem] md:text-[0.95rem] geist-mono-medium text-[#8a8f9a] hover:text-[#c0c4d8] transition-colors duration-200"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                    <Link
                                        href="/privacy"
                                        className="text-[0.85rem] md:text-[0.95rem] geist-mono-medium text-[#8a8f9a] hover:text-[#c0c4d8] transition-colors duration-200"
                                    >
                                        Policy And Privacy
                                    </Link>
                                </div>
                                <Link
                                    href="/security"
                                    className="text-[0.85rem] md:text-[0.95rem] geist-mono-medium text-[#8a8f9a] hover:text-[#c0c4d8] transition-colors duration-200"
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

