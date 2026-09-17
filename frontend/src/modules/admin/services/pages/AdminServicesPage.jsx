import React, { useState, useEffect } from 'react';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { Modal } from '../../shared/components/Modal';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { FormInput, FormTextArea, FormToggle } from '../../shared/components/FormControls';
import { servicesService } from '../servicesService';
import {
  Wrench,
  Search,
  Plus,
  Trash2,
  Edit3,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  LayoutList,
} from 'lucide-react';

export const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast / Status state
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete Confirm State
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields State
  const initialForm = {
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
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchServicesData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await servicesService.getAll();
      setServices(data);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicesData();
  }, []);

  const handleOpenAddModal = () => {
    const nextId = String(services.length + 1).padStart(2, '0');
    setEditingService(null);
    setFormData({ ...initialForm, serviceId: nextId });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setFormData({
      serviceId: service.serviceId || '',
      title: service.title || '',
      tag: service.tag || '(Services)',
      subtitle: service.subtitle || '',
      overview: service.overview || '',
      imageLeft: service.imageLeft ?? true,
      bgCard: service.bgCard || 'bg-white dark:bg-[#18181b]',
      mockupText: service.mockup?.mockupText || '',
      mockupImageUrl: service.mockup?.imageUrl || '',
      isFeatured: service.isFeatured ?? true,
      items: service.items ? [...service.items] : [],
    });
    setIsModalOpen(true);
  };

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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      setErrorMsg('Service title is required');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

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
      if (editingService) {
        await servicesService.update(editingService._id, payload);
        setSuccessMsg('Service updated successfully!');
      } else {
        await servicesService.create(payload);
        setSuccessMsg('New service created successfully!');
      }
      setIsModalOpen(false);
      fetchServicesData();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await servicesService.delete(deleteId);
      setSuccessMsg('Service deleted successfully.');
      setDeleteId(null);
      fetchServicesData();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete service');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSubServices = services.reduce((acc, s) => acc + (s.items?.length || 0), 0);

  return (
    <div className="space-y-8 max-w-[1500px] mx-auto pb-12 font-sans">
      {/* 1. PAGE HEADER */}
      <AdminPageHeader
        title="Services Management"
        subtitle="Manage dynamic agency services, sub-services, and homepage sticky showcase cards."
        badgeText="SERVICES MODULE"
        actionLabel="Create Service"
        onAction={handleOpenAddModal}
        actionIcon={Plus}
      />

      {/* Notifications */}
      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-md bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-3 p-4 rounded-md bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-mono tracking-tight text-neutral-950 dark:text-white">
              {services.length}
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500">
              Total Services
            </span>
          </div>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-mono tracking-tight text-neutral-950 dark:text-white">
              {services.filter((s) => s.isFeatured).length}
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500">
              Featured Services
            </span>
          </div>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-md bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-mono tracking-tight text-neutral-950 dark:text-white">
              {totalSubServices}
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500">
              Sub-Services / Offerings
            </span>
          </div>
        </div>
      </div>

      {/* 3. SEARCH BAR & CONTROLS */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services by title or tag..."
            className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md py-2 pl-10 pr-4 text-xs text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
          />
        </div>
      </div>

      {/* 4. SERVICES TABLE */}
      <div className="bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 rounded-md shadow-md dark:shadow-black/40 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-neutral-500 font-mono text-sm">
            Loading services data...
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <LayoutList className="w-8 h-8 text-neutral-400 mx-auto" />
            <p className="text-sm text-neutral-500 font-mono">No services found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto p-4">
            <table className="w-full text-left text-sm border-separate border-spacing-y-2">
              <thead className="bg-neutral-50 dark:bg-[#18181b] font-mono text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="py-3 px-6 rounded-l-xl">DETAILS</th>
                  <th className="py-3 px-6">DESCRIPTION</th>
                  <th className="py-3 px-6">TAG</th>
                  <th className="py-3 px-6">SUB-SERVICES</th>
                  <th className="py-3 px-6">LAYOUT</th>
                  <th className="py-3 px-6 text-right rounded-r-xl">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="font-sans">
                {filteredServices.map((service, index) => (
                  <tr
                    key={service._id}
                    className="bg-neutral-50/70 dark:bg-[#18181c] hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors shadow-xs"
                  >
                    <td className="py-4 px-6 border-y border-l border-neutral-200 dark:border-neutral-800 rounded-l-xl">
                      <span className="block font-bold text-neutral-900 dark:text-white uppercase tracking-tight">
                        {service.title}
                      </span>
                      <span className="block font-mono text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                        ID: #{index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-y border-neutral-200 dark:border-neutral-800">
                      <span className="block text-xs text-neutral-600 dark:text-neutral-300 max-w-xs truncate">
                        {service.subtitle}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-y border-neutral-200 dark:border-neutral-800">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px] text-neutral-700 dark:text-neutral-300">
                        {service.tag}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-neutral-600 dark:text-neutral-300 border-y border-neutral-200 dark:border-neutral-800">
                      {service.items?.length || 0} Items
                    </td>
                    <td className="py-4 px-6 font-mono text-xs border-y border-neutral-200 dark:border-neutral-800">
                      <span className="px-2 py-0.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 text-[10px]">
                        {service.imageLeft ? 'Image Left' : 'Image Right'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right rounded-r-xl border-y border-r border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(service)}
                          className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(service._id)}
                          className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-rose-500/10 text-neutral-700 dark:text-neutral-300 hover:text-rose-500 hover:border-rose-500/30 transition-colors cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. ADD / EDIT SERVICE MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? 'Edit Service' : 'Add New Service'}
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleSubmitForm} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Service ID (e.g. 01, 02)"
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              placeholder="01"
              required
            />
            <FormInput
              label="Service Title (Uppercase)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="BRAND STRATEGY"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Category Tag"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              placeholder="(Branding Services)"
            />
            <FormInput
              label="Mockup Asset Text"
              value={formData.mockupText}
              onChange={(e) => setFormData({ ...formData, mockupText: e.target.value })}
              placeholder="invt. Card (Free PSD)"
            />
          </div>

          <FormTextArea
            label="Subtitle (Shown on Card)"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="Strong & cohesive brand identity to connect with your audience."
            rows={2}
          />

          <FormTextArea
            label="Overview Description (Shown on Deep Dive Page)"
            value={formData.overview}
            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
            placeholder="We create compelling brand identities that resonate with your audience..."
            rows={3}
          />

          {/* Layout Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <FormToggle
              label="Image Position Left"
              checked={formData.imageLeft}
              onChange={(val) => setFormData({ ...formData, imageLeft: val })}
              description="Toggle whether the visual mockup appears on the left or right of the card."
            />
            <FormToggle
              label="Featured Service"
              checked={formData.isFeatured}
              onChange={(val) => setFormData({ ...formData, isFeatured: val })}
              description="Toggle whether this service is featured in homepage sections."
            />
          </div>

          {/* Sub-Services Array Manager */}
          <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-white">
                  Sub-Services / Offerings List ({formData.items.length})
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Add detailed breakdown offerings displayed on the Service detail page.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddSubService}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            {formData.items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#18181b] space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-neutral-400">
                    Offering #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubService(idx)}
                    className="text-xs text-rose-500 hover:underline font-mono"
                  >
                    Remove
                  </button>
                </div>
                <FormInput
                  placeholder="Offering Title (e.g. Brand Discovery & Research)"
                  value={item.title}
                  onChange={(e) => handleUpdateSubService(idx, 'title', e.target.value)}
                />
                <FormTextArea
                  placeholder="Offering Description..."
                  value={item.desc}
                  onChange={(e) => handleUpdateSubService(idx, 'desc', e.target.value)}
                  rows={2}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-md bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </Modal>

      {/* 6. DELETE CONFIRMATION DIALOG */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service? It will no longer be visible on the public website."
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminServicesPage;
