const { authenticateGoogleUser } = require('../../services/authService');

// @desc    Google OAuth Auth (Continue with Google)
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
  try {
    const result = await authenticateGoogleUser(req.body);
    return res.json(result);
  } catch (error) {
    console.error('Google Auth Controller Error:', error.message || error);
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      message: error.message || 'Server Error during Google authentication',
    });
  }
};

module.exports = googleAuth;
