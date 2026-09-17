import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ConfirmDialog } from '../../shared/components/ConfirmDialog';
import { teamService } from '../services/teamService';
import {
  Users,
  Search,
  Plus,
  Trash2,
  Edit3,
  Eye,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  UserCheck,
} from 'lucide-react';

export const AdminTeamListPage = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Delete State
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTeamMembers = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await teamService.getAll();
      setMembers(data);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await teamService.delete(deleteId);
      setSuccessMsg('Team member deleted successfully.');
      setDeleteId(null);
      fetchTeamMembers();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete team member');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.skills && m.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const totalSkillsCount = members.reduce(
    (acc, m) => acc + (m.skills?.length || 0),
    0
  );

  return (
    <div className="space-y-8 max-w-[1500px] mx-auto pb-12 font-sans">
      {/* 1. PAGE HEADER */}
      <AdminPageHeader
        title="Team Members & Profiles"
        subtitle="Manage dynamic team cards, portraits, roles, tech stacks, and social handles displayed on the About page."
        badgeText="TEAM MODULE"
        actionLabel="Add Team Member"
        onAction={() => navigate('/admin/team/new')}
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
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-mono tracking-tight text-neutral-950 dark:text-white">
              {members.length}
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500">
              Total Team Members
            </span>
          </div>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-mono tracking-tight text-neutral-950 dark:text-white">
              {members.filter((m) => m.isActive).length}
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500">
              Active Profiles
            </span>
          </div>
        </div>

        <div className="p-6 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-md bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-mono tracking-tight text-neutral-950 dark:text-white">
              {totalSkillsCount}
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500">
              Total Tagged Skills
            </span>
          </div>
        </div>
      </div>

      {/* 3. SEARCH BAR */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by member name, role, or skills..."
            className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md py-2 pl-10 pr-4 text-xs text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
          />
        </div>
      </div>

      {/* 4. TEAM MEMBERS FLOATING CAPSULE TABLE WRAPPED IN OUTER CARD CONTAINER */}
      <div className="w-full bg-white dark:bg-[#121215] rounded-md p-6 sm:p-8 shadow-md dark:shadow-black/40 border border-slate-200/90 dark:border-zinc-800">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-open-sans text-sm bg-white dark:bg-[#141416] rounded-md border border-slate-200 dark:border-zinc-800">
            Loading team profiles...
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-12 text-center space-y-4 bg-white dark:bg-[#141416] rounded-md border border-slate-200 dark:border-zinc-800">
            <Users className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-500 font-open-sans">No team members found.</p>
            <Link
              to="/admin/team/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create First Member Profile</span>
            </Link>
          </div>
        ) : (
          <div className="w-full space-y-3 font-open-sans">
            {/* Header Box */}
            <div className="hidden md:flex items-center justify-between bg-[#9A989D] dark:bg-[#343338] rounded-none px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white border border-[#88868c]/40 dark:border-[#48464d]/60">
              <div className="w-1/4">DETAILS</div>
              <div className="w-1/5">HANDLE</div>
              <div className="w-1/5 text-center">ROLE</div>
              <div className="w-1/5 text-center">STATUS</div>
              <div className="w-1/5 text-right pr-2">ACTIONS</div>
            </div>

            {/* Floating Rows */}
            <div className="space-y-3">
              {filteredMembers.map((member, index) => (
                <div
                  key={member._id}
                  className="bg-white dark:bg-[#141416] rounded-xl sm:rounded-2xl px-6 py-3.5 shadow-sm hover:shadow-lg dark:shadow-black/30 border border-slate-200/80 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:-translate-y-0.5"
                >
                  {/* Details column: Name + ID directly under name */}
                  <div className="flex items-center gap-3.5 w-full md:w-1/4 min-w-0">
                    <div className="w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold text-sm flex items-center justify-center shrink-0 overflow-hidden">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        member.name ? member.name[0].toUpperCase() : 'M'
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link
                        to={`/admin/team/${member._id}`}
                        className="block font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-sm truncate"
                      >
                        {member.name}
                      </Link>
                      <span className="block font-mono text-xs text-slate-400 dark:text-zinc-500 font-medium">
                        ID: #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Handle column */}
                  <div className="w-full md:w-1/5 min-w-0">
                    <span className="block text-xs font-mono text-slate-600 dark:text-zinc-300 truncate">
                      {member.handle || '@studio'}
                    </span>
                  </div>

                  {/* Role column */}
                  <div className="w-full md:w-1/5 flex md:justify-center">
                    <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-medium px-3.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/40 truncate max-w-[160px]">
                      {member.role || 'Team Member'}
                    </span>
                  </div>

                  {/* Status column */}
                  <div className="w-full md:w-1/5 flex items-center md:justify-center gap-2 text-xs">
                    <span className={`font-semibold ${member.isActive !== false ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                      {member.isActive !== false ? 'Active' : 'Hidden'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="w-full md:w-1/5 flex items-center justify-end gap-2 shrink-0">
                    <Link
                      to={`/admin/team/${member._id}`}
                      className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                      title="View Member Details Page"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/admin/team/${member._id}/edit`}
                      className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                      title="Edit Profile"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(member._id)}
                      className="w-8 h-8 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/60 text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
                      title="Delete Profile"
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

      {/* 5. DELETE CONFIRMATION DIALOG */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Team Member Profile"
        message="Are you sure you want to delete this team member? This will remove their profile card from the website About page."
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminTeamListPage;
