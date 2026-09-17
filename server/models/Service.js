const mongoose = require('mongoose');

const subServiceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  desc: { type: String, required: true, trim: true },
});

const serviceSchema = new mongoose.Schema(
  {
    serviceId: {
      type: String,
      required: true,
      unique: true,
      trim: true, // e.g. "01", "02"
    },
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true, // e.g. "BRAND STRATEGY"
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: '(Services)',
    },
    imageLeft: {
      type: Boolean,
      default: true,
    },
    items: [subServiceSchema], // Array of sub-services [{ title, desc }]
    mockup: {
      mockupText: { type: String, default: '' },
      imageUrl: { type: String, default: '' },
    },
    bgCard: {
      type: String,
      default: 'bg-white dark:bg-[#18181b]',
    },
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

module.exports = mongoose.model('Service', serviceSchema);
