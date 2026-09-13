import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { projectsService } from '../../admin/projects/services/projectsService';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { SeoHead } from '../../../components/common/SeoHead';

export const WorkPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const data = await projectsService.getAll();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching work projects:', err);
        setErrorMsg('Failed to load portfolio projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <PageHeader bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop">
      <SeoHead pageKey="work" />
      <div className="mx-auto max-w-[1600px] px-6 md:px-16 pb-24">

        {/* 1. Top Meta Bar */}
        <div className="flex w-full items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-500 md:text-sm mb-12">
          <span>(Selected Work)</span>
          <span>(0{projects.length || 1})</span>
        </div>

        {/* 2. Page Typography Header */}
        <div className="max-w-5xl mb-14 md:mb-16">
          <h1 className="font-hero-heading text-[48px] sm:text-[88px] md:text-[110px] lg:text-[140px] uppercase tracking-tight leading-[0.85] select-none mb-8 text-neutral-950 dark:text-white">
            PROJECTS
          </h1>
          <p className="text-xl sm:text-3xl md:text-5xl font-medium leading-tight text-neutral-800 dark:text-neutral-200 max-w-4xl text-balance">
            Explore our recent projects showcasing creativity, innovation, and impactful design solutions.
          </p>
        </div>

        {/* 3. Dynamic Projects List */}
        {loading ? (
          <div className="py-20 text-center text-neutral-500 font-mono text-sm flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-neutral-900 dark:text-white" />
            <span>Loading Studio Projects...</span>
          </div>
        ) : errorMsg ? (
          <div className="py-12 text-center text-rose-500 font-mono text-sm">
            {errorMsg}
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-neutral-300 dark:divide-neutral-800 pt-6">
            {projects.map((item, index) => (
              <Link
                key={item._id || item.slug}
                to={`/work/${item.slug}`}
                className="group py-8 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center cursor-pointer transition-colors"
              >
                {/* Main Image Box (7 Columns) - Added by Admin from Admin Panel */}
                <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden rounded-xl md:rounded-2xl bg-neutral-200 dark:bg-neutral-800">
                  <img
                    src={item.mainImage}
                    alt={item.title}
                    className="h-full w-full object-cover contrast-105 transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Title overlay on image hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-lg select-none font-hero-heading">
                      {item.title}
                    </span>
                  </div>
                </div>

                {/* Project Name & Meta Details (5 Columns) */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">

                  {/* Index, Category & Arrow */}
                  <div className="flex items-center justify-between border-b border-neutral-300/80 dark:border-neutral-800 pb-4">
                    <div className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-500">
                      <span>0{index + 1}</span>
                      <span className="mx-2">/</span>
                      <span>{item.services || 'Branding & Design'}</span>
                    </div>

                    {/* Action Arrow */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black transition-transform duration-300 group-hover:scale-110">
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Project Name & Subtitle */}
                  <div className="my-8 md:my-12">
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-hero-heading uppercase tracking-tight leading-none text-neutral-950 dark:text-white mb-4 group-hover:translate-x-1 transition-transform">
                      {item.title}
                    </h2>
                    {item.headline && (
                      <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-light max-w-lg">
                        {item.headline}
                      </p>
                    )}
                  </div>

                  {/* Year Indicator */}
                  <div className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                    Client ({item.client || 'Studio Client'}) — Year ({item.year || '2024'})
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </PageHeader>
  );
};

export default WorkPage;