const { updateUserProfile } = require('../../services/authService');

// @desc    Update Admin User Profile & Settings
// @route   PUT /api/auth/profile
// @access  Private (Admin)
const updateProfile = async (req, res) => {
  try {
    const result = await updateUserProfile(req.user.id, req.body);
    return res.json(result);
  } catch (error) {
    console.error('Update Profile Controller Error:', error.message || error);
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      message: error.message || 'Server Error updating profile',
    });
  }
};

module.exports = updateProfile;
