const signup = require('./signupController');
const login = require('./loginController');
const googleAuth = require('./googleAuthController');
const { forgotPassword, verifyOtp, resetPassword } = require('./passwordController');
const getMe = require('./meController');
const updateProfile = require('./profileController');
const changePassword = require('./changePasswordController');

module.exports = {
  signup,
  login,
  googleAuth,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getMe,
  updateProfile,
  changePassword,
};
