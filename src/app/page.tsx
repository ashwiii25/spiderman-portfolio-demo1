"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { SoundProvider } from "@/components/providers/SoundProvider";
import HeroSection from "@/sections/HeroSection";
import ScrollSequenceSection from "@/sections/ScrollSequenceSection";
import AboutSection from "@/sections/AboutSection";
import ProjectsSection from "@/sections/ProjectsSection";
import ClientsSection from "@/sections/ClientsSection";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SoundProvider>
      <SmoothScrollProvider>
        <main className="relative bg-spider-black min-h-screen">
          <LoadingScreen onComplete={() => setIsLoading(false)} />
          
          {!isLoading && (
            <>
              <CustomCursor />
              <Navigation />
              
              <ScrollSequenceSection />
              <HeroSection />
              
              <div id="about">
                <AboutSection />
              </div>
              
              <div id="projects">
                <ProjectsSection />
              </div>
              
              <ClientsSection />
              
              <div id="contact">
                <ContactSection />
              </div>

              {/* Footer */}
              <footer className="relative z-10 bg-spider-black py-12 px-4 text-center border-t border-white/5">
                <p className="font-bebas text-xl text-gray-500">
                  DESIGNED & DEVELOPED BY <span className="text-spider-red">MILES MORALES</span>
                </p>
                <p className="font-modern text-xs text-gray-700 mt-2 uppercase tracking-[0.3em]">
                  Multiverse Edition v1.0
                </p>
              </footer>
            </>
          )}
        </main>
      </SmoothScrollProvider>
    </SoundProvider>
  );
}
