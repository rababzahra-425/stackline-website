import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { reviewsService } from '../services/reviewsService';
import {
  MessageSquareQuote,
  Search,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Star,
  CheckCircle2,
  AlertCircle,
  Filter,
} from 'lucide-react';

export const AdminReviewsPage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Notifications
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Delete Dialog State
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await reviewsService.getAll(true);
      if (res.data) {
        setReviews(res.data);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error('Error loading admin reviews:', err);
      setErrorMsg(err.message || 'Failed to load customer reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Filter logic
  const filteredReviews = reviews.filter((rev) => {
    const matchesSearch =
      rev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rev.company && rev.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      rev.quote.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || rev.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle Delete
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await reviewsService.delete(deleteId);
      setSuccessMsg('Review deleted successfully.');
      setReviews((prev) => prev.filter((r) => r._id !== deleteId));
      setDeleteId(null);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Error deleting review:', err);
      setErrorMsg(err.message || 'Failed to delete review');
      setTimeout(() => setErrorMsg(''), 4000);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header */}
      <AdminPageHeader
        title="REVIEWS & TESTIMONIALS"
        subtitle="Manage client feedback, customer submissions, ratings, and featured testimonials."
        breadcrumbs={[
          { label: 'Platform Management' },
          { label: 'Reviews & Feedback', path: '/admin/reviews' },
        ]}
        actions={
          <Link
            to="/admin/reviews/create"
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-white text-xs font-mono uppercase tracking-wider font-bold rounded-md transition-all shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Review</span>
          </Link>
        }
      />

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-md text-sm font-mono flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 rounded-md text-sm font-mono flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 2. Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-[#18181b] p-4 rounded-md border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by client name, headline, company, or feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white uppercase"
          >
            <option value="all">ALL REVIEWS ({reviews.length})</option>
            <option value="approved">APPROVED</option>
            <option value="pending">PENDING</option>
            <option value="hidden">HIDDEN</option>
          </select>
        </div>
      </div>

      {/* 3. REVIEWS FLOATING CAPSULE TABLE WRAPPED IN OUTER CARD CONTAINER */}
      <div className="w-full bg-white dark:bg-[#121215] rounded-md p-6 sm:p-8 shadow-md dark:shadow-black/40 border border-slate-200/90 dark:border-zinc-800">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-md animate-spin" />
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="p-12 text-center font-open-sans">
            <MessageSquareQuote className="w-12 h-12 text-slate-300 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              No Reviews Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
              {searchQuery
                ? `No reviews matched "${searchQuery}". Try a different keyword.`
                : 'No customer reviews exist in the system yet. Click below to manually add one.'}
            </p>
            <Link
              to="/admin/reviews/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-blue-600 text-white text-xs font-semibold rounded-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Review</span>
            </Link>
          </div>
        ) : (
          <div className="w-full space-y-3 font-open-sans">
            {/* Header Box */}
            <div className="hidden md:flex items-center justify-between bg-[#9A989D] dark:bg-[#343338] rounded-none px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white border border-[#88868c]/40 dark:border-[#48464d]/60">
              <div className="w-1/4">DETAILS</div>
              <div className="w-1/5">COMPANY</div>
              <div className="w-1/5 text-center">RATING</div>
              <div className="w-1/5 text-center">STATUS</div>
              <div className="w-1/5 text-right pr-2">ACTIONS</div>
            </div>

            {/* Floating Rows */}
            <div className="space-y-3">
              {filteredReviews.map((rev, index) => (
                <div
                  key={rev._id}
                  className="bg-white dark:bg-[#141416] rounded-xl sm:rounded-2xl px-6 py-3.5 shadow-sm hover:shadow-lg dark:shadow-black/30 border border-slate-200/80 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:-translate-y-0.5"
                >
                  {/* Details column: Client avatar + name + ID directly under name */}
                  <div className="flex items-center gap-3.5 w-full md:w-1/4 min-w-0">
                    <div className="w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold text-sm flex items-center justify-center shrink-0 overflow-hidden">
                      {rev.avatar ? (
                        <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                      ) : (
                        rev.name ? rev.name[0].toUpperCase() : 'R'
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link
                        to={`/admin/reviews/${rev._id}`}
                        className="block font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-sm truncate"
                      >
                        {rev.name}
                      </Link>
                      <span className="block font-mono text-xs text-slate-400 dark:text-zinc-500 font-medium">
                        ID: #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Company column */}
                  <div className="w-full md:w-1/5 min-w-0">
                    <span className="block text-xs font-medium text-slate-700 dark:text-zinc-200 truncate">
                      {rev.company || rev.headline || 'Verified Review'}
                    </span>
                  </div>

                  {/* Rating column */}
                  <div className="w-full md:w-1/5 flex md:justify-center items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (rev.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Status column */}
                  <div className="w-full md:w-1/5 flex items-center md:justify-center gap-2 text-xs">
                    <span className={`font-semibold ${rev.status === 'approved' ? 'text-emerald-600 dark:text-emerald-400' : rev.status === 'pending' ? 'text-amber-500' : 'text-slate-400'}`}>
                      {rev.status ? rev.status.charAt(0).toUpperCase() + rev.status.slice(1) : 'Approved'}
                    </span>
                  </div>

                {/* Actions */}
                <div className="w-full md:w-1/5 flex items-center justify-end gap-2 shrink-0">
                  <Link
                    to={`/admin/reviews/${rev._id}`}
                    className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                    title="View Full Details Page"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/admin/reviews/${rev._id}/edit`}
                    className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                    title="Edit Review"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setDeleteId(rev._id)}
                    className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/60 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                    title="Delete Review"
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

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="DELETE REVIEW"
        message="Are you sure you want to delete this customer review? This action cannot be undone and will remove it from the website."
        confirmText={isDeleting ? 'Deleting...' : 'Delete Review'}
        confirmVariant="danger"
      />
    </div>
  );
};

export default AdminReviewsPage;
