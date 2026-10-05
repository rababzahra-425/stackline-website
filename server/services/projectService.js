const Project = require('../models/Project');

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const defaultProjects = [
  {
    title: 'KANBA',
    slug: 'kanba',
    headline: 'We delivered a sleek Framer development project.',
    client: 'Kanba',
    year: '2024',
    services: 'Branding, Website',
    storyTitle: 'SLEEK WEBSITE',
    storyDescription:
      'For Kanba, a leading creative agency, we delivered a sleek Framer development project that brought their online presence to life.\n\nFirst, we crafted a website design that not only captured the full artistic expression of Kanba but also provided them with an interactive showcase. Whether users visit from a desktop or a mobile device, our goal was to deliver a seamless and intuitive experience.\n\nNext, we built custom CMS structures so Kanba could easily update their portfolio. After launch, their brand visibility and client engagement increased dramatically.',
    mainImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
    ],
    order: 1,
    isFeatured: true,
  },
  {
    title: 'OUTOSIA STUDIO',
    slug: 'outosia-studio',
    headline: 'Redefining digital identity for an architectural powerhouse.',
    client: 'Outosia',
    year: '2024',
    services: 'Website Design, 3D Render',
    storyTitle: 'DIGITAL IDENTITY',
    storyDescription:
      'We partnered with Outosia Studio to design a bold, immersive digital platform highlighting their structural architectural work.',
    mainImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop',
    ],
    order: 2,
    isFeatured: true,
  },
];

/**
 * Get all projects (Auto-seeds initial projects if collection is empty)
 */
const getAllProjects = async () => {
  try {
    let projects = await Project.find().sort({ order: 1, createdAt: -1 });

    if (!projects || projects.length === 0) {
      console.log('🌱 Seeding initial studio projects...');
      projects = await Project.insertMany(defaultProjects);
    }

    return projects;
  } catch (err) {
    console.warn('⚠️ MongoDB query failed for projects, returning defaultProjects fallback');
    return defaultProjects;
  }
};

/**
 * Get single project by ID or Slug
 */
const getProjectByIdOrSlug = async (identifier) => {
  let project = await Project.findOne({ slug: identifier.toLowerCase() });
  if (!project && identifier.match(/^[0-9a-fA-F]{24}$/)) {
    project = await Project.findById(identifier);
  }
  if (!project) {
    throw { status: 404, message: 'Project not found' };
  }
  return project;
};

/**
 * Create a new project
 */
const createProject = async (projectData) => {
  if (!projectData.title) {
    throw { status: 400, message: 'Project title is required' };
  }
  if (!projectData.mainImage) {
    throw { status: 400, message: 'Main image is required' };
  }

  const slug = projectData.slug || slugify(projectData.title);

  const newProject = await Project.create({
    ...projectData,
    slug,
  });

  return newProject;
};

/**
 * Update an existing project
 */
const updateProject = async (id, updateData) => {
  if (updateData.title && !updateData.slug) {
    updateData.slug = slugify(updateData.title);
  }

  const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProject) {
    throw { status: 404, message: 'Project not found for update' };
  }

  return updatedProject;
};

/**
 * Delete a project
 */
const deleteProject = async (id) => {
  const deleted = await Project.findByIdAndDelete(id);
  if (!deleted) {
    throw { status: 404, message: 'Project not found for deletion' };
  }
  return { success: true, message: 'Project deleted successfully' };
};

module.exports = {
  getAllProjects,
  getProjectByIdOrSlug,
  createProject,
  updateProject,
  deleteProject,
};
