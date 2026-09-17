import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { teamService } from '../services/teamService';
import {
  ArrowLeft,
  Edit3,
  Trash2,
  AlertCircle,
  Users,
  ExternalLink,
} from 'lucide-react';

export const AdminTeamDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Delete State
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const data = await teamService.getById(id);
        setMember(data);
      } catch (err) {
        setErrorMsg(err.message || 'Team member not found');
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await teamService.delete(member._id);
      navigate('/admin/team');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete team member');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-neutral-500 font-mono text-sm max-w-[1300px] mx-auto">
        Loading member profile inspector...
      </div>
    );
  }

  if (errorMsg || !member) {
    return (
      <div className="space-y-6 max-w-[1300px] mx-auto pb-12 font-sans">
        <div className="p-6 rounded-md bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg || 'Team member not found'}</span>
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
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View About Page</span>
          </a>

          <Link
            to={`/admin/team/${member._id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-mono font-bold uppercase transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </Link>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-mono uppercase font-bold transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <AdminPageHeader
        title={member.name}
        subtitle={member.role}
        badgeText={`ID: ${member.memberId}`}
      />

      {/* LIVE FRONTEND CARD PREVIEW */}
      <div className="p-8 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
        <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
          Live Frontend About Page Card Preview
        </span>

        <div className="max-w-md mx-auto group flex flex-col bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-neutral-800 overflow-hidden shadow-md rounded-md">
          {/* 1. Portrait Image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* 2. Header */}
          <div className="p-6 pb-4">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-950 dark:text-white">
                {member.name}
              </h3>
              <span className="font-mono text-xs text-neutral-400">
                {member.year || '(2024)'}
              </span>
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
              {member.role}
            </p>
          </div>

          {/* 3. Skills Bar */}
          <div className="w-full bg-neutral-950 text-neutral-300 dark:bg-neutral-900 py-2.5 px-4 overflow-hidden border-y border-neutral-800">
            <div className="flex flex-wrap gap-2">
              {member.skills?.map((skill, idx) => (
                <span key={idx} className="font-mono text-[10px] uppercase text-neutral-300">
                  • {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Bio & Social */}
          <div className="p-6 pt-4 space-y-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {member.bio}
            </p>
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono uppercase text-neutral-400">
              <span>Connect</span>
              <span className="text-neutral-900 dark:text-white font-medium">{member.handle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Team Profile"
        message={`Are you sure you want to delete profile for "${member.name}"?`}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminTeamDetailPage;
