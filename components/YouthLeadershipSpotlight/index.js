"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Award, HeartHandshake, Quote, ArrowRight } from "lucide-react";

export default function YouthLeadershipSpotlight({ data }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <section className="w-full bg-background py-10 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Pre-title */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-karni-saffron">
            Youth Leadership & Direction
          </span>
        </div>

        {/* Asymmetric Profile Card */}
        <div className="bg-white rounded-[2.5rem] border border-black/5 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 shadow-xl border border-black/5">
              <Image
                src="/leadership/neal-singh-deo.webp"
                alt="Sri Nilamadhab Singh Deo - Neal Dada"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              
              {/* Alias Tag */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-white/40">
                <span className="font-sans text-xs font-bold text-foreground">
                  Popularly known as <span className="text-karni-red">&ldquo;Neal Dada&rdquo;</span>
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-karni-red font-sans text-xs font-bold uppercase tracking-widest mb-3">
              <Shield size={16} strokeWidth={2} />
              National Youth President
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.1] tracking-tight mb-2">
              Sri Nilamadhab Singh Deo
            </h2>
            
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-neutral-400 font-semibold mb-6">
              M. Rampur Royal Family &bull; Kalahandi, Odisha
            </p>

            {/* Featured Quote Box */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-[#FBFBF9] border-l-4 border-karni-saffron mb-6">
              <Quote className="text-karni-saffron/30 absolute top-4 right-4" size={32} />
              <p className="font-serif text-base sm:text-lg text-foreground italic leading-relaxed relative z-10">
                &ldquo;India has the largest youth power in the world. The real challenge is not just empowering that energy, but giving it the right direction—Nation First.&rdquo;
              </p>
            </div>

            <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
              Carrying forward a profound legacy of public commitment, Sri Nilamadhab Singh Deo bridges generational heritage with modern student advocacy. As National Youth President, his mission centers on uniting youth across state and caste divides, instilling cultural pride, civilizational grounding, and uncompromising dedication to nation-building.
            </p>

            {/* Key Accomplishments Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-karni-saffron/10 flex items-center justify-center shrink-0">
                  <HeartHandshake size={16} className="text-karni-saffron" />
                </div>
                <span className="font-sans text-xs text-neutral-600 font-medium">
                  &ldquo;My People, My Strength&rdquo; Founder
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-karni-red/10 flex items-center justify-center shrink-0">
                  <Award size={16} className="text-karni-red" />
                </div>
                <span className="font-sans text-xs text-neutral-600 font-medium">
                  Former HWPL Peace Club Associate
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}