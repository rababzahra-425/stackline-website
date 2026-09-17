import React from 'react';
import { Plus } from 'lucide-react';

export const AdminPageHeader = ({
  title,
  subtitle,
  badgeText,
  actionLabel,
  onAction,
  actionIcon: ActionIcon = Plus,
}) => {
  if (!subtitle && !badgeText && !actionLabel && !onAction) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 pb-4 mb-6 border-b border-slate-200/80 dark:border-zinc-800/80 font-open-sans">
      <div className="space-y-1.5 min-w-0">
        {badgeText && (
          <span className="inline-block px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider bg-neutral-950 dark:bg-zinc-800 text-white dark:text-neutral-100 border border-neutral-800 dark:border-zinc-700 shadow-xs shrink-0">
            {badgeText}
          </span>
        )}
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-open-sans font-semibold text-xs transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer shrink-0 w-full sm:w-auto"
        >
          <ActionIcon className="w-4 h-4" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default AdminPageHeader;
