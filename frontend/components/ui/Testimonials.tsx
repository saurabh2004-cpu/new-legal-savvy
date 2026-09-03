'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '../utils/SectionHeading';
import assets from '@/data/assets';

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Business Owner",
    image: assets.logo.placeholder,
    text: "Legal Savy's team was incredible. They negotiated with the bank on my behalf and reduced my settlement amount significantly. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Software Engineer",
    image: assets.logo.placeholder,
    text: "Legal Savy made my loan settlement simple and stress-free. Their guidance was clear, professional, and gave me confidence throughout the entire process.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Retail Merchant",
    image: assets.logo.placeholder,
    text: "Transparent, professional, and empathetic. They explained every step of the loan settlement process clearly. Best decision I made for my financial health.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Freelancer",
    image: assets.logo.placeholder,
    text: "The team understood my financial situation and provided practical solutions. Their support was professional, reassuring, and excellent throughout the settlement process.",
    rating: 5,
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Contractor",
    image: assets.logo.placeholder,
    text: "Outstanding service! They helped me restructure my multiple loans into a single manageable settlement. The lawyers are top-notch.",
    rating: 5,
  }
];

// Duplicate for infinite scroll
const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

// Extracted Card Component to handle both Text and Video types
const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
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

      <div className='flex justify-center items-center gap-3 text-center mt-6'>
        <div className='relative h-10 w-10 sm:h-12 sm:w-12 aspect-square rounded-full overflow-hidden'>
          <Image src={testimonial.image || assets.logo.placeholder} alt={testimonial.name} fill className='object-cover' />
        </div>
        <div className="flex flex-col items-start ">
          <h4 className="font-medium text-black text-[20px] leading-[100%] tracking-normal">{testimonial.name}</h4>
          <p className="font-medium text-sm text-black/50 leading-[100%] tracking-normal mt-2">{testimonial.role}</p>
        </div>
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
        className="max-w-8xl mx-auto rounded-xl flex flex-col items-center justify-center overflow-hidden p-8 sm:px-16 sm:py-20 lg:pt-28 space-y-6 md:space-y-8 lg:space-y-10 bg-[#1D2540]"
      >
        {/* Header Section with Viewport Animation */}
        <div className="w-full flex flex-col items-start">
          <SectionHeading title="Testimonials" align="left" titleClassName="text-[28px] md:text-[36px] text-white" underlineColor="#ED3D3D" containerClassName="mb-6" />

          <div className="my-4 flex w-full flex-col lg:flex-row justify-between lg:items-end gap-6">
            <h2 className="geist-semiBold text-[24px] md:text-[32px] xl:text-[52.09px] leading-[100%] tracking-normal text-white inline-block relative">
              What Our Clients Say.
              {/* <p className="mt-2 text-white">Clients Say</p> */}
            </h2>

            <div className="w-full lg:w-[500px] flex">
              <p className="text-white geist-regular text-lg leading-tight tracking-normal">
                Read how borrowers across India have worked with our legal team to settle loans through a documented, RBI-compliant process.
              </p>
            </div>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Left/Right Fade Gradients for smooth entrance/exit */}
          <div className="absolute left-0 top-0 bottom-0 w-6 md:w-48 bg-gradient-to-r from-[#1D2540] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-6 md:w-48 bg-gradient-to-l from-[#1D2540] to-transparent z-10 pointer-events-none"></div>

          {/* Scroll Tracks */}
          <div className="flex w-max">
            <motion.div
              variants={trackVariants}
              animate="animate"
              className="flex gap-6 md:gap-8 pr-6 md:pr-8"
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={`track1-${index}`} testimonial={testimonial} />
              ))}
            </motion.div>

            <motion.div
              variants={trackVariants}
              animate="animate"
              className="flex gap-6 md:gap-8 pr-6 md:pr-8"
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={`track2-${index}`} testimonial={testimonial} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
