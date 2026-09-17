const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../services/serviceService');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const services = await getAllServices();
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error fetching services',
    });
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
const getService = async (req, res) => {
  try {
    const service = await getServiceById(req.params.id);
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Service not found',
    });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Admin)
const createNewService = async (req, res) => {
  try {
    const newService = await createService(req.body);
    res.status(201).json({ success: true, data: newService });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error creating service',
    });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin)
const updateExistingService = async (req, res) => {
  try {
    const updated = await updateService(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error updating service',
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
const removeService = async (req, res) => {
  try {
    const result = await deleteService(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error deleting service',
    });
  }
};

module.exports = {
  getServices,
  getService,
  createNewService,
  updateExistingService,
  removeService,
};
