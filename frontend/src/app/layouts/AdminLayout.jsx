import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../../shared/components/ui/ThemeToggle';
import { useAuth } from '../../modules/admin/auth/context/AuthContext';
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Inbox,
  LogOut,
  ExternalLink,
  Search,
  User as UserIcon,
  ShieldCheck,
  Sparkles,
  Command,
  Settings as SettingsIcon,
  MessageSquareQuote,
  BookOpen,
  Menu,
  X,
} from 'lucide-react';

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getPageTitle = (path) => {
    if (path === '/admin') return 'Dashboard';
    if (path === '/admin/inquiries') return 'Inquiries Management';
    if (path.startsWith('/admin/inquiries/')) return 'Inquiry Details';
    if (path === '/admin/services') return 'Services Management';
    if (path === '/admin/services/new') return 'Create New Service';
    if (path.includes('/services/') && path.includes('/edit')) return 'Edit Service';
    if (path.startsWith('/admin/services/')) return 'Service Details';
    if (path === '/admin/projects') return 'Portfolio Projects';
    if (path === '/admin/projects/new') return 'Create New Project';
    if (path.includes('/projects/') && path.includes('/edit')) return 'Edit Project';
    if (path.startsWith('/admin/projects/')) return 'Project Details';
    if (path === '/admin/team') return 'Team Members';
    if (path === '/admin/team/new') return 'Create Team Member';
    if (path.includes('/team/') && path.includes('/edit')) return 'Edit Team Profile';
    if (path.startsWith('/admin/team/')) return 'Team Member Details';
    if (path === '/admin/reviews') return 'Client Reviews';
    if (path === '/admin/reviews/create') return 'Create New Review';
    if (path.includes('/reviews/') && path.includes('/edit')) return 'Edit Review';
    if (path.startsWith('/admin/reviews/')) return 'Review Details';
    if (path === '/admin/blog') return 'Journal & Blog Articles';
    if (path === '/admin/blog/create') return 'Create New Article';
    if (path.includes('/blog/') && path.includes('/edit')) return 'Edit Article';
    if (path.startsWith('/admin/blog/')) return 'Article Details';
    if (path.startsWith('/admin/settings')) return 'Admin Settings';
    return 'Admin Panel';
  };

  const navSections = [
    {
      title: '',
      items: [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Inquiries', path: '/admin/inquiries', icon: Inbox },
        { name: 'Services', path: '/admin/services', icon: Wrench },
        { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
        { name: 'Team', path: '/admin/team', icon: UserIcon },
        { name: 'Reviews', path: '/admin/reviews', icon: MessageSquareQuote },
        { name: 'Journal', path: '/admin/blog', icon: BookOpen },
      ],
    },
    {
      title: 'Others',
      items: [
        { name: 'Marketing & SEO', path: '/admin/settings', icon: Sparkles },
        { name: 'Settings', path: '/admin/settings', icon: SettingsIcon },
      ],
    },
  ];

  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#f4f7fc] dark:bg-[#0c0d10] text-slate-900 dark:text-slate-100 font-open-sans relative">
      {/* Mobile Dark Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* 1. SIDEBAR NAVIGATION (Desktop Static + Mobile Drawer) */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 shrink-0 border-r border-neutral-200/80 dark:border-neutral-800/80 bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md flex flex-col justify-between p-5 z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Brand Logo Header + Mobile Close Button */}
          <div className="flex items-center justify-between px-1 py-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 dark:bg-neutral-900 flex items-center justify-center p-2 shrink-0 shadow-md border border-neutral-800 transition-transform duration-300 hover:scale-105">
                <img src="/logo_1.svg" alt="Stackline Studio Logo" className="w-full h-full object-contain invert" />
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-sm tracking-tight text-neutral-950 dark:text-white block uppercase">
                  Stackline
                </span>
                <span className="text-[10px] font-mono font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block">
                  Studio Admin
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-3.5 rounded-xl bg-neutral-50/80 dark:bg-[#161619] border border-neutral-200/80 dark:border-neutral-800/90 shadow-xs flex items-center justify-between gap-3 group hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-neutral-950 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xs shadow-xs">
                    {user?.name ? user.name[0] : 'K'}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-extrabold text-neutral-950 dark:text-white truncate">
                  {user?.name || 'Kazi Mahbub'}
                </span>
                <span className="inline-block px-2 py-0.5 mt-0.5 rounded-full text-[9px] font-mono font-bold bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Super Admin
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <nav className="space-y-6 pt-1">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                {section.title && (
                  <div className="px-3 pb-1 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                      {section.title}
                    </span>
                    <div className="flex-1 h-[1px] bg-neutral-200/60 dark:bg-neutral-800/80" />
                  </div>
                )}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.path === '/admin'
                      ? location.pathname === '/admin'
                      : location.pathname.startsWith(item.path);

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-bold shadow-md shadow-neutral-950/10 dark:shadow-white/10 scale-[1.01]'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/80 dark:hover:bg-[#18181c] hover:text-neutral-950 dark:hover:text-white hover:translate-x-1'
                      }`}
                    >
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white dark:text-neutral-950' : 'text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Logout Footer Button */}
        <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
          <button
            onClick={() => {
              handleLogout();
              setIsMobileOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer group"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN VIEWPORT & TOP NAVBAR */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 shrink-0 px-4 sm:px-8 border-b border-neutral-200/70 dark:border-neutral-800/80 bg-white/90 dark:bg-[#121215]/90 backdrop-blur-md flex items-center justify-between z-20">
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger Toggle Button for Mobile/Tablet */}
            <button
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-md bg-neutral-100 dark:bg-[#18181c] text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-neutral-950 dark:text-white truncate">
              {getPageTitle(location.pathname)}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Notification Bell Badge */}
            <button
              onClick={() => navigate('/admin/inquiries')}
              className="relative p-2.5 rounded-md bg-neutral-100/70 dark:bg-[#18181c] text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              title="Notifications"
            >
              <Inbox className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-md bg-amber-500" />
            </button>

            {/* Dark Mode Toggle */}
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
