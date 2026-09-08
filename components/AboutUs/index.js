"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Target, Users, ArrowRight } from "lucide-react";

// --- Data Models ---
const objectives = [
  { title: "Cultural Preservation", desc: "Safeguarding ancestral heritage and ensuring historical accuracy.", icon: Shield },
  { title: "Social Empowerment", desc: "Uplifting marginalized voices through targeted educational support.", icon: Target },
  { title: "Community Unity", desc: "Fostering nationwide brotherhood and eliminating internal divides.", icon: Users },
];

const activities = [
  { 
    title: "Educational Drives", 
    subtitle: "Scholarships & Schooling", 
    desc: "Providing resources, books, and financial aid to underprivileged students across rural districts to ensure uninterrupted education.",
    image: "/gallery/image (1).webp"
  },
  { 
    title: "Disaster Relief Camps", 
    subtitle: "Rapid Response Units", 
    desc: "Mobilizing volunteers to provide food, shelter, and medical aid during natural calamities, ensuring no community is left behind.",
    image: "/gallery/image (2).webp"
  },
  { 
    title: "Heritage Conventions", 
    subtitle: "Annual Cultural Summits", 
    desc: "Organizing large-scale rallies and conventions to celebrate our history, honor our ancestors, and discuss future societal roadmaps.",
    image: "/gallery/image (3).webp"
  },
];

// Minimalist, high-end animation
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
};

export default function MissionVision() {
  return (
    <section id="mission" className="w-full bg-background py-12 overflow-hidden">
      
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* ========================================================= */}
        {/* 1. CENTERED MISSION & VISION                                */}
        {/* ========================================================= */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col items-center text-center max-w-4xl gap-6 w-full mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-karni-saffron" />
            <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-karni-saffron">
              Mission & Vision
            </span>
            <span className="w-8 h-[1px] bg-karni-saffron" />
          </motion.div>
          
          <motion.h2 variants={fadeUp} className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-[1.1] tracking-tight text-foreground">
            To unite and empower our community while safeguarding our <span className="text-karni-saffron">ancestral legacy</span>.
          </motion.h2>
          
          <motion.p variants={fadeUp} className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed max-w-2xl mx-auto mt-4">
            We stand as a pillar of strength, ensuring cultural preservation meets modern social responsibility through unwavering brotherhood and grassroots action.
          </motion.p>
        </motion.div>

        {/* ========================================================= */}
        {/* 2. KEY OBJECTIVES (Pristine Light Cards)                  */}
        {/* ========================================================= */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mb-24"
        >
          {objectives.map((obj, i) => (
            <motion.div 
              key={i}
              variants={fadeUp}
              className="group relative p-8 sm:p-10 rounded-[2rem] bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(250,158,25,0.08)] hover:border-karni-saffron/30 transition-all duration-500 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-background border border-black/5 flex items-center justify-center mb-6 group-hover:bg-karni-saffron/5 group-hover:text-karni-saffron transition-colors duration-500">
                <obj.icon size={28} strokeWidth={1.5} className="text-foreground group-hover:text-karni-saffron transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-3">{obj.title}</h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed">{obj.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        {/* ========================================================= */}
        {/* 4. GRASSROOTS IMPACT (Editorial White Cards)                */}
        {/* ========================================================= */}
        <div className="w-full flex flex-col gap-12 lg:gap-16">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col items-center text-center gap-3"
          >
            <h3 className="font-serif text-4xl sm:text-5xl text-foreground">Grassroots Impact</h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 uppercase tracking-[0.2em] font-bold">
              Active Social Initiatives
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          >
            {activities.map((act, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                className="group flex flex-col bg-white border border-black/5 rounded-[2rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-karni-saffron/20 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative w-full h-64 overflow-hidden bg-background">
                  <Image 
                    src={act.image}
                    alt={act.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  {/* Subtle inner shadow replacing the heavy gradient */}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none" />
                </div>
                
                {/* Content Container */}
                <div className="p-8 sm:p-10 flex flex-col flex-1 bg-white">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-karni-saffron mb-3">
                    {act.subtitle}
                  </span>
                  <h4 className="font-serif text-2xl text-foreground mb-4 group-hover:text-karni-saffron transition-colors duration-300">
                    {act.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed mb-8 flex-1">
                    {act.desc}
                  </p>
                  
                  {/* Action Link */}
                  <div className="mt-auto flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-foreground group-hover:text-karni-red transition-colors duration-300 cursor-pointer w-fit">
                    Explore Initiative 
                    <ArrowRight size={14} strokeWidth={2.5} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}