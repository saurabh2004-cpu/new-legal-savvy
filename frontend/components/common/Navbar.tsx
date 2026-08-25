"use client";

import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getAllServices } from "@/services/serviceServices";
import { getImageUrl } from "@/utils/getImageUrl";

interface NavbarProps {
  onHoverMenuChange?: (menu: "services" | "locations" | null) => void;
  hoveredMenu?: "services" | "locations" | null;
}

// ─── Static Data & Constants (Moved Outside to Prevent Re-creation on Render) ───

const SERVICES_ITEMS = [
  {
    title: "LITIGATION & DISPUTES",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v17" /><path d="M5 10h14" /><path d="M5 10c0 4 3 7 7 7s7-3 7-7" /><path d="M9 10a3 3 0 0 1-6 0" /><path d="M21 10a3 3 0 0 1-6 0" /></svg>
    ),
  },
  {
    title: "DEBT SETTLEMENT",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 11 2 2 4-4" /></svg>
    ),
  },
  {
    title: "LOAN ACQUISITION",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
    ),
  },
  {
    title: "MORTGAGE LAW",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>
    ),
  },
  {
    title: "CORPORATE LAW",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
    ),
  },
  {
    title: "FINANCIAL ADVICE",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
    ),
  },
];

const LOCATIONS_ITEMS = [
  {
    title: "NEW YORK CITY",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h2M14 6h2M8 10h2M14 10h2M8 14h2M14 14h2" /></svg>
    ),
  },
  {
    title: "LOS ANGELES",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
    ),
  },
  {
    title: "CHICAGO CENTER",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-3.5-5.5-3.5-5.5s-3.5 2.71-3.5 5.5A3.5 3.5 0 0 0 17.5 19z" /><path d="M6.5 19A3.5 3.5 0 0 0 10 15.5c0-2.79-3.5-5.5-3.5-5.5s-3.5 2.71-3.5 5.5A3.5 3.5 0 0 0 6.5 19z" /></svg>
    ),
  },
  {
    title: "HOUSTON HUB",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    ),
  },
  {
    title: "MIAMI DISTRICT",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.6 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /></svg>
    ),
  },
  {
    title: "LONDON BRANCH",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" /></svg>
    ),
  },
  {
    title: "TOKYO REGION",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
    ),
  },
  {
    title: "SYDNEY OFFICE",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3" /><line x1="12" y1="22" x2="12" y2="8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /></svg>
    ),
  },
];

const MEGA_MENU_PRIMARY_LINKS = ["Home", "About", "Conditions", "Treatments", "Cases", "Equipment", "Gallery", "Blog", "Contact", "Locations"];
const MOBILE_MENU_MAIN_LINKS = ["Home", "About", "Services", "Cases", "Team", "Blog", "Contact", "Locations"];

// ─── Animation Variants (Static Objects) ───

const PANEL_VARIANTS = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.35,
      ease: "easeOut" as const,
    },
  }),
};

const MEGA_MENU_LAYOUT_VARIANTS = {
  hidden: {
    clipPath: "inset(0% 0% 100% 0%)",
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.02,
      staggerDirection: -1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.04,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
} as const;

const MEGA_MENU_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)", transition: { duration: 0.3, ease: "easeInOut" } },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const MOBILE_MENU_VARIANTS = {
  hidden: {
    clipPath: "inset(0% 0% 0% 100%)",
    opacity: 0,
    x: "10%",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
} as const;

