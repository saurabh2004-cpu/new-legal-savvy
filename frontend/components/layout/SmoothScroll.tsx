"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        let animationFrameId: number;
        function raf(time: number) {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        }

        animationFrameId = requestAnimationFrame(raf);

        // Track requestAnimationFrame for ResizeObserver to batch resize calls
        let resizeRafId: number | null = null;
        const resizeObserver = new ResizeObserver(() => {
            if (resizeRafId !== null) return;
            resizeRafId = requestAnimationFrame(() => {
                lenis.resize();
                resizeRafId = null;
            });
        });

        if (document.body) {
            resizeObserver.observe(document.body);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (resizeRafId !== null) {
                cancelAnimationFrame(resizeRafId);
            }
            resizeObserver.disconnect();
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Scroll to top immediately on route changes
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}