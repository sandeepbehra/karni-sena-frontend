import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-black/5 flex flex-col">
      {/* ========================================================= */}
      {/* 1. PRE-FOOTER CTA (The "Join" Ribbon)                       */}
      {/* ========================================================= */}
      <div className="w-full bg-[#FBFBF9] border-b border-black/5 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-xl">
            <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
              Stand for <span className="text-karni-saffron italic">Heritage</span> &amp; Truth.
            </h3>
            <p className="font-sans text-sm text-neutral-500 leading-relaxed">
              Join thousands of youth and community leaders working on the ground to preserve our roots and uplift the underprivileged.
            </p>
          </div>
          <Link 
            href="/membership"
            className="shrink-0 flex items-center justify-center gap-3 px-8 py-4 bg-karni-saffron text-white font-sans font-bold text-xs uppercase tracking-[0.15em] rounded-md shadow-[0_10px_30px_rgba(250,158,25,0.2)] hover:shadow-[0_15px_40px_rgba(250,158,25,0.3)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            Become a Member
            <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN FOOTER GRID                                         */}
      {/* ========================================================= */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Bio (Spans 4 cols on desktop) */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="relative w-40 h-16 mb-6 inline-block">
              <Image 
                src="/logo.png" 
                alt="Karni Sena Logo" 
                fill 
                className="object-contain object-left" 
              />
            </Link>
            <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-8 max-w-sm">
              A nationwide socio-cultural movement committed to historical integrity, cultural pride, social justice, and grassroots community welfare under the guiding principle of Nation First.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: FaFacebookF, href: "#" },
                { icon: FaTwitter, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaYoutube, href: "#" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-neutral-600 hover:bg-karni-saffron hover:border-karni-saffron hover:text-white transition-all duration-300"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Spans 2 cols) */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col">
            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-[2px] bg-karni-saffron" />
              Organization
            </h4>
            <ul className="flex flex-col gap-4">
              {['Home', 'About Us', 'Leadership', 'Our Mission', 'Press & Media'].map((item, idx) => (
                <li key={idx}>
                  <Link href={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="font-sans text-sm text-neutral-500 hover:text-karni-saffron transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Initiatives (Spans 3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-[2px] bg-karni-red" />
              Key Initiatives
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/initiatives/education" className="group flex flex-col gap-1">
                  <span className="font-sans text-sm text-neutral-500 group-hover:text-karni-red transition-colors duration-300">Pratibha Protsahan Drive</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-400">Rural Scholarships</span>
                </Link>
              </li>
              <li>
                <Link href="/initiatives/relief" className="group flex flex-col gap-1">
                  <span className="font-sans text-sm text-neutral-500 group-hover:text-karni-red transition-colors duration-300">Karni Sena Seva Dal</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-400">Disaster Relief</span>
                </Link>
              </li>
              <li>
                <Link href="/initiatives/youth" className="group flex flex-col gap-1">
                  <span className="font-sans text-sm text-neutral-500 group-hover:text-karni-red transition-colors duration-300">Youth Empowerment Wing</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-400">Skill Development</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (Spans 2 cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-[2px] bg-neutral-800" />
              Contact
            </h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3 text-neutral-500">
                <MapPin size={16} className="shrink-0 mt-0.5 text-karni-saffron" />
                <span className="font-sans text-sm leading-relaxed">
                  Central Headquarters,<br />
                  Jaipur, Rajasthan, India
                </span>
              </li>
              <li className="flex items-center gap-3 text-neutral-500">
                <Mail size={16} className="shrink-0 text-karni-saffron" />
                <a href="mailto:contact@karnisena.org" className="font-sans text-sm hover:text-karni-saffron transition-colors">
                  contact@karnisena.org
                </a>
              </li>
              <li className="flex items-center gap-3 text-neutral-500">
                <Phone size={16} className="shrink-0 text-karni-saffron" />
                <a href="tel:+910000000000" className="font-sans text-sm hover:text-karni-saffron transition-colors">
                  +91 (000) 000-0000
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. BOTTOM COPYRIGHT BAR                                     */}
      {/* ========================================================= */}
      <div className="w-full border-t border-black/5 bg-[#FBFBF9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] font-semibold text-neutral-400 uppercase tracking-widest text-center md:text-left">
            &copy; {currentYear} Shree Rajput Karni Sena. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 font-sans text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-karni-saffron transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-karni-saffron transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}