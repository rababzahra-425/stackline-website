import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { inquiriesService } from '../services/inquiriesService';
import {
  ArrowLeft,
  Trash2,
  AlertCircle,
  Mail,
  CheckCircle2,
  Send,
  User,
  DollarSign,
  Tag,
  Clock,
  ShieldAlert,
} from 'lucide-react';

export const AdminInquiryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Delete State
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchInquiry = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const data = await inquiriesService.getById(id);
        setInquiry(data);
      } catch (err) {
        setErrorMsg(err.message || 'Inquiry lead not found');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      const updated = await inquiriesService.updateStatus(inquiry._id, newStatus);
      setInquiry(updated);
      setSuccessMsg(`Status updated to ${newStatus}`);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update status');
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await inquiriesService.delete(inquiry._id);
      navigate('/admin/inquiries');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete inquiry');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-neutral-500 font-mono text-sm max-w-[1300px] mx-auto">
        Loading inquiry lead inspector...
      </div>
    );
  }

  if (errorMsg || !inquiry) {
    return (
      <div className="space-y-6 max-w-[1300px] mx-auto pb-12 font-sans">
        <div className="p-6 rounded-md bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg || 'Inquiry lead not found'}</span>
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
            href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
              `Re: ${inquiry.service} Inquiry - KAJO Studio`
            )}`}
            onClick={() => handleStatusChange('replied')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-mono font-bold uppercase transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Reply via Email</span>
          </a>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-mono uppercase font-bold transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Lead</span>
          </button>
        </div>
      </div>

      <AdminPageHeader
        title={`Lead Submission: ${inquiry.name}`}
        subtitle={`Submitted on ${new Date(inquiry.createdAt).toLocaleString()}`}
        badgeText={`STATUS: ${inquiry.status.toUpperCase()}`}
      />

      {/* STATUS MESSAGES */}
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

      {/* 1. EMAIL NOTIFICATION ALERT CARD */}
      <div className="p-4 rounded-md bg-indigo-950/30 border border-indigo-800/50 text-indigo-200 text-xs font-mono flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            Admin Email Dispatch: <strong>rababzahra425@gmail.com</strong>
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          {inquiry.emailSentStatus ? 'Notification Sent ✅' : 'Recorded in DB ✅'}
        </span>
      </div>

      {/* 2. CLIENT SUBMISSION METADATA CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-neutral-400">
            <User className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-wider">Client Name</span>
          </div>
          <span className="block text-lg font-bold text-neutral-900 dark:text-white">
            {inquiry.name}
          </span>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-neutral-400">
            <Mail className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-wider">Email Address</span>
          </div>
          <a
            href={`mailto:${inquiry.email}`}
            className="block text-base font-bold text-indigo-400 hover:underline truncate"
          >
            {inquiry.email}
          </a>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-neutral-400">
            <Tag className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-wider">Requested Service</span>
          </div>
          <span className="block text-lg font-bold text-neutral-900 dark:text-white font-mono">
            {inquiry.service}
          </span>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-neutral-400">
            <DollarSign className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-wider">Budget Range</span>
          </div>
          <span className="block text-lg font-bold text-neutral-900 dark:text-white font-mono">
            {inquiry.budget}
          </span>
        </div>
      </div>

      {/* 3. STATUS UPDATE CONTROLLER */}
      <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            Update Inquiry Lead Status
          </span>
          <span className="text-xs text-neutral-400 font-mono">
            Current status: <strong className="text-white uppercase">{inquiry.status}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {['new', 'read', 'replied', 'archived'].map((st) => (
            <button
              key={st}
              onClick={() => handleStatusChange(st)}
              className={`px-3.5 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider transition-colors ${
                inquiry.status === st
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-black font-bold shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 4. FULL CLIENT MESSAGE CONTENT */}
      <div className="p-8 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold border-b border-neutral-200 dark:border-neutral-800 pb-3">
          Submitted Message / Project Scope
        </span>
        <div className="p-6 rounded-md bg-neutral-50 dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-base leading-relaxed whitespace-pre-line font-sans">
          {inquiry.message}
        </div>
      </div>

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Client Inquiry"
        message={`Are you sure you want to delete inquiry from "${inquiry.name}"?`}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminInquiryDetailPage;
