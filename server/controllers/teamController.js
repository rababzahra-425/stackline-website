const {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../services/teamService');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
const getTeamMembers = async (req, res) => {
  try {
    const members = await getAllTeamMembers();
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error fetching team members',
    });
  }
};

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
const getTeamMember = async (req, res) => {
  try {
    const member = await getTeamMemberById(req.params.id);
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Team member not found',
    });
  }
};

// @desc    Create new team member
// @route   POST /api/team
// @access  Private (Admin)
const createNewTeamMember = async (req, res) => {
  try {
    const newMember = await createTeamMember(req.body);
    res.status(201).json({ success: true, data: newMember });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error creating team member',
    });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private (Admin)
const updateExistingTeamMember = async (req, res) => {
  try {
    const updated = await updateTeamMember(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error updating team member',
    });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private (Admin)
const removeTeamMember = async (req, res) => {
  try {
    const result = await deleteTeamMember(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error deleting team member',
    });
  }
};

module.exports = {
  getTeamMembers,
  getTeamMember,
  createNewTeamMember,
  updateExistingTeamMember,
  removeTeamMember,
};
