const express = require('express');
const router = express.Router();
const {
  getReviews,
  getReview,
  createNewReview,
  updateExistingReview,
  removeReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Public routes for fetching & submitting reviews
router.get('/', getReviews);
router.get('/:id', getReview);
router.post('/', createNewReview); // Allow customer submissions directly

// Protected admin routes for modification & deletion
router.put('/:id', protect, updateExistingReview);
router.delete('/:id', protect, removeReview);

module.exports = router;
