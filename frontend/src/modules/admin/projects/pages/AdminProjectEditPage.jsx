import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ImageUploader } from '../../shared/components/ImageUploader';
import { projectsService } from '../services/projectsService';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  AlertCircle,
  FolderKanban,
  Sparkles,
  Layers,
} from 'lucide-react';

export const AdminProjectEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    headline: '',
    client: '',
    year: '',
    services: '',
    storyTitle: '',
    storyDescription: '',
    mainImage: '',
    heroImage: '',
    galleryImages: [''],
    isFeatured: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const data = await projectsService.getByIdOrSlug(id);
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          headline: data.headline || '',
          client: data.client || '',
          year: data.year || '',
          services: data.services || '',
          storyTitle: data.storyTitle || '',
          storyDescription: data.storyDescription || '',
          mainImage: data.mainImage || '',
          heroImage: data.heroImage || '',
          galleryImages:
            data.galleryImages && data.galleryImages.length > 0
              ? data.galleryImages
              : [''],
          isFeatured: data.isFeatured ?? true,
        });
      } catch (err) {
        setErrorMsg(err.message || 'Failed to load project for editing.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddGalleryImage = () => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ''],
    }));
  };

  const handleGalleryImageChange = (index, url) => {
    const updated = [...formData.galleryImages];
    updated[index] = url;
    setFormData((prev) => ({ ...prev, galleryImages: updated }));
  };

  const handleRemoveGalleryImage = (index) => {
    const updated = formData.galleryImages.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, galleryImages: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.title.trim()) {
      setErrorMsg('Project title is required.');
      return;
    }

    if (!formData.mainImage.trim()) {
      setErrorMsg('Main Image is required for the Work page listing card.');
      return;
    }

    setSaving(true);
    try {
      const cleanedGallery = formData.galleryImages.filter((img) => img.trim() !== '');

      const payload = {
        ...formData,
        galleryImages: cleanedGallery,
      };

      await projectsService.update(id, payload);
      navigate(`/admin/projects/${id}`);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update project.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-neutral-500 font-mono text-sm max-w-[1300px] mx-auto">
        Loading project editor...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1300px] mx-auto pb-16 font-sans">


      <AdminPageHeader
        title={`Edit Project: ${formData.title}`}
        subtitle="Update project details, main card image, hero banner, story description, and showcase gallery."
        badgeText="EDIT MODE"
      />

      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-md bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* EDIT FORM */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. BASIC INFORMATION & MAIN IMAGE */}
        <div className="p-8 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <FolderKanban className="w-5 h-5 text-neutral-400" />
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white uppercase tracking-tight">
              1. Work Page Listing (Name & Main Image)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                Project Name / Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. KANBA"
                className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white font-mono uppercase tracking-wider transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                Headline / Subtitle
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => handleChange('headline', e.target.value)}
                placeholder="e.g. We delivered a sleek Framer development project."
                className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                Client Name
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => handleChange('client', e.target.value)}
                placeholder="e.g. Kanba"
                className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                Year
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                placeholder="e.g. 2024"
                className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white font-mono transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                Services Provided
              </label>
              <input
                type="text"
                value={formData.services}
                onChange={(e) => handleChange('services', e.target.value)}
                placeholder="e.g. Branding, Website"
                className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
              />
            </div>
          </div>

          {/* MAIN IMAGE UPLOADER */}
          <div className="pt-2">
            <ImageUploader
              label="Main Image * (Displayed on Work page card)"
              value={formData.mainImage}
              onChange={(url) => handleChange('mainImage', url)}
              helperText="This image is displayed as the primary thumbnail card on the main /work page."
            />
          </div>
        </div>

        {/* 2. PROJECT DETAIL & STORY CONTENT */}
        <div className="p-8 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <Sparkles className="w-5 h-5 text-neutral-400" />
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white uppercase tracking-tight">
              2. Story & Hero Section (Detail Page Layout)
            </h3>
          </div>

          <div>
            <ImageUploader
              label="Hero Banner Image (Full-Width Header Cover)"
              value={formData.heroImage}
              onChange={(url) => handleChange('heroImage', url)}
              helperText="Large full-width image shown right under project title meta bar on detail page."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                Story Section Heading
              </label>
              <input
                type="text"
                value={formData.storyTitle}
                onChange={(e) => handleChange('storyTitle', e.target.value)}
                placeholder="e.g. SLEEK WEBSITE"
                className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white font-mono uppercase tracking-wider transition-colors"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer pt-6">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => handleChange('isFeatured', e.target.checked)}
                  className="w-5 h-5 rounded border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:ring-0 cursor-pointer"
                />
                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                  Mark as Featured Showcase Project
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
              Story Description (Paragraphs / Case Study Narrative)
            </label>
            <textarea
              rows={6}
              value={formData.storyDescription}
              onChange={(e) => handleChange('storyDescription', e.target.value)}
              placeholder="Enter comprehensive narrative about the project, design approach, and results..."
              className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md p-4 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
            />
          </div>
        </div>

        {/* 3. SHOWCASE GALLERY IMAGES */}
        <div className="p-8 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-neutral-400" />
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white uppercase tracking-tight">
                3. Gallery Showcase Images (5 Image Layout)
              </h3>
            </div>
            <button
              type="button"
              onClick={handleAddGalleryImage}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-mono uppercase font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Gallery Image</span>
            </button>
          </div>

          <div className="space-y-6">
            {formData.galleryImages.map((imgUrl, index) => (
              <div
                key={index}
                className="p-4 rounded-md bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-200 dark:border-neutral-800 relative space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-neutral-500">
                    Gallery Asset #{index + 1}
                  </span>
                  {formData.galleryImages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(index)}
                      className="p-1.5 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors"
                      title="Remove image slot"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <ImageUploader
                  label={`Gallery Image ${index + 1}`}
                  value={imgUrl}
                  onChange={(url) => handleGalleryImageChange(index, url)}
                  helperText={`Showcase image #${index + 1} for project detail page.`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            to={`/admin/projects/${id}`}
            className="px-6 py-3 rounded-md border border-neutral-300 dark:border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-neutral-950 dark:bg-white text-white dark:text-black text-xs font-mono uppercase tracking-wider font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save & Update Project'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProjectEditPage;
