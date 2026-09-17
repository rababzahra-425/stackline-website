const express = require('express');
const router = express.Router();

const {
  submitInquiry,
  getInquiries,
  getInquiry,
  updateStatus,
  removeInquiry,
} = require('../controllers/inquiryController');

const { protect } = require('../middleware/authMiddleware');

// Public route for clients submitting contact form from Let's Talk page
router.post('/', submitInquiry);

// Protected routes for Admin Panel management
router.get('/', protect, getInquiries);
router.get('/:id', protect, getInquiry);
router.put('/:id/status', protect, updateStatus);
router.delete('/:id', protect, removeInquiry);

module.exports = router;
