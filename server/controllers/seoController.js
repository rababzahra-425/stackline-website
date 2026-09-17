const SeoSettings = require('../models/SeoSettings');

// @desc    Get global & per-page SEO meta settings
// @route   GET /api/seo
// @access  Public
const getSeoSettings = async (req, res) => {
  try {
    let settings = await SeoSettings.findOne();

    if (!settings) {
      settings = await SeoSettings.create({});
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch SEO settings',
      error: error.message,
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
