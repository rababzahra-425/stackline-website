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
      closedInquiries,
      totalProjects,
      featuredProjects,
      totalServices,
      totalTeamMembers,
      totalReviews,
      totalBlogs,
      recentInquiries,
      recentReviews,
      allReviewsForRating,
      inquiriesByService,
      monthlyInquiryTrends,
    ] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Inquiry.countDocuments({ status: 'contacted' }),
      Inquiry.countDocuments({ status: 'closed' }),
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      Service.countDocuments(),
      TeamMember.countDocuments(),
      Review.countDocuments(),
      Blog.countDocuments(),
      Inquiry.find().sort({ createdAt: -1 }).limit(6),
      Review.find().sort({ createdAt: -1 }).limit(3),
      Review.find({}, 'rating'),

      // Inquiries grouped by requested service
      Inquiry.aggregate([
        { $group: { _id: '$service', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),

      // Monthly inquiry creation trends (last 6 months)
      Inquiry.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
        { $limit: 6 }
      ])
    ]);

    // Compute average star rating
    let averageRating = 5.0;
    if (allReviewsForRating.length > 0) {
      const sum = allReviewsForRating.reduce((acc, curr) => acc + (curr.rating || 5), 0);
      averageRating = Number((sum / allReviewsForRating.length).toFixed(1));
    }

    // Response rate percentage
    const respondedCount = contactedInquiries + closedInquiries;
    const responseRate = totalInquiries > 0 
      ? Math.round((respondedCount / totalInquiries) * 100) 
      : 100;

    res.status(200).json({
      success: true,
      data: {
        stats: {
          inquiries: {
            total: totalInquiries,
            new: newInquiries,
            contacted: contactedInquiries,
            closed: closedInquiries,
            responseRate,
          },
          projects: {
            total: totalProjects,
            featured: featuredProjects,
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
        inquiriesByService,
        monthlyInquiryTrends,
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
