import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { reviewsService } from '../services/reviewsService';
import {
  ArrowLeft,
  Trash2,
  Edit3,
  Star,
  Quote,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
} from 'lucide-react';

export const AdminReviewDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Delete Dialog State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const res = await reviewsService.getById(id);
        if (res.data) {
          setReview(res.data);
        } else {
          setErrorMsg('Review details not found.');
        }
      } catch (err) {
        console.error('Error fetching review detail:', err);
        setErrorMsg(err.message || 'Failed to fetch review details.');
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await reviewsService.delete(id);
      navigate('/admin/reviews');
    } catch (err) {
      console.error('Error deleting review:', err);
      setErrorMsg(err.message || 'Failed to delete review');
      setIsDeleteOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-neutral-900 dark:border-white border-t-transparent rounded-md animate-spin" />
      </div>
    );
  }

  if (errorMsg || !review) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          title="REVIEW DETAILS"
          breadcrumbs={[
            { label: 'Platform Management' },
            { label: 'Reviews', path: '/admin/reviews' },
            { label: 'Details' },
          ]}
        />
        <div className="bg-rose-500/10 border border-rose-500/30 p-6 rounded-md text-rose-600 dark:text-rose-400 font-mono text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg || 'Review record not found.'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <AdminPageHeader
        title="REVIEW DETAILS"
        subtitle={`Viewing client review record for ${review.name}`}
        breadcrumbs={[
          { label: 'Platform Management' },
          { label: 'Reviews', path: '/admin/reviews' },
          { label: review.name },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <Link
              to="/admin/reviews"
              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono uppercase tracking-wider rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>

            <Link
              to={`/admin/reviews/${review._id}/edit`}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black text-xs font-mono uppercase tracking-wider font-bold rounded-md transition-colors flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </Link>

            <button
              onClick={() => setIsDeleteOpen(true)}
              className="px-4 py-2 bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white dark:text-rose-400 text-xs font-mono uppercase tracking-wider font-bold rounded-md transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        }
      />

      {/* Detail Card Container */}
      <div className="bg-white dark:bg-[#18181b] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-8 space-y-8 shadow-sm">
        {/* Top Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-4">
            <img
              src={
                review.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
              }
              alt={review.name}
              className="w-16 h-16 rounded-md object-cover border-2 border-neutral-200 dark:border-neutral-700"
            />
            <div>
              <h2 className="text-xl font-bold text-neutral-950 dark:text-white uppercase tracking-tight">
                {review.name}
              </h2>
              <div className="flex items-center gap-3 mt-1 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {review.company || '(Client)'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(review.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Rating Stars */}
            <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-500 text-xs font-mono font-bold">
              <span>{review.rating || 5} Stars</span>
              <Star className="w-4 h-4 fill-amber-500" />
            </div>

            {/* Status Badge */}
            <span
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border font-bold ${
                review.status === 'approved'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                  : review.status === 'pending'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                  : 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20'
              }`}
            >
              {review.status || 'approved'}
            </span>
          </div>
        </div>

        {/* Headline & Quote */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Review Headline
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white leading-snug">
            {review.headline}
          </h3>
        </div>

        <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Quote className="w-4 h-4" />
            <span>Client Feedback & Testimony</span>
          </div>
          <div className="p-6 bg-neutral-50 dark:bg-[#121214] border border-neutral-200/80 dark:border-neutral-800 rounded-md text-neutral-800 dark:text-neutral-200 text-base leading-relaxed font-normal italic">
            “{review.quote}”
          </div>
        </div>

        {/* Additional Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 text-xs font-mono text-neutral-500">
          <div>
            <span className="block text-neutral-400 uppercase mb-1">Featured Status</span>
            <span className="text-neutral-900 dark:text-white font-bold">
              {review.isFeatured ? 'YES (Homepage Slider)' : 'NO'}
            </span>
          </div>

          <div>
            <span className="block text-neutral-400 uppercase mb-1">Record ID</span>
            <span className="text-neutral-900 dark:text-white font-bold">#1</span>
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="DELETE REVIEW RECORD"
        message={`Are you sure you want to permanently delete the review from ${review.name}?`}
        confirmText={isDeleting ? 'Deleting...' : 'Delete Permanently'}
        confirmVariant="danger"
      />
    </div>
  );
};

export default AdminReviewDetailPage;
