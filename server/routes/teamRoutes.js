const express = require('express');
const router = express.Router();

const {
  getTeamMembers,
  getTeamMember,
  createNewTeamMember,
  updateExistingTeamMember,
  removeTeamMember,
} = require('../controllers/teamController');

const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getTeamMembers);
router.get('/:id', getTeamMember);

// Protected routes (Admin authentication required for mutations)
router.post('/', protect, createNewTeamMember);
router.put('/:id', protect, updateExistingTeamMember);
router.delete('/:id', protect, removeTeamMember);

module.exports = router;
