const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  googleAuth,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getMe,
  updateProfile,
  changePassword,
} = require('../controllers/auth');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password/:token', resetPassword);

// Protected Auth & Settings Routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;
