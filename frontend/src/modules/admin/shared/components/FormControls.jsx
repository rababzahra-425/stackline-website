import React from 'react';

export const FormInput = ({ label, error, helperText, className = '', ...props }) => (
  <div className="space-y-1.5 font-sans">
    {label && (
      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
        {label}
      </label>
    )}
    <input
      className={`w-full bg-white dark:bg-[#141417] border border-neutral-300 dark:border-neutral-800/80 focus:border-neutral-950 dark:focus:border-white focus:ring-2 focus:ring-neutral-900/5 dark:focus:ring-white/10 rounded-md py-3 px-4 text-sm text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-all ${className}`}
      {...props}
    />
    {helperText && <p className="text-[10px] font-mono text-neutral-500">{helperText}</p>}
    {error && <p className="text-xs text-rose-500 font-mono">{error}</p>}
  </div>
);

export const FormTextArea = ({ label, error, helperText, rows = 3, className = '', ...props }) => (
  <div className="space-y-1.5 font-sans">
    {label && (
      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
        {label}
      </label>
    )}
    <textarea
      rows={rows}
      className={`w-full bg-white dark:bg-[#141417] border border-neutral-300 dark:border-neutral-800/80 focus:border-neutral-950 dark:focus:border-white focus:ring-2 focus:ring-neutral-900/5 dark:focus:ring-white/10 rounded-md py-3 px-4 text-sm text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-all ${className}`}
      {...props}
    />
    {helperText && <p className="text-[10px] font-mono text-neutral-500">{helperText}</p>}
    {error && <p className="text-xs text-rose-500 font-mono">{error}</p>}
  </div>
);

export const FormToggle = ({ label, checked, onChange, description }) => (
  <div className="flex items-center justify-between p-4 rounded-md border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#141417] transition-all">
    <div className="space-y-0.5">
      <span className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-950 dark:text-white">
        {label}
      </span>
      {description && (
        <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-sans">
          {description}
        </span>
      )}
    </div>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-700'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-md bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);
