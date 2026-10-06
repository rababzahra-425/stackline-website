const SeoSettings = require('../models/SeoSettings');

const defaultSeoSettings = {
  siteTitle: 'Stackline Studio — Creative Brands, Powerful Websites',
  defaultDescription: 'Stackline Studio is an award-winning creative agency specializing in brand identity, high-performance web development, and digital experiences.',
  defaultOgImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
  twitterHandle: '@stacklinestudio',
  googleAnalyticsId: '',
  pages: {
    home: {
      title: 'Stackline Studio — Creative Brands & Digital Experiences',
      description: 'Explore Stackline Studio portfolio, brand strategy, web engineering, and award-winning digital solutions.',
      ogImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
      keywords: 'branding, web design, UI/UX, agency, design studio',
    },
    service: {
      title: 'OUR SERVICES — Brand Strategy, Web Design & Engineering',
      description: 'Comprehensive digital design, branding systems, and modern web application development services.',
      ogImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
      keywords: 'brand identity, web design, app development, UI/UX',
    },
    work: {
      title: 'OUR WORK — Featured Case Studies & Portfolio Perceptions',
      description: 'Selected projects and digital solutions crafted by Stackline Studio for global clients.',
      ogImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
      keywords: 'case studies, portfolio, branding showcase, web work',
    },
    about: {
      title: 'ABOUT STACKLINE STUDIO — Our Team, Vision & Ethos',
      description: 'Meet the creative directors, engineers, and brand strategists behind Stackline Studio.',
      ogImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
      keywords: 'team, studio ethos, creative agency, directors',
    },
    talk: {
      title: "LET'S TALK — Start Your Next Project with Stackline Studio",
      description: 'Get in touch to discuss your next brand identity, web design, or digital transformation.',
      ogImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop',
      keywords: 'contact, project inquiry, hire agency, quote',
    },
    blog: {
      title: 'JOURNAL & INSIGHTS — Thoughts on Design & Tech',
      description: 'Read the latest studio insights, design trends, branding tips, and engineering breakdowns.',
      ogImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
      keywords: 'blog, insights, design trends, branding tips',
    },
  },
};

// @desc    Get global & per-page SEO meta settings
// @route   GET /api/seo
// @access  Public
const getSeoSettings = async (req, res) => {
  try {
    let settings = null;
    try {
      settings = await SeoSettings.findOne();
      if (!settings) {
        settings = await SeoSettings.create(defaultSeoSettings);
      }
    } catch (dbErr) {
      console.warn('⚠️ MongoDB fetch failed for SEO settings, returning default fallback');
      settings = defaultSeoSettings;
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      data: defaultSeoSettings,
    });
  }
};

// @desc    Update global & per-page SEO meta settings
// @route   PUT /api/seo
// @access  Private/Admin
const updateSeoSettings = async (req, res) => {
  try {
    let settings = await SeoSettings.findOne();

    if (!settings) {
      settings = await SeoSettings.create(req.body);
    } else {
      settings = await SeoSettings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      message: 'SEO settings updated successfully',
      data: settings,
    });
  } catch (error) {
    console.error('Error updating SEO settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update SEO settings',
      error: error.message,
    });
  }
};

module.exports = {
  getSeoSettings,
  updateSeoSettings,
};
