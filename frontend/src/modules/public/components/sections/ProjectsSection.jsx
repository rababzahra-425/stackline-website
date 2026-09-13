// import React from 'react';

// export const ProjectsSection = () => {
//     return (
//         /* Full-width wrapper with zero side gaps */
//         <section className="relative z-20 w-full -mt-20 md:-mt-28">

//             {/* 100% Full-width Sharp Edge Overlapping Card */}
//             <div className="w-full min-h-[90vh] bg-[#f3f3f0] text-neutral-900 shadow-[0_-20px_50px_rgba(0,0,0,0.12)] px-6 py-12 md:px-16 md:py-20 flex flex-col justify-between">

//                 {/* Top Meta Bar */}
//                 <div className="w-full max-w-[1500px] mx-auto flex justify-between items-center text-xs md:text-sm font-mono tracking-widest text-neutral-500 uppercase">
//                     <span>(Selected Work)</span>
//                     <span>(01)</span>
//                 </div>

//                 {/* Balanced Text Area */}
//                 <div className="w-full max-w-[1500px] mx-auto my-auto py-12">
//                     <h2 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-black uppercase tracking-tight leading-[0.88] mb-8 select-none">
//                         PROJECTS
//                     </h2>
//                     <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-normal leading-snug md:leading-tight text-neutral-800 max-w-4xl text-balance">
//                         Explore our recent projects showcasing creativity, innovation, and impactful design solutions.
//                     </p>
//                 </div>

//                 {/* Bottom Bar */}
//                 <div className="w-full max-w-[1500px] mx-auto flex justify-between items-center text-xs font-mono tracking-widest text-neutral-400 uppercase pt-6 border-t border-neutral-300/60">
//                     <span>Featured Portfolio</span>
//                     <span>Scroll to explore ↓</span>
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default ProjectsSection;

import React from 'react';

const projects = [
    {
        id: 1,
        title: 'Acme',
        year: '2024',
        bgGradient: 'from-stone-800 via-stone-700 to-stone-900',
        logo: 'acme',
    },
    {
        id: 2,
        title: 'Kanba',
        year: '2024',
        bgGradient: 'from-zinc-900 via-neutral-800 to-stone-900',
        logo: 'kanba',
    },
    {
        id: 3,
        title: 'OUTOSIA',
        year: '2024',
        bgGradient: 'from-neutral-800 via-zinc-800 to-neutral-950',
        logo: 'OUTOSIA',
    },
    {
        id: 4,
        title: 'goldline',
        year: '2024',
        bgGradient: 'from-stone-900 via-neutral-900 to-stone-800',
        logo: 'goldline',
    },
];

export const ProjectsSection = () => {
    return (
        <section className="relative z-10 w-full -mt-[8vh] sm:-mt-[8svh] rounded-none shadow-[0_-25px_60px_rgba(0,0,0,0.18)] bg-[#f4f4f0] dark:bg-[#0d0d0e] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 px-4 py-12 sm:px-6 sm:py-16 md:px-16 md:py-24">
            <div className="mx-auto max-w-[1500px]">

                {/* Top Info row */}
                <div className="flex w-full justify-between items-center text-xs md:text-sm font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-8 sm:mb-12">
                    <span>(Selected Work)</span>
                    <span>(01)</span>
                </div>

                {/* Big Typography Header */}
                <div className="max-w-5xl mb-12 sm:mb-16 md:mb-24">
                    <h2 className="font-hero-heading text-[48px] sm:text-[88px] md:text-[128px] lg:text-[160px] 2xl:text-[192px] leading-[0.88] uppercase select-none mb-6 sm:mb-8">
                        PROJECTS
                    </h2>
                    <p className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-medium leading-snug sm:leading-tight text-neutral-800 dark:text-neutral-200 max-w-4xl text-balance">
                        Explore our recent projects showcasing creativity, innovation, and impactful design solutions.
                    </p>
                </div>

                {/* Projects Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-12 sm:gap-y-16">
                    {projects.map((item) => (
                        <div key={item.id} className="group flex flex-col cursor-pointer">

                            {/* Project Card Graphic / Picture */}
                            <div className={`relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br ${item.bgGradient}`}>

                                {/* Subtle texture */}
                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] transition-transform duration-700 ease-out group-hover:scale-105" />

                                {/* Center Brand Name / Logo */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white/90 drop-shadow-md select-none">
                                        {item.logo}
                                    </span>
                                </div>

                                {/* Top-Right Round Arrow Action Button */}
                                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-black">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-4 w-4 sm:h-5 sm:w-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </div>
                            </div>

                            {/* Title & Year Info Bar */}
                            <div className="flex items-center justify-between pt-3 sm:pt-4 pb-2 border-b border-neutral-300 dark:border-neutral-800">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 capitalize">
                                    {item.title}
                                </h3>
                                <span className="font-mono text-xs sm:text-sm tracking-wider text-neutral-500 dark:text-neutral-400">
                                    ({item.year})
                                </span>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};


export default ProjectsSection;