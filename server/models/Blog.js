const mongoose = require('mongoose');

const blogContentBlockSchema = new mongoose.Schema({
  heading: { type: String, default: '' },
  text: { type: String, required: true },
});

const blogSchema = new mongoose.Schema(
  {
    articleId: {
      type: String,
      default: '', // e.g. "01"
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true, // e.g. "Branding", "Web Design"
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    date: {
      type: String,
      default: '', // e.g. "Aug 10, 2024"
    },
    dateFormatted: {
      type: String,
      default: '', // e.g. "(Aug 10, 2024)"
    },
    author: {
      name: { type: String, required: true },
      role: { type: String, default: '' },
      avatar: { type: String, default: '' },
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image URL is required'],
    },
    summary: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    content: [blogContentBlockSchema], // Array of [{ heading, text }]
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      metaKeywords: [{ type: String }],
      canonicalUrl: { type: String, default: '' },
      ogImage: { type: String, default: '' },
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
