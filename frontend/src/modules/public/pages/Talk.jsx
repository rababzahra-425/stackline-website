import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { inquiriesService } from '../../admin/inquiries/services/inquiriesService';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { SeoHead } from '../../../components/common/SeoHead';

export const TalkPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Website Design',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setLoading(true);
    try {
      await inquiriesService.submit(formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting inquiry form:', err);
      setErrorMsg(err.message || 'Failed to send inquiry message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const services = ['Website Design', 'UI/UX Design', 'Mobile App', 'Full Package'];

  return (
    <PageHeader bgImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop">
      <SeoHead pageKey="talk" />
      <div className="mx-auto max-w-[1550px] px-6 md:px-16 pb-24">

        {/* 1. Top Meta Bar */}
        <div className="flex w-full items-center justify-between font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-12">
          <span>(Get In Touch)</span>
          <span>(01)</span>
        </div>

        {/* 2. Hero Typography Header */}
        <div className="max-w-5xl mb-16 md:mb-20">
          <h1 className="text-7xl sm:text-9xl lg:text-[12.5rem] font-black font-hero-heading uppercase tracking-tight leading-[0.82] select-none mb-8 text-neutral-950 dark:text-white">
            LET'S TALK
          </h1>
          <p className="text-xl sm:text-3xl md:text-5xl font-medium leading-tight text-neutral-800 dark:text-neutral-200 max-w-4xl text-balance">
            Have a project in mind? We'd love to partner with you to build something exceptional.
          </p>
        </div>

        {/* 3. Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 border-t border-neutral-300 dark:border-neutral-800">

          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div className="space-y-12">
              <div>
                <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-3 font-semibold">
                  (Email Us Directly)
                </span>
                <a
                  href="mailto:rababzahra425@gmail.com"
                  className="text-2xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors font-mono"
                >
                  rababzahra425@gmail.com
                </a>
              </div>

              <div>
                <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-3 font-semibold">
                  (Call Us)
                </span>
                <a
                  href="tel:+923104443936"
                  className="text-2xl sm:text-3xl font-mono text-neutral-900 dark:text-neutral-100 font-semibold hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  +92 310 4443936
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-10 border-t border-neutral-300 dark:border-neutral-800 space-y-4">
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block font-semibold">
                (Follow Along)
              </span>
              <div className="flex flex-wrap gap-6 font-mono text-sm md:text-base uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-medium">
                <a href="#instagram" className="hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors">Instagram ↗</a>
                <a href="#twitter" className="hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors">X (Twitter) ↗</a>
                <a href="#linkedin" className="hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors">LinkedIn ↗</a>
                <a href="#github" className="hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors">GitHub ↗</a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#18181b] p-8 sm:p-14 border border-neutral-300/80 dark:border-neutral-800 shadow-md rounded-2xl transition-colors duration-300">
            {submitted ? (
              <div className="py-20 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-4xl font-black uppercase font-hero-heading tracking-tight text-neutral-950 dark:text-white">
                  Message Received
                </h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out! Your inquiry has been submitted to Stackline Studio Admin and emailed to <strong>rababzahra425@gmail.com</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      service: 'Website Design',
                      message: '',
                    });
                  }}
                  className="mt-6 px-6 py-3 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-black font-mono text-xs uppercase font-bold tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">

                {errorMsg && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Service Selection */}
                <div>
                  <label className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-600 dark:text-neutral-400 block mb-4 font-semibold">
                    01. What service do you need?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {services.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setFormData({ ...formData, service: item })}
                        className={`px-6 py-3 rounded-full font-mono text-xs md:text-sm uppercase tracking-wider transition-all duration-200 ${formData.service === item
                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-black font-semibold shadow-md'
                          : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-medium'
                          }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-600 dark:text-neutral-400 block mb-3 font-semibold">
                      02. Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-300 dark:border-neutral-700 rounded-xl px-5 py-4 text-base md:text-lg text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-600 dark:text-neutral-400 block mb-3 font-semibold">
                      03. Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-300 dark:border-neutral-700 rounded-xl px-5 py-4 text-base md:text-lg text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-600 dark:text-neutral-400 block mb-3 font-semibold">
                    04. Project Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us about your goals, timelines, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-300 dark:border-neutral-700 rounded-xl px-5 py-4 text-base md:text-lg text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-neutral-950 text-white dark:bg-white dark:text-black py-5 rounded-xl uppercase font-mono text-sm md:text-base tracking-widest font-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 shadow-md flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <span>Send Message ➔</span>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </PageHeader>
  );
};

export const Talk = TalkPage;
export default TalkPage;
