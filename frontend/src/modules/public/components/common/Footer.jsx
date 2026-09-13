import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp, MapPin } from 'lucide-react';
import { ThemeToggle } from '../../../../shared/components/ui/ThemeToggle';

export const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Work', path: '/work' },
    { label: 'Services', path: '/service' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/talk' },
  ];

  return (
    <footer className="relative z-30 w-full bg-[#0d0d0e] dark:bg-[#f4f4f0] text-white dark:text-neutral-900 px-6 pt-20 pb-12 md:px-16 md:pt-28 md:pb-16 border-t border-white/10 dark:border-neutral-300 transition-colors duration-300">
      <div className="mx-auto max-w-[1500px] flex flex-col justify-between min-h-[70vh]">
        {/* Top Info Bar */}
        <div className="flex w-full justify-between items-center text-xs md:text-sm font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-16">
          <span>(Get In Touch)</span>
          <span>(04)</span>
        </div>

        {/* Big CTA Title & Email */}
        <div className="my-auto py-8 sm:py-10">
          <h2 className="font-hero-heading text-[48px] sm:text-[88px] md:text-[128px] lg:text-[160px] 2xl:text-[192px] leading-[0.88] uppercase select-none mb-6 sm:mb-8">
            LET'S TALK
          </h2>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 pt-2 sm:pt-4">
            <a
              href="mailto:hello@stackline.studio"
              className="group flex items-center gap-3 sm:gap-4 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white dark:text-neutral-900 border-b-2 border-white/30 hover:border-white dark:border-neutral-400/50 dark:hover:border-neutral-900 pb-2 transition-all duration-300"
            >
              <span>hello@stackline.studio</span>
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
            </a>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-neutral-400 dark:text-neutral-600 max-w-md leading-relaxed">
              Have an ambitious project in mind? We'd love to partner with you to craft extraordinary digital experiences.
            </p>
          </div>
        </div>

        {/* Footer Navigation & Social Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-white/10 dark:border-neutral-300 mt-16 text-sm">
          {/* Col 1: Pages */}
          <div className="flex flex-col space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
              Navigation
            </span>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-neutral-300 hover:text-white dark:text-neutral-700 dark:hover:text-neutral-900 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Col 2: Socials */}
          <div className="flex flex-col space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
              Social Media
            </span>
            {['Instagram', 'Twitter / X', 'LinkedIn', 'Behance', 'Dribbble'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-neutral-300 hover:text-white dark:text-neutral-700 dark:hover:text-neutral-900 transition-colors duration-200 flex items-center gap-1 group"
              >
                <span>{social}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          {/* Col 3: Location */}
          <div className="flex flex-col space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
              Studio HQ
            </span>
            <div className="text-neutral-300 dark:text-neutral-700 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                <span>Prague, Czech Republic</span>
              </p>
              <p className="text-xs text-neutral-500">Central European Time (CET)</p>
            </div>
          </div>

          {/* Col 4: Back To Top & Theme Toggle */}
          <div className="flex flex-col items-start md:items-end justify-between gap-4">
            <ThemeToggle />
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 px-5 py-3 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black dark:border-neutral-400/50 dark:hover:border-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-white text-white dark:text-neutral-900 font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-lg"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Rights & Credit Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 dark:border-neutral-300 text-xs font-mono text-neutral-500 gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo_1.svg" alt="Stackline Studio Logo" className="w-5 h-5 object-contain text-white dark:text-neutral-900" />
            <p>© {new Date().getFullYear()} STACKLINE STUDIO. All rights reserved.</p>
          </div>
          <p>Designed & Built with Passion</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
