const Service = require('../models/Service');

// Helper to slugify titles
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const defaultServices = [
  {
    serviceId: '01',
    title: 'BRAND STRATEGY',
    slug: 'brand-strategy',
    subtitle: 'Strong & cohesive brand identity to connect with your audience.',
    overview: 'We create compelling brand identities that resonate with your audience, helping you establish a strong presence and foster meaningful connections.',
    tag: '(Branding Services)',
    imageLeft: true,
    bgCard: 'bg-white dark:bg-[#18181b]',
    mockup: { mockupText: 'invt. Card (Free PSD)', imageUrl: '' },
    order: 1,
    isFeatured: true,
    items: [
      {
        title: 'Brand Discovery & Research',
        desc: 'In-depth brand discovery and research help us understand your business, target audience, and market landscape. We conduct comprehensive analyses to uncover valuable insights that inform your brand strategy.',
      },
      {
        title: 'Logo & Visual Identity Design',
        desc: 'Our logo and visual identity design services focus on crafting memorable and impactful brand elements, complemented by cohesive typography, color palettes, and graphic systems.',
      },
      {
        title: 'Brand Messaging & Positioning',
        desc: 'We develop compelling messaging frameworks and positioning strategies that articulate your unique value proposition with crystal clarity.',
      },
      {
        title: 'Brand Guidelines Creation',
        desc: 'Comprehensive brand books and style guides that ensure absolute design consistency across all digital and physical mediums.',
      },
    ],
  },
  {
    serviceId: '02',
    title: 'WEBSITE DESIGN',
    slug: 'website-design',
    subtitle: 'Custom & responsive websites that engage users and drive conversions.',
    overview: 'Our website design services focus on crafting visually stunning, user-friendly sites that effectively communicate your brand and drive high conversion rates.',
    tag: '(Web Development)',
    imageLeft: false,
    bgCard: 'bg-[#f4f4f0] dark:bg-[#18181b]',
    mockup: { mockupText: 'MacBook Pro Mockup', imageUrl: '' },
    order: 2,
    isFeatured: true,
    items: [
      {
        title: 'Custom Website Design',
        desc: 'Bespoke designs tailored specifically to your audience behaviors, ensuring maximum visual engagement and intuitive journeys.',
      },
      {
        title: 'Webflow Development',
        desc: 'Clean, scalable, and responsive Webflow builds equipped with intuitive CMS structures for effortless content management.',
      },
      {
        title: 'Website Maintenance & Support',
        desc: 'Continuous performance optimization, security monitoring, and design iterations to keep your digital platform fast and current.',
      },
    ],
  },
  {
    serviceId: '03',
    title: 'UI/UX DESIGN',
    slug: 'ui-ux-design',
    subtitle: 'Intuitive digital experiences crafted with user-centric thinking.',
    overview: 'We enhance user experiences through intuitive UI/UX design, ensuring seamless interactions that delight users and meet your strategic goals.',
    tag: '(Product Design)',
    imageLeft: true,
    bgCard: 'bg-white dark:bg-[#09090b]',
    mockup: { mockupText: 'Mobile App Concept', imageUrl: '' },
    order: 3,
    isFeatured: true,
    items: [
      {
        title: 'User Research & Personas Development',
        desc: 'Deep analytical testing and behavioral mapping to identify real pain points and user preferences before designing a single screen.',
      },
      {
        title: 'Wireframing & Prototyping',
        desc: 'Interactive prototypes and high-fidelity wireframes that allow us to test and validate workflows rapidly.',
      },
      {
        title: 'UI/UX Audits & Redesigns',
        desc: 'Comprehensive usability audits on existing products to eliminate friction, improve navigation, and elevate overall aesthetics.',
      },
    ],
  },
];

/**
 * Get all services (Auto-seeds default services if collection is empty)
 */
const getAllServices = async () => {
  let services = await Service.find().sort({ order: 1, createdAt: 1 });

  if (!services || services.length === 0) {
    console.log('🌱 Seeding initial studio services...');
    services = await Service.insertMany(defaultServices);
  }

  return services;
};

/**
 * Get single service by ID
 */
const getServiceById = async (id) => {
  const service = await Service.findById(id);
  if (!service) {
    throw { status: 404, message: 'Service not found' };
  }
  return service;
};

/**
 * Create a new service
 */
const createService = async (serviceData) => {
  if (!serviceData.title) {
    throw { status: 400, message: 'Service title is required' };
  }

  const slug = serviceData.slug || slugify(serviceData.title);

  let serviceId = serviceData.serviceId;
  const isDuplicateId = serviceId ? await Service.exists({ serviceId }) : false;

  if (!serviceId || isDuplicateId) {
    const services = await Service.find({}, { serviceId: 1 });
    let maxId = 0;
    for (const s of services) {
      const num = parseInt(s.serviceId, 10);
      if (!isNaN(num) && num > maxId) {
        maxId = num;
      }
    }
    let nextNum = maxId + 1;
    let candidateId = String(nextNum).padStart(2, '0');

    while (await Service.exists({ serviceId: candidateId })) {
      nextNum++;
      candidateId = String(nextNum).padStart(2, '0');
    }
    serviceId = candidateId;
  }

  const newService = await Service.create({
    ...serviceData,
    slug,
    serviceId,
  });

  return newService;
};

/**
 * Update an existing service
 */
const updateService = async (id, updateData) => {
  if (updateData.title && !updateData.slug) {
    updateData.slug = slugify(updateData.title);
  }

  const updatedService = await Service.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedService) {
    throw { status: 404, message: 'Service not found for update' };
  }

  return updatedService;
};

/**
 * Delete a service
 */
const deleteService = async (id) => {
  const deletedService = await Service.findByIdAndDelete(id);
  if (!deletedService) {
    throw { status: 404, message: 'Service not found for deletion' };
  }
  return { success: true, message: 'Service deleted successfully' };
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
