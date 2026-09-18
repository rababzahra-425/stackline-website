import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { projectsService } from '../../admin/projects/services/projectsService';
import { ArrowLeft, ArrowUpRight, Loader2 } from 'lucide-react';

export const WorkDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProjectDetail = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const data = await projectsService.getByIdOrSlug(slug);
        setProject(data);
      } catch (err) {
        console.error('Error loading project detail:', err);
        setErrorMsg(err.message || 'Project not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#0a0a0b] flex flex-col items-center justify-center text-neutral-500 font-mono text-sm">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-neutral-900 dark:text-white" />
        <span>Loading Project Details...</span>
      </div>
    );
  }

  if (errorMsg || !project) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#0a0a0b] flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="font-hero-heading text-4xl sm:text-6xl font-black uppercase text-neutral-950 dark:text-white mb-4">
          PROJECT NOT FOUND
        </h1>
        <p className="text-neutral-500 max-w-md mb-8 font-mono text-sm">
          {errorMsg || 'The requested project perception could not be located.'}
        </p>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-black font-mono text-xs uppercase font-bold tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Work</span>
        </Link>
      </div>
    );
  }

  const gallery = project.galleryImages || [];

  return (
    <PageHeader bgImage={project.heroImage || project.mainImage}>
      <div className="mx-auto max-w-[1600px] px-6 md:px-16 pb-28 pt-8">

        {/* 1. TOP NAV / BACK BUTTON */}
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-500 mb-12">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>(Back to Work)</span>
          </Link>
          <span>({project.year || '2024'})</span>
        </div>

        {/* 2. PAGE HEADER TYPOGRAPHY */}
        <div className="max-w-6xl mb-12">
          <h1 className="font-hero-heading text-[56px] sm:text-[96px] md:text-[130px] lg:text-[160px] uppercase font-black tracking-tight leading-[0.85] text-neutral-950 dark:text-white mb-6">
            {project.title}
          </h1>
          {project.headline && (
            <p className="text-xl sm:text-3xl md:text-5xl font-medium leading-tight text-neutral-800 dark:text-neutral-200 max-w-4xl text-balance">
              {project.headline}
            </p>
          )}
        </div>

        {/* 3. 3-COLUMN METADATA BAR (Client, Date/Year, Services) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 py-8 my-10 border-y border-neutral-300 dark:border-neutral-800 font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-500">
          <div>
            <span className="text-neutral-400 block mb-1.5">(Client)</span>
            <span className="text-neutral-950 dark:text-white font-bold text-base sm:text-lg">
              {project.client || 'Studio Client'}
            </span>
          </div>

          <div>
            <span className="text-neutral-400 block mb-1.5">(Date)</span>
            <span className="text-neutral-950 dark:text-white font-bold text-base sm:text-lg font-mono">
              {project.year || '2024'}
            </span>
          </div>

          <div>
            <span className="text-neutral-400 block mb-1.5">(Services)</span>
            <span className="text-neutral-950 dark:text-white font-bold text-base sm:text-lg">
              {project.services || 'Branding, Website'}
            </span>
          </div>
        </div>

        {/* 4. FULL-WIDTH HERO COVER BANNER */}
        <div className="w-full min-h-[280px] sm:min-h-[420px] md:min-h-[550px] overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800/80 mb-16 sm:mb-28 shadow-sm flex items-center justify-center p-3 sm:p-6">
          <img
            src={project.heroImage || project.mainImage}
            alt={project.title}
            className="w-full h-auto max-h-[85vh] object-contain rounded-xl md:rounded-2xl"
          />
        </div>

        {/* 5. STORY SECTION (2-COLUMN GRID: LEFT TITLE, RIGHT DESCRIPTION) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20 sm:mb-32">
          {/* Left Column: Big Section Title */}
          <div className="lg:col-span-5">
            <h2 className="font-hero-heading text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-neutral-950 dark:text-white leading-none sticky top-28">
              {project.storyTitle || 'SLEEK WEBSITE'}
            </h2>
          </div>

          {/* Right Column: Case Study Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-neutral-900 dark:text-white leading-tight">
              For {project.client || project.title}, we delivered a sleek project that brought their digital vision to life.
            </h3>

            <div className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-light space-y-6 whitespace-pre-line">
              {project.storyDescription ? (
                project.storyDescription
              ) : (
                <>
                  <p>
                    First, we crafted a website design that not only captured the full artistic expression of {project.title} but also provided them with an interactive showcase. Whether users visit from a desktop or a mobile device, our goal was to deliver a seamless and intuitive experience.
                  </p>
                  <p>
                    Next, we built custom CMS structures so their team could easily update their portfolio. After launch, their brand visibility and client engagement increased dramatically.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 6. SHOWCASE GALLERY (2-1-2 GRID LAYOUT MATCHING REFERENCE DESIGN) */}
        {gallery.length > 0 && (
          <div className="space-y-6 md:space-y-10 mb-24">
            
            {/* ROW 1: 2 SIDE-BY-SIDE IMAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {gallery[0] && (
                <div className="relative w-full min-h-[280px] sm:min-h-[380px] md:min-h-[460px] flex items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800/80 group p-3 sm:p-6">
                  <img
                    src={gallery[0]}
                    alt={`${project.title} Showcase 1`}
                    className="w-full h-full max-h-[75vh] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  {/* Subtle Logo overlay on Image 1 as in reference */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none rounded-2xl md:rounded-3xl">
                    <span className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-md select-none font-hero-heading flex items-center gap-2">
                      <span>❖</span> {project.title}
                    </span>
                  </div>
                </div>
              )}

              {gallery[1] && (
                <div className="relative w-full min-h-[280px] sm:min-h-[380px] md:min-h-[460px] flex items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800/80 group p-3 sm:p-6">
                  <img
                    src={gallery[1]}
                    alt={`${project.title} Showcase 2`}
                    className="w-full h-full max-h-[75vh] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              )}
            </div>

            {/* ROW 2: 1 FULL-WIDTH BANNER IMAGE */}
            {gallery[2] && (
              <div className="relative w-full min-h-[300px] sm:min-h-[450px] md:min-h-[550px] flex items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800/80 group p-4 sm:p-8">
                <img
                  src={gallery[2]}
                  alt={`${project.title} Showcase 3 Banner`}
                  className="w-full h-full max-h-[85vh] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            )}

            {/* ROW 3: 2 SIDE-BY-SIDE IMAGES */}
            {(gallery[3] || gallery[4]) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {gallery[3] && (
                  <div className="relative w-full min-h-[280px] sm:min-h-[380px] md:min-h-[460px] flex items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800/80 group p-3 sm:p-6">
                    <img
                      src={gallery[3]}
                      alt={`${project.title} Showcase 4`}
                      className="w-full h-full max-h-[75vh] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                )}

                {gallery[4] && (
                  <div className="relative w-full min-h-[280px] sm:min-h-[380px] md:min-h-[460px] flex items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800/80 group p-3 sm:p-6">
                    <img
                      src={gallery[4]}
                      alt={`${project.title} Showcase 5`}
                      className="w-full h-full max-h-[75vh] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                )}
              </div>
            )}

            {/* ADDITIONAL GALLERY IMAGES IF ANY */}
            {gallery.length > 5 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 pt-4">
                {gallery.slice(5).map((imgUrl, i) => (
                  <div
                    key={i}
                    className="relative w-full min-h-[280px] sm:min-h-[380px] md:min-h-[460px] flex items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800/80 group p-3 sm:p-6"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} Showcase ${i + 6}`}
                      className="w-full h-full max-h-[75vh] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 7. BOTTOM BACK TO WORK CTA */}
        <div className="pt-16 border-t border-neutral-300 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
              Next Project Perception
            </span>
            <h4 className="text-2xl font-bold font-hero-heading uppercase tracking-tight text-neutral-950 dark:text-white">
              EXPLORE MORE WORK
            </h4>
          </div>

          <Link
            to="/work"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-black font-mono text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform shadow-lg"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </PageHeader>
  );
};

export default WorkDetailPage;
