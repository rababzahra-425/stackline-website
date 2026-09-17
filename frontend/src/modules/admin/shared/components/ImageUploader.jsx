import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, X, Loader2, Check } from 'lucide-react';

export const ImageUploader = ({
  label = 'Image / Asset',
  value = '',
  onChange,
  helperText = 'Upload an image file (JPG, PNG, WEBP, SVG) or paste a direct image URL.',
}) => {
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    const token = localStorage.getItem('kajo_token');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Image upload failed');
      }

      onChange(data.url);
    } catch (err) {
      setError(err.message || 'Upload error. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClear = () => {
    onChange('');
    setError('');
  };

  return (
    <div className="space-y-2 font-sans">
      {/* Header & Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
          {label}
        </label>
        <div className="flex items-center gap-1 p-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-colors ${
              mode === 'upload'
                ? 'bg-white dark:bg-[#141416] text-neutral-900 dark:text-white font-bold shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-colors ${
              mode === 'url'
                ? 'bg-white dark:bg-[#141416] text-neutral-900 dark:text-white font-bold shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Paste URL
          </button>
        </div>
      </div>

      {/* Main Upload / Input Area */}
      {value ? (
        /* Image Preview View */
        <div className="relative group rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-950 p-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-md bg-neutral-900 overflow-hidden shrink-0 border border-neutral-800 flex items-center justify-center">
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Attached Image
              </span>
              <span className="block text-[11px] font-mono text-neutral-400 truncate max-w-xs sm:max-w-md">
                {value}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="p-2 rounded-md bg-neutral-800 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors shrink-0 cursor-pointer"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : mode === 'upload' ? (
        /* Drag & Drop File Upload Box */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group relative border-2 border-dashed border-neutral-300 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-md p-6 text-center bg-neutral-50 dark:bg-[#1c1c1f] transition-all cursor-pointer"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="space-y-2">
            {isUploading ? (
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-neutral-400">
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Uploading image file...</span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold font-sans text-neutral-900 dark:text-white">
                    Click to select an image file
                  </span>
                  <span className="block text-[11px] font-mono text-neutral-500 mt-0.5">
                    Supports JPG, PNG, WEBP, SVG (Max 10MB)
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Direct Image URL Input Box */
        <div className="relative">
          <LinkIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/photo-1600132806370..."
            className="w-full bg-neutral-50 dark:bg-[#1c1c1f] border border-neutral-300 dark:border-neutral-800 focus:border-neutral-950 dark:focus:border-white rounded-md py-2.5 pl-10 pr-4 text-xs text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none transition-colors"
          />
        </div>
      )}

      {error && <p className="text-xs text-rose-500">{error}</p>}
      {helperText && !error && <p className="text-[10px] font-mono text-neutral-500">{helperText}</p>}
    </div>
  );
};

export default ImageUploader;
