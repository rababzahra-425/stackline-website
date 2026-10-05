// import React from 'react';

// const servicesData = [
//     {
//         id: '01',
//         title: 'BRANDING STRATEGY',
//         subtitle: 'Strong & cohesive brand identity to connect with your audience.',
//         tag: '(Branding Services)',
//         imageLeft: true, // Image on Left, Text on Right
//         accentBg: 'from-rose-900/40 via-neutral-900 to-neutral-950',
//         mockupText: 'invt. Card (Free PSD)',
//     },
//     {
//         id: '02',
//         title: 'WEBSITE DESIGN',
//         subtitle: 'Custom & responsive websites that engage users and drive conversions.',
//         tag: '(Web Development)',
//         imageLeft: false, // Text on Left, Image on Right
//         accentBg: 'from-stone-900 via-neutral-900 to-stone-950',
//         mockupText: 'MacBook Pro Mockup',
//     },
//     {
//         id: '03',
//         title: 'UI/UX DESIGN',
//         subtitle: 'Intuitive digital experiences crafted with user-centric thinking.',
//         tag: '(Product Design)',
//         imageLeft: true, // Image on Left, Text on Right
//         accentBg: 'from-indigo-950/50 via-neutral-900 to-stone-950',
//         mockupText: 'Mobile App Concept',
//     },
// ];

// export const ServicesSection = () => {
//     return (
//         <section className="relative w-full bg-[#f4f4f0] text-neutral-900">

//             {/* 1. STICKY HEADER (Pins while service cards stack over it) */}
//             <div className="sticky top-0 z-10 flex min-h-[75vh] w-full flex-col justify-between px-6 pt-16 pb-12 md:px-16">

//                 {/* Top Meta Bar */}
//                 <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-500 md:text-sm">
//                     <span>(What we do)</span>
//                     <span className="h-2.5 w-2.5 rounded-full bg-neutral-900" />
//                     <span>(02)</span>
//                 </div>

//                 {/* Headline & Description */}
//                 <div className="mx-auto my-auto w-full max-w-[1500px] py-10">
//                     <h2 className="select-none text-7xl font-black uppercase tracking-tight leading-[0.85] sm:text-9xl lg:text-[11.5rem]">
//                         SERVICES
//                     </h2>
//                     <p className="mt-8 max-w-4xl text-balance text-xl font-normal leading-snug text-neutral-800 sm:text-3xl md:text-5xl">
//                         Discover our tailored services designed to elevate your brand, enhance user experience.
//                     </p>
//                 </div>

//                 <div className="h-2" />
//             </div>

//             {/* 2. STACKING CARDS CONTAINER */}
//             <div className="relative z-20 w-full px-4 pb-32 md:px-12">
//                 <div className="mx-auto max-w-[1500px] flex flex-col gap-16 md:gap-24">

//                     {servicesData.map((item, index) => (
//                         <div
//                             key={item.id}
//                             style={{ top: `${100 + index * 24}px` }}
//                             className="sticky w-full overflow-hidden bg-white text-neutral-950 shadow-[0_-20px_50px_rgba(0,0,0,0.09)] border-t border-neutral-200"
//                         >
//                             <div className={`grid grid-cols-1 md:grid-cols-2 min-h-[70vh]`}>

//                                 {/* Visual Image / Mockup Side */}
//                                 <div
//                                     className={`relative flex items-center justify-center p-8 overflow-hidden bg-gradient-to-br ${item.accentBg} ${item.imageLeft ? 'order-1' : 'order-1 md:order-2'
//                                         }`}
//                                 >
//                                     {/* Subtle Grid texture */}
//                                     <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:20px_20px]" />

//                                     {/* Mockup Card Display */}
//                                     <div className="relative aspect-[4/3] w-full max-w-md rounded-2xl bg-neutral-950/80 p-8 border border-white/10 shadow-2xl backdrop-blur-md flex flex-col justify-between text-white">
//                                         <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
//                                             {item.tag}
//                                         </span>
//                                         <span className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
//                                             {item.mockupText}
//                                         </span>
//                                         <span className="text-xs font-mono text-neutral-500">
//                                             Preview / Asset
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {/* Content Side */}
//                                 <div
//                                     className={`flex flex-col justify-between p-8 md:p-16 bg-[#eaeae6] ${item.imageLeft ? 'order-2' : 'order-2 md:order-1'
//                                         }`}
//                                 >
//                                     <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-500">
//                                         <span>{item.tag}</span>
//                                         <span className="h-2 w-2 rounded-full bg-neutral-800" />
//                                     </div>

//                                     <div className="my-auto py-10">
//                                         <h3 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-neutral-950">
//                                             {item.title}
//                                         </h3>
//                                         <p className="mt-6 max-w-lg text-lg sm:text-2xl font-normal leading-relaxed text-neutral-700">
//                                             {item.subtitle}
//                                         </p>
//                                     </div>

//                                     <div className="pt-4 border-t border-neutral-300/80 flex justify-between items-center text-xs font-mono tracking-widest text-neutral-500 uppercase">
//                                         <span>Explore Scope</span>
//                                         <span>→</span>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     ))}

//                 </div>
//             </div>

//         </section>
//     );
// };

// export default ServicesSection;



import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/shared/config/api';

