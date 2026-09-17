import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminPageHeader } from '../../shared/components/AdminPageHeader';
import { ImageUploader } from '../../shared/components/ImageUploader';
import { teamService } from '../services/teamService';
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  AlertCircle,
  Users,
  Sparkles,
} from 'lucide-react';

export const AdminTeamCreatePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    handle: '@',
    year: `(${new Date().getFullYear()})`,
    image: '',
    bio: '',
    skills: ['Framer', 'UI/UX', 'Design Systems'],
    order: 0,
    isActive: true,
  });

  const [skillInput, setSkillInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    if (formData.skills.includes(skillInput.trim())) {
      setSkillInput('');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, skillInput.trim()],
    }));
    setSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Member name is required.');
      return;
    }
    if (!formData.role.trim()) {
      setErrorMsg('Member role / title is required.');
      return;
    }
    if (!formData.image.trim()) {
      setErrorMsg('Portrait photo is required.');
      return;
    }

    setSaving(true);
    try {
      await teamService.create(formData);
      navigate('/admin/team');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create team member.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-[1300px] mx-auto pb-16 font-sans">


      <AdminPageHeader
        title="Add Team Member Profile"
        subtitle="Create member portrait card, title, social handle, biography, and scrolling tech stack skills."
        badgeText="CREATE MEMBER"
      />

      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-md bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. BASIC MEMBER INFO */}
        <div className="p-8 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <Users className="w-5 h-5 text-neutral-400" />
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white uppercase tracking-tight">
              1. General Profile Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                Member Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Alexander Cole"
                className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white font-mono uppercase tracking-wider transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                Role & Position Title *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                placeholder="e.g. Creative Director & Founder"
                className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                Social Handle / Connect
              </label>
              <input
                type="text"
                value={formData.handle}
                onChange={(e) => handleChange('handle', e.target.value)}
                placeholder="e.g. @alexander"
                className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white font-mono transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                Join Year Tag
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                placeholder="e.g. (2021)"
                className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md px-4 py-3 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white font-mono transition-colors"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer pt-6">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleChange('isActive', e.target.checked)}
                  className="w-5 h-5 rounded border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:ring-0 cursor-pointer"
                />
                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                  Active (Display on Website)
                </span>
              </label>
            </div>
          </div>

          {/* PORTRAIT IMAGE UPLOADER */}
          <div className="pt-2">
            <ImageUploader
              label="Portrait / Member Image *"
              value={formData.image}
              onChange={(url) => handleChange('image', url)}
              helperText="Upload vertical portrait photo (aspect ratio 4:5 recommended)."
            />
          </div>
        </div>

        {/* 2. BIO & SKILLS TECH STACK */}
        <div className="p-8 rounded-md bg-white dark:bg-[#141416] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <Sparkles className="w-5 h-5 text-neutral-400" />
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white uppercase tracking-tight">
              2. Biography & Tech Stack Skills
            </h3>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
              Member Bio Description
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="Enter background experience, specialization, and design/technical leadership narrative..."
              className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md p-4 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-colors"
            />
          </div>

          {/* SKILLS TAG INPUT */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
              Skills & Tech Stack Tags (Scrolling Card Marquee)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Type skill tag (e.g. Framer, Figma, React) and press Add..."
                className="flex-1 bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 rounded-md px-4 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddSkill(e);
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2.5 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-mono uppercase font-bold"
              >
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {formData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-mono text-xs text-neutral-800 dark:text-neutral-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-neutral-400 hover:text-rose-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            to="/admin/team"
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
            <span>{saving ? 'Creating Profile...' : 'Save & Create Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTeamCreatePage;
