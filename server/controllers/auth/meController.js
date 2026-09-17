const { getAuthenticatedUser } = require('../../services/authService');

// @desc    Get Current Logged In Admin User
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const result = await getAuthenticatedUser(req.user.id);
    return res.json(result);
  } catch (error) {
    console.error('Me Controller Error:', error.message || error);
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      message: error.message || 'Server Error fetching user profile',
    });
  }
};

module.exports = getMe;
