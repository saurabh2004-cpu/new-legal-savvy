"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends HTMLMotionProps<"button"> {}

const Button2 = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className = "",
            ...props
        },
        ref
    ) => {
        const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
                x: 0, y: 24, rotate: 0, opacity: 0, 
                transition: { 
                    rotate: { duration: 0.25, ease, delay: 0 },
                    default: { duration: 0.5, ease, delay: 0.2 }
                } 
            },
        };

        // Incoming arrow
        const arrow2Variants = {
            initial: { x: 0, y: -24, rotate: 0, opacity: 0, transition: { duration: 0.7, ease } },
            hover: { x: 0, y: 0, rotate: 0, opacity: 1, transition: { duration: 0.5, ease, delay: 0.2 } },
        };

        return (
            <motion.button
                key="vertical-animated-button"
                ref={ref}
                initial="initial"
                whileHover="hover"
                variants={circleVariants}
                className={`relative flex items-center justify-center p-2 w-13 aspect-square rounded-full bg-white overflow-hidden cursor-pointer ${className}`}
                {...props}
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
                        <path d="M12 5v14" />
                        <path d="M19 12l-7 7-7-7" />
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
                        <path d="M12 5v14" />
                        <path d="M19 12l-7 7-7-7" />
                    </motion.svg>
                </div>
            </motion.button>
        );
    }
);

Button2.displayName = "Button2";

export default Button2;