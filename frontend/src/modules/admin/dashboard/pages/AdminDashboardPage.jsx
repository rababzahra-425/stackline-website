import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { dashboardService } from '../services/dashboardService';
import {
  TrendingUp,
  ChevronDown,
  Printer,
  Download,
  RefreshCw,
  ArrowUpRight,
  FolderKanban,
  MessageSquare,
  Briefcase,
  Star,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

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
  const inquiriesByService = statsData?.inquiriesByService || [];

  // Derived Lead Status percentages
  const totalInquiries = stats?.inquiries?.total || 0;
  const newInquiries = stats?.inquiries?.new || 0;
  const contactedInquiries = stats?.inquiries?.contacted || 0;
  const responseRate = stats?.inquiries?.responseRate || 100;

  const newPct = totalInquiries > 0 ? Math.round((newInquiries / totalInquiries) * 100) : 0;
  const contactedPct = totalInquiries > 0 ? Math.round((contactedInquiries / totalInquiries) * 100) : 0;

  return (
    <div className="space-y-6 pb-12 font-sans selection:bg-indigo-500 selection:text-white">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#121215] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-neutral-950 dark:text-white tracking-tight flex items-center gap-2">
            <span>Studio Overview</span>
            <Sparkles className="w-4 h-4 text-indigo-500" />
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Real-time operations, portfolio metrics, and client inquiry analytics.
          </p>
        </div>
        <button
          onClick={fetchDashboardStats}
          disabled={loading}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Live Stats</span>
        </button>
      </div>

      {/* ERROR ALERT */}
      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-md text-xs font-mono">
          {errorMsg}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ROW 1: TOP 3-IN-1 KPI SUMMARY CARD + STUDIO LEAD PERFORMANCE GAUGES       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT 7 COLS: Combined 3-in-1 Authentic KPI Summary Box */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121215] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 shadow-sm flex items-center justify-between">
          
          {/* Metric 1: Total Projects */}
          <div className="flex-1 pr-4 sm:pr-6">
            <span className="block text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-3 flex items-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5 text-indigo-500" />
              <span>Total Projects</span>
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-2">
              {stats?.projects?.total ?? 0}
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>{stats?.projects?.featured ?? 0} Featured</span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-16 bg-neutral-200/80 dark:bg-neutral-800 shrink-0" />

          {/* Metric 2: Total Client Inquiries */}
          <div className="flex-1 px-4 sm:px-6">
            <span className="block text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-3 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
              <span>Client Inquiries</span>
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-2">
              {stats?.inquiries?.total ?? 0}
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-semibold">
              <Clock className="w-3 h-3" />
              <span>{stats?.inquiries?.new ?? 0} New Unread</span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-16 bg-neutral-200/80 dark:bg-neutral-800 shrink-0" />

          {/* Metric 3: Active Studio Services */}
          <div className="flex-1 pl-4 sm:pl-6">
            <span className="block text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-amber-500" />
              <span>Active Services</span>
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-2">
              {stats?.services?.total ?? 0}
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-semibold">
              <Users className="w-3 h-3" />
              <span>{stats?.team?.total ?? 0} Team Members</span>
            </div>
          </div>

        </div>

        {/* RIGHT 5 COLS: Studio Lead & Response Gauges */}
        <div className="lg:col-span-5 bg-white dark:bg-[#121215] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold text-neutral-950 dark:text-white uppercase tracking-wider">
                Inquiry Response Rate
              </h2>
              <span className="text-[11px] text-neutral-400 font-normal">Real-time DB</span>
            </div>
            
            <Link
              to="/admin/inquiries"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100/80 dark:bg-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-300 font-medium hover:text-indigo-500 transition-colors"
            >
              <span>Manage Leads</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* 3 Authentic Donut Gauges */}
          <div className="grid grid-cols-3 gap-2 text-center py-2">
            
            {/* Gauge 1: Response Rate */}
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
                    strokeDasharray={`${responseRate}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-extrabold text-neutral-950 dark:text-white">
                  {responseRate}%
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium max-w-[80px] leading-tight">
                Response Rate
              </span>
            </div>

            {/* Gauge 2: New Unread Percentage */}
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
                    className="text-blue-500"
                    strokeDasharray={`${newPct}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-extrabold text-neutral-950 dark:text-white">
                  {newPct}%
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium max-w-[80px] leading-tight">
                New Leads Ratio
              </span>
            </div>

            {/* Gauge 3: Contacted Percentage */}
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
                    strokeDasharray={`${contactedPct}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-extrabold text-neutral-950 dark:text-white">
                  {contactedPct}%
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium max-w-[80px] leading-tight">
                Inquiries Contacted
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* ROW 2: INQUIRY SERVICE BREAKDOWN + CONTENT & REVIEWS OVERVIEW             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT 7 COLS: Service Breakdown & Inquiry Demand */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121215] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-neutral-950 dark:text-white">
                Inquiries by Requested Service
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Authentic distribution of client lead submissions across studio offerings
              </p>
            </div>
            <Link to="/admin/services" className="text-xs text-indigo-500 hover:underline font-medium">
              View Services →
            </Link>
          </div>

          {/* Service Progress Bars */}
          <div className="space-y-4 py-2">
            {inquiriesByService.length > 0 ? (
              inquiriesByService.map((item, idx) => {
                const pct = totalInquiries > 0 ? Math.round((item.count / totalInquiries) * 100) : 0;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      <span>{item._id || 'General Consultation'}</span>
                      <span className="font-mono font-bold text-neutral-950 dark:text-white">
                        {item.count} inquiries ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(pct, 5)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-xs text-neutral-400">
                No inquiry services categorized yet.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT 5 COLS: Content, Ratings & Studio Footprint */}
        <div className="lg:col-span-5 bg-white dark:bg-[#121215] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-neutral-950 dark:text-white">
              Studio Content & Satisfaction
            </h2>
            <span className="text-[11px] text-emerald-500 font-bold px-2 py-0.5 rounded bg-emerald-500/10">
              Live Database
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 my-2">
            {/* Box 1: Average Rating */}
            <div className="p-4 rounded-md bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 flex flex-col justify-between">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Client Rating</span>
              </span>
              <div className="mt-3">
                <span className="text-2xl font-extrabold text-neutral-950 dark:text-white">
                  {stats?.reviews?.averageRating ?? '5.0'}
                </span>
                <span className="text-[11px] text-neutral-400 block font-normal mt-0.5">
                  Based on {stats?.reviews?.total ?? 0} reviews
                </span>
              </div>
            </div>

            {/* Box 2: Blog Posts */}
            <div className="p-4 rounded-md bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 flex flex-col justify-between">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                <span>Journal Articles</span>
              </span>
              <div className="mt-3">
                <span className="text-2xl font-extrabold text-neutral-950 dark:text-white">
                  {stats?.blogs?.total ?? 0}
                </span>
                <span className="text-[11px] text-neutral-400 block font-normal mt-0.5">
                  Published posts
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
            <Link to="/admin/blog" className="text-indigo-500 hover:underline font-medium">
              Manage Articles →
            </Link>
            <Link to="/admin/reviews" className="text-indigo-500 hover:underline font-medium">
              Manage Reviews →
            </Link>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* ROW 3: RECENT STUDIO ACTIVITIES / REAL INQUIRIES TABLE                    */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-[#121215] border border-neutral-200/90 dark:border-neutral-800 rounded-md p-6 shadow-sm space-y-5">
        
        {/* Table Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-neutral-950 dark:text-white">
              Recent Client Inquiries
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live submissions from prospective studio clients
            </p>
          </div>

          <Link
            to="/admin/inquiries"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            <span>View All Inquiries ({totalInquiries})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Floating Rows Container */}
        <div className="w-full space-y-3 font-sans">
          {/* Header Box */}
          <div className="hidden md:flex items-center justify-between bg-neutral-100 dark:bg-neutral-800/80 rounded-md px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
            <div className="w-1/4">CLIENT NAME</div>
            <div className="w-1/5">EMAIL ADDRESS</div>
            <div className="w-1/6 text-center">SERVICE</div>
            <div className="w-1/6 text-center">DATE</div>
            <div className="w-1/6 text-center">STATUS</div>
            <div className="w-1/6 text-right pr-2">ACTIONS</div>
          </div>

          {/* Real Floating Rows */}
          <div className="space-y-3">
            {recentInquiries.length > 0 ? (
              recentInquiries.map((row, index) => (
                <div
                  key={row._id}
                  className="bg-white dark:bg-[#161619] rounded-lg px-6 py-3.5 shadow-sm hover:shadow-md border border-neutral-200/80 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:-translate-y-0.5"
                >
                  {/* Client Avatar + Info */}
                  <div className="flex items-center gap-3.5 w-full md:w-1/4 min-w-0">
                    <div className="w-9 h-9 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                      {row.name ? row.name[0].toUpperCase() : 'C'}
                    </div>
                    <div className="min-w-0">
                      <Link
                        to={`/admin/inquiries/${row._id}`}
                        className="block font-semibold text-neutral-900 dark:text-white hover:text-indigo-500 text-sm truncate"
                      >
                        {row.name}
                      </Link>
                      <span className="block font-mono text-[11px] text-neutral-400">
                        ID: #{row._id ? row._id.slice(-6) : index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="w-full md:w-1/5 min-w-0">
                    <span className="block text-xs font-mono text-neutral-600 dark:text-neutral-300 truncate">
                      {row.email || 'N/A'}
                    </span>
                  </div>

                  {/* Service Tag */}
                  <div className="w-full md:w-1/6 flex md:justify-center">
                    <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11px] font-semibold px-3 py-1 rounded-md border border-neutral-200/60 dark:border-neutral-700/50 truncate max-w-[150px]">
                      {row.service || 'General Inquiry'}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="w-full md:w-1/6 flex items-center md:justify-center text-xs">
                    <span className="text-neutral-500 dark:text-neutral-400 font-mono text-[11px]">
                      {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>

                  {/* Status Tag */}
                  <div className="w-full md:w-1/6 flex items-center md:justify-center text-xs">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        row.status === 'contacted'
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          : row.status === 'closed' || row.status === 'replied'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {row.status ? row.status.toUpperCase() : 'NEW'}
                    </span>
                  </div>

                  {/* Action Link */}
                  <div className="w-full md:w-1/6 flex items-center justify-end gap-2 shrink-0">
                    <Link
                      to={`/admin/inquiries/${row._id}`}
                      className="w-8 h-8 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 text-neutral-400 flex items-center justify-center transition-colors"
                      title="Inspect Inquiry"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-800">
                <MessageSquare className="w-8 h-8 text-neutral-400 mx-auto mb-2 opacity-50" />
                <p className="text-xs text-neutral-500 font-medium">No client inquiries recorded in database yet.</p>
                <p className="text-[11px] text-neutral-400 mt-1">Inquiries submitted via the public contact page will appear here automatically.</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboardPage;
