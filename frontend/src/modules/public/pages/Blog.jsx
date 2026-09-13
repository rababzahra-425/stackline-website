import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { blogPosts as defaultBlogPosts } from '../data/blogData';
import { blogService } from '../../admin/blog/services/blogService';
import { SeoHead } from '../../../components/common/SeoHead';

export const BlogPage = () => {
  const [posts, setPosts] = useState(defaultBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await blogService.getAll(false);
        if (res.data && res.data.length > 0) {
          setPosts(res.data);
        }
      } catch (err) {
        console.warn('Could not fetch dynamic blogs, using default dataset:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Separate posts into rows of 3
  const row1Posts = posts.slice(0, 3);
  const row2Posts = posts.slice(3, 6);
  const row3Posts = posts.slice(6);

  return (
    <PageHeader bgImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop">
      <SeoHead pageKey="blog" />

      <div className="w-full">
        {/* 1. Header Section */}
        <div className="mx-auto max-w-[1600px] px-6 md:px-14 pt-6 pb-12 md:pb-16">
          <div className="flex items-baseline gap-4 mb-4">
            <h1 className="font-hero-heading text-[48px] sm:text-[88px] md:text-[110px] lg:text-[140px] uppercase tracking-tight leading-[0.85] select-none mb-8 text-neutral-950 dark:text-white">
              JOURNAL
            </h1>
          </div>

          <p className="font-sans text-2xl sm:text-4xl md:text-5xl font-normal leading-tight max-w-4xl text-neutral-800 dark:text-neutral-300 text-balance">
            Explore insights, tips, and trends to elevate your brand.
          </p>
        </div>

        {/* 2. Editorial Journal Grid Container */}
        <div className="w-full space-y-16 md:space-y-24 mb-24">

          {/* --- ROW 1 --- */}
          {row1Posts.length > 0 && (
            <div className="w-full">
              {/* Row 1 Images - Full width 3-column touching grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                {row1Posts.map((post) => (
                  <Link
                    key={post._id || post.id}
                    to={`/blog/${post.slug || post.id}`}
                    className="group relative aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3.2] lg:aspect-[4/3] w-full overflow-hidden bg-neutral-300 dark:bg-neutral-800 block"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>
                ))}
              </div>

              {/* Row 1 Details - 3 columns aligned with images */}
              <div className="mx-auto max-w-[1600px] px-6 md:px-14 pt-8 md:pt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
                  {row1Posts.map((post) => (
                    <Link
                      key={post._id || post.id}
                      to={`/blog/${post.slug || post.id}`}
                      className="group block space-y-3"
                    >
                      {/* Date in italic serif font in brackets */}
                      <div className="font-serif italic text-sm text-neutral-500 dark:text-neutral-400">
                        {post.dateFormatted || `(${post.date})`}
                      </div>

                      {/* Bold uppercase title */}
                      <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight leading-snug text-neutral-950 dark:text-white group-hover:opacity-75 transition-opacity">
                        {post.title}
                      </h2>

                      {/* Subtitle / summary paragraph */}
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-sm">
                        {post.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- ROW 2 --- */}
          {row2Posts.length > 0 && (
            <div className="w-full">
              {/* Row 2 Images - Full width 3-column touching grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                {row2Posts.map((post) => (
                  <Link
                    key={post._id || post.id}
                    to={`/blog/${post.slug || post.id}`}
                    className="group relative aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3.2] lg:aspect-[4/3] w-full overflow-hidden bg-neutral-300 dark:bg-neutral-800 block"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>
                ))}
              </div>

              {/* Row 2 Details */}
              <div className="mx-auto max-w-[1600px] px-6 md:px-14 pt-8 md:pt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
                  {row2Posts.map((post) => (
                    <Link
                      key={post._id || post.id}
                      to={`/blog/${post.slug || post.id}`}
                      className="group block space-y-3"
                    >
                      <div className="font-serif italic text-sm text-neutral-500 dark:text-neutral-400">
                        {post.dateFormatted || `(${post.date})`}
                      </div>

                      <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight leading-snug text-neutral-950 dark:text-white group-hover:opacity-75 transition-opacity">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-sm">
                        {post.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- ROW 3+ --- */}
          {row3Posts.length > 0 && (
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                {row3Posts.map((post) => (
                  <Link
                    key={post._id || post.id}
                    to={`/blog/${post.slug || post.id}`}
                    className="group relative aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3.2] lg:aspect-[4/3] w-full overflow-hidden bg-neutral-300 dark:bg-neutral-800 block"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>
                ))}
              </div>

              <div className="mx-auto max-w-[1600px] px-6 md:px-14 pt-8 md:pt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
                  {row3Posts.map((post) => (
                    <Link
                      key={post._id || post.id}
                      to={`/blog/${post.slug || post.id}`}
                      className="group block space-y-3"
                    >
                      <div className="font-serif italic text-sm text-neutral-500 dark:text-neutral-400">
                        {post.dateFormatted || `(${post.date})`}
                      </div>

                      <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight leading-snug text-neutral-950 dark:text-white group-hover:opacity-75 transition-opacity">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-sm">
                        {post.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </PageHeader>
  );
};

export default BlogPage;
