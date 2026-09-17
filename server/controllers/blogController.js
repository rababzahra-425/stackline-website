const Blog = require('../models/Blog');

// Helper to generate a slug from title
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

// @desc    Get all blog posts (published for public, all for admin if query ?all=true)
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const { all, category, search } = req.query;
    let filter = all === 'true' ? {} : { status: 'published' };

    if (category && category !== 'All') {
      filter.category = new RegExp(category, 'i');
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { title: searchRegex },
        { summary: searchRegex },
        { subtitle: searchRegex },
        { category: searchRegex },
        { 'author.name': searchRegex },
      ];
    }

    const blogs = await Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts',
      error: error.message,
    });
  }
};

// @desc    Get single blog post by slug or ID
// @route   GET /api/blogs/:slugOrId
// @access  Public
const getBlogBySlugOrId = async (req, res) => {
  try {
    const { slugOrId } = req.params;

    let blog = await Blog.findOne({ slug: slugOrId });

    if (!blog && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slugOrId);
    }

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error fetching blog details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post details',
      error: error.message,
    });
  }
};

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private/Admin
const createNewBlog = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      slug,
      category,
      readTime,
      date,
      dateFormatted,
      author,
      coverImage,
      summary,
      tags,
      content,
      status,
      seo,
    } = req.body;

    if (!title || !summary || !coverImage || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, category, cover image, and summary',
      });
    }

    const finalSlug = slug && slug.trim() ? generateSlug(slug) : generateSlug(title);

    // Check slug uniqueness
    const existingBlog = await Blog.findOne({ slug: finalSlug });
    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: 'A blog post with this slug or title already exists. Please customize the slug.',
      });
    }

    const todayStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newBlog = await Blog.create({
      title,
      subtitle: subtitle || summary.slice(0, 100),
      slug: finalSlug,
      category: category || 'Insights',
      readTime: readTime || '5 min read',
      date: date || todayStr,
      dateFormatted: dateFormatted || `(${date || todayStr})`,
      author: author || {
        name: 'KAJO Studio Team',
        role: 'Creative Editorial',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      },
      coverImage,
      summary,
      tags: tags || [category || 'Design'],
      content: content || [],
      status: status || 'published',
      seo: seo || {},
      publishedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: newBlog,
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog post',
      error: error.message,
    });
  }
};

// @desc    Update an existing blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateExistingBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // If slug is updated, verify uniqueness
    if (req.body.slug && req.body.slug !== blog.slug) {
      const formattedSlug = generateSlug(req.body.slug);
      const existingSlug = await Blog.findOne({ slug: formattedSlug, _id: { $ne: req.params.id } });
      if (existingSlug) {
        return res.status(400).json({
          success: false,
          message: 'Another blog post is already using this slug. Please use a unique slug.',
        });
      }
      req.body.slug = formattedSlug;
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: blog,
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog post',
      error: error.message,
    });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const removeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post',
      error: error.message,
    });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlugOrId,
  createNewBlog,
  updateExistingBlog,
  removeBlog,
};