const fallbackServicesData = [
    {
        id: '01',
        title: 'BRANDING STRATEGY',
        subtitle: 'Strong & cohesive brand identity to connect with your audience.',
        tag: '(Branding Services)',
        imageLeft: true,
        bgCard: 'bg-white dark:bg-[#18181b]',
        textCard: 'text-neutral-900 dark:text-white',
        mockupText: 'invt. Card (Free PSD)',
    },
    {
        id: '02',
        title: 'WEBSITE DESIGN',
        subtitle: 'Custom & responsive websites that engage users and drive conversions.',
        tag: '(Web Development)',
        imageLeft: false,
        bgCard: 'bg-[#f4f4f0] dark:bg-[#18181b]',
        textCard: 'text-neutral-900 dark:text-white',
        mockupText: 'MacBook Pro Mockup',
    },
    {
        id: '03',
        title: 'UI/UX DESIGN',
        subtitle: 'Intuitive digital experiences crafted with user-centric thinking.',
        tag: '(Product Design)',
        imageLeft: true,
        bgCard: 'bg-white dark:bg-[#09090b]',
        textCard: 'text-neutral-900 dark:text-white',
        mockupText: 'Mobile App Concept',
    },
];

export const ServicesSection = () => {
    const [servicesData, setServicesData] = useState(fallbackServicesData);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/services`);
                const json = await res.json();
                if (json.success && json.data && json.data.length > 0) {
                    const formatted = json.data.map((item, idx) => ({
                        id: item.serviceId || String(idx + 1).padStart(2, '0'),
                        title: item.title,
                        subtitle: item.subtitle,
                        tag: item.tag || '(Services)',
                        imageLeft: item.imageLeft ?? (idx % 2 === 0),
                        bgCard: item.bgCard || (idx % 2 === 1 ? 'bg-[#f4f4f0] dark:bg-[#18181b]' : 'bg-white dark:bg-[#18181b]'),
                        textCard: 'text-neutral-900 dark:text-white',
                        mockupText: item.mockup?.mockupText || item.title + ' Mockup',
                    }));
                    setServicesData(formatted);
                }
            } catch (err) {
                console.warn('Using fallback services data:', err);
            }
        };
        fetchServices();
    }, []);

    return (
        /* Outer Relative Wrapper with Negative Margin, Sharp Edges & Layer Shadow */
        <div className="relative z-20 w-full -mt-[8vh] sm:-mt-[8svh] rounded-none shadow-[0_-25px_60px_rgba(0,0,0,0.18)]">

            {/* 1. SERVICES TITLE SCREEN (Pins at top: 0) */}
            <div className="sticky top-0 z-10 min-h-screen w-full bg-[#f4f4f0] dark:bg-[#0d0d0e] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 flex flex-col justify-between px-6 pt-16 pb-12 md:px-16">
                {/* Top Bar */}
                <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 md:text-sm">
                    <span>(What we do)</span>
                    <span>(02)</span>
                </div>

                {/* Big Headline */}
                <div className="mx-auto my-auto w-full max-w-[1500px]">
                    <h2 className="font-hero-heading text-[48px] sm:text-[88px] md:text-[128px] lg:text-[140px] leading-[0.85] uppercase tracking-tight select-none mb-6 sm:mb-8 text-neutral-950 dark:text-white">
                        SERVICES
                    </h2>
                    <p className="font-sans mt-4 sm:mt-8 max-w-4xl text-lg sm:text-2xl md:text-4xl lg:text-5xl font-medium leading-snug sm:leading-tight text-neutral-800 dark:text-neutral-200 text-balance">
                        Discover our tailored services designed to elevate your brand, enhance user experience.
                    </p>
                </div>

                <div className="h-4" />
            </div>

            {/* 2. THE CARDS THAT STACK OVER THE TITLE & OVER EACH OTHER */}
            <div className="relative z-20 w-full">
                {servicesData.map((item, index) => (
                    <div
                        key={item.id || index}
                        /* Har card screen ke top par alag height par pin hoga */
                        style={{
                            top: `${60 + index * 24}px`,
                            zIndex: 30 + index,
                        }}
                        className="sticky min-h-[auto] sm:min-h-[75vh] w-full px-2 pb-8 sm:px-6 md:px-12"
                    >
                        <div
                            className={`mx-auto max-w-[1500px] min-h-[auto] sm:min-h-[70vh] border border-neutral-300 dark:border-neutral-800 shadow-2xl rounded-none overflow-hidden grid grid-cols-1 md:grid-cols-2 ${item.bgCard} ${item.textCard} transition-colors duration-300`}
                        >

                            {/* Visual Box */}
                            <div
                                className={`relative flex items-center justify-center p-4 sm:p-8 bg-neutral-100 dark:bg-neutral-900 border-b md:border-b-0 ${item.imageLeft ? 'order-1 md:border-r border-neutral-300 dark:border-neutral-800' : 'order-1 md:order-2 md:border-l border-neutral-300 dark:border-neutral-800'
                                    }`}
                            >
                                <div className="aspect-[16/10] sm:aspect-[4/3] w-full max-w-md rounded-none bg-neutral-950 p-4 sm:p-8 border border-white/10 flex flex-col justify-between text-white shadow-xl">
                                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400">
                                        {item.tag}
                                    </span>
                                    <span className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
                                        {item.mockupText}
                                    </span>
                                    <span className="text-[10px] sm:text-xs font-mono text-neutral-500">Asset Mockup</span>
                                </div>
                            </div>

                            {/* Text Box */}
                            <div
                                className={`flex flex-col justify-between p-5 sm:p-8 md:p-12 lg:p-16 ${item.imageLeft ? 'order-2' : 'order-2 md:order-1'
                                    }`}
                            >
                                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest opacity-60">
                                    <span>{item.tag}</span>
                                </div>

                                <div className="my-auto py-4 sm:py-10">
                                    <h3 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.92] text-balance">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 sm:mt-6 max-w-lg text-sm sm:text-xl md:text-2xl font-normal leading-relaxed opacity-85">
                                        {item.subtitle}
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ServicesSection;