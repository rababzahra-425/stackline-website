import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { projectsService } from '../services/projectsService';
import {
  ArrowLeft,
  Edit3,
  Trash2,
  AlertCircle,
  FolderKanban,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';

export const AdminProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Delete State
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const data = await projectsService.getByIdOrSlug(id);
        setProject(data);
      } catch (err) {
        setErrorMsg(err.message || 'Project not found');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await projectsService.delete(project._id);
      navigate('/admin/projects');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete project');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-neutral-500 font-mono text-sm max-w-[1300px] mx-auto">
        Loading project details...
      </div>
    );
  }

  if (errorMsg || !project) {
    return (
      <div className="space-y-6 max-w-[1300px] mx-auto pb-12 font-sans">
        <div className="p-6 rounded-md bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg || 'Project not found'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1300px] mx-auto pb-16 font-sans">
      {/* NAVIGATION BAR */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          <a
            href={`/work/${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Page</span>
          </a>

          <Link
            to={`/admin/projects/${project._id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-mono font-bold uppercase transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Project</span>
          </Link>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-mono uppercase font-bold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <AdminPageHeader
        title={project.title}
        subtitle={project.headline || 'Portfolio Project Overview & Showcase Assets'}
        badgeText={`ID: ${project.slug.toUpperCase()}`}
      />

      {/* 1. PROJECT METADATA SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500">
            Client
          </span>
          <span className="block text-lg font-bold text-neutral-900 dark:text-white">
            {project.client}
          </span>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500">
            Year
          </span>
          <span className="block text-lg font-bold text-neutral-900 dark:text-white font-mono">
            {project.year}
          </span>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500">
            Services
          </span>
          <span className="block text-lg font-bold text-neutral-900 dark:text-white">
            {project.services}
          </span>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500">
            Status
          </span>
          <span className="inline-block px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
            {project.isFeatured ? 'Featured Showcase' : 'Active Portfolio'}
          </span>
        </div>
      </div>

      {/* 2. MAIN CARD IMAGE & HERO BANNER PREVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            Main Image (Work Listing Card)
          </span>
          <div className="w-full aspect-[16/10] rounded-md bg-neutral-950 overflow-hidden border border-neutral-800">
            <img
              src={project.mainImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            Hero Cover Banner (Detail Page Header)
          </span>
          <div className="w-full aspect-[16/10] rounded-md bg-neutral-950 overflow-hidden border border-neutral-800">
            <img
              src={project.heroImage || project.mainImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 3. STORY CONTENT */}
      <div className="p-8 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
          Story Section Title & Description
        </span>
        <h3 className="text-2xl font-black uppercase text-neutral-900 dark:text-white font-mono">
          {project.storyTitle || 'SLEEK WEBSITE'}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
          {project.storyDescription}
        </p>
      </div>

      {/* 4. GALLERY SHOWCASE PREVIEW */}
      <div className="p-8 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            Showcase Gallery ({project.galleryImages?.length || 0} Assets)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {project.galleryImages?.map((url, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] rounded-md bg-neutral-950 border border-neutral-800 overflow-hidden"
            >
              <img
                src={url}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/70 text-white font-mono text-[10px]">
                #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${project.title}"? This cannot be undone.`}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminProjectDetailPage;
