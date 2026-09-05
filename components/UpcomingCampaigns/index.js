"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, MapPin, ArrowUpRight, 
  Heart, MessageCircle, Share2, Play
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

// =====================================================================
// 1. DUMMY DATA MODELS
// =====================================================================
const campaigns = [
  {
    id: 1,
    title: "National Heritage Summit",
    subtitle: "Annual General Convention",
    day: "15",
    month: "OCT",
    year: "2026",
    location: "Jaipur, Rajasthan",
    desc: "A nationwide gathering of leaders and volunteers to discuss our roadmap for cultural preservation and social unity.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Youth Empowerment Drive",
    subtitle: "Scholarship Distribution",
    day: "28",
    month: "OCT",
    year: "2026",
    location: "Udaipur, Rajasthan",
    desc: "Distributing financial aid and educational resources to 500+ underprivileged students in rural districts.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Swachh Bharat Abhiyan",
    subtitle: "Community Clean-up",
    day: "05",
    month: "NOV",
    year: "2026",
    location: "Jodhpur, Rajasthan",
    desc: "Mobilizing local units to clean historical monuments and public spaces, promoting civic responsibility.",
    image: "https://images.unsplash.com/photo-1593113580332-ceb4de3b66dd?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Kshatriya Unity Rally",
    subtitle: "Grassroots Mobilization",
    day: "20",
    month: "NOV",
    year: "2026",
    location: "Ahmedabad, Gujarat",
    desc: "A peaceful march highlighting our commitment to social integrity and demanding rightful representation.",
    image: "https://images.unsplash.com/photo-1600100397608-f010f41fb8d1?q=80&w=1000&auto=format&fit=crop"
  }
];

