import React from 'react';
import { Navbar } from './Navbar';

export const PageHeader = ({
  bgImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
  children,
  className = '',
}) => {
  return (
    <div className="relative w-full bg-[#0d0d0e] transition-colors duration-300">
      {/* 1. FLOATING NAVBAR LAYER (ALWAYS Z-50 ON TOP) */}
      <div className="relative z-50 w-full">
        <Navbar />
      </div>

      {/* 2. TOP HEADER BANNER WITH BACKGROUND IMAGE */}
      <div className="relative z-0 w-full overflow-hidden bg-neutral-950 h-[100px] sm:h-[130px] md:h-[160px] -mt-14 sm:-mt-16 md:-mt-20">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Page Header Background"
            className="w-full h-full object-cover grayscale contrast-125 opacity-40 scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-neutral-950/90" />
        </div>
      </div>

      {/* 3. OVERLAPPING ROUNDED CONTENT CARD */}
      <div
        className={`relative z-10 -mt-10 sm:-mt-14 md:-mt-18 rounded-t-[1.5rem] sm:rounded-t-[2.5rem] bg-[#f4f4f0] dark:bg-[#0d0d0e] text-neutral-900 dark:text-neutral-100 shadow-[0_-25px_60px_rgba(0,0,0,0.25)] pt-6 sm:pt-8 md:pt-10 transition-colors duration-300 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
