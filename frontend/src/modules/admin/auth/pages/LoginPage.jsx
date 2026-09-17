import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, googleAuth } = useAuth();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      // Simulated Google OAuth login flow (wiring with @react-oauth/google in production)
      await googleAuth({
        googleId: 'google_oauth_123456789',
        email: 'admin@stacklinestudio.com',
        name: 'Stackline Admin',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      });
      navigate('/admin');
    } catch (err) {
      setError('Google Sign-In failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0d0e] text-neutral-100 flex items-center justify-center p-6 selection:bg-white selection:text-black">
      <div className="w-full max-w-md space-y-8 bg-[#141416] p-8 sm:p-10 rounded-md border border-neutral-800 shadow-2xl">
        
        {/* Header Branding */}
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
          <h1 className="text-base font-bold tracking-tight text-neutral-300">Welcome Back</h1>
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            (Sign in to control center)
          </p>
        </div>

        {/* Error Alert Banner */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-md bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@stacklinestudio.com"
                required
                className="w-full bg-[#1c1c1f] border border-neutral-800 focus:border-white rounded-md py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                Password
              </label>
              <Link
                to="/admin/forgot-password"
                className="text-xs font-sans text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-[#1c1c1f] border border-neutral-800 focus:border-white rounded-md py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black hover:bg-neutral-200 font-sans font-bold py-3.5 rounded-md text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="w-full border-t border-neutral-800" />
          <span className="absolute bg-[#141416] px-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            Or
          </span>
        </div>

        {/* Continue with Google Social Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className="w-full bg-[#1c1c1f] hover:bg-[#252529] border border-neutral-800 text-white font-sans text-sm font-medium py-3 rounded-md flex items-center justify-center gap-3 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 22.3 12 23z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Security Note */}
        <div className="pt-2 text-center text-xs text-neutral-500 font-mono">
          <span>🔒 Restricted Access • Authorised Studio Admins Only</span>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
