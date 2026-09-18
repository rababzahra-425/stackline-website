const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    service: {
      type: String,
      required: [true, 'Service selection is required'],
      default: 'Website Design', // e.g. "Website Design", "UI/UX Design", "Mobile App", "Full Package"
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
    emailSentStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
