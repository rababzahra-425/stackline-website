import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import ImageUploader from '../../shared/components/ImageUploader';
import { blogService } from '../services/blogService';
import { ArrowLeft, Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminBlogFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    category: 'Branding',
    readTime: '5 min read',
    coverImage: '',
    summary: '',
    author: {
      name: 'KAJO Studio Team',
      role: 'Editorial Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
    status: 'published',
    content: [{ heading: 'Overview & Vision', text: '' }],
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchBlog = async () => {
        try {
          setLoading(true);
          const res = await blogService.getBySlugOrId(id);
          if (res.data) {
            setFormData({
              title: res.data.title || '',
              subtitle: res.data.subtitle || '',
              slug: res.data.slug || '',
              category: res.data.category || 'Branding',
              readTime: res.data.readTime || '5 min read',
              coverImage: res.data.coverImage || '',
              summary: res.data.summary || '',
              author: {
                name: res.data.author?.name || 'KAJO Studio Team',
                role: res.data.author?.role || 'Editorial Lead',
                avatar:
                  res.data.author?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
              },
              status: res.data.status || 'published',
              content:
                res.data.content && res.data.content.length > 0
                  ? res.data.content
                  : [{ heading: 'Overview & Vision', text: '' }],
            });
          }
        } catch (err) {
          console.error('Error loading article:', err);
          setErrorMsg(err.message || 'Failed to load article details');
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthorChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      author: { ...prev.author, [name]: value },
    }));
  };

  // Content Block Handlers
  const handleContentBlockChange = (index, field, value) => {
    setFormData((prev) => {
      const newBlocks = [...prev.content];
      newBlocks[index] = { ...newBlocks[index], [field]: value };
      return { ...prev, content: newBlocks };
    });
  };

  const addContentBlock = () => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, { heading: '', text: '' }],
    }));
  };

  const removeContentBlock = (index) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.summary.trim() || !formData.coverImage.trim()) {
      setErrorMsg('Please fill in all required fields (Title, Category, Cover Image, Summary).');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');

      if (isEditMode) {
        await blogService.update(id, formData);
        setSuccessMsg('Article updated successfully.');
      } else {
        await blogService.create(formData);
        setSuccessMsg('Article created successfully.');
      }

      setTimeout(() => {
        navigate('/admin/blog');
      }, 1200);
    } catch (err) {
      console.error('Error saving blog post:', err);
      setErrorMsg(err.message || 'Failed to save blog article');
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
        title={isEditMode ? 'EDIT JOURNAL ARTICLE' : 'CREATE JOURNAL ARTICLE'}
        subtitle={
          isEditMode
            ? `Update editorial post "${formData.title || 'article'}".`
            : 'Write and publish a new thought leadership or case study article.'
        }
        breadcrumbs={[
          { label: 'Platform Management' },
          { label: 'Journal', path: '/admin/blog' },
          { label: isEditMode ? 'Edit Article' : 'Create Article' },
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

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Article Primary Information */}
        <div className="bg-white dark:bg-[#18181b] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-tight pb-4 border-b border-neutral-100 dark:border-neutral-800">
            Article Overview & Meta
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Rethinking Brand Strategy in the AI Era"
                required
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
              />
            </div>

            {/* Custom Slug */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                URL Slug (Optional / Auto-generated)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. re-thinking-brand-strategy-ai"
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Category */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 uppercase"
              >
                <option value="Branding">BRANDING</option>
                <option value="Web Design">WEB DESIGN</option>
                <option value="UI/UX">UI/UX EXPERIENCE</option>
                <option value="Engineering">ENGINEERING</option>
                <option value="Strategy">STRATEGY & GROWTH</option>
                <option value="Insights">STUDIO INSIGHTS</option>
              </select>
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Read Time
              </label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                placeholder="e.g. 5 min read"
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none"
              />
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
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none uppercase"
              >
                <option value="published">PUBLISHED (LIVE ON WEBSITE)</option>
                <option value="draft">DRAFT (HIDDEN)</option>
              </select>
            </div>
          </div>

          {/* Subtitle / Excerpt */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
              Subtitle / Subheadline
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Brief tagline detailing the article core message"
              className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* Article Summary */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
              Summary Paragraph *
            </label>
            <textarea
              name="summary"
              rows={3}
              value={formData.summary}
              onChange={handleChange}
              placeholder="Teaser paragraph shown on the journal grid card..."
              required
              className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none resize-none"
            />
          </div>

          {/* Cover Image Uploader */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-3">
              Cover Header Image *
            </label>
            <ImageUploader
              value={formData.coverImage}
              onChange={(url) => setFormData((prev) => ({ ...prev, coverImage: url }))}
              label="Upload Cover Image"
            />
          </div>
        </div>

        {/* 2. Author Credentials */}
        <div className="bg-white dark:bg-[#18181b] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-tight pb-4 border-b border-neutral-100 dark:border-neutral-800">
            Author Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Author Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.author.name}
                onChange={handleAuthorChange}
                placeholder="e.g. KAJO Editorial Team"
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Author Role / Designation
              </label>
              <input
                type="text"
                name="role"
                value={formData.author.role}
                onChange={handleAuthorChange}
                placeholder="e.g. Head of Strategy"
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Article Content Blocks */}
        <div className="bg-white dark:bg-[#18181b] border border-neutral-200/80 dark:border-neutral-800 rounded-md p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-tight">
                Article Body Content Blocks
              </h3>
              <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1">
                Add structured sections with headings and paragraphs for editorial reading.
              </p>
            </div>
            <button
              type="button"
              onClick={addContentBlock}
              className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-mono uppercase tracking-wider font-bold rounded-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Block</span>
            </button>
          </div>

          <div className="space-y-6">
            {formData.content.map((block, idx) => (
              <div
                key={idx}
                className="p-5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 rounded-md space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                    Block #{idx + 1}
                  </span>
                  {formData.content.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContentBlock(idx)}
                      className="text-rose-500 hover:text-rose-600 p-1 text-xs font-mono flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Block Subheading
                  </label>
                  <input
                    type="text"
                    value={block.heading}
                    onChange={(e) => handleContentBlockChange(idx, 'heading', e.target.value)}
                    placeholder="e.g. Defining the Brand Identity"
                    className="w-full px-4 py-2 bg-white dark:bg-[#1c1c20] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Block Text Content *
                  </label>
                  <textarea
                    rows={5}
                    value={block.text}
                    onChange={(e) => handleContentBlockChange(idx, 'text', e.target.value)}
                    placeholder="Write detailed paragraph content..."
                    required
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#1c1c20] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-end gap-4">
          <Link
            to="/admin/blog"
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
            <span>{isSubmitting ? 'Saving...' : isEditMode ? 'Update Article' : 'Publish Article'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogFormPage;
