const { loginUser } = require('../../services/authService');

// @desc    Admin Login (Local Email + Password)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    return res.json(result);
  } catch (error) {
    console.error('Login Controller Error:', error.message || error);
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      message: error.message || 'Server Error during login',
    });
  }
};

module.exports = login;
