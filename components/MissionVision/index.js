"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Target, Users } from "lucide-react";

// --- Data Models ---
const objectives = [
  { title: "Cultural Preservation", desc: "Safeguarding ancestral heritage and historical accuracy.", icon: Shield },
  { title: "Social Empowerment", desc: "Uplifting marginalized voices through education.", icon: Target },
  { title: "Community Unity", desc: "Fostering nationwide brotherhood and eliminating divides.", icon: Users },
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

// Reusable micro-animation configuration
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
};

export default function MissionVision() {
  return (
    <section id="mission" className="relative w-full bg-[#0a0a0a] text-white">
      
      {/* ========================================================= */}
      {/* 1. BACKGROUND IMAGE WITH LUXURY OVERLAY                     */}
      {/* ========================================================= */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/gallery/image (3).webp"
          alt="Karni Sena Background"
          fill
          className="object-cover object-center opacity-40"
        />
        {/* Luxury gradient overlay: dark at top, fades to solid dark at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/30 to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col items-center">
        
        {/* ========================================================= */}
        {/* 2. CENTERED MISSION & VISION                                */}
        {/* ========================================================= */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex flex-col items-center text-center max-w-3xl gap-6 w-full"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-white/20" />
            <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[var(--color-karni-saffron)]">
              Mission & Vision
            </span>
            <span className="w-12 h-[1px] bg-white/20" />
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-3xl leading-[1.2] tracking-tight text-white/95">
            To <span className="italic text-[var(--color-karni-saffron)]">unite</span> and empower our community while safeguarding our ancestral legacy for future generations.
          </h2>
          
          <p className="font-sans text-sm text-white/50 leading-relaxed max-w-xl mx-auto">
            We stand as a pillar of strength, ensuring cultural preservation meets modern social responsibility through unwavering brotherhood.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* 3. KEY OBJECTIVES (Directly beneath Mission)                */}
        {/* ========================================================= */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-24"
        >
          {objectives.map((obj, i) => (
            <motion.div 
              key={i}
              variants={fadeUp}
              className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500 overflow-hidden text-center sm:text-left flex flex-col items-center sm:items-start"
            >
              {/* Subtle Hover Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--color-karni-saffron)]/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="p-4 rounded-full bg-white/5 mb-6 group-hover:bg-[var(--color-karni-saffron)]/10 transition-colors duration-500">
                <obj.icon size={24} strokeWidth={1.5} className="text-[var(--color-karni-saffron)]" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-white mb-3">{obj.title}</h3>
              <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed">{obj.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider to separate sections visually */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />

        {/* ========================================================= */}
        {/* 4. SOCIAL CONTRIBUTIONS (Image Grid)                        */}
        {/* ========================================================= */}
        <div className="w-full flex flex-col gap-12 lg:gap-16">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col items-center text-center gap-3"
          >
            <h3 className="font-serif text-3xl sm:text-4xl text-white">Grassroots Impact</h3>
            <p className="font-sans text-xs sm:text-sm text-white/50 uppercase tracking-[0.2em]">Active Social Initiatives</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {activities.map((act, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                className="group flex flex-col bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-[var(--color-karni-saffron)]/30 transition-colors duration-500"
              >
                {/* Image Container with Sleek Hover Scale */}
                <div className="relative w-full h-56 sm:h-64 overflow-hidden">
                  <Image 
                    src={act.image}
                    alt={act.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  {/* Inner Gradient for seamless blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                </div>
                
                {/* Content Container */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-10 -mt-12 sm:-mt-4">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-karni-saffron)] mb-2 drop-shadow-md">
                    {act.subtitle}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-white mb-3 group-hover:text-[var(--color-karni-saffron)] transition-colors duration-300">
                    {act.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed mb-8 flex-1">
                    {act.desc}
                  </p>
                  
                  {/* Subtle Call to Action Micro-interaction */}
                  <div className="mt-auto flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-white/30 group-hover:text-white transition-colors duration-300 cursor-pointer">
                    Learn More 
                    <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
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