import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { SeoHead } from '../../../components/common/SeoHead';
import { API_BASE_URL } from '@/shared/config/api';

const fallbackServiceCategories = [
    {
        id: '01',
        title: 'BRAND STRATEGY',
        overview:
            'We create compelling brand identities that resonate with your audience, helping you establish a strong presence and foster meaningful connections.',
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
        id: '02',
        title: 'WEBSITE DESIGN',
        overview:
            'Our website design services focus on crafting visually stunning, user-friendly sites that effectively communicate your brand and drive high conversion rates.',
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
        id: '03',
        title: 'UI/UX DESIGN',
        overview:
            'We enhance user experiences through intuitive UI/UX design, ensuring seamless interactions that delight users and meet your strategic goals.',
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

const testimonials = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop',
        tag: '(Lumina)',
        headline: 'Exceptional Branding That Elevated Our Identity.',
        quote: 'Their approach completely transformed our brand. We’ve seen a huge increase in recognition and client engagement!',
        author: 'Dave Mitchell',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
        tag: '(Horizon)',
        headline: 'Outstanding Website Design, Exceeding Expectations.',
        quote: 'The website they created is stunning, user-friendly, and has boosted our online conversions significantly.',
        author: 'Sara Thompson',
    },
];

const processSteps = [
    {
        num: '01',
        phase: '(Discovery)',
        title: 'Understanding Your Unique Needs.',
        desc: 'We start by learning everything about your business goals, target audience, and challenges to map out a clear roadmap.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop',
    },
    {
        num: '02',
        phase: '(Design)',
        title: 'Crafting Innovative Solutions.',
        desc: 'Translating concepts into clean, accessible visuals and cohesive systems tailored to engage your customers.',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop',
    },
    {
        num: '03',
        phase: '(Development)',
        title: 'Bringing Ideas to Life.',
        desc: 'In the development stage, we transform approved designs into fully functional websites or applications with top-notch performance.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop',
    },
    {
        num: '04',
        phase: '(Launch & Support)',
        title: 'Seamless Deployment and Beyond.',
        desc: 'We ensure a smooth, error-free launch with thorough quality checks, followed by continuous maintenance and guidance.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop',
    },
];

