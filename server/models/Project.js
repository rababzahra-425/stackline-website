const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true, // e.g. "KANBA"
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    headline: {
      type: String,
      default: '', // e.g. "We delivered a sleek Framer development project."
    },
    client: {
      type: String,
      default: 'Studio Client', // e.g. "Kanba"
    },
    year: {
      type: String,
      default: '2024', // e.g. "2024"
    },
    services: {
      type: String,
      default: 'Branding, Website', // e.g. "Branding, Website"
    },
    storyTitle: {
      type: String,
      default: 'SLEEK WEBSITE', // e.g. "SLEEK WEBSITE"
    },
    storyDescription: {
      type: String,
      default: '', // Comprehensive case study story paragraph
    },
    mainImage: {
      type: String,
      required: [true, 'Main image is required'], // Displayed on /work page card
    },
    heroImage: {
      type: String,
      default: '', // Large full-width hero cover image on detail page
    },
    galleryImages: [{ type: String }], // Array of gallery image URLs
    order: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
