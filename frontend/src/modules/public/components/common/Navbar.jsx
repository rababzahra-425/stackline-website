import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../data/heroData';

export const Navbar = ({ variant }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isHome = variant === 'landing' || location.pathname === '/' || location.pathname === '';

  const buttonLink = navLinks.find((link) => link.isButton);
  const mainLinks = navLinks.filter((link) => !link.isButton);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getLinkClass = (link, isMobile = false) => {
    const isActive = location.pathname === link.href;

    if (isMobile) {
      return `font-hero-heading text-3xl sm:text-4xl uppercase tracking-tight py-2 transition-all duration-200 ${isActive ? 'opacity-100 text-current font-black' : 'opacity-60 hover:opacity-100'
        } ${link.isButton ? 'border-b-2 border-current pb-1' : ''}`;
    }

    if (link.isButton) {
      return `font-navbar transition-all duration-200 relative py-1 text-xs sm:text-sm md:text-base lg:text-[17px] xl:text-[19px] text-current whitespace-nowrap font-semibold border-b-2 border-current pb-0.5 hover:opacity-75 ${isActive ? 'opacity-100' : 'opacity-90'
        }`;
    }

    return `font-navbar transition-all duration-200 relative py-1 text-xs sm:text-sm md:text-base lg:text-[17px] xl:text-[19px] text-current whitespace-nowrap ${isActive ? 'font-semibold opacity-100' : 'opacity-80 hover:opacity-100'
      }`;
  };

  const renderLink = (link, isMobile = false) => {
    const isRouterLink = link.href.startsWith('/');
    const className = getLinkClass(link, isMobile);

    if (isRouterLink) {
      return (
        <Link
          key={link.name}
          to={link.href}
          className={className}
          onClick={() => setIsOpen(false)}
        >
          {link.name}
        </Link>
      );
    }

    return (
      <a
        key={link.name}
        href={link.href}
        className={className}
        onClick={() => setIsOpen(false)}
      >
        {link.name}
      </a>
    );
  };

  // NON-LANDING PAGE FLOATING PILL NAVBAR
  if (!isHome) {
    return (
      <header className="w-full pt-4 sm:pt-6 md:pt-8 px-3 sm:px-6 md:px-8 max-w-[1400px] mx-auto z-40 relative flex justify-center">
        {/* Floating Pill Container */}
        <div className="bg-[#EBE9E1]/95 dark:bg-[#1a1a1a]/95 text-neutral-950 dark:text-white backdrop-blur-xl border border-neutral-300/80 dark:border-white/10 rounded-full px-4 sm:px-8 md:px-10 py-2 sm:py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.14)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-between md:justify-center gap-2 sm:gap-4 md:gap-6 transition-all duration-300 w-full md:w-auto">

          {/* Left Desktop Brand Logo & Icon */}
          <Link to="/" className="hidden md:flex items-center gap-2 mr-2 group">
            <img src="/logo_1.svg" alt="Stackline Studio Logo" className="w-6 h-6 object-contain text-neutral-950 dark:text-white group-hover:scale-110 transition-transform" />
            <span className="font-sans font-bold text-xs sm:text-[13px] uppercase tracking-wider">STACKLINE STUDIO</span>
          </Link>

          {/* 4 Center Desktop Nav Items (Visible >= md) */}
          <nav className="hidden md:flex items-center gap-1.5 sm:gap-2.5">
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-sans text-xs sm:text-[13px] uppercase tracking-wider px-4 py-2 sm:px-5 sm:py-2 rounded-full transition-all duration-300 ${isActive
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-bold shadow-md'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 font-medium'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Desktop Action Button ("Let's Talk ↗") (Visible >= md) */}
          <div className="hidden md:flex items-center ml-1 sm:ml-2">
            <Link
              to="/talk"
              className="font-sans bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 rounded-full px-5 py-2 sm:px-6 sm:py-2 text-xs sm:text-[13px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md hover:scale-[1.04] cursor-pointer"
            >
              <span>Let's Talk</span>
              <span className="text-xs font-bold font-sans">↗</span>
            </Link>
          </div>

          {/* Mobile Bar View (< md) */}
          <div className="flex md:hidden items-center justify-between w-full px-1 py-0.5 gap-3">
            {/* Left Mobile Brand Logo */}
            <Link
              to="/"
              className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white flex items-center gap-1.5"
            >
              <img src="/logo_1.svg" alt="Stackline Studio Logo" className="w-5 h-5 object-contain text-neutral-950 dark:text-white" />
              <span>STACKLINE STUDIO</span>
            </Link>

            {/* Right Group: Action Pill + Hamburger Toggle */}
            <div className="flex items-center gap-2">
              <Link
                to="/talk"
                className="font-sans bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm active:scale-95 transition-all"
              >
                <span>Talk</span>
                <span className="text-[10px] font-bold">↗</span>
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 text-neutral-900 dark:text-white rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none cursor-pointer z-50"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-[100] bg-[#f4f4f0]/98 dark:bg-[#0d0d0e]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 md:hidden transition-all duration-300">
            {/* Top Bar with Brand & Close/Cross Button */}
            <div className="flex items-center justify-between w-full pb-6 border-b border-neutral-300 dark:border-neutral-800">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-950 dark:text-white flex items-center gap-2"
              >
                <img src="/logo_1.svg" alt="Stackline Studio Logo" className="w-6 h-6 object-contain text-neutral-950 dark:text-white" />
                <span>STACKLINE STUDIO</span>
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-950 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors focus:outline-none cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Links */}
            <div className="flex flex-col space-y-6 my-auto items-start py-4">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1 font-semibold">
                (Navigation)
              </span>
              {navLinks.map((link) => renderLink(link, true))}
            </div>

            {/* Footer Bar */}
            <div className="pt-6 border-t border-neutral-300 dark:border-neutral-800 flex justify-between items-center font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              <span>© STACKLINE STUDIO</span>
              <span>Prague, CZ</span>
            </div>
          </div>
        )}
      </header>
    );
  }

  // LANDING PAGE NAVBAR
  return (
    <header className="w-full py-2 sm:py-4 z-40 transition-colors duration-300 relative">
      {/* DESKTOP NAV (Hidden on mobile < md, visible on md+) */}
      <div className="hidden md:flex items-center justify-between w-full">
        {/* Left Desktop Brand Logo Icon for Landing */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo_1.svg" alt="Stackline Studio Logo" className="w-6 h-6 object-contain text-neutral-950 dark:text-white group-hover:scale-110 transition-transform" />
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 flex-nowrap justify-end">
          {navLinks.map((link) => renderLink(link))}
        </nav>
      </div>

      {/* MOBILE BAR (Visible < md) */}
      <div className="flex md:hidden items-center justify-between w-full px-2 py-1">
        <Link
          to="/"
          className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-current flex items-center gap-1.5"
        >
          <img src="/logo_1.svg" alt="Stackline Studio Logo" className="w-5 h-5 object-contain text-current" />
          <span>STACKLINE STUDIO</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-current rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none cursor-pointer z-50"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE HAMBURGER MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-[#f4f4f0]/98 dark:bg-[#0d0d0e]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 md:hidden transition-all duration-300">
          {/* Top Bar with Brand & Close/Cross Button */}
          <div className="flex items-center justify-between w-full pb-6 border-b border-neutral-300 dark:border-neutral-800">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-950 dark:text-white flex items-center gap-2"
            >
              <img src="/logo_1.svg" alt="Stackline Studio Logo" className="w-6 h-6 object-contain text-neutral-950 dark:text-white" />
              <span>STACKLINE STUDIO</span>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-950 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors focus:outline-none cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Links */}
          <div className="flex flex-col space-y-6 my-auto items-start py-4">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1 font-semibold">
              (Navigation)
            </span>
            {navLinks.map((link) => renderLink(link, true))}
          </div>

          {/* Footer Bar */}
          <div className="pt-6 border-t border-neutral-300 dark:border-neutral-800 flex justify-between items-center font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            <span>© STACKLINE STUDIO</span>
            <span>Prague, CZ</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
