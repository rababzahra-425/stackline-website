import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { blogService } from '../services/blogService';
import {
  BookOpen,
  Search,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Filter,
  User,
  Clock,
} from 'lucide-react';

export const AdminBlogListPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Notifications
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Delete Dialog State
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await blogService.getAll(true);
      if (res.data) {
        setBlogs(res.data);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error('Error loading admin blogs:', err);
      setErrorMsg(err.message || 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.author?.name && blog.author.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      categoryFilter === 'all' || blog.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Extract unique categories for filter dropdown
  const categories = Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)));

  // Handle Delete
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await blogService.delete(deleteId);
      setSuccessMsg('Blog article deleted successfully.');
      setBlogs((prev) => prev.filter((b) => b._id !== deleteId));
      setDeleteId(null);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Error deleting blog post:', err);
      setErrorMsg(err.message || 'Failed to delete article');
      setTimeout(() => setErrorMsg(''), 4000);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header */}
      <AdminPageHeader
        title="BLOG & STUDIO JOURNAL"
        subtitle="Publish, edit, and manage articles, case studies, and editorial insights."
        breadcrumbs={[
          { label: 'Platform Management' },
          { label: 'Journal & Insights', path: '/admin/blog' },
        ]}
        actions={
          <Link
            to="/admin/blog/create"
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-white text-xs font-mono uppercase tracking-wider font-bold rounded-md transition-all shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Article</span>
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
            placeholder="Search articles by title, category, summary, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-all"
          />
        </div>

        {/* Category & Status Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white uppercase"
            >
              <option value="all">ALL CATEGORIES</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-700/80 rounded-md text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white uppercase"
          >
            <option value="all">ALL STATUS</option>
            <option value="published">PUBLISHED</option>
            <option value="draft">DRAFT</option>
          </select>
        </div>
      </div>

      {/* 3. ARTICLES FLOATING CAPSULE TABLE WRAPPED IN OUTER CARD CONTAINER */}
      <div className="w-full bg-white dark:bg-[#121215] rounded-md p-6 sm:p-8 shadow-md dark:shadow-black/40 border border-slate-200/90 dark:border-zinc-800">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-md animate-spin" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center font-open-sans">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              No Articles Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
              {searchQuery
                ? `No articles matched "${searchQuery}". Try adjusting search filters.`
                : 'No blog posts exist in the database yet. Click below to write your first article.'}
            </p>
            <Link
              to="/admin/blog/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-blue-600 text-white text-xs font-semibold rounded-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create Article</span>
            </Link>
          </div>
        ) : (
          <div className="w-full space-y-3 font-open-sans">
            {/* Header Box */}
            <div className="hidden md:flex items-center justify-between bg-[#9A989D] dark:bg-[#343338] rounded-none px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white border border-[#88868c]/40 dark:border-[#48464d]/60">
              <div className="w-1/4">DETAILS</div>
              <div className="w-1/6">AUTHOR</div>
              <div className="w-1/6 text-center">READ TIME</div>
              <div className="w-1/6 text-center">CATEGORY</div>
              <div className="w-1/6 text-center">STATUS</div>
              <div className="w-1/6 text-right pr-2">ACTIONS</div>
            </div>

            {/* Floating Rows */}
            <div className="space-y-3">
              {filteredBlogs.map((blog, index) => (
                <div
                  key={blog._id}
                  className="bg-white dark:bg-[#141416] rounded-xl sm:rounded-2xl px-6 py-3.5 shadow-sm hover:shadow-lg dark:shadow-black/30 border border-slate-200/80 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:-translate-y-0.5"
                >
                  {/* Article thumbnail + title + ID directly under title */}
                  <div className="flex items-center gap-3.5 w-full md:w-1/4 min-w-0">
                    <div className="w-12 h-10 rounded-md bg-slate-900 border border-slate-700 overflow-hidden relative shrink-0">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <Link
                        to={`/admin/blog/${blog._id}`}
                        className="block font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-sm truncate"
                      >
                        {blog.title}
                      </Link>
                      <span className="block font-mono text-xs text-slate-400 dark:text-zinc-500 font-medium">
                        ID: #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Author column */}
                  <div className="w-full md:w-1/6 min-w-0">
                    <span className="block text-xs font-medium text-slate-700 dark:text-zinc-200 truncate">
                      {blog.author?.name || 'Studio Editorial'}
                    </span>
                  </div>

                  {/* Read time column */}
                  <div className="w-full md:w-1/6 flex items-center md:justify-center text-xs">
                    <span className="text-slate-500 dark:text-zinc-400 font-normal">
                      {blog.readTime || '5 min read'}
                    </span>
                  </div>

                  {/* Category pill */}
                  <div className="w-full md:w-1/6 flex md:justify-center">
                    <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-medium px-3.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/40 truncate max-w-[160px]">
                      {blog.category || 'Journal'}
                    </span>
                  </div>

                  {/* Status column */}
                  <div className="w-full md:w-1/6 flex items-center md:justify-center text-xs">
                    <span className={`font-semibold ${blog.status === 'published' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>

                {/* Actions */}
                <div className="w-full md:w-1/6 flex items-center justify-end gap-2 shrink-0">
                  <Link
                    to={`/admin/blog/${blog._id}`}
                    className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                    title="View Article Details Page"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/admin/blog/${blog._id}/edit`}
                    className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                    title="Edit Article"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setDeleteId(blog._id)}
                    className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/60 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                    title="Delete Article"
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
        title="DELETE BLOG ARTICLE"
        message="Are you sure you want to delete this article? This action will remove it from the studio journal."
        confirmText={isDeleting ? 'Deleting...' : 'Delete Article'}
        confirmVariant="danger"
      />
    </div>
  );
};

export default AdminBlogListPage;
