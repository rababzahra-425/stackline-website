const User = require('../models/User');
const { generateToken } = require('./tokenService');
const {
  hashPassword,
  comparePassword,
  generateResetToken,
  hashResetToken,
  generate6DigitOTP,
} = require('./passwordService');
const { sendPasswordResetEmail, sendOtpEmail } = require('./emailService');

/**
 * Service: Send 6-Digit Password Reset OTP Email
 */
const sendPasswordResetOTP = async (email) => {
  if (!email) {
    throw { status: 400, message: 'Please enter your account email' };
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return {
      success: true,
      message: 'If an account exists with that email, an OTP code has been sent.',
    };
  }

  const otpCode = generate6DigitOTP();
  user.otpCode = otpCode;
  user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes valid
  await user.save();

  // Send OTP Email via Mail Service API
  try {
    await sendOtpEmail({
      to: user.email,
      name: user.name,
      otpCode,
    });
  } catch (emailErr) {
    console.warn('⚠️ Email OTP dispatch failed:', emailErr.message);
  }

  return {
    success: true,
    message: 'A 6-digit OTP verification code has been sent to your email.',
    otpCode, // Included for easy dev & testing
  };
};

/**
 * Service: Verify 6-Digit OTP & Reset Password
 */
const verifyOtpAndResetPassword = async ({ email, otpCode, newPassword }) => {
  if (!email || !otpCode || !newPassword) {
    throw { status: 400, message: 'Please fill in all required fields' };
  }

  const user = await User.findOne({
    email: email.toLowerCase(),
    otpCode: otpCode,
    otpExpires: { $gt: Date.now() },
  }).select('+otpCode +otpExpires');

  if (!user) {
    throw { status: 400, message: 'Invalid or expired 6-digit OTP code' };
  }

  user.password = await hashPassword(newPassword);
  user.authProvider = 'local';
  user.otpCode = undefined;
  user.otpExpires = undefined;
  await user.save();

  const token = generateToken(user._id);
  return formatUserResponse(user, token);
};

/**
 * Format clean User response DTO
 */
const formatUserResponse = (user, token) => ({
  success: true,
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
    authProvider: user.authProvider,
    settings: user.settings,
  },
});

/**
 * Service: Local Email/Password Signup
 */
const signupUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw { status: 400, message: 'Please provide all required fields' };
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw { status: 400, message: 'An account with this email already exists' };
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    authProvider: 'local',
    isEmailVerified: true,
  });

  const token = generateToken(user._id);
  return formatUserResponse(user, token);
};

/**
 * Service: Local Email/Password Login
 */
const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 400, message: 'Please provide email and password' };
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  if (user.authProvider === 'google' && !user.password) {
    throw {
      status: 400,
      message: 'This account uses Google Sign-In. Please click "Continue with Google".',
    };
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);
  return formatUserResponse(user, token);
};

/**
 * Service: Google OAuth Authentication
 */
const authenticateGoogleUser = async ({ googleId, email, name, avatarUrl }) => {
  if (!email) {
    throw { status: 400, message: 'Google account email is required' };
  }

  let user = await User.findOne({ email: email.toLowerCase() });

  if (user) {
    if (!user.googleId && googleId) {
      user.googleId = googleId;
    }
    if (avatarUrl && !user.avatarUrl) {
      user.avatarUrl = avatarUrl;
    }
    user.lastLogin = new Date();
    await user.save();
  } else {
    user = await User.create({
      name: name || 'Admin User',
      email: email.toLowerCase(),
      googleId: googleId || null,
      authProvider: 'google',
      avatarUrl: avatarUrl || '',
      isEmailVerified: true,
    });
  }

  const token = generateToken(user._id);
  return formatUserResponse(user, token);
};

/**
 * Service: Forgot Password Request
 */
const requestForgotPassword = async (email, reqProtocol, reqHost) => {
  if (!email) {
    throw { status: 400, message: 'Please enter your account email' };
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return {
      success: true,
      message: 'If an account exists with that email, a password reset link has been processed.',
    };
  }

  const { rawToken, hashedToken } = generateResetToken();
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save();

  const resetUrl = `${reqProtocol}://${reqHost}/admin/reset-password/${rawToken}`;

  // Dispatch email via Resend Mail Service API
  try {
    await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetUrl,
    });
  } catch (emailErr) {
    console.warn('⚠️ Email dispatch skipped or failed:', emailErr.message);
  }

  return {
    success: true,
    message: 'Password reset link processed and sent via mail service.',
    resetToken: rawToken,
    resetUrl,
  };
};

/**
 * Service: Reset Password Submission
 */
const executeResetPassword = async (rawToken, newPassword) => {
  if (!newPassword) {
    throw { status: 400, message: 'Please enter a new password' };
  }

  const hashedToken = hashResetToken(rawToken);

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw { status: 400, message: 'Invalid or expired password reset token' };
  }

  user.password = await hashPassword(newPassword);
  user.authProvider = 'local';
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  const token = generateToken(user._id);
  return formatUserResponse(user, token);
};

/**
 * Service: Resolve Current Admin User
 */
const getAuthenticatedUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }
  return {
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      authProvider: user.authProvider,
      settings: user.settings,
    },
  };
};

/**
 * Service: Update Admin Profile & Settings
 */
const updateUserProfile = async (userId, { name, avatarUrl, settings }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  if (name !== undefined && name.trim() !== '') user.name = name.trim();
  if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
  if (settings !== undefined) {
    user.settings = {
      ...user.settings,
      ...settings,
      notifications: {
        ...(user.settings ? user.settings.notifications : {}),
        ...(settings ? settings.notifications : {}),
      },
    };
  }

  await user.save();

  return {
    success: true,
    message: 'Profile updated successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      authProvider: user.authProvider,
      settings: user.settings,
    },
  };
};

/**
 * Service: Change Admin Password
 */
const changeUserPassword = async (userId, { currentPassword, newPassword }) => {
  if (!currentPassword || !newPassword) {
    throw { status: 400, message: 'Please provide both current and new password' };
  }

  if (newPassword.length < 6) {
    throw { status: 400, message: 'New password must be at least 6 characters long' };
  }

  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  if (user.authProvider === 'google' && !user.password) {
    throw {
      status: 400,
      message: 'Google authenticated users can set a password by using Forgot Password OTP.',
    };
  }

  const isMatch = await comparePassword(currentPassword, user.password);
  if (!isMatch) {
    throw { status: 400, message: 'Current password is incorrect' };
  }

  user.password = await hashPassword(newPassword);
  await user.save();

  return {
    success: true,
    message: 'Password changed successfully',
  };
};

module.exports = {
  signupUser,
  loginUser,
  authenticateGoogleUser,
  requestForgotPassword,
  executeResetPassword,
  sendPasswordResetOTP,
  verifyOtpAndResetPassword,
  getAuthenticatedUser,
  updateUserProfile,
  changeUserPassword,
};

