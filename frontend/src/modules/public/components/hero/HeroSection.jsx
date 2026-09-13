import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../common/Navbar';
import { ImageSlider } from './ImageSlider';
import { HeroHeader } from './HeroHeader';
import { HeroBody } from './HeroBody';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef(null);
  const heroVeilRef = useRef(null);
  const heroContentRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const heroContent = heroContentRef.current;
    const heroVeil = heroVeilRef.current;

    if (!hero || !heroContent || !heroVeil) return;

    const ctx = gsap.context(() => {
      // Scrubbed animation as Projects section slides over the bottom of Hero
      gsap.to(heroContent, {
        scale: 0.94,
        yPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'bottom bottom+=150',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(heroVeil, {
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'bottom bottom+=150',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="w-full relative bg-[#f4f4f0] dark:bg-[#0d0d0e] transition-colors duration-300">
      {/* Dark Ink Veil Overlay */}
      <div
        ref={heroVeilRef}
        className="absolute inset-0 bg-black pointer-events-none z-10 opacity-0 transition-none"
      />

      {/* MOBILE TOP NAVBAR (Visible < lg, comes first on mobile) */}
      <div className="w-full lg:hidden px-4 pt-3 pb-1 z-40 relative">
        <Navbar />
      </div>

      {/* Scalable Hero Content */}
      <div
        ref={heroContentRef}
        className="w-full flex flex-col lg:flex-row relative origin-top transform-gpu"
      >
        {/* LEFT COLUMN: Pinned Sticky Image Slider on desktop */}
        <div className="w-full lg:w-1/2 h-[380px] sm:h-[480px] md:h-[560px] lg:h-screen lg:sticky lg:top-0 p-0 flex items-center justify-center z-20">
          <ImageSlider />
        </div>

        {/* RIGHT COLUMN: Desktop Navbar + Hero Header & Body Text */}
        <div className="w-full lg:w-1/2 min-h-screen flex flex-col px-6 md:px-12 lg:px-16 py-6 justify-between z-20">
          {/* DESKTOP NAVBAR (Visible on lg+) */}
          <div className="hidden lg:block">
            <Navbar />
          </div>

          {/* Hero Header & Body Text */}
          <div className="my-auto py-6 lg:py-8 flex flex-col justify-between space-y-8 lg:space-y-12">
            <HeroHeader />
            <HeroBody />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


