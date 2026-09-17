require('dotenv').config();
const connectDB = require('../config/db');
const Blog = require('../models/Blog');

const blogPostsData = [
  {
    articleId: '01',
    slug: '5-essential-branding-tips-for-businesses',
    title: '5 ESSENTIAL BRANDING TIPS FOR BUSINESSES',
    subtitle: 'Discover key strategies to create a memorable and impactful brand for your small business.',
    category: 'Branding',
    readTime: '5 min read',
    date: 'Aug 10, 2024',
    dateFormatted: '(Aug 10, 2024)',
    author: {
      name: 'Sophia Laurent',
      role: 'Head of Brand Strategy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    },
    coverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
    summary: 'Discover key strategies to create a memorable and impactful brand for your small business.',
    tags: ['Branding', 'Business', 'Identity', 'Strategy'],
    status: 'published',
    content: [
      {
        heading: '',
        text: 'A strong brand is more than just a logo—it is the emotional connection between your business and your customers. When done right, you project the exact subtle and professional image your business needs. It is the silent brand ambassador that speaks to your audience.',
      },
      {
        heading: '1. DEFINE YOUR CORE BRAND PURPOSE',
        text: 'Before crafting logos or selecting color palettes, clarify why your business exists and what unique value you deliver. A well-defined brand purpose serves as the foundational anchor for all design, messaging, and business strategy.',
      },
      {
        heading: '2. MAINTAIN VISUAL CONSISTENCY',
        text: 'Consistency builds recognition and trust. Standardize your typography scale, color swatches, logo guidelines, and imagery style across your website, social media, marketing collateral, and product packaging.',
      },
      {
        heading: '3. CRAFT AN AUTHENTIC TONE OF VOICE',
        text: 'How your business communicates matters as much as how it looks. Whether your brand voice is authoritative, playful, or minimalist, keep it consistent across every customer touchpoint.',
      },
    ],
  },
  {
    articleId: '02',
    slug: 'how-to-design-a-user-friendly-website',
    title: 'HOW TO DESIGN A USER-FRIENDLY WEBSITE',
    subtitle: 'Learn practical tips for designing websites that are both visually appealing and user-friendly.',
    category: 'Web Design',
    readTime: '6 min read',
    date: 'Aug 8, 2024',
    dateFormatted: '(Aug 8, 2024)',
    author: {
      name: 'Alexander Cole',
      role: 'Creative Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    },
    coverImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
    summary: 'Learn practical tips for designing websites that are both visually appealing and user-friendly.',
    tags: ['Web Design', 'UX', 'Usability', 'Web Development'],
    status: 'published',
    content: [
      {
        heading: '',
        text: "Designing a user-friendly website is both an art and a science. When done right, you can project the exact subtle and professional image your business needs. It's the silent brand ambassador that speaks to your audience, motivating, and inspiring users while guiding them effortlessly through their journey.",
      },
      {
        heading: 'SIMPLICITY IS KEY',
        text: 'Simplicity is one of the most important principles in creating a user-friendly website. Overloading visitors with too much information can lead to frustration and potentially driving them away. A clean, minimalist design focuses on the essentials, making it easier for users to engage with your content.\n\nA well-designed site with clear navigation helps users find what they need quickly. Avoid cluttered menus, and make sure links are obvious and well-organized.',
      },
    ],
  },
  {
    articleId: '03',
    slug: 'the-importance-of-responsive-design',
    title: 'THE IMPORTANCE OF RESPONSIVE DESIGN',
    subtitle: 'Why responsive design is crucial for enhancing experience and increasing conversions.',
    category: 'Web Design',
    readTime: '5 min read',
    date: 'Aug 5, 2024',
    dateFormatted: '(Aug 5, 2024)',
    author: {
      name: 'Marcus Vance',
      role: 'Principal Architect',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    },
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    summary: 'Why responsive design is crucial for enhancing experience and increasing conversions.',
    tags: ['Responsive Design', 'Mobile-First', 'SEO', 'Web Development'],
    status: 'published',
    content: [
      {
        heading: 'MOBILE-FIRST STRATEGY FOR MODERN AUDIENCES',
        text: 'Mobile devices come in hundreds of screen sizes and aspect ratios. Designing with a mobile-first mindset guarantees that core features, readable typography, and media content look sharp and perform flawlessly everywhere.',
      },
      {
        heading: 'SEO AND USER RETENTION IMPACT',
        text: 'Search engines like Google prioritize mobile-responsive websites in search indexing and rankings. A fluid cross-device experience reduces bounce rates and boosts conversions across desktop, tablet, and smartphone users.',
      },
    ],
  },
];

const seed = async () => {
  try {
    await connectDB();
    const count = await Blog.countDocuments();
    if (count === 0) {
      await Blog.insertMany(blogPostsData);
      console.log('Successfully seeded blog posts into MongoDB!');
    } else {
      console.log(`Blog collection already contains ${count} posts. Skipping seed.`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
