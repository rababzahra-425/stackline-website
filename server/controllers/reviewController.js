const Review = require('../models/Review');

const defaultReviews = [
  {
    name: 'Sarah Jenkins',
    company: 'Lumina Creative Studio',
    headline: 'Exceptional Branding That Elevated Our Identity',
    quote: 'KAJO Studio completely transformed our visual presence. Their attention to detail and creative direction exceeded our expectations.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    status: 'approved',
    isFeatured: true,
  },
  {
    name: 'David Vance',
    company: 'Apex Digital Solutions',
    headline: 'Seamless Web Development & Flawless UX Design',
    quote: 'Working with KAJO Studio was smooth from day one. The custom web architecture they delivered significantly boosted our conversion rates.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    status: 'approved',
    isFeatured: true,
  },
];

// @desc    Get all reviews (approved for public, all for admin if query ?all=true)
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
  try {
    const { all } = req.query;
    const filter = all === 'true' ? {} : { status: 'approved' };

    let reviews = [];
    try {
      reviews = await Review.find(filter).sort({ createdAt: -1 });
      if ((!reviews || reviews.length === 0) && filter.status === 'approved') {
        try {
          reviews = await Review.insertMany(defaultReviews);
        } catch (seedErr) {
          reviews = defaultReviews;
        }
      }
    } catch (dbErr) {
      console.warn('⚠️ MongoDB query failed for reviews, returning default fallback reviews');
      reviews = defaultReviews;
    }

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      count: defaultReviews.length,
      data: defaultReviews,
    });
  }
};

// @desc    Get single review by ID
// @route   GET /api/reviews/:id
// @access  Public
const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch review',
      error: error.message,
    });
  }
};

// @desc    Create a new review (Customer submission or Admin creation)
// @route   POST /api/reviews
// @access  Public
const createNewReview = async (req, res) => {
  try {
    const { name, company, headline, quote, avatar, rating, isFeatured, status } = req.body;

    if (!name || !headline || !quote) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, headline, and testimonial quote',
      });
    }

    const newReview = await Review.create({
      name,
      company: company || '',
      headline,
      quote,
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      rating: rating ? Number(rating) : 5,
      status: status || 'approved',
      isFeatured: isFeatured !== undefined ? isFeatured : true,
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: newReview,
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create review',
      error: error.message,
    });
  }
};

// @desc    Update an existing review
// @route   PUT /api/reviews/:id
// @access  Private/Admin
const updateExistingReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update review',
      error: error.message,
    });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
const removeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete review',
      error: error.message,
    });
  }
};

module.exports = {
  getReviews,
  getReview,
  createNewReview,
  updateExistingReview,
  removeReview,
};
