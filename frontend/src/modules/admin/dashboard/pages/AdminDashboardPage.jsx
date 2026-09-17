import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { dashboardService } from '../services/dashboardService';
import {
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Printer,
  Download,
  MoreHorizontal,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Active Tooltip state for interactive chart
  const [activePoint, setActivePoint] = useState({ x: 340, y: 110, value: '2,500.00', date: 'Feb 20, 2026 12:00' });

  const fetchDashboardStats = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await dashboardService.getStats();
      if (res.data) {
        setStatsData(res.data);
      }
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
      setErrorMsg(err.message || 'Failed to load live dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const stats = statsData?.stats;
  const recentInquiries = statsData?.recentInquiries || [];

  return (
    <div className="space-y-6 pb-12 font-sans selection:bg-indigo-500 selection:text-white">
      {/* ERROR ALERT */}
      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-md text-xs font-mono">
          {errorMsg}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ROW 1: TOP 3-IN-1 KPI CARD + STUDIO PERFORMANCE DONUT GAUGES              */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT 7 COLS: Combined 3-in-1 KPI Summary Box */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121215] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 shadow-sm flex items-center justify-between">
          
          {/* Metric 1: Total Projects */}
          <div className="flex-1 pr-4 sm:pr-6">
            <span className="block text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-3">
              Total Projects
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-2">
              {stats?.projects?.total ? (stats.projects.total * 1000).toLocaleString() : '10,000'}
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>+17%</span>
              <span className="text-neutral-400 dark:text-neutral-500 font-normal">/ Month</span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-16 bg-neutral-200/80 dark:bg-neutral-800 shrink-0" />

          {/* Metric 2: Total Revenue */}
          <div className="flex-1 px-4 sm:px-6">
            <span className="block text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-3">
              Total Revenue
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-2">
              $87,363
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>+11%</span>
              <span className="text-neutral-400 dark:text-neutral-500 font-normal">/ Month</span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-16 bg-neutral-200/80 dark:bg-neutral-800 shrink-0" />

          {/* Metric 3: New Customers / Leads */}
          <div className="flex-1 pl-4 sm:pl-6">
            <span className="block text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-3">
              New Clients
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-2">
              {stats?.inquiries?.total || 120}
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px] font-semibold">
              <TrendingDown className="w-3 h-3" />
              <span>-15%</span>
              <span className="text-neutral-400 dark:text-neutral-500 font-normal">/ Month</span>
            </div>
          </div>

        </div>

        {/* RIGHT 5 COLS: Studio Performance Donut Gauges */}
        <div className="lg:col-span-5 bg-white dark:bg-[#121215] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold text-neutral-950 dark:text-white uppercase tracking-wider">
                Order Performance
              </h2>
              <span className="text-[11px] text-neutral-400 font-normal">vs last month</span>
            </div>
            
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100/80 dark:bg-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-300 font-medium">
              <span>Month</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* 3 Donut Gauges */}
          <div className="grid grid-cols-3 gap-2 text-center py-2">
            
            {/* Gauge 1: 82% Completed */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-neutral-100 dark:text-neutral-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-500"
                    strokeDasharray="82, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-extrabold text-neutral-950 dark:text-white">
                  82%
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium max-w-[80px] leading-tight">
                Total Order Completed
              </span>
            </div>

            {/* Gauge 2: 10% Return / Pending */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-neutral-100 dark:text-neutral-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-500"
                    strokeDasharray="10, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-extrabold text-neutral-950 dark:text-white">
                  10%
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium max-w-[80px] leading-tight">
                Total Delivery Return
              </span>
            </div>

            {/* Gauge 3: 40% Cancel / Archived */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-neutral-100 dark:text-neutral-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-rose-500"
                    strokeDasharray="40, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-extrabold text-neutral-950 dark:text-white">
                  40%
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium max-w-[80px] leading-tight">
                Total Delivery Cancel
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* ROW 2: ORDER ANALYTICS LINE CHART + REVENUE PROFILE GRADIENT AREA CHART   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT 7 COLS: Order Analytics Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121215] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 shadow-sm flex flex-col justify-between">
          
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-base font-bold text-neutral-950 dark:text-white">
              Order Analytics
            </h2>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                <span className="text-[10px]">Vendor:</span>
                <button className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100/80 dark:bg-neutral-800 text-[11px] text-neutral-700 dark:text-neutral-300">
                  <span>All Vendor</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                <span className="text-[10px]">Status:</span>
                <button className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100/80 dark:bg-neutral-800 text-[11px] text-neutral-700 dark:text-neutral-300">
                  <span>Completed</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              <button className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100/80 dark:bg-neutral-800 text-[11px] text-neutral-700 dark:text-neutral-300">
                <span>Monthly</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Metric Figure & Legend */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                  12,120.00
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                  +15% / Month
                </span>
              </div>
              <span className="text-xs text-neutral-400">
                Excellent job on your order 🤙
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-md bg-neutral-900 dark:bg-white" />
                <span>January</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-md bg-neutral-400" />
                <span>February</span>
              </div>
            </div>
          </div>

          {/* SVG Smooth Dual Line Chart */}
          <div className="relative w-full h-48 pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
              {/* Horizontal Grid lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" className="text-neutral-100 dark:text-neutral-800/60" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="500" y2="70" stroke="currentColor" className="text-neutral-100 dark:text-neutral-800/60" strokeDasharray="3 3" />
              <line x1="0" y1="110" x2="500" y2="110" stroke="currentColor" className="text-neutral-100 dark:text-neutral-800/60" strokeDasharray="3 3" />

              {/* Dashed Secondary Line (February) */}
              <path
                d="M 0 120 Q 50 110, 100 95 T 200 100 T 300 90 T 400 80 T 500 70"
                fill="none"
                stroke="currentColor"
                className="text-neutral-300 dark:text-neutral-700"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Solid Primary Line (January) */}
              <path
                d="M 0 95 Q 40 70, 80 85 T 160 55 T 240 65 T 320 40 T 400 30 T 500 45"
                fill="none"
                stroke="currentColor"
                className="text-neutral-950 dark:text-white"
                strokeWidth="2.5"
              />

              {/* Vertical Active Line Indicator */}
              <line x1="340" y1="0" x2="340" y2="150" stroke="currentColor" className="text-neutral-900 dark:text-white" strokeWidth="1.5" />

              {/* Interactive Data Point Dots */}
              <circle cx="340" cy="40" r="5" className="fill-neutral-950 dark:fill-white stroke-white dark:stroke-neutral-900" strokeWidth="2" />
              <circle cx="340" cy="85" r="4" className="fill-neutral-400 stroke-white dark:stroke-neutral-900" strokeWidth="2" />
            </svg>

            {/* Floating Tooltip Pill Overlay (Matching Image) */}
            <div
              className="absolute bg-neutral-950 text-white dark:bg-white dark:text-black rounded-md px-3 py-1.5 text-[10px] font-mono shadow-xl flex flex-col items-center pointer-events-none transform -translate-x-1/2 -translate-y-full"
              style={{ left: '68%', top: '22%' }}
            >
              <span className="text-[9px] text-neutral-400 dark:text-neutral-600 font-sans">Feb 20, 2026 12:00</span>
              <span className="font-bold text-xs font-sans">2,500.00</span>
            </div>

            <div
              className="absolute bg-neutral-400 text-white rounded-md px-2.5 py-1 text-[10px] font-mono shadow-md flex items-center pointer-events-none transform -translate-x-1/2"
              style={{ left: '68%', top: '55%' }}
            >
              <span className="font-bold text-[11px] font-sans">1,200.00</span>
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <span>01</span>
              <span>03</span>
              <span>06</span>
              <span>09</span>
              <span>12</span>
              <span>15</span>
              <span>18</span>
              <span>21</span>
              <span>24</span>
              <span>27</span>
              <span>30</span>
            </div>
          </div>

        </div>

        {/* RIGHT 5 COLS: Revenue Profile Gradient Area Chart */}
        <div className="lg:col-span-5 bg-white dark:bg-[#121215] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 shadow-sm flex flex-col justify-between">
          
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-neutral-950 dark:text-white">
              Revenue Profile
            </h2>
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100/80 dark:bg-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-300 font-medium">
              <span>Monthly</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                $25,843.45
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                +11% / Month
              </span>
            </div>
            <span className="text-xs text-neutral-400">
              Your performance is excellent 👌
            </span>
          </div>

          {/* SVG Smooth Gradient Area Chart */}
          <div className="w-full h-40 pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120">
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Area path */}
              <path
                d="M 0 110 C 60 105, 120 90, 180 60 C 240 30, 270 20, 300 10 L 300 120 L 0 120 Z"
                fill="url(#revenueGrad)"
              />

              {/* Stroke Line */}
              <path
                d="M 0 110 C 60 105, 120 90, 180 60 C 240 30, 270 20, 300 10"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="3"
              />
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <span>Jan, 01</span>
              <span>Jan, 07</span>
              <span>Jan, 14</span>
              <span>Jan, 21</span>
              <span>Jan, 28</span>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* ROW 3: ORDER / STUDIO ACTIVITIES FLOATING CAPSULE TABLE                   */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-[#121215] border border-neutral-200/90 dark:border-neutral-800 rounded-md p-6 shadow-md dark:shadow-black/40 space-y-5 font-open-sans">
        
        {/* Table Header & Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Recent Studio Activities
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Keep track of recent client inquiries, bookings, and activity logs
            </p>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="text-[11px]">Status:</span>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-medium">
                <span>Completed</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-zinc-800">
              <button className="p-2 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-slate-950 transition-colors" title="Print Table">
                <Printer className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-slate-950 transition-colors" title="Download Report">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Rows Container */}
        <div className="w-full space-y-3 font-open-sans">
          {/* Header Box */}
          <div className="hidden md:flex items-center justify-between bg-[#9A989D] dark:bg-[#343338] rounded-none px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white border border-[#88868c]/40 dark:border-[#48464d]/60">
            <div className="w-1/4">DETAILS</div>
            <div className="w-1/5">CONTACT EMAIL</div>
            <div className="w-1/6 text-center">SERVICE</div>
            <div className="w-1/6 text-center">DATE</div>
            <div className="w-1/6 text-center">STATUS</div>
            <div className="w-1/6 text-right pr-2">ACTIONS</div>
          </div>

          {/* Floating Rows */}
          <div className="space-y-3">
            {(recentInquiries.length > 0 ? recentInquiries : [
              { _id: '67a40c1284', name: 'Massoma', email: 'massoma@studio.com', service: 'Brand Identity', status: 'replied', createdAt: new Date() },
              { _id: '73de391085', name: 'Arooj Hassan', email: 'arooj@studio.com', service: 'Web Development', status: 'new', createdAt: new Date() },
              { _id: '46f4a81986', name: 'Adnan Haidry', email: 'adnan@studio.com', service: 'UI/UX Design', status: 'replied', createdAt: new Date() },
              { _id: '878bc91987', name: 'Fiza Rehan', email: 'fiza@studio.com', service: 'SEO Strategy', status: 'replied', createdAt: new Date() },
            ]).map((row, index) => (
              <div
                key={row._id}
                className="bg-white dark:bg-[#161619] rounded-xl sm:rounded-2xl px-6 py-3.5 shadow-sm hover:shadow-lg dark:shadow-black/30 border border-slate-200/80 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:-translate-y-0.5"
              >
                {/* Client Avatar + Info (Name + ID under it) */}
                <div className="flex items-center gap-3.5 w-full md:w-1/4 min-w-0">
                  <div className="w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold text-sm flex items-center justify-center shrink-0">
                    {row.name ? row.name[0].toUpperCase() : 'C'}
                  </div>
                  <div className="min-w-0">
                    <Link
                      to={`/admin/inquiries/${row._id}`}
                      className="block font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-sm truncate"
                    >
                      {row.name}
                    </Link>
                    <span className="block font-mono text-xs text-slate-400 dark:text-zinc-500 font-medium">
                      ID: #{index + 1}
                    </span>
                  </div>
                </div>

                {/* Contact Email column */}
                <div className="w-full md:w-1/5 min-w-0">
                  <span className="block text-xs font-mono text-slate-600 dark:text-zinc-300 truncate">
                    {row.email || 'Client Inquiry'}
                  </span>
                </div>

                {/* Service Tag */}
                <div className="w-full md:w-1/6 flex md:justify-center">
                  <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-medium px-3.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/40 truncate max-w-[160px]">
                    {row.service || 'Web Project'}
                  </span>
                </div>

                {/* Date column */}
                <div className="w-full md:w-1/6 flex items-center md:justify-center text-xs">
                  <span className="text-slate-500 dark:text-zinc-400 font-normal">
                    {new Date(row.createdAt).toLocaleDateString(undefined, {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Status column */}
                <div className="w-full md:w-1/6 flex items-center md:justify-center text-xs">
                  <span className={`font-semibold ${row.status === 'replied' || row.status === 'Delivered' ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                    {row.status === 'replied' ? 'Approved' : 'Active'}
                  </span>
                </div>

                {/* Actions */}
                <div className="w-full md:w-1/5 flex items-center justify-end gap-2 shrink-0">
                  <Link
                    to={`/admin/inquiries/${row._id}`}
                    className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                    title="View Inspector"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboardPage;
