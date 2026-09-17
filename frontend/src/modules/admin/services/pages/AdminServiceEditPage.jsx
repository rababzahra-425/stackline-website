import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { FormInput, FormTextArea, FormToggle } from '../../shared/components/FormControls';
import { ImageUploader } from '../../shared/components/ImageUploader';
import { servicesService } from '../servicesService';
import { ArrowLeft, Save, Plus, Trash2, AlertCircle } from 'lucide-react';

export const AdminServiceEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
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
    items: [],
  });

  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const data = await servicesService.getAll();
        const found = data.find((s) => s._id === id);
        if (!found) throw new Error('Service not found');

        setFormData({
          serviceId: found.serviceId || '',
          title: found.title || '',
          tag: found.tag || '(Services)',
          subtitle: found.subtitle || '',
          overview: found.overview || '',
          imageLeft: found.imageLeft ?? true,
          bgCard: found.bgCard || 'bg-white dark:bg-[#18181b]',
          mockupText: found.mockup?.mockupText || '',
          mockupImageUrl: found.mockup?.imageUrl || '',
          isFeatured: found.isFeatured ?? true,
          items: found.items ? [...found.items] : [],
        });
      } catch (err) {
        setErrorMsg(err.message || 'Failed to load service data for editing');
      } finally {
        setLoading(false);
      }
    };
    fetchServiceData();
  }, [id]);

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
      await servicesService.update(id, payload);
      navigate(`/admin/services/${id}`);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update service');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-neutral-500 font-mono text-sm">
        Loading service for editing...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto pb-16 font-sans">


      {/* Page Header */}
      <AdminPageHeader
        title={`Edit Service: ${formData.title}`}
        subtitle="Modify service properties, descriptions, visual layout, and sub-services."
        badgeText="EDIT SERVICE"
      />

      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-md bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Basic Identifiers */}
        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 space-y-6">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider font-sans text-neutral-900 dark:text-white">
              1. General Identifiers & Visual Assets
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              label="Service ID (e.g. 01, 02)"
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              placeholder="01"
            />
            <FormInput
              label="Service Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="BRAND STRATEGY"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              label="Category Tag"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              placeholder="(Branding Services)"
            />
            <FormInput
              label="Mockup Label Text"
              value={formData.mockupText}
              onChange={(e) => setFormData({ ...formData, mockupText: e.target.value })}
              placeholder="invt. Card (Free PSD)"
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

        {/* Section 2: Descriptions & Overview */}
        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 space-y-6">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider font-sans text-neutral-900 dark:text-white">
              2. Descriptions & Overview
            </h2>
          </div>

          <FormTextArea
            label="Card Subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="Strong & cohesive brand identity to connect with your audience."
            rows={2}
          />

          <FormTextArea
            label="Service Overview Description"
            value={formData.overview}
            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
            placeholder="We create compelling brand identities that resonate with your audience..."
            rows={4}
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
              description="Places visual mockup box on left side."
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
                  placeholder="e.g. Brand Discovery & Research"
                  value={item.title}
                  onChange={(e) => handleUpdateSubService(idx, 'title', e.target.value)}
                />
                <FormTextArea
                  label="Offering Description"
                  placeholder="In-depth brand discovery and research..."
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
            to={`/admin/services/${id}`}
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
            <span>{isSubmitting ? 'Saving Changes...' : 'Save Changes'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminServiceEditPage;
