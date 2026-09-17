// @desc    Upload Single Image
// @route   POST /api/upload
// @access  Private (Admin)
const uploadSingleImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image file to upload' });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      url: fileUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server Error processing image upload',
    });
  }
};

module.exports = {
  uploadSingleImage,
};