const socialFeeds = {
  twitter: [
    { id: "t1", author: "Karni Sena Official", handle: "@karnisena_org", content: "Preparations for the upcoming Jaipur summit are in full swing. We invite all volunteers to join hands! 🚩 #KarniSena #Unity", time: "2h ago", likes: "1.2k" },
    { id: "t2", author: "Karni Sena Official", handle: "@karnisena_org", content: "Our youth wing successfully distributed 500+ scholarship kits today in Udaipur. Education is our greatest weapon. 📚", time: "5h ago", likes: "3.4k" },
  ],
  facebook: [
    { id: "f1", author: "Karni Sena", handle: "Organization", content: "Live from the grassroots mobilization rally in Ahmedabad. The energy is unmatched! Thank you to all the supporters who showed up today.", time: "3h ago", likes: "5.6k" },
    { id: "f2", author: "Karni Sena", handle: "Organization", content: "A proud moment as we officially launch our new disaster relief initiative. Watch the full press conference here.", time: "1d ago", likes: "2.1k" },
  ],
  instagram: [
    { id: "i1", author: "karnisena.official", handle: "Instagram", image: "https://images.unsplash.com/photo-1600100397608-f010f41fb8d1?q=80&w=400&auto=format&fit=crop", content: "Glimpses from today's heritage march. 🚩", time: "4h ago", likes: "8.9k" },
    { id: "i2", author: "karnisena.official", handle: "Instagram", image: "https://images.unsplash.com/photo-1593113580332-ceb4de3b66dd?q=80&w=400&auto=format&fit=crop", content: "Community clean-up drive success!", time: "1d ago", likes: "6.2k" },
  ],
  youtube: [
    { id: "y1", author: "Karni Sena TV", handle: "850K Subs", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop", content: "FULL SPEECH: National President Addresses the Udaipur Youth Wing", time: "1 day ago", views: "125K Views" },
    { id: "y2", author: "Karni Sena TV", handle: "850K Subs", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop", content: "Documentary: The Roots of Our Heritage", time: "3 days ago", views: "450K Views" },
  ]
};

export default function UpcomingCampaigns() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 320 : 420;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="campaigns" className="relative w-full bg-[#0a0a0a] py-10 overflow-hidden">
      
      {/* Background Accents (Theme Colors) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-karni-saffron)]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-karni-red)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col gap-32">
        <div>
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="flex flex-col gap-4 max-w-xl"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[var(--color-karni-saffron)]">
                  Take Action
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
                Upcoming <span className="italic text-[var(--color-karni-saffron)]">Campaigns</span>
              </h2>
            </motion.div>

            {/* Revamped Glassmorphic Controls */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-4 shrink-0"
            >
              <button 
                onClick={() => scroll("left")}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[var(--color-karni-saffron)] hover:border-[var(--color-karni-saffron)] transition-all duration-500 group backdrop-blur-md"
              >
                <ArrowLeft size={22} strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => scroll("right")}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[var(--color-karni-saffron)] hover:border-[var(--color-karni-saffron)] transition-all duration-500 group backdrop-blur-md"
              >
                <ArrowRight size={22} strokeWidth={1.5} />
              </button>
            </motion.div>
          </div>

          {/* Horizontal Scroll Carousel */}
          <div className="relative -mx-6 lg:-mx-12 px-6 lg:px-12">
            <div 
              ref={scrollRef}
              className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 pt-4"
            >
              {campaigns.map((campaign, i) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="shrink-0 w-[320px] sm:w-[400px] snap-start"
                >
                  {/* Premium Dark Theme Card */}
                  <div className="bg-[#111111] p-4 rounded-[2rem] border border-white/5 shadow-2xl hover:shadow-[0_0_40px_rgba(250,158,25,0.15)] hover:border-[var(--color-karni-saffron)]/40 transition-all duration-700 group flex flex-col h-full relative overflow-hidden">
                    
                    {/* Image Area */}
                    <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 bg-[#0a0a0a]">
                      <Image 
                        src={campaign.image} alt={campaign.title} fill sizes="(max-width: 768px) 320px, 400px"
                        className="object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />
                      
                      {/* High-End Saffron Date Block */}
                      <div className="absolute top-4 left-4 bg-[var(--color-karni-saffron)] px-4 py-2.5 rounded-xl flex flex-col items-center justify-center shadow-[0_10px_20px_rgba(250,158,25,0.4)]">
                        <span className="font-serif text-2xl text-[#1a1a1a] leading-none mb-1 font-bold">
                          {campaign.day}
                        </span>
                        <span className="font-sans text-[9px] font-black uppercase tracking-widest text-[#1a1a1a] leading-none">
                          {campaign.month}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col flex-1 px-2 pb-2">
                      <div className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3">
                        <MapPin size={14} className="text-[var(--color-karni-red)]" /> 
                        {campaign.location}
                      </div>
                      
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-karni-saffron)] font-bold mb-2">
                        {campaign.subtitle}
                      </p>
                      
                      <h3 className="font-serif text-2xl sm:text-3xl text-white leading-tight mb-4 group-hover:text-[var(--color-karni-saffron)] transition-colors duration-300">
                        {campaign.title}
                      </h3>
                      
                      <p className="font-sans text-sm text-white/50 leading-relaxed mb-8 line-clamp-3">
                        {campaign.desc}
                      </p>

                      {/* Action CTA */}
                      <div className="mt-auto pt-5 border-t border-white/10">
                        <button 
                          onClick={() => alert(`Trigger Backend Logic: Enroll User for Campaign ID ${campaign.id}`)}
                          className="flex items-center justify-between w-full font-sans text-xs font-bold uppercase tracking-widest text-white group-hover:text-[var(--color-karni-saffron)] transition-colors duration-300"
                        >
                          Volunteer Now
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-karni-saffron)]/20 transition-colors duration-300">
                            <ArrowUpRight size={16} strokeWidth={2} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. INFINITE SCROLL SOCIAL FEEDS (Dark Theme & Real Names) */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between border-b border-white/10 pb-6"
          >
            <h3 className="font-serif text-3xl sm:text-4xl text-white">Digital Presence</h3>
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/40 hidden sm:block">
              Real-Time Network
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[600px]">
            
            {/* Reusable Platform Column Component with Actual Names */}
            {[
              { id: 'tw', title: 'Twitter', icon: FaTwitter, color: 'text-blue-400', data: socialFeeds.twitter },
              { id: 'fb', title: 'Facebook', icon: FaFacebook, color: 'text-blue-600', data: socialFeeds.facebook },
              { id: 'ig', title: 'Instagram', icon: FaInstagram, color: 'text-pink-500', data: socialFeeds.instagram, isMedia: true },
              { id: 'yt', title: 'YouTube', icon: FaYoutube, color: 'text-red-500', data: socialFeeds.youtube, isVideo: true },
            ].map((platform, idx) => (
              <motion.div 
                key={platform.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-[#111111] border border-white/5 rounded-2xl flex flex-col h-full overflow-hidden shadow-2xl hover:border-white/20 transition-all duration-500 group"
              >
                {/* Platform Header */}
                <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3 bg-white/5 group-hover:bg-white/10 transition-colors duration-500">
                  <platform.icon size={18} className={platform.color} />
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-white">
                    {platform.title}
                  </span>
                </div>

                {/* Infinite Scroll Container */}
                <div className="flex-1 overflow-y-auto scrollbar-hide relative p-5">
                  <div className="flex flex-col gap-6 pb-12">
                    {platform.data.map((post) => (
                      <div key={post.id} className="flex flex-col gap-3 pb-6 border-b border-white/5 last:border-0">
                        
                        {/* Author Info */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--color-karni-saffron)] flex items-center justify-center text-[#1a1a1a] font-serif text-sm font-bold shadow-md">
                            K
                          </div>
                          <div className="flex flex-col">
                            <span className="font-sans text-xs font-bold text-white">{post.author}</span>
                            <span className="font-sans text-[10px] text-white/40">{post.handle} • {post.time}</span>
                          </div>
                        </div>

                        {/* Media */}
                        {post.image && (
                          <div className={`relative w-full rounded-xl overflow-hidden ${platform.isVideo ? 'aspect-video' : 'aspect-square'}`}>
                            <Image src={post.image} alt="Post media" fill className="object-cover" />
                            {platform.isVideo && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30">
                                  <Play size={16} className="text-white ml-1 fill-current" />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Content Text */}
                        <p className="font-sans text-xs text-white/70 leading-relaxed">
                          {post.content}
                        </p>

                        {/* Engagement Metrics */}
                        <div className="flex items-center gap-5 mt-2 text-white/30">
                          <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                            <Heart size={14} strokeWidth={2.5} /> <span className="text-[10px] font-bold">{post.likes || post.views}</span>
                          </button>
                          <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                            <MessageCircle size={14} strokeWidth={2.5} />
                          </button>
                          <button className="flex items-center gap-1.5 hover:text-[var(--color-karni-saffron)] transition-colors ml-auto">
                            <Share2 size={14} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Deep Dark Gradient Fade for "Infinite" Illusion */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}