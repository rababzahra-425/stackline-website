import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { blogPosts as defaultBlogPosts } from '../data/blogData';
import { blogService } from '../../admin/blog/services/blogService';
import { SeoHead } from '../../../components/common/SeoHead';

export const BlogDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otherPosts, setOtherPosts] = useState([]);

  // Reset scroll to top immediately on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await blogService.getBySlugOrId(slug);
        if (res.data) {
          setPost(res.data);
        } else {
          // Fallback to static data
          const found = defaultBlogPosts.find((p) => p.slug === slug || p.id === slug);
          setPost(found || null);
        }
      } catch (err) {
        console.warn('Could not fetch dynamic blog detail, using fallback:', err);
        const found = defaultBlogPosts.find((p) => p.slug === slug || p.id === slug);
        setPost(found || null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    const fetchOtherPosts = async () => {
      try {
        const res = await blogService.getAll(false);
        if (res.data && res.data.length > 0) {
          setOtherPosts(res.data.filter((p) => p.slug !== slug && p._id !== slug).slice(0, 3));
        } else {
          setOtherPosts(defaultBlogPosts.filter((p) => p.slug !== slug && p.id !== slug).slice(0, 3));
        }
      } catch (err) {
        setOtherPosts(defaultBlogPosts.filter((p) => p.slug !== slug && p.id !== slug).slice(0, 3));
      }
    };
    fetchOtherPosts();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#f4f4f0] text-neutral-900 dark:bg-[#0d0d0e] dark:text-neutral-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-900 dark:border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen w-full bg-[#f4f4f0] text-neutral-900 dark:bg-[#0d0d0e] dark:text-neutral-100 px-6 pt-4 pb-36">
        <Navbar variant="landing" />
        <div className="mx-auto max-w-[1200px] px-6 text-center py-24">
          <p className="font-mono text-sm uppercase tracking-widest text-neutral-500 mb-4">(404 Not Found)</p>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-6">Article Not Found</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
            The article you are looking for does not exist or may have been moved.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-950 text-white dark:bg-white dark:text-black font-mono text-xs uppercase tracking-wider cursor-pointer"
          >
            <span>Back to Journal</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f4f4f0] text-neutral-900 dark:bg-[#0d0d0e] dark:text-neutral-100 transition-colors duration-300 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <SeoHead
        title={`${post?.title} — KAJO Studio Journal`}
        description={post?.summary}
        ogImage={post?.coverImage}
      />

      {/* MOBILE TOP NAVBAR (Visible < lg, matching HeroSection) */}
      <div className="w-full lg:hidden px-4 pt-3 pb-1 z-40 relative">
        <Navbar variant="landing" />
      </div>

      {/* 1. HERO SPLIT SECTION: Left Sticky Cover Photo + Right Hero & Content */}
      <div className="w-full min-h-screen flex flex-col lg:flex-row relative">

        {/* LEFT COLUMN: Pinned / Sticky cover image container (matching HeroSection) */}
        <div className="w-full lg:w-1/2 h-[380px] sm:h-[480px] md:h-[560px] lg:h-screen lg:sticky lg:top-0 p-0 flex items-center justify-center z-20 overflow-hidden bg-neutral-300 dark:bg-neutral-800">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover grayscale contrast-110"
          />
        </div>

        {/* RIGHT COLUMN: Containing Navbar, Article Header & Main Text */}
        <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between z-10 px-6 md:px-12 lg:px-16 py-6">
          {/* Header Navbar aligned to right (Desktop lg+) */}
          <div className="hidden lg:block">
            <Navbar variant="landing" />
          </div>

          {/* Right Column Content Container */}
          <div className="px-6 sm:px-12 md:px-14 lg:px-16 py-8 my-auto">

            {/* Date */}
            <div className="flex items-center gap-3 font-serif italic text-base sm:text-lg text-neutral-500 dark:text-neutral-400 mb-6 font-bracket">
              <span>{post.dateFormatted || `(${post.date})`}</span>
            </div>

            {/* Giant Title */}
            <h1 className="font-hero-heading text-[48px] sm:text-[88px] md:text-[110px] lg:text-[140px] uppercase tracking-tight leading-[0.85] select-none mb-8 text-neutral-950 dark:text-white">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="font-sans text-2xl sm:text-4xl md:text-5xl font-normal leading-tight max-w-4xl text-neutral-800 dark:text-neutral-300 text-balance mb-12">
                {post.subtitle}
              </p>
            )}

            {/* Article Content Paragraphs & Subheadings */}
            <div className="space-y-8 max-w-xl pb-16">
              {post.content && post.content.length > 0 ? (
                post.content.map((block, idx) => (
                  <div key={idx} className="space-y-4">
                    {block.heading && (
                      <h2 className="font-hero-heading text-[22px] sm:text-[26px] lg:text-[30px] uppercase tracking-tight leading-[0.85] select-none mb-8 text-neutral-950 dark:text-white pt-6">
                        {block.heading}
                      </h2>
                    )}
                    {block.text && (
                      <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-light leading-relaxed whitespace-pre-line">
                        {block.text}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                  {post.summary}
                </p>
              )}
            </div>

          </div>

          <div />
        </div>

      </div>

      {/* 2. MORE NEWS SECTION */}
      {otherPosts.length > 0 && (
        <section className="relative z-30 w-full rounded-none shadow-[0_-25px_60px_rgba(0,0,0,0.18)] bg-[#f4f4f0] dark:bg-[#0d0d0e] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 px-6 py-16 sm:px-12 sm:py-24 border-t border-neutral-300/60 dark:border-neutral-800">
          <div className="mx-auto max-w-[1600px]">

            {/* Header */}
            <div className="flex w-full justify-between items-center text-xs md:text-sm font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-12">
              <span>(More News)</span>
              <span>({otherPosts.length.toString().padStart(2, '0')})</span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
              {otherPosts.map((other) => (
                <Link
                  key={other._id || other.id}
                  to={`/blog/${other.slug || other.id}`}
                  className="group block space-y-4"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-300 dark:bg-neutral-800">
                    <img
                      src={other.coverImage}
                      alt={other.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="font-serif italic text-sm text-neutral-500 dark:text-neutral-400">
                    {other.dateFormatted || `(${other.date})`}
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-tight leading-snug text-neutral-950 dark:text-white group-hover:opacity-75 transition-opacity">
                    {other.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-sm line-clamp-2">
                    {other.summary}
                  </p>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

    </div>
  );
};

export default BlogDetailPage;
