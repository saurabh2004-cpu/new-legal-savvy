'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '../utils/SectionHeading';

const testimonials = [
  {
    id: 1,
    type: 'text',
    name: "Rajesh Kumar",
    role: "Business Owner",
    text: "Legal Savy's team was incredible. They negotiated with the bank on my behalf and reduced my settlement amount significantly. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    type: 'video',
    name: "Priya Sharma",
    role: "Software Engineer",
    videoThumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    type: 'text',
    name: "Amit Patel",
    role: "Retail Merchant",
    text: "Transparent, professional, and empathetic. They explained every step of the loan settlement process clearly. Best decision I made for my financial health.",
    rating: 5,
  },
  {
    id: 4,
    type: 'video',
    name: "Sneha Reddy",
    role: "Freelancer",
    videoThumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    type: 'text',
    name: "Vikram Singh",
    role: "Contractor",
    text: "Outstanding service! They helped me restructure my multiple loans into a single manageable settlement. The lawyers are top-notch.",
    rating: 5,
  }
];

// Duplicate for infinite scroll
const duplicatedTestimonials = [...testimonials, ...testimonials];

// Extracted Card Component to handle both Text and Video types
const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
  if (testimonial.type === 'video') {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-[290px] sm:w-[320px] md:w-[400px] h-[400px] md:h-[450px] flex-shrink-0 bg-[#D9D9D9] rounded-[32px] md:rounded-[40px] p-4 pb-6 md:p-6 md:pb-8 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
      >
        {/* Video Thumbnail Area */}
        <div className="relative w-full flex-1 rounded-xl overflow-hidden group cursor-pointer mb-4 bg-gray-200">
          <img
            src={testimonial.videoThumbnail}
            alt={`Video testimonial by ${testimonial.name}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-[#ED3D3D] border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 px-2 mt-4 md:mt-6">
          <div>
            <h4 className="text-[#1D2331] text-[20px] leading-[100%] tracking-normal">{testimonial.name}</h4>
            <p className="text-sm text-black/50 leading-[100%] tracking-normal mt-1">{testimonial.role}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Text Card
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-[290px] sm:w-[320px] md:w-[400px] h-[400px] md:h-[450px] flex-shrink-0 bg-[#D9D9D9] rounded-[32px] md:rounded-[40px] p-6 md:p-8 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
    >
      <div className="flex flex-col items-center justify-center flex-1">
        {/* Quote Icon */}
        <svg className="w-14 h-14 text-[#ED3D3D] mb-6 flex-shrink-0 rotate-180" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        {/* Quote Text */}
        <p className="text-[#1D2331] font-medium text-[16px] md:text-[26px] leading-[120%] md:leading-[110%] tracking-tight text-center">
          “{testimonial.text}”
        </p>
      </div>

      <div className="flex flex-col items-start mt-6">
        <h4 className="font-medium text-black text-[20px] leading-[100%] tracking-normal">{testimonial.name}</h4>
        <p className="font-medium text-sm text-black/50 leading-[100%] tracking-normal mt-2">{testimonial.role}</p>
      </div>
    </motion.div>
  );
};

export default function Testimonials() {
  // Animation for the header section
  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  // Infinite Scroll Marquee animation
  const trackVariants = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 40, // Controls the speed of the scroll
          ease: "linear" as const
        }
      }
    }
  };

  return (
    <section className="w-full py-1 px-2">
      <div
        className="max-w-8xl mx-auto rounded-xl flex flex-col items-center justify-center overflow-hidden p-12 sm:px-16 sm:py-20 lg:pt-28 space-y-6 md:space-y-8 lg:space-y-10 bg-[#1D2540]"
      >
        {/* Header Section with Viewport Animation */}
        <div className="w-full flex flex-col items-start">
          <SectionHeading title="Testimonials" align="left" titleClassName="text-[28px] md:text-[36px] text-white" underlineColor="#ED3D3D" containerClassName="mb-6" />

          <div className="my-4 flex w-full flex-col lg:flex-row justify-between lg:items-end gap-6">
            <h2 className="geist-semiBold text-[24px] md:text-[32px] xl:text-[52.09px] leading-[100%] tracking-normal text-white inline-block relative">
              Trusted Smiles.
              <p className="mt-2 text-white">Shared Experiences</p>
            </h2>

            <div className="w-full lg:w-[500px] flex">
              <p className="geist-mono-medium text-white text-base leading-snug">
                Hear from our clients who have successfully resolved their debt and regained their financial freedom with our expert legal assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Left/Right Fade Gradients for smooth entrance/exit */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-48 bg-gradient-to-r from-[#1D2540] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-48 bg-gradient-to-l from-[#1D2540] to-transparent z-10 pointer-events-none"></div>

          {/* Scroll Tracks */}
          <div className="flex w-max">
            {/* First Track */}
            <motion.div
              variants={trackVariants}
              animate="animate"
              className="flex gap-6 md:gap-8 pr-6 md:pr-8"
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard key={`track1-${testimonial.id}`} testimonial={testimonial} />
              ))}
            </motion.div>

            {/* Second Track (Duplicate for seamless loop) */}
            <motion.div
              variants={trackVariants}
              animate="animate"
              className="flex gap-6 md:gap-8 pr-6 md:pr-8"
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard key={`track2-${testimonial.id}`} testimonial={testimonial} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
