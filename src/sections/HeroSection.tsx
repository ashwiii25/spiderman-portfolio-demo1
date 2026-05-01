"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const cityY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-spider-black"
    >
      {/* Background Layer: Sky & distant buildings */}
      <motion.div 
        style={{ y: cityY }}
        className="absolute inset-0 z-0 opacity-40"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-spider-purple/20 to-spider-black" />
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {/* Simple skyscraper silhouettes */}
          <rect x="100" y="600" width="100" height="400" fill="#0A0A0A" />
          <rect x="250" y="500" width="120" height="500" fill="#0F0F0F" />
          <rect x="450" y="700" width="80" height="300" fill="#0A0A0A" />
          <rect x="600" y="400" width="150" height="600" fill="#151515" />
          <rect x="800" y="650" width="100" height="350" fill="#0A0A0A" />
        </svg>
      </motion.div>

      {/* Mid Layer: More buildings */}
      <motion.div 
        style={{ y: midY }}
        className="absolute inset-0 z-10"
      >
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,1000 L0,800 L100,750 L200,850 L300,700 L400,800 L500,650 L600,750 L700,600 L800,700 L900,550 L1000,650 L1000,1000 Z" fill="#050505" />
          <div className="absolute top-[60%] left-[10%] w-[20%] h-[10%] border-t border-spider-blue/20 blur-sm" />
        </svg>
      </motion.div>

      {/* Foreground Text Layer */}
      <motion.div 
        style={{ y: textY, scale: textScale }}
        className="relative z-20 text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="block font-bebas text-spider-blue text-xl md:text-2xl tracking-[0.3em] mb-4">
            FULL STACK DEVELOPER
          </span>
          <h1 className="font-bangers text-7xl md:text-9xl lg:text-[12rem] leading-none mb-6 group">
            <span className="relative inline-block hover:skew-x-12 transition-transform duration-300">
              M
              <span className="absolute inset-0 text-spider-red -translate-x-1 translate-y-1 -z-10 opacity-50 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all">M</span>
              <span className="absolute inset-0 text-spider-blue translate-x-1 -translate-y-1 -z-10 opacity-50 group-hover:-translate-x-2 group-hover:translate-y-2 transition-all">M</span>
            </span>
            ILES <br /> 
            <span className="text-spider-red">MORALES</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-wrap justify-center gap-6 mt-8"
        >
          <button className="comic-border bg-spider-red px-8 py-4 font-bebas text-2xl hover:scale-110 hover:-rotate-3 transition-all active:scale-95">
            EXPLORE THE WEB
          </button>
          <button className="comic-border bg-transparent border-2 border-spider-blue text-spider-blue px-8 py-4 font-bebas text-2xl hover:scale-110 hover:rotate-3 transition-all active:scale-95">
            ENTER THE MULTIVERSE
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Comic Panels */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[10%] z-30 hidden lg:block"
      >
        <div className="comic-border w-48 h-64 bg-spider-black overflow-hidden rotate-12 relative">
          <div className="absolute inset-0 halftone opacity-30" />
          <div className="p-4">
            <div className="w-full h-32 bg-spider-purple/20 mb-2" />
            <div className="h-2 w-full bg-white/10 mb-1" />
            <div className="h-2 w-2/3 bg-white/10" />
          </div>
          <div className="absolute bottom-2 right-2 font-bangers text-spider-red text-4xl italic">THWIP!</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-[10%] z-30 hidden lg:block"
      >
        <div className="comic-border w-56 h-40 bg-spider-black overflow-hidden -rotate-6 relative">
          <div className="absolute inset-0 halftone-red opacity-30" />
          <div className="p-4 flex items-center justify-center h-full">
            <div className="font-bebas text-3xl text-spider-blue">STORY MODE</div>
          </div>
        </div>
      </motion.div>

      {/* Ground Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-spider-black to-transparent z-40" />
    </section>
  );
}
