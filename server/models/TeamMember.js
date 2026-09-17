const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      required: true,
      unique: true,
      trim: true, // e.g. "01", "02"
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true, // e.g. "Creative Director & Founder"
    },
    handle: {
      type: String,
      default: '', // e.g. "@alexander"
    },
    year: {
      type: String,
      default: '', // e.g. "(2021)"
    },
    image: {
      type: String,
      required: [true, 'Photo URL is required'],
    },
    bio: {
      type: String,
      default: '',
    },
    skills: [{ type: String }], // Array of skill tags e.g. ['Framer', 'Design Systems', 'UI/UX']
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

module.exports = mongoose.model('TeamMember', teamMemberSchema);
