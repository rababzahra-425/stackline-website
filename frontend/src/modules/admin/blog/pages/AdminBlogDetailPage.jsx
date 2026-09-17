import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { blogService } from '../services/blogService';
import {
  ArrowLeft,
  Trash2,
  Edit3,
  Calendar,
  Clock,
  User,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const AdminBlogDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Delete Dialog State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await blogService.getBySlugOrId(id);
        if (res.data) {
          setBlog(res.data);
        } else {
          setErrorMsg('Article record not found.');
        }
      } catch (err) {
        console.error('Error fetching blog detail:', err);
        setErrorMsg(err.message || 'Failed to fetch article details.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await blogService.delete(id);
      navigate('/admin/blog');
    } catch (err) {
      console.error('Error deleting blog article:', err);
      setErrorMsg(err.message || 'Failed to delete article');
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

  if (errorMsg || !blog) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          title="ARTICLE DETAILS"
          breadcrumbs={[
            { label: 'Platform Management' },
            { label: 'Journal', path: '/admin/blog' },
            { label: 'Details' },
          ]}
        />
        <div className="bg-rose-500/10 border border-rose-500/30 p-6 rounded-md text-rose-600 dark:text-rose-400 font-mono text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg || 'Article record not found.'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <AdminPageHeader
        title="ARTICLE DETAILS"
        subtitle={`Viewing article "${blog.title}"`}
        breadcrumbs={[
          { label: 'Platform Management' },
          { label: 'Journal', path: '/admin/blog' },
          { label: blog.title },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <Link
              to="/admin/blog"
              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono uppercase tracking-wider rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>

            <a
              href={`/blog/${blog.slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono uppercase tracking-wider rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Preview Live</span>
            </a>

            <Link
              to={`/admin/blog/${blog._id}/edit`}
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

      {/* Main Detail View */}
      <div className="bg-white dark:bg-[#18181b] border border-neutral-200/80 dark:border-neutral-800 rounded-md overflow-hidden shadow-sm">
        {/* Cover Photo */}
        <div className="relative aspect-[21/9] w-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-md bg-black/80 backdrop-blur-md text-white border border-white/10 font-bold">
              {blog.category}
            </span>
            <span
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-md border font-bold ${
                blog.status === 'published'
                  ? 'bg-emerald-500 text-white border-emerald-400'
                  : 'bg-amber-500 text-white border-amber-400'
              }`}
            >
              {blog.status}
            </span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Article Header Info */}
          <div className="space-y-4 pb-8 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 uppercase">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {blog.readTime || '5 min read'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {blog.dateFormatted || blog.date}
              </span>
              <span>•</span>
              <span>SLUG: /{blog.slug}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white leading-tight uppercase">
              {blog.title}
            </h1>

            {blog.subtitle && (
              <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
                {blog.subtitle}
              </p>
            )}

            {/* Author Badge */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src={
                  blog.author?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
                }
                alt={blog.author?.name || 'Author'}
                className="w-10 h-10 rounded-md object-cover border border-neutral-200 dark:border-neutral-700"
              />
              <div>
                <h4 className="text-xs font-bold uppercase text-neutral-900 dark:text-white">
                  {blog.author?.name || 'KAJO Studio Team'}
                </h4>
                <span className="text-[10px] font-mono text-neutral-400 block">
                  {blog.author?.role || 'Editorial Lead'}
                </span>
              </div>
            </div>
          </div>

          {/* Article Summary */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Summary Teaser
            </div>
            <p className="text-base text-neutral-800 dark:text-neutral-200 font-normal leading-relaxed p-5 bg-neutral-50 dark:bg-[#121214] border border-neutral-200/80 dark:border-neutral-800 rounded-md">
              {blog.summary}
            </p>
          </div>

          {/* Body Content Blocks */}
          <div className="space-y-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Article Content ({blog.content?.length || 0} Blocks)
            </div>

            {blog.content && blog.content.length > 0 ? (
              blog.content.map((block, idx) => (
                <div key={idx} className="space-y-2">
                  {block.heading && (
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase tracking-tight">
                      {block.heading}
                    </h3>
                  )}
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal whitespace-pre-line">
                    {block.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs font-mono text-neutral-400 italic">No content blocks created.</p>
            )}
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="DELETE ARTICLE"
        message={`Are you sure you want to permanently delete "${blog.title}"?`}
        confirmText={isDeleting ? 'Deleting...' : 'Delete Article'}
        confirmVariant="danger"
      />
    </div>
  );
};

export default AdminBlogDetailPage;
