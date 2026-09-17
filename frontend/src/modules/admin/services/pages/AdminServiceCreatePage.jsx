import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { FormInput, FormTextArea, FormToggle } from '../../shared/components/FormControls';
import { ImageUploader } from '../../shared/components/ImageUploader';
import { servicesService } from '../servicesService';
import { ArrowLeft, Save, Plus, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminServiceCreatePage = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    serviceId: '',
    title: '',
    tag: '(Services)',
    subtitle: '',
    overview: '',
    imageLeft: true,
    bgCard: 'bg-white dark:bg-[#18181b]',
    mockupText: '',
    mockupImageUrl: '',
    isFeatured: true,
    items: [
      { title: '', desc: '' },
    ],
  });

  // Sub-services Dynamic Item Manager
  const handleAddSubService = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { title: '', desc: '' }],
    }));
  };

  const handleUpdateSubService = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.items];
      updated[index][field] = value;
      return { ...prev, items: updated };
    });
  };

  const handleRemoveSubService = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      setErrorMsg('Service title is required');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const payload = {
      serviceId: formData.serviceId,
      title: formData.title,
      tag: formData.tag,
      subtitle: formData.subtitle,
      overview: formData.overview,
      imageLeft: formData.imageLeft,
      bgCard: formData.bgCard,
      mockup: {
        mockupText: formData.mockupText,
        imageUrl: formData.mockupImageUrl,
      },
      isFeatured: formData.isFeatured,
      items: formData.items.filter((item) => item.title.trim() !== ''),
    };

    try {
      await servicesService.create(payload);
      navigate('/admin/services');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create service');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto pb-16 font-sans">


      {/* Page Header */}
      <AdminPageHeader
        title="Create New Service"
        subtitle="Add a new agency service offering to display on your studio website."
        badgeText="NEW SERVICE"
      />

      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-md bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Full-Page Form Container */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Basic Identifiers */}
        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 space-y-6">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider font-sans text-neutral-900 dark:text-white">
              1. General Identifiers & Visual Assets
            </h2>
            <p className="text-xs text-neutral-500 font-mono">
              Basic identification settings for cards, images, and navigation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              label="Service ID (e.g. 01, 02, 04)"
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              placeholder="04"
              helperText="Determines card number prefix on homepage sticky cards."
            />
            <FormInput
              label="Service Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="MOTION & 3D DESIGN"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              label="Category Tag"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              placeholder="(Motion & 3D)"
              helperText="Small badge label e.g., (Branding Services), (Web Development)."
            />
            <FormInput
              label="Mockup Label Text"
              value={formData.mockupText}
              onChange={(e) => setFormData({ ...formData, mockupText: e.target.value })}
              placeholder="3D Product Render"
              helperText="Label text displayed inside visual card asset box."
            />
          </div>

          {/* Image Uploader Component */}
          <div className="pt-2">
            <ImageUploader
              label="Visual Mockup Image / Asset"
              value={formData.mockupImageUrl}
              onChange={(url) => setFormData({ ...formData, mockupImageUrl: url })}
              helperText="Upload an image file from your computer or paste a direct image URL."
            />
          </div>
        </div>

        {/* Section 2: Content & Descriptions */}
        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 space-y-6">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider font-sans text-neutral-900 dark:text-white">
              2. Descriptions & Overview
            </h2>
            <p className="text-xs text-neutral-500 font-mono">
              High impact copy displayed on homepage cards and detailed service pages.
            </p>
          </div>

          <FormTextArea
            label="Card Subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="Dynamic 3D & 2D motion graphics to bring your brand to life."
            rows={2}
            helperText="Short 1-2 sentence tagline shown on sticky service cards."
          />

          <FormTextArea
            label="Service Overview Description"
            value={formData.overview}
            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
            placeholder="We craft immersive 3D experiences, product animations, and interactive motion systems..."
            rows={4}
            helperText="Detailed overview paragraph shown on the deep-dive service page."
          />
        </div>

        {/* Section 3: Layout & Toggles */}
        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 space-y-6">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider font-sans text-neutral-900 dark:text-white">
              3. Visual Layout Configuration
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormToggle
              label="Image Position Left"
              checked={formData.imageLeft}
              onChange={(val) => setFormData({ ...formData, imageLeft: val })}
              description="Places visual mockup box on left side (Default: Left)."
            />
            <FormToggle
              label="Featured Service"
              checked={formData.isFeatured}
              onChange={(val) => setFormData({ ...formData, isFeatured: val })}
              description="Includes service in homepage sticky stack."
            />
          </div>
        </div>

        {/* Section 4: Dynamic Sub-Services Items */}
        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider font-sans text-neutral-900 dark:text-white">
                4. Sub-Services / Detailed Offerings ({formData.items.length})
              </h2>
              <p className="text-xs text-neutral-500 font-mono">
                Individual service offerings listed on the detail page.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddSubService}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Offering Item</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.items.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1c1c1f] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400">
                    Offering #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubService(idx)}
                    className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-400 font-mono"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Item</span>
                  </button>
                </div>
                <FormInput
                  label="Offering Title"
                  placeholder="e.g. 3D Product Rendering"
                  value={item.title}
                  onChange={(e) => handleUpdateSubService(idx, 'title', e.target.value)}
                />
                <FormTextArea
                  label="Offering Description"
                  placeholder="Photorealistic 3D product visuals and animation..."
                  value={item.desc}
                  onChange={(e) => handleUpdateSubService(idx, 'desc', e.target.value)}
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            to="/admin/services"
            className="px-6 py-3 rounded-md border border-neutral-300 dark:border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Saving Service...' : 'Save & Publish Service'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminServiceCreatePage;
