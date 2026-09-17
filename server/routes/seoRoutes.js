const express = require('express');
const router = express.Router();
const { getSeoSettings, updateSeoSettings } = require('../controllers/seoController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getSeoSettings);
router.put('/', protect, updateSeoSettings);

module.exports = router;
