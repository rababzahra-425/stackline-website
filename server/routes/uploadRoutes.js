const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadSingleImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/upload - Single image upload
router.post('/', upload.single('image'), uploadSingleImage);

module.exports = router;