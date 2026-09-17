const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createNewProject,
  updateExistingProject,
  removeProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProjects);
router.get('/:identifier', getProject);

// Protected Admin Routes
router.post('/', protect, createNewProject);
router.put('/:id', protect, updateExistingProject);
router.delete('/:id', protect, removeProject);

module.exports = router;
