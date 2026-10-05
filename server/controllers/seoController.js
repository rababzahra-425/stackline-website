const SeoSettings = require('../models/SeoSettings');

const defaultSeoSettings = {
  siteTitle: 'Stackline Studio | Digital Product & Brand Architecture',
  metaDescription: 'High-impact digital products, Framer websites, and scalable brand systems.',
  metaKeywords: ['Branding', 'Web Design', 'UI/UX', 'Framer', 'Development'],
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
