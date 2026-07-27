"use client";

import React from "react";

interface SectionHeadingProps {
  title: React.ReactNode;
  align?: "center" | "left" | "right";
  titleClassName?: string;
  containerClassName?: string;
  underlineColor?: string;
}

export default function SectionHeading({
  title,
  align = "center",
  titleClassName = "text-[2.25rem] text-black",
  containerClassName = "",
  underlineColor = "#FF3030",
}: SectionHeadingProps) {
  const alignClass =
    align === "center"
      ? "flex flex-col items-center text-center"
      : align === "left"
        ? "flex flex-col items-start text-left"
        : "flex flex-col items-end text-right";

  return (
    <div className={`${alignClass} ${containerClassName}`}>
      <h2
        className={`geist-medium leading-none tracking-normal relative inline-block pb-3 ${titleClassName}`}
      >
        {title}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[1px]">
          <span
            className="w-full h-[2.5px]"
            style={{ backgroundColor: underlineColor }}
          />
          <span
            className="w-full h-[2.5px]"
            style={{ backgroundColor: underlineColor }}
          />
        </div>
      </h2>
    </div>
  );
}
