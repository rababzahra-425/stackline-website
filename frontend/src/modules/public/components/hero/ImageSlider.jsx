import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { sliderImages } from '../../data/heroData';
import { useAutoSlider } from '../../../../shared/hooks/useAutoSlider';

export const ImageSlider = () => {
  const { currentIndex, nextSlide, prevSlide, goToSlide, setIsPaused } =
    useAutoSlider(sliderImages.length, 4500);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-full h-[380px] sm:h-[480px] md:h-[560px] lg:h-screen rounded-none overflow-hidden shadow-2xl group border-r border-black/10 dark:border-white/10 transition-all duration-300 select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Slide Images with smooth crossfade */}
      {sliderImages.map((image, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 group-hover:scale-100"
              draggable="false"
            />
            {/* Gradient Overlay for Text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

            {/* Top Tag */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
              <span className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/15 shadow-sm">
                {image.tag}
              </span>
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-14 left-4 right-4 sm:bottom-16 sm:left-8 sm:right-8 z-20 text-white pointer-events-none">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-0.5 sm:mb-1 drop-shadow-md">
                {image.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-white/80 drop-shadow-sm line-clamp-1 sm:line-clamp-none">
                {image.subtitle}
              </p>
            </div>
          </div>
        );
      })}

      {/* Prev / Next Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-white/20 hover:scale-110 shadow-lg cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-white/20 hover:scale-110 shadow-lg cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Bottom Center Pagination Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/15">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex
              ? 'w-5 sm:w-7 bg-white'
              : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/70'
              }`}
          />
        ))}
      </div>
    </div>
  );
};
