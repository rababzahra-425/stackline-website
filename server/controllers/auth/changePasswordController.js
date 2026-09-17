const { changeUserPassword } = require('../../services/authService');

// @desc    Change Admin User Password
// @route   PUT /api/auth/change-password
// @access  Private (Admin)
const changePassword = async (req, res) => {
  try {
    const result = await changeUserPassword(req.user.id, req.body);
    return res.json(result);
  } catch (error) {
    console.error('Change Password Controller Error:', error.message || error);
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      message: error.message || 'Server Error changing password',
    });
  }
};

module.exports = changePassword;
