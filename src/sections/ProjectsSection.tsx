"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "SPIDER-VERSE UI",
    desc: "Interactive multiverse portal builder",
    color: "bg-spider-red",
    tag: "WEB APP"
  },
  {
    title: "WEB-SLINGER API",
    desc: "High-performance mesh networking system",
    color: "bg-spider-blue",
    tag: "BACKEND"
  },
  {
    title: "SOCIETY DASHBOARD",
    desc: "Centralized hub for anomaly detection",
    color: "bg-spider-purple",
    tag: "UI/UX"
  },
  {
    title: "GO HOME MACHINE",
    desc: "Quantum state management library",
    color: "bg-spider-yellow",
    tag: "LIB"
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    let ctx = gsap.context(() => {
      const scrollWidth = container.offsetWidth - window.innerWidth;

      gsap.to(container, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-spider-black overflow-hidden">
      <div className="absolute top-10 left-10 z-50">
        <h2 className="font-bangers text-6xl md:text-8xl text-white outline-text">
          PROJECTS
        </h2>
      </div>

      <div 
        ref={containerRef}
        className="flex items-center h-full px-[10vw] gap-[5vw] min-w-max"
      >
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.title}
            whileHover={{ y: -20, rotate: i % 2 === 0 ? 2 : -2 }}
            className="w-[80vw] md:w-[40vw] h-[60vh] comic-border bg-spider-black relative group overflow-hidden flex flex-col"
          >
            <div className={`absolute inset-0 ${project.color} opacity-10 group-hover:opacity-30 transition-opacity`} />
            <div className="absolute inset-0 halftone opacity-20" />
            
            <div className="p-8 relative z-10 flex flex-col h-full">
              <div className="font-bebas text-2xl text-spider-blue mb-2">{project.tag}</div>
              <h3 className="font-bangers text-5xl md:text-6xl mb-4 group-hover:text-spider-red transition-colors">
                {project.title}
              </h3>
              <p className="font-modern text-xl text-gray-400 max-w-xs">
                {project.desc}
              </p>
              
              <div className="mt-auto flex justify-between items-end">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-spider-red transition-colors">
                  <span className="font-bangers text-2xl">→</span>
                </div>
                <div className="font-bebas text-spider-yellow text-4xl opacity-20 group-hover:opacity-100 transition-all">
                  0{i + 1}
                </div>
              </div>
            </div>

            {/* Glitch Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-spider-red/20 via-transparent to-spider-blue/20 mix-blend-overlay" />
          </motion.div>
        ))}
        
        {/* Placeholder for "And more" */}
        <div className="w-[40vw] flex items-center justify-center">
          <div className="font-bangers text-4xl text-spider-red animate-pulse">
            MORE AT THE SPIDER-SOCIETY...
          </div>
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
          color: transparent;
        }
      `}</style>
    </section>
  );
}
