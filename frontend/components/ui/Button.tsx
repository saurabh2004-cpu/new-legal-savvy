"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";

export interface ButtonProps extends HTMLMotionProps<"button"> {
    text: string;
    href?: string;
    showIcon?: boolean;
    bgColor?: string;
    textColor?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            text,
            href,
            onClick,
            className = "",
            showIcon = true,
            // bgColor = "#FF3030",
            bgColor = "#E64A19",
            textColor = "#FFFFFF",
            disabled = false,
            loading = false,
            variant,
            ...props
        },
        ref
    ) => {
        let currentBg = bgColor;
        let currentText = textColor;

        if (variant === "secondary") {
            currentBg = "#1F2937";
            currentText = "#FFFFFF";
        } else if (variant === "outline") {
            currentBg = "transparent";
            currentText = "#111827";
        } else if (variant === "ghost") {
            currentBg = "transparent";
            currentText = "#111827";
        }

        const isDisabled = disabled || loading;

        const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

        // Rising background overlay
        const overlayVariants = {
            initial: { y: "100%", x: "-15px", transition: { duration: 0.7, ease } },
            hover: { y: "0%", x: "0px", transition: { duration: 0.7, ease } },
        };

        // Icon circle scaling
        const circleVariants = {
            initial: { scale: 1, transition: { duration: 0.7, ease } },
            hover: { scale: 1.1, transition: { duration: 0.6, ease, delay: 0.1 } },
        };

        // Outgoing arrow
        const arrow1Variants = {
            initial: { 
                x: 0, y: 0, rotate: 0, opacity: 1, 
                transition: { 
                    rotate: { duration: 0.3, ease, delay: 0.3 },
                    default: { duration: 0.6, ease, delay: 0 }
                } 
            },
            hover: { 
                x: 24, y: 0, rotate: 45, opacity: 0, 
                transition: { 
                    rotate: { duration: 0.25, ease, delay: 0 },
                    default: { duration: 0.5, ease, delay: 0.2 }
                } 
            },
        };

        // Incoming arrow
        const arrow2Variants = {
            initial: { x: -24, y: 0, rotate: 45, opacity: 0, transition: { duration: 0.7, ease } },
            hover: { x: 0, y: 0, rotate: 45, opacity: 1, transition: { duration: 0.5, ease, delay: 0.2 } },
        };

        // Outgoing text
        const text1Variants = {
            initial: { y: 0, transition: { duration: 0.7, ease } },
            hover: { y: -24, transition: { duration: 0.6, ease, delay: 0.05 } },
        };

        // Incoming text
        const text2Variants = {
            initial: { y: 24, transition: { duration: 0.7, ease } },
            hover: { y: 0, transition: { duration: 0.6, ease, delay: 0.05 } },
        };

        const ButtonContent = (
            <motion.button
                ref={ref}
                onClick={onClick}
                disabled={isDisabled}
                initial="initial"
                whileHover={isDisabled ? "initial" : "hover"}
                whileTap={isDisabled ? {} : { scale: 0.96 }}
                className={`relative group flex items-center justify-center gap-2 px-7 py-3.5 rounded-full shadow-lg whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 transition-opacity overflow-hidden ${variant === "outline" ? "border-2 border-current shadow-none" : ""
                    } ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
                style={{
                    backgroundColor: currentBg,
                    color: currentText,
                }}
                {...props}
            >
                {/* Background Overlay */}
                <motion.div
                    variants={overlayVariants}
                    className={`absolute w-[150%] h-full left-[-25%] top-0 z-0 pointer-events-none ${variant === "outline" || variant === "ghost" ? "bg-gray-200" : "bg-black/20"}`}
                />

                {/* Text Content */}
                <span className="relative z-10 overflow-hidden font-sans font-medium text-lg leading-none inline-flex items-center justify-center">
                    {loading ? (
                        "Loading..."
                    ) : (
                        <>
                            <motion.span variants={text1Variants} className="block">
                                {text}
                            </motion.span>
                            <motion.span variants={text2Variants} className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                                {text}
                            </motion.span>
                        </>
                    )}
                </span>

                {/* Icon Container */}
                {showIcon && !loading && (
                    <motion.div
                        variants={circleVariants}
                        className="relative z-10 bg-white p-1 rounded-full flex items-center justify-center overflow-hidden"
                    >
                        <div className="relative flex items-center justify-center w-[18px] h-[18px]">
                            {/* Outgoing Arrow */}
                            <motion.svg
                                variants={arrow1Variants}
                                className="absolute"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="black"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M7 17L17 7" />
                                <path d="M7 7h10v10" />
                            </motion.svg>
                            
                            {/* Incoming Arrow */}
                            <motion.svg
                                variants={arrow2Variants}
                                className="absolute"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="black"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M7 17L17 7" />
                                <path d="M7 7h10v10" />
                            </motion.svg>
                        </div>
                    </motion.div>
                )}

                {/* Loading Spinner */}
                {loading && (
                    <div className="relative z-10 flex items-center justify-center">
                        <svg
                            className="animate-spin h-5 w-5 text-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    </div>
                )}
            </motion.button>
        );

        return (
            <div className="inline-block">
                {href ? <Link href={href}>{ButtonContent}</Link> : ButtonContent}
            </div>
        );
    }
);

Button.displayName = "Button";

export default Button;