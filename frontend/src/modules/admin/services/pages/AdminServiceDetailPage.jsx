import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { servicesService } from '../servicesService';
import { ArrowLeft, Edit3, Trash2, Layers, AlertCircle, Sparkles } from 'lucide-react';

export const AdminServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const data = await servicesService.getAll();
        const found = data.find((s) => s._id === id);
        if (!found) throw new Error('Service not found');
        setService(found);
      } catch (err) {
        setErrorMsg(err.message || 'Failed to load service details');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await servicesService.delete(id);
      navigate('/admin/services');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete service');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-neutral-500 font-mono text-sm">
        Loading service details...
      </div>
    );
  }

  if (errorMsg || !service) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="p-6 rounded-md bg-rose-950/50 border border-rose-800 text-rose-300 text-sm">
          {errorMsg || 'Service not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto pb-16 font-sans">


      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xl font-bold text-neutral-400">
              ({service.serviceId || '01'})
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-sans">
              {service.title}
            </h1>
            <span className="px-2.5 py-1 rounded font-mono text-[11px] uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              {service.tag}
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans max-w-2xl">
            {service.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/admin/services/${service._id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Service</span>
          </Link>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Visual Mockup Preview Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              Visual Mockup Card Preview
            </h2>
            
            <div className="aspect-[4/3] w-full rounded-none bg-neutral-950 p-6 border border-white/10 flex flex-col justify-between text-white shadow-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                {service.tag}
              </span>
              <span className="text-2xl font-black uppercase tracking-tight">
                {service.mockup?.mockupText || service.title + ' Mockup'}
              </span>
              <span className="text-xs font-mono text-neutral-500">Asset Mockup</span>
            </div>

            <div className="space-y-2 pt-2 text-xs font-mono text-neutral-500">
              <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <span>Layout Position:</span>
                <span className="text-neutral-900 dark:text-white">
                  {service.imageLeft ? 'Image Left' : 'Image Right'}
                </span>
              </div>
              <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <span>Featured Status:</span>
                <span className="text-emerald-400 font-bold">
                  {service.isFeatured ? 'Featured' : 'Standard'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deep-dive overview & Sub-services */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Overview Section */}
          <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              Overview Description (Deep Dive Page)
            </h2>
            <p className="text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans font-medium">
              {service.overview || service.subtitle}
            </p>
          </div>

          {/* Sub-services / Offerings Section */}
          <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Detailed Offerings / Sub-Services ({service.items?.length || 0})
              </h2>
            </div>

            {service.items?.length > 0 ? (
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {service.items.map((sub, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-1">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-tight">
                      {idx + 1}. {sub.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                      {sub.desc}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-mono text-neutral-500 italic">
                No sub-services specified for this category yet.
              </p>
            )}
          </div>

        </div>

      </div>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Service"
        message={`Are you sure you want to delete "${service.title}"?`}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminServiceDetailPage;
