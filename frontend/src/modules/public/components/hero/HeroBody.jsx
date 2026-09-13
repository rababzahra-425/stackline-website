import React from 'react';

export const HeroBody = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 mt-4 sm:mt-6">
      {/* Responsive Anton SC Tagline Headline */}
      <h2 className="font-hero-heading text-[40px] sm:text-[60px] md:text-[76px] lg:text-[92px] leading-[0.92] tracking-tight uppercase text-current">
        Creative<br />
        Brands,<br />
        powerful<br />
        websites.
      </h2>

      {/* Responsive Inter Body Paragraphs */}
      <div className="space-y-6 sm:space-y-8 max-w-2xl font-navbar text-base sm:text-lg md:text-[20px] font-normal leading-relaxed sm:leading-loose text-gray-500 dark:text-gray-400 tracking-wide pb-12 sm:pb-24">
        <p>
          We are passionate about creating meaningful brands and dynamic websites that stand out in today’s competitive market. Our team combines strategic thinking with creative design to craft custom solutions that align with your business goals. From developing a unique brand identity to designing intuitive, responsive websites, we focus on delivering experiences that engage and convert.
        </p>
        <p>
          With every project, we ensure that your brand’s story is told in a way that resonates with your audience, builds trust, and drives growth. Let us help you transform your brand and take your digital presence to the next level.
        </p>
      </div>
    </div>
  );
};

