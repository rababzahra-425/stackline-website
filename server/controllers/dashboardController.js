const Inquiry = require('../models/Inquiry');
const Project = require('../models/Project');
const Service = require('../models/Service');
const TeamMember = require('../models/TeamMember');
const Review = require('../models/Review');
const Blog = require('../models/Blog');

// @desc    Get aggregated dashboard metrics and recent activities
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalInquiries,
      newInquiries,
      contactedInquiries,
      totalProjects,
      totalServices,
      totalTeamMembers,
      totalReviews,
      totalBlogs,
      recentInquiries,
      recentReviews,
      allReviewsForRating,
    ] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Inquiry.countDocuments({ status: 'contacted' }),
      Project.countDocuments(),
      Service.countDocuments(),
      TeamMember.countDocuments(),
      Review.countDocuments(),
      Blog.countDocuments(),
      Inquiry.find().sort({ createdAt: -1 }).limit(5),
      Review.find().sort({ createdAt: -1 }).limit(3),
      Review.find({}, 'rating'),
    ]);

    // Compute average star rating
    let averageRating = 5.0;
    if (allReviewsForRating.length > 0) {
      const sum = allReviewsForRating.reduce((acc, curr) => acc + (curr.rating || 5), 0);
      averageRating = Number((sum / allReviewsForRating.length).toFixed(1));
    }

    res.status(200).json({
      success: true,
      data: {
        stats: {
          inquiries: {
            total: totalInquiries,
            new: newInquiries,
            contacted: contactedInquiries,
          },
          projects: {
            total: totalProjects,
          },
          services: {
            total: totalServices,
          },
          team: {
            total: totalTeamMembers,
          },
          reviews: {
            total: totalReviews,
            averageRating,
          },
          blogs: {
            total: totalBlogs,
          },
        },
        recentInquiries,
        recentReviews,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
