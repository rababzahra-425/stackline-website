const mongoose = require('mongoose');

const heroSliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Slide title is required'],
      trim: true, // e.g. "MAC MAGAZINE CATALOG"
    },
    subtitle: {
      type: String,
      default: '', // e.g. "OPEN BOOKLET A4 MAGAZINE FREE PSD MOCKUP"
    },
    url: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    tag: {
      type: String,
      default: 'KAJO FEATURED',
    },
    accentColor: {
      type: String,
      default: '#e63946',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HeroSlider', heroSliderSchema);
