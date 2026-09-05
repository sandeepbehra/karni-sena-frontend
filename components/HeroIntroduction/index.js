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
      transition: { staggerChildren: 0.15, delayChildren: 0.4 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
  };

  return (
    <section 
      id="introduction" 
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* ========================================================= */}
      {/* 1. FULL-BLEED CINEMATIC BACKGROUND IMAGE                    */}
      {/* ========================================================= */}
      <motion.div 
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 w-full h-full"
      >
        <Image
          src="/about2.webp"
          alt="Shri Sukhdev Singh Addressing Karni Sena"
          fill
          priority
          className="object-cover object-top sm:object-center"
          sizes="100vw"
        />
        
        {/* 
          The Ultimate Editorial Gradient: 
          Pitch black on the left for text readability, fading to completely transparent on the right 
          so the leader and crowd remain perfectly visible.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
        
        {/* Bottom fade to blend seamlessly into the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent opacity-10" />
      </motion.div>

      {/* ========================================================= */}
      {/* 2. LEFT ALIGNED CONTENT & MASSIVE LOGO                      */}
      {/* ========================================================= */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-12">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-[60%] xl:w-[50%] flex flex-col items-start text-left"
        >
          {/* Much Bigger Organization Logo */}
          <motion.div variants={fadeUp} className="relative w-36 h-36 sm:w-48 sm:h-48 drop-shadow-2xl">
            <Image
              src="/logo-full.png"
              alt="Karni Sena Official Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </motion.div>

          {/* Organization Title */}
          <motion.div variants={fadeUp} className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-karni-saffron)]">
                Official Portal of
              </h2>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight text-white drop-shadow-lg">
              Shree Rajput <br />
              <span className="text-[var(--color-karni-saffron)] italic">Karni Sena</span>
            </h1>
          </motion.div>

          {/* Short Introduction */}
          <motion.p 
            variants={fadeUp}
            className="font-sans text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-lg mb-10 drop-shadow-md"
          >
            Committed to social integrity, cultural heritage, and the relentless empowerment of our community through nationwide unity and grassroots initiatives.
          </motion.p>

          {/* High-End Action Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <button 
              onClick={onOpenModal}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-karni-saffron)] text-white font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-md shadow-[0_10px_40px_rgba(250,158,25,0.3)] hover:shadow-[0_10px_50px_rgba(250,158,25,0.5)] hover:-translate-y-1 transition-all duration-300 group"
            >
              Join the Movement
              <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-md hover:bg-white/10 hover:border-white/40 transition-all duration-300">
              <ShieldCheck size={18} strokeWidth={2} className="text-[var(--color-karni-saffron)]" />
              Our Legacy
            </button>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}