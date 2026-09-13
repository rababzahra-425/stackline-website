import React, { useState, useEffect, useRef } from 'react';
import { reviewsService } from '../../../admin/reviews/services/reviewsService';
import ImageUploader from '../../../admin/shared/components/ImageUploader';

const defaultTestimonials = [
  {
    _id: 'def-1',
    headline: 'Exceptional Branding That Elevated Our Identity.',
    quote: 'Their approach completely transformed our brand. We’ve seen a huge increase in recognition and client engagement!',
    name: 'Dave Mitchell',
    company: '(Lumina)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    _id: 'def-2',
    headline: 'Outstanding Website Design, Exceeding Expectations.',
    quote: 'The website they created is stunning, user-friendly, and has boosted our online conversions significantly. Highly recommend!',
    name: 'Sara Thompson',
    company: '(Horizon)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    _id: 'def-3',
    headline: 'Solutions That Drove Real Results for Our Website.',
    quote: 'Their designs are not only beautiful but effective. Our sales increased by 30% post-launch. Incredible experience!',
    name: 'Emil Rogers',
    company: '(Pure Green)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    _id: 'def-4',
    headline: 'Seamless Collaboration & Support With Exceptional Results.',
    quote: 'Working with them was easy and efficient. They perfectly captured our vision, and the results were outstanding.',
    name: 'Michaela Lee',
    company: '(Apex Fitness)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    _id: 'def-5',
    headline: 'Strategic Branding & Identity With Immediate Impact.',
    quote: 'Our new branding resonated with our audience immediately. We’ve received so many compliments and new business inquiries.',
    name: 'Amanda Lopez',
    company: '(Urban Interiors)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    _id: 'def-6',
    headline: 'UX Design That Transformed Our User Experience.',
    quote: 'Their UX design made our platform more intuitive and enjoyable to use. Customer satisfaction has dramatically increased.',
    name: 'Jason Clark',
    company: '(Quantum)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    headline: '',
    quote: '',
    rating: 5,
    avatar: '',
  });

  // Drag-to-scroll state & Ref
  const scrollRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  // Load Reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await reviewsService.getAll(false);
      if (res.data && res.data.length > 0) {
        setTestimonials(res.data);
      }
    } catch (err) {
      console.warn('Could not load reviews from server, using default set:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Button Scroll Handlers
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = 350 + 24;
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = 350 + 24;
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  // Loop Scroll Handler: Reset position seamlessly when reaching end of duplicated set
  const handleScroll = () => {
    if (!scrollRef.current || testimonials.length === 0) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const singleSetWidth = scrollWidth / 3;

    if (singleSetWidth > 0) {
      if (scrollLeft >= singleSetWidth * 2) {
        scrollRef.current.scrollLeft = scrollLeft - singleSetWidth;
      } else if (scrollLeft <= 5) {
        scrollRef.current.scrollLeft = scrollLeft + singleSetWidth;
      }
    }
  };

  // Duplicated array for infinite seamless looping (3 sets)
  const displayTestimonials =
    testimonials.length > 0 ? [...testimonials, ...testimonials, ...testimonials] : [];

  // Start scroll in the middle set for seamless initial wrap-around
  useEffect(() => {
    if (scrollRef.current && testimonials.length > 0) {
      const singleSetWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = singleSetWidth;
    }
  }, [testimonials]);

  // Auto-play infinite loop slider (slides every 4 seconds unless hovered/dragged)
  useEffect(() => {
    if (testimonials.length === 0 || isMouseDown) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const cardWidth = 350 + 24;
        scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials, isMouseDown]);

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.6; // Scroll speed multiplier
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Form Field Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Review Handler
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.headline.trim() || !formData.quote.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Headline, Review Quote).');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');

      const avatarToUse =
        formData.avatar.trim() ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop';

      const res = await reviewsService.create({
        ...formData,
        avatar: avatarToUse,
      });

      if (res.success && res.data) {
        setSubmitSuccess(true);
        setTestimonials((prev) => [res.data, ...prev]);
        setFormData({
          name: '',
          company: '',
          headline: '',
          quote: '',
          rating: 5,
          avatar: '',
        });

        // Scroll to start
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          }
        }, 100);

        setTimeout(() => {
          setSubmitSuccess(false);
          setShowForm(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Review submit failed:', err);
      setErrorMsg(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-30 w-full -mt-[8vh] sm:-mt-[8svh] rounded-none shadow-[0_-25px_60px_rgba(0,0,0,0.18)] bg-[#f4f4f0] dark:bg-[#0d0d0e] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 px-4 py-12 sm:px-6 sm:py-16 md:px-16 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1500px]">
        {/* 1. Top Meta & Navigation Header */}
        <div className="flex w-full flex-wrap justify-between items-center text-xs md:text-sm font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-8 sm:mb-12 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-neutral-950 dark:text-white font-bold">(Testimonials)</span>
            <span>({testimonials.length.toString().padStart(2, '0')})</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Customer Add Review Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 text-xs font-mono tracking-wider uppercase border border-neutral-900 dark:border-white text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-base leading-none">{showForm ? '✕' : '+'}</span>
              <span>{showForm ? 'Close Form' : 'Write a Review'}</span>
            </button>

            {/* Scroll Click Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleScrollLeft}
                aria-label="Scroll Left"
                className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
              >
                ←
              </button>
              <button
                onClick={handleScrollRight}
                aria-label="Scroll Right"
                className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* 2. Headline Typography */}
        <div className="max-w-5xl mb-10 sm:mb-14">
          <h2 className="font-hero-heading text-[48px] sm:text-[88px] md:text-[128px] lg:text-[160px] 2xl:text-[192px] leading-[0.85] tracking-tight uppercase select-none mb-6">
            WHAT OUR <br className="hidden sm:block" /> CLIENTS SAY
          </h2>
          <p className="text-lg sm:text-2xl md:text-3xl font-medium leading-snug text-neutral-800 dark:text-neutral-200 max-w-4xl">
            Read genuine feedback from our global partners and clients.
          </p>
        </div>

        {/* 3. Embedded Customer Review Submission Form */}
        {showForm && (
          <div className="mb-12 p-6 sm:p-10 bg-white dark:bg-[#151518] border border-neutral-300 dark:border-neutral-800 shadow-xl transition-all duration-300">
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-950 dark:text-white">
                    Submit Your Client Review
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    Share your experience working with Stackline Studio. Your review will display live on our site!
                  </p>
                </div>
                <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 uppercase">
                  (Client Portal)
                </span>
              </div>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-mono flex items-center gap-3">
                  <span>✓</span>
                  <span>Thank you! Your review has been published successfully.</span>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-sm font-mono flex items-center gap-3">
                  <span>⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Eleanor Vance"
                      required
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#1c1c20] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                      Company / Role *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. (Lumina Brand Co)"
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#1c1c20] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                    Review Headline *
                  </label>
                  <input
                    type="text"
                    name="headline"
                    value={formData.headline}
                    onChange={handleInputChange}
                    placeholder="e.g. Outstanding Website Design & Branding Experience"
                    required
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#1c1c20] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                    Testimonial Quote / Feedback *
                  </label>
                  <textarea
                    name="quote"
                    rows={4}
                    value={formData.quote}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project results, collaboration, and impact..."
                    required
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#1c1c20] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                      Star Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                          className="text-2xl focus:outline-none transition-transform hover:scale-125"
                        >
                          {star <= formData.rating ? '★' : '☆'}
                        </button>
                      ))}
                      <span className="ml-2 text-xs font-mono text-neutral-500">
                        ({formData.rating} / 5 Stars)
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                      Client Photo / Avatar
                    </label>
                    <ImageUploader
                      value={formData.avatar}
                      onChange={(url) => setFormData((prev) => ({ ...prev, avatar: url }))}
                      label="Upload Client Photo"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-neutral-900 text-white dark:bg-white dark:text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Post Review'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 4. Single Horizontal Row Reviews List (Infinite 1-by-1 Seamless Loop) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex flex-nowrap overflow-x-auto scrollbar-none gap-4 sm:gap-6 pb-6 pt-2 select-none cursor-grab active:cursor-grabbing scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayTestimonials.map((item, index) => (
            <div
              key={`${item._id || item.id || 'rev'}-${index}`}
              className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 group flex flex-col justify-between bg-white/80 dark:bg-[#141417]/90 backdrop-blur-xl border border-neutral-200/90 dark:border-neutral-800/80 p-5 sm:p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-2xl hover:border-neutral-400 dark:hover:border-neutral-700 hover:-translate-y-1.5"
            >
              <div>
                {/* Rating Badge & Verified Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px] font-mono font-bold flex items-center gap-1">
                    <span>★</span>
                    <span>{(item.rating || 5).toFixed(1)}</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">
                    VERIFIED CLIENT
                  </span>
                </div>

                {/* Card Headline */}
                <h3 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white leading-snug mb-2 line-clamp-2">
                  {item.headline}
                </h3>

                {/* Review Description */}
                <p className="text-xs sm:text-[13px] font-normal leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-3">
                  "{item.quote}"
                </p>
              </div>

              {/* Client Profile Footer */}
              <div className="flex items-center gap-3 pt-4 mt-5 border-t border-neutral-100 dark:border-neutral-800/80">
                <img
                  src={
                    item.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
                  }
                  alt={item.name}
                  className="h-9 w-9 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shrink-0 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                    {item.name}
                  </h4>
                  <span className="font-mono text-[10px] tracking-wider text-neutral-400 dark:text-neutral-500 uppercase truncate block">
                    {item.company || '(Client)'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Drag Scroll Helper Indicator */}
        <div className="flex items-center justify-between mt-6 text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
          <span>← Drag or Click Arrows to Scroll →</span>
          <span>Row Mode Active</span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;