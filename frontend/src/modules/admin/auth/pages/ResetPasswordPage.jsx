import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('Please fill in both password fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Password reset failed or token expired');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0d0e] text-neutral-100 flex items-center justify-center p-6 selection:bg-white selection:text-black">
      <div className="w-full max-w-md space-y-8 bg-[#141416] p-8 sm:p-10 rounded-md border border-neutral-800 shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-md bg-neutral-950 dark:bg-neutral-900 p-2 flex items-center justify-center shadow-md border border-neutral-800 shrink-0">
              <img src="/logo_1.svg" alt="Stackline Studio Logo" className="w-full h-full object-contain invert" />
            </div>
            <Link to="/" className="inline-flex items-center gap-2.5 font-extrabold text-xl sm:text-2xl tracking-tight text-white font-sans">
              <span>STACKLINE STUDIO</span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">ADMIN</span>
            </Link>
          </div>
          <h1 className="text-base font-bold tracking-tight text-neutral-300">Set New Password</h1>
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            (Password Security Renewal)
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-md bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="flex items-center gap-3 p-4 rounded-md bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>Password successfully reset! Redirecting to dashboard...</span>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#1c1c1f] border border-neutral-800 focus:border-white rounded-md py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#1c1c1f] border border-neutral-800 focus:border-white rounded-md py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black hover:bg-neutral-200 font-sans font-bold py-3.5 rounded-md text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              <span>{isSubmitting ? 'Resetting...' : 'Update Password'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default ResetPasswordPage;
