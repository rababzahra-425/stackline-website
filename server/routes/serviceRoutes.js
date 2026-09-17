const express = require('express');
const router = express.Router();
const {
  getServices,
  getService,
  createNewService,
  updateExistingService,
  removeService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getServices);
router.get('/:id', getService);

// Protected Admin Routes
router.post('/', protect, createNewService);
router.put('/:id', protect, updateExistingService);
router.delete('/:id', protect, removeService);

module.exports = router;
