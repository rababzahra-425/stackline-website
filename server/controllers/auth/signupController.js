const { signupUser } = require('../../services/authService');

// @desc    Admin Sign Up (Local Email + Password)
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const result = await signupUser(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.error('Signup Controller Error:', error.message || error);
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      message: error.message || 'Server Error during signup',
    });
  }
};

module.exports = signup;
