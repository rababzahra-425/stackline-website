const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlugOrId,
  createNewBlog,
  updateExistingBlog,
  removeBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

// Public routes for reading articles
router.get('/', getBlogs);
router.get('/:slugOrId', getBlogBySlugOrId);

// Protected admin routes for publishing, editing, and deleting
router.post('/', protect, createNewBlog);
router.put('/:id', protect, updateExistingBlog);
router.delete('/:id', protect, removeBlog);

module.exports = router;
