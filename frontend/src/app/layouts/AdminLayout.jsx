import React from 'react';
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
} from 'lucide-react';

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
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
    <div className="min-h-screen w-full flex bg-[#f8f9fb] dark:bg-[#0c0c0e] text-neutral-900 dark:text-neutral-100 font-sans">
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-64 shrink-0 border-r border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#121215] flex flex-col justify-between p-5 z-30 transition-all">
        <div className="space-y-5">
          {/* Brand Logo Header */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-md bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
              <img src="/logo_1.svg" alt="Stackline Logo" className="w-5 h-5 object-contain invert brightness-200" />
            </div>
            <span className="font-bold text-base tracking-tight text-neutral-950 dark:text-white">
              Stackline Studio
            </span>
          </div>

          {/* User Profile Card */}
          <div className="p-3 rounded-md bg-neutral-50 dark:bg-[#18181c] border border-neutral-200/70 dark:border-neutral-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-md object-cover border border-neutral-200 dark:border-neutral-700" />
                ) : (
                  <div className="w-10 h-10 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xs">
                    {user?.name ? user.name[0] : 'K'}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-neutral-950 dark:text-white truncate">
                  {user?.name || 'Kazi Mahbub'}
                </span>
                <span className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                  Super Admin
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/admin/settings')}
              className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Admin Settings"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Sections */}
          <nav className="space-y-5 pt-1">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                {section.title && (
                  <span className="block px-3 text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    {section.title}
                  </span>
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
                      className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-md text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-950 dark:text-white font-bold'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-[#18181c] hover:text-neutral-950 dark:hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-neutral-950 dark:text-white' : 'text-neutral-400'}`} />
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
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN VIEWPORT & TOP NAVBAR */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 px-8 border-b border-neutral-200/70 dark:border-neutral-800/80 bg-white/90 dark:bg-[#121215]/90 backdrop-blur-md flex items-center justify-between z-20">
          <h1 className="text-xl font-bold text-neutral-950 dark:text-white">
            Dashboard
          </h1>

          <div className="flex items-center gap-4">
            {/* Search Input Bar */}
            <div className="relative hidden sm:block w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search in here..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-100/70 dark:bg-[#18181c] border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-md text-xs text-neutral-900 dark:text-white placeholder-neutral-400 outline-none transition-colors"
              />
            </div>

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
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