export const ServicePage = () => {
    const [serviceCategories, setServiceCategories] = useState(fallbackServiceCategories);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/services`);
                const json = await res.json();
                if (json.success && json.data && json.data.length > 0) {
                    const formatted = json.data.map((item, idx) => ({
                        id: item.serviceId || String(idx + 1).padStart(2, '0'),
                        title: item.title,
                        overview: item.overview || item.subtitle,
                        items: item.items || [],
                    }));
                    setServiceCategories(formatted);
                }
            } catch (err) {
                console.warn('Using fallback service categories:', err);
            }
        };
        fetchCategories();
    }, []);

    const prevTestimonial = () => {
        setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const nextTestimonial = () => {
        setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    return (
        <PageHeader bgImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop">
            <SeoHead pageKey="service" />
            {/* 1. HERO SECTION */}
            <section className="px-6 md:px-16 max-w-[1550px] mx-auto pb-16">
                <h1 className="font-hero-heading text-[48px] sm:text-[88px] md:text-[110px] lg:text-[140px] uppercase tracking-tight leading-[0.85] select-none mb-8 text-neutral-950 dark:text-white">
                    SERVICES
                </h1>
                <p className="font-sans text-2xl sm:text-4xl md:text-5xl font-normal leading-tight max-w-4xl text-neutral-800 dark:text-neutral-300 text-balance">
                    Explore our tailored services designed to elevate your brand.
                </p>
            </section>

            {/* 2. TOP DUAL MOCKUPS */}
            <section className="w-full px-6 md:px-16 max-w-[1550px] mx-auto pb-28">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-900">
                        <img
                            src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop"
                            alt="Mockup 1"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-900">
                        <img
                            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop"
                            alt="Mockup 2"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* 3. STICKY CATEGORIES DEEP-DIVE */}
            <section className="w-full px-6 md:px-16 max-w-[1550px] mx-auto pb-32">
                {serviceCategories.map((category) => (
                    <div
                        key={category.id}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 border-t border-neutral-300 dark:border-neutral-800 relative"
                    >
                        {/* Left: Sticky Category Title */}
                        <div className="lg:col-span-5 relative">
                            <div className="lg:sticky lg:top-32">
                                <h2 className="font-hero-heading text-[22px] sm:text-[26px] lg:text-[30px] uppercase tracking-tight leading-[0.88] text-neutral-900 dark:text-white">
                                    {category.title}
                                </h2>
                            </div>
                        </div>

                        {/* Right: Overview + Accordion-style List */}
                        <div className="lg:col-span-7 flex flex-col gap-16">
                            <p className="text-lg sm:text-2xl lg:text-[30px] font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
                                {category.overview}
                            </p>

                            <div className="flex flex-col divide-y divide-neutral-300 dark:divide-neutral-800">
                                {category.items.map((sub, idx) => (
                                    <div key={idx} className="py-8 first:pt-0">
                                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-neutral-900 dark:text-white">
                                            {sub.title}
                                        </h3>
                                        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl font-light">
                                            {sub.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* 4. CLIENTS TESTIMONIAL SLIDER */}
            {/* <section className="w-full border-t border-neutral-300 dark:border-neutral-800 bg-[#f4f4f0] dark:bg-[#0d0d0d] text-neutral-900 dark:text-white px-6 md:px-16 py-28 transition-colors duration-300">
                <div className="max-w-[1550px] mx-auto">

                    <div className="mb-20">
                        <h2 className="font-hero-heading text-[48px] sm:text-[88px] md:text-[110px] lg:text-[140px] uppercase tracking-tight leading-[0.85] mb-6 select-none text-neutral-950 dark:text-white">
                            WHAT OUR <br /> CLIENTS SAY
                        </h2>
                        <p className="text-xl sm:text-3xl text-neutral-600 dark:text-neutral-400">
                            See what our satisfied clients say about working with us.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] w-full bg-neutral-200 dark:bg-neutral-900 overflow-hidden">
                <img
                    src={testimonials[activeTestimonial].image}
                    alt="Client Product Showcase"
                    className="w-full h-full object-cover"
                />

                <div className="absolute bottom-6 left-6 flex gap-3">
                    <button
                        onClick={prevTestimonial}
                        className="h-12 w-12 rounded-full bg-white/80 dark:bg-black/70 backdrop-blur-md border border-neutral-300 dark:border-white/20 flex items-center justify-center text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className="h-12 w-12 rounded-full bg-white/80 dark:bg-black/70 backdrop-blur-md border border-neutral-300 dark:border-white/20 flex items-center justify-center text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                    >
                        →
                    </button>
                </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center lg:pl-10">
                <span className="text-neutral-500 dark:text-neutral-400 font-mono text-sm tracking-wider uppercase mb-6">
                    “ {testimonials[activeTestimonial].tag}
                </span>
                <h3 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-tight mb-8 text-neutral-900 dark:text-white">
                    {testimonials[activeTestimonial].headline}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg sm:text-xl leading-relaxed mb-6 font-light">
                    {testimonials[activeTestimonial].quote}
                </p>
                <span className="text-neutral-900 dark:text-white font-bold tracking-wider uppercase text-sm">
                    — {testimonials[activeTestimonial].author}
                </span>
            </div>

        </div>

                </div >
            </section > */}

            {/* 5. PROCESS SECTION */}
            <section className="relative w-full bg-[#f4f4f0] dark:bg-[#0d0d0e] text-neutral-900 dark:text-white transition-colors duration-300 pt-16 pb-40">

                {/* 1. STICKY HEADER: Top-12 par stick karega, koi negative margin nahi */}
                <div className="sticky top-10 md:top-14 z-10 w-full px-6 md:px-16 mb-16 md:mb-20">
                    <div className="mx-auto max-w-[1400px]">

                        {/* Top Meta Bar */}
                        <div className="flex w-full items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 md:text-sm mb-8">
                            <span>(How we work)</span>
                            <span>(03)</span>
                        </div>

                        {/* Main Title & Subtitle */}
                        <div className="max-w-5xl">
                            <h2 className="font-hero-heading text-[48px] sm:text-[88px] md:text-[110px] lg:text-[140px] uppercase tracking-tight leading-[0.85] select-none mb-6 text-neutral-950 dark:text-white">
                                PROCESS
                            </h2>
                            <p className="max-w-4xl text-xl sm:text-2xl md:text-4xl font-normal leading-snug text-neutral-800 dark:text-neutral-200 text-balance">
                                Our proven process ensures successful outcomes and client satisfaction every time.
                            </p>
                        </div>

                    </div>
                </div>

                {/* 2. STACKING CARDS: Text ke theek baad se start honge aur screen me perfectly fit aayenge */}
                <div className="relative z-20 w-full px-4 md:px-12">
                    <div className="mx-auto max-w-[1400px] flex flex-col gap-12 md:gap-16">
                        {processSteps.map((step, index) => (
                            <div
                                key={step.num}
                                style={{
                                    /* Har card top se ek balanced distance par pin hoga */
                                    top: `${80 + index * 20}px`,
                                }}
                                className="sticky w-full overflow-hidden bg-white dark:bg-[#18181b] text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] transition-colors duration-300"
                            >
                                {/* Card height strictly bounded taaki kisi bhi screen pe niche se na kate */}
                                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px] md:h-[62vh] max-h-[580px]">

                                    {/* Left Image */}
                                    <div className="md:col-span-6 relative h-60 md:h-full w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="h-full w-full object-cover grayscale contrast-110"
                                        />
                                    </div>

                                    {/* Right Content */}
                                    <div className="md:col-span-6 flex flex-col justify-between p-6 sm:p-8 md:p-12 bg-white dark:bg-[#18181b] transition-colors duration-300">
                                        <div>
                                            <span className="block text-6xl sm:text-7xl md:text-8xl font-black text-neutral-950 dark:text-white leading-none select-none">
                                                {step.num}
                                            </span>
                                            <span className="mt-2 block font-mono text-xs md:text-sm tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
                                                {step.phase}
                                            </span>
                                        </div>

                                        <div className="my-auto py-4">
                                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight text-neutral-950 dark:text-white mb-3">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 font-light max-w-lg">
                                                {step.desc}
                                            </p>
                                        </div>

                                        <div className="h-1" />
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>

        </PageHeader>
    );
};

export default ServicePage;