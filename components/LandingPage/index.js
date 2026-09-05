"use client";
import React, { useState } from "react";

// Core Sections (To be built)
import HeroIntroduction from "../HeroIntroduction";
import MissionVision from "../MissionVision";
import UpcomingCampaigns from "../UpcomingCampaigns";
// import AboutOrganization from "./AboutOrganization";

// UI Components
import Navbar from "../Navbar";
// import Footer from "./Footer";
// import RegistrationModal from "./RegistrationModal";
// import FloatingCTA from "./FloatingCTA";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // e.g., "join", "event_register"

  const handleOpenModal = (type = "join") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#4A4A4A] relative selection:bg-[#fa9e19] selection:text-white overflow-hidden md:overflow-visible">
      
      {/* Navigation Layer */}
      {/* <Navbar onOpenModal={() => handleOpenModal("join")} /> */}

      <main className="flex flex-col w-full">
        
        {/* A. Organization Introduction (Hero) */}
        {/* We can set up GSAP or Framer Motion hooks inside this component for that high-end reveal */}
        <section id="introduction" className="relative">
          <HeroIntroduction onOpenModal={() => handleOpenModal("join")} />
        </section>

        {/* B. Mission & Objectives */}
        {/* A light off-white section to break up the page flow */}
        <section id="mission" className="relative">
          <MissionVision />
        </section>

        {/* C. About Us (History & Introduction) */}
        <section id="about" className="relative">
          {/* <AboutOrganization /> */}
        </section>

        {/* D. Upcoming Campaigns / Events */}
        {/* Ready to map dynamic data fetched from the Express backend */}
        <section id="campaigns" className="relative">
          <UpcomingCampaigns onRegister={(eventId) => handleOpenModal(`event_${eventId}`)} />
        </section>

      </main>

      {/* Global Footer */}
      {/* <Footer /> */}

      {/* Global Registration / Join Modal */}
      {/* <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={modalType}
      /> */}

      {/* Mobile Floating CTA for quick access to Join/Donate */}
      {/* <FloatingCTA 
        label="Join the Sena" 
        onClick={() => handleOpenModal("join")}
      /> */}
    </div>
  );
};

export default LandingPage;