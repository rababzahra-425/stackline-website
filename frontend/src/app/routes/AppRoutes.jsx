import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Guards
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Public Domain Pages
import { HeroSection } from '../../modules/public/components/hero/HeroSection';
import { ProjectsSection } from '../../modules/public/components/sections/ProjectsSection';
import { ServicesSection } from '../../modules/public/components/sections/Services';
import { TestimonialsSection } from '../../modules/public/components/sections/Testimonials';
import { ServicePage } from '../../modules/public/pages/Service';
import { WorkPage } from '../../modules/public/pages/Work';
import { WorkDetailPage } from '../../modules/public/pages/WorkDetail';
import { AboutPage } from '../../modules/public/pages/About';
import { TalkPage } from '../../modules/public/pages/Talk';
import { BlogPage } from '../../modules/public/pages/Blog';
import { BlogDetailPage } from '../../modules/public/pages/BlogDetail';

// Admin Auth & Feature Pages
import { LoginPage } from '../../modules/admin/auth/pages/LoginPage';
import { SignupPage } from '../../modules/admin/auth/pages/SignupPage';
import { ForgotPasswordPage } from '../../modules/admin/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../../modules/admin/auth/pages/ResetPasswordPage';

// Admin Services Module Pages
import { AdminServicesListPage } from '../../modules/admin/services/pages/AdminServicesListPage';
import { AdminServiceCreatePage } from '../../modules/admin/services/pages/AdminServiceCreatePage';
import { AdminServiceDetailPage } from '../../modules/admin/services/pages/AdminServiceDetailPage';
import { AdminServiceEditPage } from '../../modules/admin/services/pages/AdminServiceEditPage';

// Admin Projects Module Pages
import { AdminProjectsListPage } from '../../modules/admin/projects/pages/AdminProjectsListPage';
import { AdminProjectCreatePage } from '../../modules/admin/projects/pages/AdminProjectCreatePage';
import { AdminProjectDetailPage } from '../../modules/admin/projects/pages/AdminProjectDetailPage';
import { AdminProjectEditPage } from '../../modules/admin/projects/pages/AdminProjectEditPage';

// Admin Team Module Pages
import { AdminTeamListPage } from '../../modules/admin/team/pages/AdminTeamListPage';
import { AdminTeamCreatePage } from '../../modules/admin/team/pages/AdminTeamCreatePage';
import { AdminTeamDetailPage } from '../../modules/admin/team/pages/AdminTeamDetailPage';
import { AdminTeamEditPage } from '../../modules/admin/team/pages/AdminTeamEditPage';

// Admin Inquiries Module Pages
import { AdminInquiriesListPage } from '../../modules/admin/inquiries/pages/AdminInquiriesListPage';
import { AdminInquiryDetailPage } from '../../modules/admin/inquiries/pages/AdminInquiryDetailPage';

// Admin Settings Module Page
import { AdminSettingsPage } from '../../modules/admin/settings/pages/AdminSettingsPage';

// Admin Reviews Module Pages
import { AdminReviewsPage } from '../../modules/admin/reviews/pages/AdminReviewsPage';
import { AdminReviewFormPage } from '../../modules/admin/reviews/pages/AdminReviewFormPage';
import { AdminReviewDetailPage } from '../../modules/admin/reviews/pages/AdminReviewDetailPage';

// Admin Blog Module Pages
import { AdminBlogListPage } from '../../modules/admin/blog/pages/AdminBlogListPage';
import { AdminBlogFormPage } from '../../modules/admin/blog/pages/AdminBlogFormPage';
import { AdminBlogDetailPage } from '../../modules/admin/blog/pages/AdminBlogDetailPage';

// Admin Dashboard Page
import { AdminDashboardPage } from '../../modules/admin/dashboard/pages/AdminDashboardPage';

// SEO Head Component
import { SeoHead } from '../../components/common/SeoHead';

// Public Homepage Composite
const HomePage = () => (
  <>
    <SeoHead pageKey="home" />
    <HeroSection />
    <ProjectsSection />
    <ServicesSection />
    <TestimonialsSection />
  </>
);

export const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. PUBLIC PLATFORM ROUTES (Wrapped in PublicLayout with SmoothScroll & Footer) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<WorkDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/talk" element={<TalkPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
      </Route>

      {/* 2. UNPROTECTED ADMIN AUTH ROUTES */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/signup" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/admin/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/admin/reset-password" element={<ResetPasswordPage />} />

      {/* 3. PROTECTED ADMIN PANEL ROUTES (Wrapped in AdminLayout & ProtectedRoute guard) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          
          {/* Projects Module Full-Page CRUD Routes */}
          <Route path="/admin/projects" element={<AdminProjectsListPage />} />
          <Route path="/admin/projects/new" element={<AdminProjectCreatePage />} />
          <Route path="/admin/projects/:id" element={<AdminProjectDetailPage />} />
          <Route path="/admin/projects/:id/edit" element={<AdminProjectEditPage />} />

          {/* Team Module Full-Page CRUD Routes */}
          <Route path="/admin/team" element={<AdminTeamListPage />} />
          <Route path="/admin/team/new" element={<AdminTeamCreatePage />} />
          <Route path="/admin/team/:id" element={<AdminTeamDetailPage />} />
          <Route path="/admin/team/:id/edit" element={<AdminTeamEditPage />} />

          {/* Services Module Full-Page CRUD Routes */}
          <Route path="/admin/services" element={<AdminServicesListPage />} />
          <Route path="/admin/services/new" element={<AdminServiceCreatePage />} />
          <Route path="/admin/services/:id" element={<AdminServiceDetailPage />} />
          <Route path="/admin/services/:id/edit" element={<AdminServiceEditPage />} />

          {/* Blog / Journal Module Full-Page CRUD Routes */}
          <Route path="/admin/blog" element={<AdminBlogListPage />} />
          <Route path="/admin/blog/create" element={<AdminBlogFormPage />} />
          <Route path="/admin/blog/new" element={<AdminBlogFormPage />} />
          <Route path="/admin/blog/:id" element={<AdminBlogDetailPage />} />
          <Route path="/admin/blog/:id/edit" element={<AdminBlogFormPage />} />

          {/* Reviews Module Full-Page CRUD Routes */}
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          <Route path="/admin/reviews/create" element={<AdminReviewFormPage />} />
          <Route path="/admin/reviews/new" element={<AdminReviewFormPage />} />
          <Route path="/admin/reviews/:id" element={<AdminReviewDetailPage />} />
          <Route path="/admin/reviews/:id/edit" element={<AdminReviewFormPage />} />

          {/* Inquiries Module Full-Page CRUD Routes */}
          <Route path="/admin/inquiries" element={<AdminInquiriesListPage />} />
          <Route path="/admin/inquiries/:id" element={<AdminInquiryDetailPage />} />

          {/* Settings & Profile Module Route */}
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

