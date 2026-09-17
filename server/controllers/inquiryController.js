const {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} = require('../services/inquiryService');

// @desc    Submit new client inquiry from Let's Talk page
// @route   POST /api/inquiries
// @access  Public
const submitInquiry = async (req, res) => {
  try {
    const inquiry = await createInquiry(req.body);
    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. Admin notified.',
      data: inquiry,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error submitting inquiry',
    });
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private (Admin)
const getInquiries = async (req, res) => {
  try {
    const inquiries = await getAllInquiries();
    res.json({ success: true, data: inquiries });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error fetching inquiries',
    });
  }
};

// @desc    Get single inquiry by ID
// @route   GET /api/inquiries/:id
// @access  Private (Admin)
const getInquiry = async (req, res) => {
  try {
    const inquiry = await getInquiryById(req.params.id);
    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Inquiry not found',
    });
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id/status
// @access  Private (Admin)
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await updateInquiryStatus(req.params.id, status);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error updating inquiry status',
    });
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private (Admin)
const removeInquiry = async (req, res) => {
  try {
    const result = await deleteInquiry(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error deleting inquiry',
    });
  }
};

module.exports = {
  submitInquiry,
  getInquiries,
  getInquiry,
  updateStatus,
  removeInquiry,
};
