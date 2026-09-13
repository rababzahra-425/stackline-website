import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { teamService } from '../../admin/team/services/teamService';
import { Loader2 } from 'lucide-react';
import { SeoHead } from '../../../components/common/SeoHead';

export const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const data = await teamService.getAll();
        // Filter active members only for public display
        setTeamMembers(data.filter((m) => m.isActive !== false));
      } catch (err) {
        console.error('Error fetching team members:', err);
        setErrorMsg('Failed to load team member profiles');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <PageHeader bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop">
      <SeoHead pageKey="about" />
      <div className="mx-auto max-w-[1550px] px-6 md:px-16 pb-24">

        {/* 1. Top Meta Bar */}
        <div className="flex w-full items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 md:text-sm mb-12">
          <span>(About Us)</span>
          <span>(01)</span>
        </div>

        {/* 2. Hero Typography Header */}
        <div className="max-w-5xl mb-16 md:mb-20">
          <h1 className="font-hero-heading text-[48px] sm:text-[88px] md:text-[110px] lg:text-[140px] uppercase tracking-tight leading-[0.85] select-none mb-8 text-neutral-950 dark:text-white">
            ABOUT
          </h1>
          <p className="font-sans text-2xl sm:text-4xl md:text-5xl font-normal leading-tight max-w-4xl text-neutral-800 dark:text-neutral-300 text-balance">
            Learn more about our mission, vision, and the team driving our creative design solutions.
          </p>
        </div>

        {/* 3. Dual Editorial Showcase Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 md:mb-32">
          <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="Studio Workshop"
              className="w-full h-full object-cover grayscale contrast-110"
            />
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
              alt="Creative Strategy Session"
              className="w-full h-full object-cover grayscale contrast-110"
            />
          </div>
        </div>

        {/* 4. Editorial Story Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 border-t border-neutral-300 dark:border-neutral-800 mb-20">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-4">
              (Engineering Philosophy)
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none text-neutral-950 dark:text-white">
              ARCHITECTING EXPERIENCES WITH PRECISION & PURPOSE
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 text-lg sm:text-xl font-normal leading-relaxed text-neutral-700 dark:text-neutral-300">
            <p>
              We believe great software lives at the intersection of intuitive design and uncompromising engineering. It is not just about writing clean lines of code or drawing modern interfaces—it is about crafting scalable digital products that solve real-world problems effortlessly.
            </p>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
              Every project is built from first principles. By combining high-performance architecture with fluid interaction design, we transform complex logic into smooth, responsive experiences that users genuinely love to use.
            </p>
          </div>
        </div>

        {/* 5. Dynamic Team Section Header */}
        <div className="border-t border-neutral-300 dark:border-neutral-800 pt-20">
          <div className="flex w-full items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 md:text-sm mb-14">
            <span>(The Minds Behind)</span>
            <span>(02)</span>
          </div>

          {/* Dynamic Team Cards Grid */}
          {loading ? (
            <div className="py-20 text-center text-neutral-500 font-mono text-sm flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-neutral-900 dark:text-white" />
              <span>Loading Team Member Profiles...</span>
            </div>
          ) : errorMsg ? (
            <div className="py-12 text-center text-rose-500 font-mono text-sm">
              {errorMsg}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {teamMembers.map((member) => {
                const skillsList = member.skills && member.skills.length > 0
                  ? member.skills
                  : ['Framer', 'UI/UX', 'Design'];

                return (
                  <div
                    key={member._id || member.memberId}
                    className="group flex flex-col bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl"
                  >

                    {/* 1. Portrait Image with Action Button */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover grayscale contrast-110 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                      />

                      {/* Top-Right Arrow Action */}
                      <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white dark:bg-white/20 dark:text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-black dark:group-hover:bg-white dark:group-hover:text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-4 w-4 rotate-45 transition-transform duration-300 group-hover:rotate-0"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>

                    {/* 2. Member Header (Name, Year & Title) */}
                    <div className="p-6 sm:p-7 pb-4 bg-white dark:bg-[#18181b]">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 dark:text-white">
                          {member.name}
                        </h3>
                        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
                          {member.year || '(2024)'}
                        </span>
                      </div>

                      <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        {member.role}
                      </p>
                    </div>

                    {/* 3. Scrolling Tech Stack Strip (Marquee) */}
                    <div className="w-full bg-neutral-950 text-neutral-300 dark:bg-neutral-900 dark:text-neutral-200 py-2.5 overflow-hidden border-y border-neutral-800 dark:border-neutral-700 select-none">
                      <div className="animate-marquee whitespace-nowrap flex items-center gap-4">
                        {[...skillsList, ...skillsList].map((skill, idx) => (
                          <span
                            key={idx}
                            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-neutral-300 dark:text-neutral-200"
                          >
                            <span>{skill}</span>
                            <span className="text-neutral-600 dark:text-neutral-500 text-xs">•</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 4. Bio Description & Connect Footer */}
                    <div className="p-6 sm:p-7 pt-5 flex flex-col justify-between flex-grow bg-white dark:bg-[#18181b]">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-light mb-6">
                        {member.bio}
                      </p>

                      <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                        <span>Connect</span>
                        <span className="text-neutral-900 dark:text-neutral-200 font-medium">{member.handle || '@studio'}</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </PageHeader>
  );
};

export default AboutPage;