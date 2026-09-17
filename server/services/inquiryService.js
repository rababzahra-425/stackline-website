const Inquiry = require('../models/Inquiry');
const { sendInquiryAlertEmail } = require('./emailService');

/**
 * Submit a new inquiry & alert admin via email
 */
const createInquiry = async (inquiryData) => {
  if (!inquiryData.name) {
    throw { status: 400, message: 'Name is required' };
  }
  if (!inquiryData.email) {
    throw { status: 400, message: 'Email address is required' };
  }
  if (!inquiryData.message) {
    throw { status: 400, message: 'Message content is required' };
  }

  // 1. Save Inquiry into Database
  const inquiry = await Inquiry.create({
    name: inquiryData.name,
    email: inquiryData.email,
    service: inquiryData.service || 'Branding',
    budget: inquiryData.budget || '$10k - $25k',
    message: inquiryData.message,
    status: 'new',
  });

  // 2. Dispatch Email Alert to Admin (rababzahra425@gmail.com)
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || 'rababzahra425@gmail.com';
  
  try {
    console.log(`📩 Dispatching inquiry alert email to admin: ${adminEmail}...`);
    await sendInquiryAlertEmail({ adminEmail, inquiry });
    inquiry.emailSentStatus = true;
    await inquiry.save();
  } catch (emailError) {
    console.error('⚠️ Could not send alert email to admin:', emailError.message);
    // Continue execution so lead is saved in database even if email dispatch fails
  }

  return inquiry;
};

/**
 * Get all inquiries sorted by latest
 */
const getAllInquiries = async () => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  return inquiries;
};

/**
 * Get single inquiry by ID (Auto-marks status as 'read' if it was 'new')
 */
const getInquiryById = async (id) => {
  const inquiry = await Inquiry.findById(id);
  if (!inquiry) {
    throw { status: 404, message: 'Inquiry not found' };
  }

  if (inquiry.status === 'new') {
    inquiry.status = 'read';
    await inquiry.save();
  }

  return inquiry;
};

/**
 * Update inquiry status
 */
const updateInquiryStatus = async (id, status) => {
  const validStatuses = ['new', 'read', 'replied', 'archived'];
  if (!validStatuses.includes(status)) {
    throw { status: 400, message: 'Invalid status option' };
  }

  const updated = await Inquiry.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw { status: 404, message: 'Inquiry not found for status update' };
  }

  return updated;
};

/**
 * Delete an inquiry
 */
const deleteInquiry = async (id) => {
  const deleted = await Inquiry.findByIdAndDelete(id);
  if (!deleted) {
    throw { status: 404, message: 'Inquiry not found for deletion' };
  }
  return { success: true, message: 'Inquiry deleted successfully' };
};

module.exports = {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
};
