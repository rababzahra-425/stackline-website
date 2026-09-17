const TeamMember = require('../models/TeamMember');

const defaultMembers = [
  {
    memberId: '01',
    name: 'Alexander Cole',
    role: 'Creative Director & Founder',
    handle: '@alexander',
    year: '(2021)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop',
    bio: 'Over a decade of experience driving creative vision, brand systems, and high-impact digital products for global clients.',
    skills: ['Framer', 'Design Systems', 'Creative Direction', 'UI/UX', 'Brand Architecture', 'Figma'],
    order: 1,
    isActive: true,
  },
  {
    memberId: '02',
    name: 'Sophia Laurent',
    role: 'Head of Brand Strategy',
    handle: '@sophialaurent',
    year: '(2022)',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop',
    bio: 'Specializing in consumer research, brand positioning, and converting complex value propositions into distinct narratives.',
    skills: ['Brand Strategy', 'Visual Identity', 'Typography', 'Market Research', 'Editorial Design', 'Copywriting'],
    order: 2,
    isActive: true,
  },
  {
    memberId: '03',
    name: 'Marcus Vance',
    role: 'Principal Digital Architect',
    handle: '@marcusvance',
    year: '(2023)',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop',
    bio: 'Bridges design and technical execution, crafting fluid micro-interactions, responsive architectures, and scalable codebases.',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'WebGL', 'GSAP Animation', 'Node.js'],
    order: 3,
    isActive: true,
  },
];

/**
 * Get all team members (Auto-seeds initial team members if collection is empty)
 */
const getAllTeamMembers = async () => {
  let members = await TeamMember.find().sort({ order: 1, createdAt: 1 });

  if (!members || members.length === 0) {
    console.log('🌱 Seeding initial team profile cards...');
    members = await TeamMember.insertMany(defaultMembers);
  }

  return members;
};

/**
 * Get single team member by ID
 */
const getTeamMemberById = async (id) => {
  let member = await TeamMember.findById(id);
  if (!member) {
    member = await TeamMember.findOne({ memberId: id });
  }
  if (!member) {
    throw { status: 404, message: 'Team member profile not found' };
  }
  return member;
};

/**
 * Create a new team member
 */
const createTeamMember = async (memberData) => {
  if (!memberData.name) {
    throw { status: 400, message: 'Team member name is required' };
  }
  if (!memberData.role) {
    throw { status: 400, message: 'Team member role is required' };
  }
  if (!memberData.image) {
    throw { status: 400, message: 'Photo / Portrait image is required' };
  }

  // Generate memberId if not provided
  if (!memberData.memberId) {
    const count = await TeamMember.countDocuments();
    const formattedId = String(count + 1).padStart(2, '0');
    memberData.memberId = formattedId;
  }

  const newMember = await TeamMember.create(memberData);
  return newMember;
};

/**
 * Update existing team member
 */
const updateTeamMember = async (id, updateData) => {
  const updated = await TeamMember.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw { status: 404, message: 'Team member not found for update' };
  }

  return updated;
};

/**
 * Delete a team member
 */
const deleteTeamMember = async (id) => {
  const deleted = await TeamMember.findByIdAndDelete(id);
  if (!deleted) {
    throw { status: 404, message: 'Team member not found for deletion' };
  }
  return { success: true, message: 'Team member profile deleted successfully' };
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
