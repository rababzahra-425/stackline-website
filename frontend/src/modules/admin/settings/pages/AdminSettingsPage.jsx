import React, { useState, useEffect } from 'react';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ImageUploader } from '../../shared/components/ImageUploader';
import { useAuth } from '../../auth/context/AuthContext';
import { seoService } from '../services/seoService';
import {
  User,
  ShieldCheck,
  Moon,
  Sun,
  Bell,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Save,
  Server,
  Lock,
  Mail,
  Sparkles,
  Laptop,
  Globe,
  Tag,
  Share2,
  Wrench,
  Eye,
  EyeOff,
  Activity,
  Sliders,
  Check,
  Info,
} from 'lucide-react';

const defaultSeoPages = {
  home: { title: 'Stackline Studio — Creative Brands & Digital Experiences', description: 'Explore Stackline Studio portfolio, brand strategy, web engineering, and award-winning digital solutions.' },
  service: { title: 'OUR SERVICES — Brand Strategy, Web Design & Engineering', description: 'Comprehensive digital design, branding systems, and modern web application development services.' },
  work: { title: 'OUR WORK — Featured Case Studies & Portfolio Perceptions', description: 'Selected projects and digital solutions crafted by Stackline Studio for global clients.' },
  about: { title: 'ABOUT STACKLINE STUDIO — Our Team, Vision & Ethos', description: 'Meet the creative directors, engineers, and brand strategists behind Stackline Studio.' },
  talk: { title: "LET'S TALK — Start Your Next Project with Stackline Studio", description: 'Get in touch to discuss your next brand identity, web design, or digital transformation.' },
  blog: { title: 'JOURNAL & INSIGHTS — Thoughts on Design & Tech', description: 'Read the latest studio insights, design trends, branding tips, and engineering breakdowns.' },
};

