import React from 'react';

export const HeroHeader = () => {
  return (
    <div className="flex flex-col select-none mb-3 sm:mb-5">
      {/* Brand Logo Icon Badge */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
        <img src="/logo_1.svg" alt="Stackline Studio Logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain shrink-0 text-neutral-900 dark:text-white" />
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          (CREATIVE BRANDS & DIGITAL ENGINEERING)
        </span>
      </div>

      {/* Line 1: ©STACKLINE */}
      <h1 className="font-hero-heading text-[28px] sm:text-[42px] md:text-[56px] lg:text-[72px] xl:text-[84px] tracking-tighter text-current flex items-baseline gap-1.5 sm:gap-2 leading-[0.9]">
        <span className="text-[0.55em] font-normal leading-none inline-block transform -translate-y-1 sm:-translate-y-2">
          ©
        </span>
        STACKLINE
      </h1>

      {/* Line 2: STUDIO */}
      <div className="flex items-center gap-2 sm:gap-4">
        <h1 className="font-hero-heading text-[28px] sm:text-[42px] md:text-[56px] lg:text-[72px] xl:text-[84px] tracking-tighter text-current leading-[0.9]">
          STUDIO
        </h1>
      </div>

      {/* Subtitle / Bracket text */}
      <div className="mt-2 pl-0.5">
        <span className="font-bracket text-sm sm:text-base md:text-lg tracking-normal opacity-80">
          (Based in Prague)
        </span>
      </div>
    </div>
  );
};

