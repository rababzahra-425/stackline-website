const {
  getAllProjects,
  getProjectByIdOrSlug,
  createProject,
  updateProject,
  deleteProject,
} = require('../services/projectService');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error fetching projects',
    });
  }
};

// @desc    Get single project by ID or slug
// @route   GET /api/projects/:identifier
// @access  Public
const getProject = async (req, res) => {
  try {
    const project = await getProjectByIdOrSlug(req.params.identifier);
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Project not found',
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
const createNewProject = async (req, res) => {
  try {
    const newProject = await createProject(req.body);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error creating project',
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateExistingProject = async (req, res) => {
  try {
    const updated = await updateProject(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error updating project',
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const removeProject = async (req, res) => {
  try {
    const result = await deleteProject(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error deleting project',
    });
  }
};

module.exports = {
  getProjects,
  getProject,
  createNewProject,
  updateExistingProject,
  removeProject,
};
