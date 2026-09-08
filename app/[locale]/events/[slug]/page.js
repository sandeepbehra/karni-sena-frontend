"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, MapPin, Calendar, Clock, 
  Share2, Users, ArrowUpRight 
} from "lucide-react";

// =====================================================================
// DUMMY CMS DATA (To be fetched via params.slug in a Server Component)
// =====================================================================
const eventData = {
  id: "national-heritage-summit",
  title: "National Heritage Summit",
  subtitle: "Annual General Convention & Grassroots Roadmap",
  category: "Convention",
  date: "October 15, 2026",
  time: "10:00 AM - 05:00 PM (IST)",
  location: "City Palace Grounds, Jaipur, Rajasthan",
  expectedAttendees: "10,000+",
  image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2000&auto=format&fit=crop",
  description: [
    "The National Heritage Summit serves as the cornerstone of our annual grassroots mobilization. This year, we are bringing together community leaders, prominent historians, and thousands of dedicated volunteers from across the nation to discuss the future roadmap for cultural preservation and social unity.",
    "During this all-day convention, attendees will participate in panel discussions focusing on the accurate representation of our history in modern educational curriculums, the expansion of our rural scholarship programs, and strategies for fostering stronger inter-community brotherhood.",
    "We invite every proud member of the community to join us. Your voice, your presence, and your dedication are vital to ensuring our legacy not only survives but thrives in the modern era. Registration is mandatory for security and logistical planning."
  ]
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
};

export default function EventDetails() {
  return (
    <main className="w-full min-h-screen bg-background pt-28 pb-24 lg:pt-36 selection:bg-karni-saffron selection:text-white">
      <article className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col">
        
        {/* ========================================================= */}
        {/* 1. BACK NAVIGATION & CATEGORY                             */}
        {/* ========================================================= */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="flex items-center justify-between mb-8"
        >
          <Link 
            href="/events" 
            className="flex items-center gap-2 text-neutral-500 hover:text-karni-saffron font-sans text-xs font-bold uppercase tracking-widest transition-colors duration-300"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            Back to Events
          </Link>
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-karni-red bg-karni-red/5 px-3 py-1.5 rounded-md">
            {eventData.category}
          </span>
        </motion.div>

        {/* ========================================================= */}
        {/* 2. EDITORIAL HEADER                                       */}
        {/* ========================================================= */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="max-w-4xl mb-12"
        >
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-foreground leading-[1.05] tracking-tight mb-6">
            {eventData.title}
          </h1>
          <p className="font-sans text-lg sm:text-xl text-neutral-500 font-medium tracking-wide">
            {eventData.subtitle}
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* 3. CINEMATIC FEATURE IMAGE                                */}
        {/* ========================================================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="relative w-full h-[40vh] sm:h-[60vh] rounded-[2rem] overflow-hidden mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5"
        >
          <Image 
            src={eventData.image} 
            alt={eventData.title} 
            fill 
            priority
            sizes="100vw"
            className="object-cover object-center transform hover:scale-105 transition-transform duration-[2s] ease-out"
          />
          {/* Subtle inner shadow overlay */}
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] pointer-events-none" />
        </motion.div>

        {/* ========================================================= */}
        {/* 4. CONTENT & STICKY SIDEBAR GRID                          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Rich Text Description (Spans 7 columns) */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6"
          >
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-karni-saffron mb-2">
              About The Event
            </h3>
            
            <div className="prose prose-lg prose-neutral max-w-none">
              {eventData.description.map((paragraph, index) => (
                <p key={index} className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* In-article Share Actions */}
            <div className="mt-12 pt-8 border-t border-black/5 flex items-center gap-4">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-foreground">Share:</span>
              <button className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-neutral-500 hover:border-karni-saffron hover:text-karni-saffron transition-all duration-300">
                <Share2 size={16} />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Sticky Event Details Card (Spans 4 columns) */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="lg:col-span-5 xl:col-span-4"
          >
            <div className="sticky top-32 bg-white rounded-[2rem] p-8 sm:p-10 border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col gap-8">
              
              {/* Event Meta List */}
              <ul className="flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-karni-saffron/10 flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-karni-saffron" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Date</span>
                    <span className="font-sans text-sm font-semibold text-foreground">{eventData.date}</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-karni-saffron/10 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-karni-saffron" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Time</span>
                    <span className="font-sans text-sm font-semibold text-foreground">{eventData.time}</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-karni-saffron/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-karni-saffron" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Location</span>
                    <span className="font-sans text-sm font-semibold text-foreground leading-snug">{eventData.location}</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-karni-saffron/10 flex items-center justify-center shrink-0">
                    <Users size={18} className="text-karni-saffron" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Expected Turnout</span>
                    <span className="font-sans text-sm font-semibold text-foreground">{eventData.expectedAttendees}</span>
                  </div>
                </li>
              </ul>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <button className="w-full py-4 bg-karni-saffron text-white rounded-xl font-sans text-xs font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(250,158,25,0.2)] hover:shadow-[0_15px_30px_rgba(250,158,25,0.3)] hover:-translate-y-0.5 transition-all duration-300 group">
                  Volunteer Now
                  <ArrowUpRight size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <button className="w-full py-4 bg-transparent border border-black/10 text-foreground rounded-xl font-sans text-xs font-bold uppercase tracking-[0.15em] hover:border-karni-saffron hover:text-karni-saffron transition-all duration-300">
                  Contact Organizer
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </article>
    </main>
  );
}