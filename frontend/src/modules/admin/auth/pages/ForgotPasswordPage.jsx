import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, KeyRound, Lock, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { forgotPassword, verifyOtp } = useAuth();
  
  const [step, setStep] = useState(1); // Step 1: Send OTP | Step 2: Verify OTP
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Step 1: Send OTP to Admin Email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your admin email address');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setInfoMsg('');

    try {
      const res = await forgotPassword(email);
      setInfoMsg(res.message || 'OTP sent successfully to your email.');
      if (res.otpCode || res.devOtp) {
        setDevOtp(res.otpCode || res.devOtp);
      }
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please check email address.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify OTP & Reset Password
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 6) {
      setError('Please enter the valid 6-digit OTP code');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await verifyOtp(email, otpCode, newPassword);
      setInfoMsg(res.message || 'Password reset successfully!');
      setIsCompleted(true);
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP. Please try again.');
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
          <h1 className="text-base font-bold tracking-tight text-neutral-300">
            {isCompleted ? 'Password Updated' : step === 1 ? 'Forgot Password?' : 'Verify OTP Code'}
          </h1>
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            {step === 1 ? '(Step 1/2: Request Email OTP)' : '(Step 2/2: Confirm 6-Digit Code)'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-md bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Info Banner */}
        {infoMsg && !isCompleted && (
          <div className="space-y-2 p-4 rounded-md bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>{infoMsg}</span>
            </div>
            {devOtp && (
              <div className="pt-2 border-t border-emerald-800/60 font-mono text-xs text-neutral-300">
                <span className="text-neutral-400 uppercase text-[10px] block">Development OTP Preview:</span>
                <span className="text-emerald-400 font-bold tracking-widest text-base">{devOtp}</span>
              </div>
            )}
          </div>
        )}

        {/* Completed View */}
        {isCompleted ? (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-md flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <p className="text-sm text-neutral-300">
              Your password has been reset successfully. You can now log in with your new credentials.
            </p>
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full bg-white text-black hover:bg-neutral-200 font-sans font-bold py-3.5 rounded-md text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99]"
            >
              <span>Back to Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Step 1: Request OTP Form */
          step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="admin@stacklinestudio.com"
                    required
                    className="w-full bg-[#1c1c1f] border border-neutral-800 focus:border-white rounded-md py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-neutral-200 font-sans font-bold py-3.5 rounded-md text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Sending Code...' : 'Send OTP Code'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Step 2: Enter OTP & New Password Form */
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {/* OTP Code */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  6-Digit OTP Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => {
                      setOtpCode(e.target.value.replace(/\D/g, ''));
                      if (error) setError('');
                    }}
                    placeholder="123456"
                    required
                    className="w-full bg-[#1c1c1f] border border-neutral-800 focus:border-white rounded-md py-3 pl-11 pr-4 text-lg font-mono tracking-widest text-white placeholder-neutral-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#1c1c1f] border border-neutral-800 focus:border-white rounded-md py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-neutral-200 font-sans font-bold py-3.5 rounded-md text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Verifying...' : 'Verify OTP & Reset Password'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )
        )}

        {/* Back Link */}
        <div className="pt-4 text-center">
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