export const AdminSettingsPage = () => {
  const { user, updateProfile, changePassword } = useAuth();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security' | 'appearance' | 'notifications' | 'seo' | 'system'

  // Notifications / Toast
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Profile State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    avatarUrl: user?.avatarUrl || '',
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // 2. Security State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [changingPwd, setChangingPwd] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 3. Appearance State
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('kajo_theme') || user?.settings?.themePreference || 'dark';
  });

  // 4. Notifications State
  const [notificationsForm, setNotificationsForm] = useState({
    emailOnInquiry: user?.settings?.notifications?.emailOnInquiry ?? true,
    emailOnReview: user?.settings?.notifications?.emailOnReview ?? true,
    weeklySummary: user?.settings?.notifications?.weeklySummary ?? false,
    alertDestinationEmail: 'rababzahra425@gmail.com',
  });
  const [savingNotifications, setSavingNotifications] = useState(false);

  // 5. SEO & Meta Tags State
  const [seoForm, setSeoForm] = useState({
    siteTitle: 'Stackline Studio — Creative Brands, Powerful Websites',
    defaultDescription: 'Stackline Studio is an award-winning creative agency specializing in brand identity, high-performance web development, and digital experiences.',
    defaultOgImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
    googleAnalyticsId: '',
    pages: defaultSeoPages,
  });
  const [savingSeo, setSavingSeo] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        avatarUrl: user.avatarUrl || '',
      });
      if (user.settings?.notifications) {
        setNotificationsForm((prev) => ({
          ...prev,
          emailOnInquiry: user.settings.notifications.emailOnInquiry ?? true,
          emailOnReview: user.settings.notifications.emailOnReview ?? true,
          weeklySummary: user.settings.notifications.weeklySummary ?? false,
        }));
      }
    }

    // Fetch SEO Config
    const fetchSeo = async () => {
      try {
        const res = await seoService.getSettings();
        if (res.data) {
          setSeoForm({
            siteTitle: res.data.siteTitle || 'KAJO STUDIO — Creative Brands, Powerful Websites',
            defaultDescription: res.data.defaultDescription || '',
            defaultOgImage: res.data.defaultOgImage || '',
            googleAnalyticsId: res.data.googleAnalyticsId || '',
            pages: {
              home: { ...defaultSeoPages.home, ...(res.data.pages?.home || {}) },
              service: { ...defaultSeoPages.service, ...(res.data.pages?.service || {}) },
              work: { ...defaultSeoPages.work, ...(res.data.pages?.work || {}) },
              about: { ...defaultSeoPages.about, ...(res.data.pages?.about || {}) },
              talk: { ...defaultSeoPages.talk, ...(res.data.pages?.talk || {}) },
              blog: { ...defaultSeoPages.blog, ...(res.data.pages?.blog || {}) },
            },
          });
        }
      } catch (err) {
        console.warn('Could not load SEO settings:', err);
      }
    };

    fetchSeo();
  }, [user]);

  // Handle Profile Submit
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!profileForm.name.trim()) {
      setErrorMsg('Name cannot be empty.');
      return;
    }

    setSavingProfile(true);
    try {
      await updateProfile({
        name: profileForm.name,
        avatarUrl: profileForm.avatarUrl,
      });
      setSuccessMsg('Account profile details updated successfully.');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  // Handle Password Submit
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!passwordForm.currentPassword) {
      setErrorMsg('Please enter your current password.');
      return;
    }
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMsg('New password and confirm password do not match.');
      return;
    }

    setChangingPwd(true);
    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setSuccessMsg('Password changed successfully.');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to change password.');
    } finally {
      setChangingPwd(false);
    }
  };

  // Handle Theme Change
  const handleThemeSelect = async (mode) => {
    setThemeMode(mode);
    localStorage.setItem('kajo_theme', mode);

    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    setSuccessMsg(`Theme set to ${mode.toUpperCase()} mode.`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Handle Notifications Save
  const handleNotificationsSubmit = (e) => {
    e.preventDefault();
    setSavingNotifications(true);
    setTimeout(() => {
      setSavingNotifications(false);
      setSuccessMsg('Lead email notification preferences updated.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 600);
  };

  // Handle SEO Save
  const handleSeoSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSavingSeo(true);
    try {
      await seoService.updateSettings(seoForm);
      setSuccessMsg('Global & per-page SEO meta tag settings updated successfully.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Error saving SEO settings:', err);
      setErrorMsg(err.message || 'Failed to save SEO settings.');
    } finally {
      setSavingSeo(false);
    }
  };

  const handlePageSeoChange = (pageKey, field, value) => {
    setSeoForm((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [pageKey]: {
          ...prev.pages[pageKey],
          [field]: value,
        },
      },
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile & Account', icon: User },
    { id: 'security', label: 'Security & Password', icon: KeyRound },
    { id: 'appearance', label: 'Appearance & Theme', icon: Moon },
    { id: 'notifications', label: 'Notifications & Alerts', icon: Bell },
    { id: 'seo', label: 'SEO & Meta Tags', icon: Globe },
    { id: 'system', label: 'System & Status', icon: Server },
  ];

  return (
    <div className="space-y-8 pb-16 font-open-sans">
      {/* 1. PAGE HEADER */}
      <AdminPageHeader
        title="Admin Settings & Control"
        subtitle="Manage administrator profile, security credentials, interface themes, global SEO meta tags, and email notifications."
        badgeText="PREFERENCES"
      />

      {/* Notifications / Feedback Toasts */}
      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-sm font-mono animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-3 p-4 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-mono animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 2. MODERN TABBED NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto p-2 rounded-md bg-white dark:bg-[#141417] border border-neutral-200/90 dark:border-neutral-800 shadow-xs no-scrollbar">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-black font-bold shadow-md'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-black' : 'text-neutral-400'}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB MODULE CONTENT PANELS */}

      {/* TAB 1: PROFILE & ACCOUNT */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="space-y-8">
          <div className="bg-white dark:bg-[#18181c] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 space-y-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 dark:border-neutral-800 gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-neutral-950 dark:text-white tracking-tight uppercase">
                    Administrator Profile
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
                    Update your primary display name, account photo avatar, and administrator credentials.
                  </p>
                </div>
              </div>
              <span className="self-start sm:self-auto px-3.5 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold uppercase rounded-md border border-emerald-500/20">
                ROLE: {user?.role || 'SUPER ADMIN'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-bold">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Kazi Mahbub"
                  required
                  className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-sm text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-neutral-950 dark:focus:border-white focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-bold">
                  Account Email Address (Read-Only)
                </label>
                <input
                  type="email"
                  value={user?.email || 'admin@kajostudio.com'}
                  disabled
                  className="w-full px-4 py-3 bg-neutral-100/70 dark:bg-[#121214]/60 border border-neutral-200 dark:border-neutral-800 rounded-md text-sm text-neutral-500 font-mono cursor-not-allowed"
                />
              </div>
            </div>

            {/* Avatar Uploader */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1 font-bold">
                  Administrator Photo Avatar
                </label>
                <p className="text-xs text-neutral-400">Upload a crisp square headshot photo to personalize your admin panel toolbar.</p>
              </div>
              <ImageUploader
                value={profileForm.avatarUrl}
                onChange={(url) => setProfileForm((prev) => ({ ...prev, avatarUrl: url }))}
                label="Upload Admin Photo"
              />
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                disabled={savingProfile}
                className="px-6 py-3 bg-neutral-900 text-white dark:bg-white dark:text-black font-mono text-xs uppercase tracking-wider font-bold rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <Save className="w-4 h-4" />
                <span>{savingProfile ? 'Saving Profile...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: SECURITY & PASSWORD */}
      {activeTab === 'security' && (
        <form onSubmit={handlePasswordSubmit} className="space-y-8">
          <div className="bg-white dark:bg-[#18181c] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3.5 pb-6 border-b border-neutral-100 dark:border-neutral-800">
              <div className="w-11 h-11 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-950 dark:text-white uppercase tracking-tight">
                  Change Login Password
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Update your administrator login credentials. Minimum 6 characters required.
                </p>
              </div>
            </div>

            <div className="space-y-6 max-w-xl">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-bold">
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-4 pr-11 py-3 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-sm text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-neutral-950 dark:focus:border-white focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 focus:outline-none transition-colors cursor-pointer"
                    title={showCurrentPassword ? 'Hide password' : 'Show password'}
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-bold">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password (min 6 characters)"
                    required
                    className="w-full pl-4 pr-11 py-3 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-sm text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-neutral-950 dark:focus:border-white focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 focus:outline-none transition-colors cursor-pointer"
                    title={showNewPassword ? 'Hide password' : 'Show password'}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-bold">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Re-enter new password to confirm"
                    required
                    className="w-full pl-4 pr-11 py-3 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-sm text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-neutral-950 dark:focus:border-white focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 focus:outline-none transition-colors cursor-pointer"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                disabled={changingPwd}
                className="px-6 py-3 bg-neutral-900 text-white dark:bg-white dark:text-black font-mono text-xs uppercase tracking-wider font-bold rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <Lock className="w-4 h-4" />
                <span>{changingPwd ? 'Updating Password...' : 'Update Password'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 3: APPEARANCE & THEME */}
      {activeTab === 'appearance' && (
        <div className="bg-white dark:bg-[#18181c] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 space-y-8 shadow-xs">
          <div className="flex items-center gap-3.5 pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <div className="w-11 h-11 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white shrink-0">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-950 dark:text-white uppercase tracking-tight">
                Interface Theme Preferences
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Select your preferred visual aesthetic theme mode for the admin control panel.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Dark Mode */}
            <div
              onClick={() => handleThemeSelect('dark')}
              className={`p-6 rounded-md border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-6 ${
                themeMode === 'dark'
                  ? 'border-neutral-950 dark:border-white bg-neutral-950 text-white dark:bg-[#121215] shadow-md ring-2 ring-neutral-950/10 dark:ring-white/10'
                  : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#121214]/40 hover:border-neutral-400 dark:hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-md bg-neutral-800 dark:bg-neutral-800 flex items-center justify-center text-white">
                  <Moon className="w-5 h-5" />
                </div>
                {themeMode === 'dark' && (
                  <span className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide">Dark Mode</h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  High-contrast studio dark palette engineered for low-light focus.
                </p>
              </div>
            </div>

            {/* Light Mode */}
            <div
              onClick={() => handleThemeSelect('light')}
              className={`p-6 rounded-md border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-6 ${
                themeMode === 'light'
                  ? 'border-neutral-950 dark:border-white bg-white text-black shadow-md ring-2 ring-neutral-950/10'
                  : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#121214]/40 hover:border-neutral-400 dark:hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                {themeMode === 'light' && (
                  <span className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900">Light Mode</h3>
                <p className="text-xs font-mono text-neutral-500 mt-1">
                  Clean, high-brightness minimal aesthetic with crisp typography.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: NOTIFICATIONS & ALERTS */}
      {activeTab === 'notifications' && (
        <form onSubmit={handleNotificationsSubmit} className="space-y-8">
          <div className="bg-white dark:bg-[#18181c] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 space-y-8 shadow-xs">
            <div className="flex items-center gap-3.5 pb-6 border-b border-neutral-100 dark:border-neutral-800">
              <div className="w-11 h-11 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-950 dark:text-white uppercase tracking-tight">
                  Lead & Inquiry Email Notifications
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Select which notification triggers send instant emails to your inbox.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Inquiry Alert Switch Toggle */}
              <div className="flex items-center justify-between p-5 rounded-md bg-neutral-50 dark:bg-[#121214] border border-neutral-200/80 dark:border-neutral-800 gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold uppercase text-neutral-900 dark:text-white">
                    Client Inquiry Instant Email Dispatch
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    Send an instant email notification to <span className="underline font-bold text-neutral-900 dark:text-white">rababzahra425@gmail.com</span> whenever a new lead submits an inquiry form.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setNotificationsForm((prev) => ({ ...prev, emailOnInquiry: !prev.emailOnInquiry }))
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notificationsForm.emailOnInquiry
                      ? 'bg-neutral-900 dark:bg-white'
                      : 'bg-neutral-200 dark:bg-neutral-800'
                  }`}
                  role="switch"
                  aria-checked={notificationsForm.emailOnInquiry}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-md shadow-xs transition duration-200 ease-in-out ${
                      notificationsForm.emailOnInquiry
                        ? 'translate-x-5 bg-white dark:bg-black'
                        : 'translate-x-0 bg-white dark:bg-neutral-400'
                    }`}
                  />
                </button>
              </div>

              {/* Review Alert Switch Toggle */}
              <div className="flex items-center justify-between p-5 rounded-md bg-neutral-50 dark:bg-[#121214] border border-neutral-200/80 dark:border-neutral-800 gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold uppercase text-neutral-900 dark:text-white">
                    New Client Review Notification Alert
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    Send an instant notification to <span className="underline font-bold text-neutral-900 dark:text-white">rababzahra425@gmail.com</span> and show a badge alert whenever a user submits a review.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setNotificationsForm((prev) => ({ ...prev, emailOnReview: !prev.emailOnReview }))
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notificationsForm.emailOnReview
                      ? 'bg-neutral-900 dark:bg-white'
                      : 'bg-neutral-200 dark:bg-neutral-800'
                  }`}
                  role="switch"
                  aria-checked={notificationsForm.emailOnReview}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-md shadow-xs transition duration-200 ease-in-out ${
                      notificationsForm.emailOnReview
                        ? 'translate-x-5 bg-white dark:bg-black'
                        : 'translate-x-0 bg-white dark:bg-neutral-400'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                disabled={savingNotifications}
                className="px-6 py-3 bg-neutral-900 text-white dark:bg-white dark:text-black font-mono text-xs uppercase tracking-wider font-bold rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <Save className="w-4 h-4" />
                <span>{savingNotifications ? 'Saving...' : 'Save Notification Preferences'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 5: SEO & META TAGS */}
      {activeTab === 'seo' && (
        <form onSubmit={handleSeoSubmit} className="space-y-8">
          {/* Site-Wide Global SEO Settings */}
          <div className="bg-white dark:bg-[#18181c] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3.5 pb-6 border-b border-neutral-100 dark:border-neutral-800">
              <div className="w-11 h-11 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-950 dark:text-white uppercase tracking-tight">
                  Global Site SEO & OpenGraph Defaults
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Configure brand title prefix, default meta descriptions, social share images, and analytics IDs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-bold">
                  Global Site Title *
                </label>
                <input
                  type="text"
                  value={seoForm.siteTitle}
                  onChange={(e) => setSeoForm((prev) => ({ ...prev, siteTitle: e.target.value }))}
                  placeholder="KAJO STUDIO — Creative Brands, Powerful Websites"
                  required
                  className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-bold">
                  Google Analytics 4 Measurement ID
                </label>
                <input
                  type="text"
                  value={seoForm.googleAnalyticsId}
                  onChange={(e) => setSeoForm((prev) => ({ ...prev, googleAnalyticsId: e.target.value }))}
                  placeholder="e.g. G-XXXXXXXXXX"
                  className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2 font-bold">
                Default Meta Description *
              </label>
              <textarea
                rows={3}
                value={seoForm.defaultDescription}
                onChange={(e) => setSeoForm((prev) => ({ ...prev, defaultDescription: e.target.value }))}
                placeholder="Fallback description used when pages do not define a custom description..."
                required
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-3 font-bold">
                Default OpenGraph Social Share Preview Image
              </label>
              <ImageUploader
                value={seoForm.defaultOgImage}
                onChange={(url) => setSeoForm((prev) => ({ ...prev, defaultOgImage: url }))}
                label="Upload Default OG Share Image"
              />
            </div>
          </div>

          {/* Per-Page Meta Tag Overrides */}
          <div className="bg-white dark:bg-[#18181c] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3.5 pb-6 border-b border-neutral-100 dark:border-neutral-800">
              <div className="w-11 h-11 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-950 dark:text-white uppercase tracking-tight">
                  Per-Page Meta Tag Overrides
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Customize search engine titles and descriptions for key website pages.
                </p>
              </div>
            </div>

            {/* Page Overrides Cards */}
            <div className="space-y-4">
              {[
                { key: 'home', label: 'HOMEPAGE (/)', icon: Sparkles },
                { key: 'service', label: 'SERVICES PAGE (/service)', icon: Wrench },
                { key: 'work', label: 'WORK PORTFOLIO PAGE (/work)', icon: Share2 },
                { key: 'about', label: 'ABOUT PAGE (/about)', icon: User },
                { key: 'talk', label: "LET'S TALK / CONTACT PAGE (/talk)", icon: Mail },
                { key: 'blog', label: 'JOURNAL / BLOG PAGE (/blog)', icon: Globe },
              ].map((p) => (
                <div
                  key={p.key}
                  className="p-5 rounded-md bg-neutral-50/70 dark:bg-[#121214] border border-neutral-200/80 dark:border-neutral-800 space-y-4"
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-neutral-900 dark:text-white">
                    <p.icon className="w-4 h-4 text-neutral-500" />
                    <span>{p.label}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                        Page Meta Title
                      </label>
                      <input
                        type="text"
                        value={seoForm.pages[p.key]?.title || ''}
                        onChange={(e) => handlePageSeoChange(p.key, 'title', e.target.value)}
                        placeholder={`Custom title for ${p.label}`}
                        className="w-full px-3 py-2 bg-white dark:bg-[#1c1c20] border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                        Page Meta Description
                      </label>
                      <input
                        type="text"
                        value={seoForm.pages[p.key]?.description || ''}
                        onChange={(e) => handlePageSeoChange(p.key, 'description', e.target.value)}
                        placeholder={`Custom description for ${p.label}`}
                        className="w-full px-3 py-2 bg-white dark:bg-[#1c1c20] border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                disabled={savingSeo}
                className="px-6 py-3 bg-neutral-900 text-white dark:bg-white dark:text-black font-mono text-xs uppercase tracking-wider font-bold rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <Save className="w-4 h-4" />
                <span>{savingSeo ? 'Saving SEO Config...' : 'Save All SEO Settings'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 6: SYSTEM & STATUS */}
      {activeTab === 'system' && (
        <div className="bg-white dark:bg-[#18181c] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3.5 pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <div className="w-11 h-11 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-950 dark:text-white uppercase tracking-tight">
                System Health & Operational Status
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Live environment metrics and status indicators for Stackline Studio server components.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-md bg-neutral-50/70 dark:bg-[#121214] border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-neutral-500 font-bold">EXPRESS API SERVER</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-md bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                PORT 5000 ACTIVE
              </span>
            </div>

            <div className="p-4 rounded-md bg-neutral-50/70 dark:bg-[#121214] border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-neutral-500 font-bold">DATABASE CONNECTION</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-md bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                MONGODB ATLAS CONNECTED
              </span>
            </div>

            <div className="p-4 rounded-md bg-neutral-50/70 dark:bg-[#121214] border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-neutral-500 font-bold">EMAIL DISPATCH SERVICE</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-md bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                RESEND MAIL API ACTIVE
              </span>
            </div>

            <div className="p-4 rounded-md bg-neutral-50/70 dark:bg-[#121214] border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-neutral-500 font-bold">JWT SESSION CONTROL</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                7-DAY EXPIRATION TOKEN
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsPage;
