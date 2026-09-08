"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function HeroIntroduction({ onOpenModal }) {
  // Reusable, sleek animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  };

  return (
    <section 
      id="introduction" 
      className="relative w-full min-h-screen flex flex-col lg:flex-row items-center bg-[#FBFBF9] overflow-hidden"
    >
      {/* ========================================================= */}
      {/* LEFT: CONTENT & BRAND IDENTITY                            */}
      {/* ========================================================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end pt-32 pb-16 lg:py-0 px-6 lg:px-12 xl:px-20 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Organization Logo */}
          <motion.div variants={fadeUp} className="relative w-32 h-32 sm:w-40 sm:h-40 mb-8">
            <Image
              src="/logo-full.png"
              alt="Karni Sena Official Logo"
              fill
              priority
              className="object-contain lg:object-left"
            />
          </motion.div>

          {/* Organization Title */}
          <motion.div variants={fadeUp} className="mb-6">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-3">
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
                Official Portal of
              </h2>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.05] tracking-tight text-[#2A2A2A]">
              Shree Rajput <br />
              <span className="text-karni-saffron">Karni Sena</span>
            </h1>
          </motion.div>

          {/* Short Introduction */}
          <motion.p 
            variants={fadeUp}
            className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md mb-10"
          >
            Committed to social integrity, cultural heritage, and the relentless empowerment of our community through nationwide unity and grassroots initiatives.
          </motion.p>

          {/* High-End Action Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={onOpenModal}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-karni-saffron text-white font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-sm shadow-[0_10px_30px_rgba(250,158,25,0.2)] hover:shadow-[0_15px_40px_rgba(250,158,25,0.3)] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Join the Movement
              <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-black/10 text-[#2A2A2A] font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-sm hover:border-karni-saffron hover:text-karni-saffron hover:bg-black/5 transition-all duration-300">
              <ShieldCheck size={18} strokeWidth={2} />
              Our Legacy
            </button> */}
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT: FULL HEIGHT SPLIT IMAGE                            */}
      {/* ========================================================= */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen lg:absolute lg:right-0 lg:top-0"
      >
        {/* Subtle Inner shadow to blend the edge nicely */}
        <div className="absolute inset-0 z-10 shadow-[inset_20px_0_40px_rgba(251,251,249,0.3)] hidden lg:block pointer-events-none" />
        
        <Image
          src="/about2.webp"
          alt="Shri Sukhdev Singh Addressing Karni Sena"
          fill
          priority
          className="object-cover object-top sm:object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>

    </section>
  );
}