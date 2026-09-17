const {
  requestForgotPassword,
  executeResetPassword,
  sendPasswordResetOTP,
  verifyOtpAndResetPassword,
} = require('../../services/authService');

// @desc    Forgot Password Request (Sends 6-Digit OTP Email)
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const result = await sendPasswordResetOTP(req.body.email);
    return res.json(result);
  } catch (error) {
    console.error('Forgot Password Controller Error:', error.message || error);
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      message: error.message || 'Server Error sending OTP',
    });
  }
};

// @desc    Verify 6-Digit OTP & Reset Password
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
  try {
    const result = await verifyOtpAndResetPassword(req.body);
    return res.json(result);
  } catch (error) {
    console.error('Verify OTP Controller Error:', error.message || error);
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      message: error.message || 'Server Error verifying OTP',
    });
  }
};

// @desc    Reset Password with URL Token (Legacy / Direct Link fallback)
// @route   POST /api/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const result = await executeResetPassword(req.params.token, req.body.password);
    return res.json(result);
  } catch (error) {
    console.error('Reset Password Controller Error:', error.message || error);
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      message: error.message || 'Server Error executing reset',
    });
  }
};

module.exports = {
  forgotPassword,
  verifyOtp,
  resetPassword,
};