// Helper function to create URL slug from title
const getServiceSlug = (title?: string) =>
  (title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ─── Navbar Component ───

function NavbarComponent({ onHoverMenuChange, hoveredMenu }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchServices() {
      try {
        setIsLoadingServices(true);
        const data = await getAllServices();
        if (isMounted && data) {
          setServicesData(data);
        }
      } catch (error) {
        if (isMounted) console.error("Failed to fetch services", error);
      } finally {
        if (isMounted) setIsLoadingServices(false);
      }
    }
    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeMenuGrid = hoveredMenu === "services" ? SERVICES_ITEMS : LOCATIONS_ITEMS;

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-11 py-2 md:py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          onMouseEnter={() => onHoverMenuChange?.(null)}
          className={`flex items-center gap-2 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileMenuOpen ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'}`}
        >
          <img src="/home/logo.png" alt="LEGALSAVVY Logo" className="h-6 md:h-8 w-auto object-contain" />
        </Link>

        {/* Center Nav Links - Pill Shape */}
        <div className={`hidden xl:flex items-center bg-[#F0ECE7]/15 backdrop-blur-[24px] rounded-full p-1 gap-1 relative transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileMenuOpen ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
          <Link
            href="/"
            onMouseEnter={() => onHoverMenuChange?.(null)}
            className="px-5 py-3 text-base font-medium text-white bg-[#FFBB78]/12 backdrop-blur-[24px] hover:bg-[#FFBB78]/20 rounded-full transition-colors tracking-normal leading-none"
          >
            HOME
          </Link>
          <Link
            href="/about"
            onMouseEnter={() => onHoverMenuChange?.(null)}
            className="px-5 py-3 text-base font-medium text-white bg-[#FFBB78]/12 backdrop-blur-[24px] hover:bg-[#FFBB78]/20 rounded-full transition-colors tracking-normal leading-none"
          >
            ABOUT US
          </Link>

          {/* SERVICES Pill */}
          <div
            onMouseEnter={() => onHoverMenuChange?.("services")}
            className="relative cursor-pointer flex items-center justify-between"
          >
            <div className={`pl-6 pr-1.5 py-1.5 text-base font-medium text-white bg-[#FFBB78]/12 backdrop-blur-[24px] hover:bg-[#FFBB78]/20 rounded-full transition-all duration-300 flex items-center gap-5 ${hoveredMenu === "services" ? "bg-[#FFBB78]/20" : ""}`}>
              <Link href="/service" className="tracking-normal leading-none">SERVICES</Link>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${hoveredMenu === "services" ? "bg-white text-black rotate-180" : "bg-[#FFBB78]/30"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </div>
            </div>
          </div>

          <Link
            href="/resources"
            onMouseEnter={() => onHoverMenuChange?.(null)}
            className="px-5 py-3 text-base font-medium text-white bg-[#FFBB78]/12 backdrop-blur-[24px] hover:bg-[#FFBB78]/20 rounded-full transition-colors tracking-normal leading-none"
          >
            RESOURCES
          </Link>

          <Link
            href="/contact-us"
            onMouseEnter={() => onHoverMenuChange?.(null)}
            className="px-5 py-3 text-base font-medium text-white bg-[#FFBB78]/12 backdrop-blur-[24px] hover:bg-[#FFBB78]/20 rounded-full transition-colors tracking-normal leading-none"
          >
            CONTACT US
          </Link>

          {/* LOCATIONS Pill (Commented out but styles updated) */}
          {/* <div
            onMouseEnter={() => onHoverMenuChange?.("locations")}
            className="relative cursor-pointer flex items-center justify-between"
          >
            <div className={`pl-6 pr-1.5 py-1.5 text-base font-medium text-white bg-[#FFBB78]/12 backdrop-blur-[24px] hover:bg-[#FFBB78]/20 rounded-full transition-all duration-300 flex items-center gap-5 ${hoveredMenu === "locations" ? "bg-[#FFBB78]/20" : ""}`}>
              <span className="tracking-normal font-mono leading-none">LOCATIONS</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${hoveredMenu === "locations" ? "bg-white text-black rotate-180" : "bg-[#FFBB78]/30"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </div>
            </div>
          </div> */}

          {/* MEGA MENU MEGA DROPDOWN BOX */}
          <AnimatePresence>
            {hoveredMenu && (
              <motion.div
                variants={PANEL_VARIANTS}
                initial="hidden"
                animate="visible"
                exit="exit"
                onMouseEnter={() => onHoverMenuChange?.(hoveredMenu)}
                onMouseLeave={() => onHoverMenuChange?.(null)}
                className={`absolute left-1/2 -translate-x-1/2 top-16 bg-[#DED7CE] border border-white/40 shadow-2xl rounded-[1.5rem] z-50 ${hoveredMenu === "services" ? "w-[650px] flex flex-col p-3.5 gap-3" : "w-[560px] grid grid-cols-2 gap-3.5 p-4"
                  }`}
              >
                {hoveredMenu === "services" ? (
                  isLoadingServices ? (
                    // Skeleton Loaders
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="p-3.5 flex items-center gap-6 rounded-[1.25rem] bg-[#D2C7BD] animate-pulse">
                        <div className="w-[160px] h-[105px] rounded-xl bg-black/10 shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-5 bg-black/10 rounded w-1/2" />
                          <div className="h-4 bg-black/10 rounded w-3/4" />
                        </div>
                      </div>
                    ))
                  ) : servicesData.length > 0 ? (
                    <div
                      className="max-h-[70vh] overflow-y-auto overscroll-contain pr-1 scrollbar-hide space-y-2"
                      onWheel={(e) => e.stopPropagation()}
                    >
                      {servicesData.map((item: any, idx: number) => {
                        return (
                          <motion.div
                            key={item._id || idx}
                            custom={idx}
                            variants={CARD_VARIANTS}
                            initial="hidden"
                            animate="visible"
                          >
                            <Link
                              href={`/service/${item.slug}`}
                              onClick={() => onHoverMenuChange?.(null)}
                              className="p-3.5 bg-[#D2C7BD] hover:bg-[#EFECE8] transition-all duration-300 rounded-[1.25rem] flex items-center justify-between group cursor-pointer shadow-sm"
                            >
                              <div className="flex items-center gap-6 flex-1 min-w-0">
                                {/* Left Image */}
                                <div className="relative w-[160px] h-[105px] rounded-xl overflow-hidden shrink-0 shadow-sm">
                                  <img
                                    src={getImageUrl(item.image) || "/home/our-features-1.png"}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                                {/* Center Content */}
                                <div className="flex flex-col flex-1 text-left justify-center pr-3 min-w-0">
                                  <span className="font-sans text-[1.2rem] md:text-[1.35rem] font-medium text-black/85 group-hover:text-black transition-colors truncate">
                                    {item.title}
                                  </span>
                                  {item.description && (
                                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                                      <div className="overflow-hidden min-h-0">
                                        <p className="font-sans text-[0.9rem] leading-[1.4] text-black/65 line-clamp-2 mt-1">
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {/* Right Plus */}
                              <div className="text-black/70 opacity-100 group-hover:opacity-0 transition-opacity duration-300 shrink-0 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center p-6 text-black/60 font-mono text-sm">No services found.</div>
                  )
                ) : (
                  activeMenuGrid.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      custom={idx}
                      variants={CARD_VARIANTS}
                      initial="hidden"
                      animate="visible"
                      className="bg-[#EFE7DF] hover:bg-white p-5 rounded-[1.6rem] flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                      {/* Icon Square with red focus hover state */}
                      <div className="w-12 h-12 rounded-[1.1rem] bg-[#C4B7AB] text-black group-hover:bg-[#FF3030] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-inner">
                        {item.icon}
                      </div>
                      {/* Title Label */}
                      <span className="font-mono text-[10px] tracking-widest font-bold text-black opacity-80 group-hover:opacity-100 uppercase leading-none mt-4 transition-opacity">
                        {item.title}
                      </span>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side / Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onMouseEnter={() => onHoverMenuChange?.(null)}
          className="flex items-center gap-2.5 bg-[#EFE9E1]/90 backdrop-blur-sm text-black hover:bg-white px-4 md:px-5 py-3 md:py-4 rounded-lg transition-all duration-300 text-sm md:text-base shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
        >
          <div className="w-4 lg:w-6 h-[8px] flex flex-col justify-between items-center relative">
            <span
              className={`w-full h-[2px] bg-black rounded-full transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
            />
            <span
              className={`w-full h-[2px] bg-black rounded-full transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
            />
          </div>
          <span className="text-base font-medium font-mono tracking-normal leading-none">{isMobileMenuOpen ? "CLOSE" : "MENU"}</span>
        </button>
      </nav>

      {/* Mega Menu & Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Desktop Full-Screen Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#071F34] z-[45] hidden xl:block"
            />

            {/* Desktop Mega Menu (Hidden on smaller screens) */}
            <motion.div
              variants={MEGA_MENU_LAYOUT_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-x-4 top-[5.5rem] max-h-[calc(100vh-7rem)] bg-[#DED7CE] rounded-xl z-[60] hidden xl:flex flex-col shadow-2xl "
            >
              {/* Top Content: Icon + Links Columns */}
              <div className="flex-1 flex w-full">
                {/* Left side SVG Icon */}
                <motion.div variants={MEGA_MENU_CHILD_VARIANTS} className="flex-1 flex items-start p-16">
                  <svg width="80" height="80" viewBox="0 0 480 479" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M496 254L268.6 254L484.9 183.7L483.6 179.9L267.4 250.2L451.3 116.6L449 113.3L265 247L398.7 63L395.4 60.7L261.8 244.6L332.1 28.4L328.3 27.1L258 243.4L258 16L254 16L254 243.4L183.7 27.1L179.9 28.4L250.2 244.6L116.6 60.7L113.3 63L247 247L63 113.3L60.7 116.6L244.6 250.2L28.4 179.9L27.1 183.7L243.4 254L16 254L16 258L243.4 258L27.1 328.3L28.4 332.1L244.6 261.8L60.7 395.4L63 398.7L247 265L113.3 449L116.6 451.3L250.2 267.4L179.9 483.6L183.7 484.9L254 268.6L254 496L258 496L258 268.6L328.3 484.9L332.1 483.6L261.8 267.4L395.4 451.3L398.7 449L265 265L449 398.7L451.3 395.4L267.4 261.8L483.6 332.1L484.9 328.3L268.6 258L496 258L496 254Z" fill="#0E1E33" transform="translate(-16, -17)" />
                  </svg>
                </motion.div>

                {/* Right side Links Container */}
                <div className="flex gap-34 justify-between py-8 pl-0 ">
                  {/* Secondary Links (For Patients / Locations) */}
                  <div className="flex flex-col gap-12 pt-4">
                    <motion.div variants={MEGA_MENU_CHILD_VARIANTS}>
                      <h4 className="text-[10px] tracking-[0.2em] uppercase text-black/50 font-mono mb-4 font-semibold">FOR PATIENTS</h4>
                      <Link href="/resources" onClick={() => setIsMobileMenuOpen(false)} className="text-[1.3rem] text-black/60 hover:text-black transition-colors font-light block">
                        Schedule your visit
                      </Link>
                    </motion.div>

                    <motion.div variants={MEGA_MENU_CHILD_VARIANTS}>
                      <h4 className="text-[10px] tracking-[0.2em] uppercase text-black/50 font-mono mb-4 font-semibold">LOCATIONS</h4>
                      <div className="flex flex-col gap-1.5">
                        <Link href="/locations/new-york" onClick={() => setIsMobileMenuOpen(false)} className="text-[1.3rem] text-black/60 hover:text-black transition-colors font-light block">New York</Link>
                        <Link href="/locations/miami" onClick={() => setIsMobileMenuOpen(false)} className="text-[1.3rem] text-black/60 hover:text-black transition-colors font-light block">Miami</Link>
                      </div>
                    </motion.div>
                  </div>

                  {/* Primary Main Links */}
                  <div className="flex flex-col gap-2 pr-12">
                    {MEGA_MENU_PRIMARY_LINKS.map((link) => (
                      <motion.div key={link} variants={MEGA_MENU_CHILD_VARIANTS}>
                        <Link
                          href={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="group relative flex items-center w-fit py-1"
                        >
                          <span className="absolute -left-6 w-4 h-[2px] bg-black scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                          <span className={`text-[2.1rem] leading-[1.1] font-light transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform group-hover:translate-x-3 ${link === "Home" ? "text-black" : "text-black/60 group-hover:text-black"}`}>
                            {link}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mobile Sidebar Overlay (Hidden on Desktop) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] xl:hidden backdrop-blur-sm"
            />
            <motion.div
              variants={MOBILE_MENU_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 right-0 h-full w-[85vw] sm:w-[380px] bg-[#DED7CE] z-[70] xl:hidden overflow-y-auto flex flex-col px-10 py-12 shadow-2xl"
            >
              {/* Close Button */}
              <div className="flex justify-end mb-8 absolute top-6 right-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </div>

              {/* Main Links */}
              <div className="flex flex-col gap-2 mt-4">
                {MOBILE_MENU_MAIN_LINKS.map((link) => {
                  if (link === "Services") {
                    return (
                      <div key="Services" className="flex flex-col">
                        <button
                          onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                          className="flex items-center justify-between text-[1.8rem] font-light text-black/60 hover:text-black transition-colors w-full text-left"
                        >
                          Services
                          <motion.div animate={{ rotate: isServicesExpanded ? 180 : 0 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isServicesExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden flex flex-col gap-3 mt-3 pl-4 border-l border-black/10"
                            >
                              {isLoadingServices ? (
                                <div className="text-[1.2rem] text-black/50 font-light">Loading...</div>
                              ) : servicesData.length > 0 ? (
                                servicesData.map((item: any) => {
                                  return (
                                    <Link
                                      key={item._id}
                                      href={`/service/${item.slug}`}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="text-[1.2rem] text-black/60 hover:text-black transition-colors font-light"
                                    >
                                      {item.title}
                                    </Link>
                                  );
                                })
                              ) : (
                                <div className="text-[1.2rem] text-black/50 font-light">No services found</div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={link}
                      href={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-[1.8rem] font-light transition-colors ${link === "Home" ? "text-black font-normal" : "text-black/60 hover:text-black"}`}
                    >
                      {link}
                    </Link>
                  );
                })}
              </div>

              {/* Secondary Sections */}
              <div className="mt-14 flex flex-col gap-8">
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] uppercase text-black/50 font-mono mb-3 font-semibold">FOR PATIENTS</h4>
                  <Link href="/resources" onClick={() => setIsMobileMenuOpen(false)} className="text-[1.1rem] text-black/70 hover:text-black transition-colors font-light">
                    Schedule your visit
                  </Link>
                </div>

                <div>
                  <h4 className="text-[10px] tracking-[0.2em] uppercase text-black/50 font-mono mb-3 font-semibold">LOCATIONS</h4>
                  <div className="flex flex-col gap-1.5">
                    <Link href="/locations/new-york" onClick={() => setIsMobileMenuOpen(false)} className="text-[1.1rem] text-black/70 hover:text-black transition-colors font-light">New York</Link>
                    <Link href="/locations/miami" onClick={() => setIsMobileMenuOpen(false)} className="text-[1.1rem] text-black/70 hover:text-black transition-colors font-light">Miami</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(NavbarComponent);
