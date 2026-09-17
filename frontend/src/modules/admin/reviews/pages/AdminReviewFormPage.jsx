import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import ImageUploader from '../../shared/components/ImageUploader';
import { reviewsService } from '../services/reviewsService';
import { ArrowLeft, Save, Star, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminReviewFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    headline: '',
    quote: '',
    rating: 5,
    avatar: '',
    status: 'approved',
    isFeatured: true,
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchReviewDetails = async () => {
        try {
          setLoading(true);
          const res = await reviewsService.getById(id);
          if (res.data) {
            setFormData({
              name: res.data.name || '',
              company: res.data.company || '',
              headline: res.data.headline || '',
              quote: res.data.quote || '',
              rating: res.data.rating || 5,
              avatar: res.data.avatar || '',
              status: res.data.status || 'approved',
              isFeatured: res.data.isFeatured !== undefined ? res.data.isFeatured : true,
            });
          }
        } catch (err) {
          console.error('Error loading review:', err);
          setErrorMsg(err.message || 'Failed to load review details');
        } finally {
          setLoading(false);
        }
      };
      fetchReviewDetails();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.headline.trim() || !formData.quote.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Headline, Review Quote).');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');

      if (isEditMode) {
        await reviewsService.update(id, formData);
        setSuccessMsg('Review updated successfully.');
      } else {
        await reviewsService.create(formData);
        setSuccessMsg('Review created successfully.');
      }

      setTimeout(() => {
        navigate('/admin/reviews');
      }, 1200);
    } catch (err) {
      console.error('Error saving review:', err);
      setErrorMsg(err.message || 'Failed to save review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-neutral-900 dark:border-white border-t-transparent rounded-md animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <AdminPageHeader
        title={isEditMode ? 'EDIT REVIEW' : 'CREATE NEW REVIEW'}
        subtitle={
          isEditMode
            ? `Update feedback details for ${formData.name || 'client'}.`
            : 'Add a new client testimonial or customer review.'
        }
        breadcrumbs={[
          { label: 'Platform Management' },
          { label: 'Reviews', path: '/admin/reviews' },
          { label: isEditMode ? 'Edit Review' : 'Create Review' },
        ]}
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

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-[#18181b] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-tight pb-4 border-b border-neutral-100 dark:border-neutral-800">
            Client & Review Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Client Name */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Client Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Dave Mitchell"
                required
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Company / Organization
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. (Lumina Brand Co)"
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
              />
            </div>
          </div>

          {/* Review Headline */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
              Review Headline *
            </label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              placeholder="e.g. Exceptional Branding That Elevated Our Identity."
              required
              className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
            />
          </div>

          {/* Review Quote / Feedback */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
              Testimonial Quote / Feedback *
            </label>
            <textarea
              name="quote"
              rows={5}
              value={formData.quote}
              onChange={handleChange}
              placeholder="Enter full client review testimony..."
              required
              className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors resize-none"
            />
          </div>

          {/* Rating & Status Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-4 border-t border-neutral-100 dark:border-neutral-800">
            {/* Rating Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Star Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                    className="p-1 text-amber-500 focus:outline-none transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= formData.rating ? 'fill-amber-500' : 'text-neutral-300 dark:text-neutral-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Publication Status */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Publication Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white uppercase focus:outline-none"
              >
                <option value="approved">APPROVED (VISIBILITY ON WEBSITE)</option>
                <option value="pending">PENDING (IN REVIEW)</option>
                <option value="hidden">HIDDEN (UNPUBLISHED)</option>
              </select>
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center gap-3 pb-2">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
              />
              <label
                htmlFor="isFeatured"
                className="text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 cursor-pointer select-none"
              >
                Feature on Homepage Slider
              </label>
            </div>
          </div>

          {/* Client Avatar Upload */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-3">
              Client Avatar Photo
            </label>
            <ImageUploader
              value={formData.avatar}
              onChange={(url) => setFormData((prev) => ({ ...prev, avatar: url }))}
              label="Upload Client Photo"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link
            to="/admin/reviews"
            className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-black text-xs font-mono uppercase tracking-wider font-bold rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Saving...' : isEditMode ? 'Update Review' : 'Create Review'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminReviewFormPage;
