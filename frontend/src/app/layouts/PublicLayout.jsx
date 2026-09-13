import React from 'react';
import { Outlet } from 'react-router-dom';
import { SmoothScroll } from '../../modules/public/components/common/SmoothScroll';
import { FooterSection } from '../../modules/public/components/common/Footer';
import { ThemeToggle } from '../../shared/components/ui/ThemeToggle';

export const PublicLayout = () => {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
        {/* Public Viewport Outlet */}
        <Outlet />

        {/* Public Platform Footer */}
        <FooterSection />

        {/* Fixed Bottom Left Theme Toggle */}
        <div className="fixed bottom-6 left-6 z-50">
          <ThemeToggle />
        </div>
      </main>
    </SmoothScroll>
  );
};

export default PublicLayout;
