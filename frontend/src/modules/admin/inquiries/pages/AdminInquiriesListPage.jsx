import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { inquiriesService } from '../services/inquiriesService';
import {
  Inbox,
  Search,
  Trash2,
  Eye,
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Check,
  Archive,
} from 'lucide-react';

export const AdminInquiriesListPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  // Notifications
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Delete State
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await inquiriesService.getAll();
      setInquiries(data);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to load inquiries inbox');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusToggle = async (id, newStatus) => {
    try {
      await inquiriesService.updateStatus(id, newStatus);
      setSuccessMsg(`Inquiry marked as ${newStatus}`);
      fetchInquiries();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update status');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await inquiriesService.delete(deleteId);
      setSuccessMsg('Inquiry deleted successfully');
      setDeleteId(null);
      fetchInquiries();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete inquiry');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredInquiries = inquiries
    .filter((inq) => {
      if (activeTab === 'New') return inq.status === 'new';
      if (activeTab === 'Read') return inq.status === 'read';
      if (activeTab === 'Replied') return inq.status === 'replied';
      if (activeTab === 'Archived') return inq.status === 'archived';
      return true;
    })
    .filter(
      (inq) =>
        inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inq.message && inq.message.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const unreadCount = inquiries.filter((i) => i.status === 'new').length;
  const repliedCount = inquiries.filter((i) => i.status === 'replied').length;

  const tabs = [
    { label: 'All', count: inquiries.length },
    { label: 'New', count: unreadCount },
    { label: 'Read', count: inquiries.filter((i) => i.status === 'read').length },
    { label: 'Replied', count: repliedCount },
    { label: 'Archived', count: inquiries.filter((i) => i.status === 'archived').length },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono text-[10px] uppercase font-bold animate-pulse">
            <span className="w-1.5 h-1.5 rounded-md bg-rose-500" /> New Unread
          </span>
        );
      case 'read':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono text-[10px] uppercase font-medium">
            Read
          </span>
        );
      case 'replied':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px] uppercase font-bold">
            <Check className="w-3 h-3" /> Replied
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-500/10 text-neutral-400 border border-neutral-500/20 font-mono text-[10px] uppercase font-medium">
            <Archive className="w-3 h-3" /> Archived
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-[1500px] mx-auto pb-12 font-sans">
      {/* 1. PAGE HEADER */}
      <AdminPageHeader
        title="Inquiries & Lead Inbox"
        subtitle="Review client contact form submissions, services requested, budget scopes, and respond to incoming leads."
        badgeText="INQUIRIES MODULE"
      />

      {/* Notifications */}
      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-md bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-3 p-4 rounded-md bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-slate-200 dark:border-zinc-800 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white font-open-sans">
              {inquiries.length}
            </span>
            <span className="block text-xs uppercase tracking-wider text-slate-500 font-open-sans">
              Total Inquiries
            </span>
          </div>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-slate-200 dark:border-zinc-800 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-md bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white font-open-sans">
              {unreadCount}
            </span>
            <span className="block text-xs uppercase tracking-wider text-slate-500 font-open-sans">
              New Unread Leads
            </span>
          </div>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-slate-200 dark:border-zinc-800 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white font-open-sans">
              {repliedCount}
            </span>
            <span className="block text-xs uppercase tracking-wider text-slate-500 font-open-sans">
              Replied Leads
            </span>
          </div>
        </div>
      </div>

      {/* 3. FILTER TABS & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-md bg-white dark:bg-[#141416] border border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-3.5 py-1.5 rounded-md text-xs uppercase tracking-wider transition-colors flex items-center gap-2 font-open-sans ${
                activeTab === tab.label
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  activeTab === tab.label
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-black'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, email, service..."
            className="w-full bg-slate-50 dark:bg-[#1c1c1f] border border-slate-300 dark:border-zinc-800 rounded-md py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
          />
        </div>
      </div>

      {/* 4. INQUIRIES FLOATING CAPSULE TABLE WRAPPED IN OUTER CARD CONTAINER */}
      <div className="w-full bg-white dark:bg-[#121215] rounded-md p-6 sm:p-8 shadow-md dark:shadow-black/40 border border-slate-200/90 dark:border-zinc-800">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-open-sans text-sm bg-white dark:bg-[#141416] rounded-md border border-slate-200 dark:border-zinc-800">
            Loading client inquiries...
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-12 text-center space-y-4 bg-white dark:bg-[#141416] rounded-md border border-slate-200 dark:border-zinc-800">
            <Inbox className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-500 font-open-sans">No client inquiries match the filter.</p>
          </div>
        ) : (
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
              {filteredInquiries.map((inquiry, index) => (
                <div
                  key={inquiry._id}
                  className="bg-white dark:bg-[#141416] rounded-xl sm:rounded-2xl px-6 py-3.5 shadow-sm hover:shadow-lg dark:shadow-black/30 border border-slate-200/80 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:-translate-y-0.5"
                >
                  {/* Details column: Name & ID directly under it */}
                  <div className="flex items-center gap-3.5 w-full md:w-1/4 min-w-0">
                    <div className="w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold text-sm flex items-center justify-center shrink-0">
                      {inquiry.name ? inquiry.name[0].toUpperCase() : 'C'}
                    </div>
                    <div className="min-w-0">
                      <Link
                        to={`/admin/inquiries/${inquiry._id}`}
                        className="block font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-sm truncate"
                      >
                        {inquiry.name}
                      </Link>
                      <span className="block font-mono text-xs text-slate-400 dark:text-zinc-500 font-medium">
                        ID: #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Contact Email column */}
                  <div className="w-full md:w-1/5 min-w-0">
                    <span className="block text-xs font-mono text-slate-600 dark:text-zinc-300 truncate">
                      {inquiry.email}
                    </span>
                  </div>

                  {/* Service pill tag */}
                  <div className="w-full md:w-1/6 flex md:justify-center">
                    <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-medium px-3.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/40 truncate max-w-[160px]">
                      {inquiry.service || 'General'}
                    </span>
                  </div>

                  {/* Date column */}
                  <div className="w-full md:w-1/6 flex items-center md:justify-center text-xs">
                    <span className="text-slate-500 dark:text-zinc-400 font-normal">
                      {new Date(inquiry.createdAt).toLocaleDateString(undefined, {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Status column */}
                  <div className="w-full md:w-1/6 flex items-center md:justify-center text-xs">
                    <span className={`font-semibold ${inquiry.status === 'replied' ? 'text-emerald-600 dark:text-emerald-400' : inquiry.status === 'new' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>
                      {inquiry.status === 'replied' ? 'Approved' : inquiry.status === 'new' ? 'New' : inquiry.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="w-full md:w-1/5 flex items-center justify-end gap-2 shrink-0">
                    {inquiry.status !== 'replied' && (
                      <button
                        onClick={() => handleStatusToggle(inquiry._id, 'replied')}
                        className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/60 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                        title="Mark as Replied"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <Link
                      to={`/admin/inquiries/${inquiry._id}`}
                      className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                      title="View Full Details Page"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(inquiry._id)}
                      className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/60 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. DELETE CONFIRMATION DIALOG */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Client Inquiry"
        message="Are you sure you want to delete this lead? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminInquiriesListPage;
