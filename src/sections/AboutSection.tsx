"use client";

import { motion } from "framer-motion";
import GlitchTitle from "@/components/ui/GlitchTitle";

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-24 px-4 bg-spider-black overflow-hidden">
      <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 inline-block -rotate-2"
        >
          <GlitchTitle 
            text="WHO AM I?" 
            className="text-5xl md:text-7xl drop-shadow-[0_0_15px_rgba(255,0,60,0.5)]" 
            colorClass="text-spider-red"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Panel 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="comic-border bg-spider-black aspect-[3/4] relative overflow-hidden group"
          >
            <div className="absolute inset-0 halftone-red opacity-0 group-hover:opacity-20 transition-opacity" />
            <div className="p-8 h-full flex flex-col">
              <div className="font-bebas text-4xl text-spider-blue mb-4">THE ORIGIN</div>
              <p className="font-modern text-lg leading-relaxed text-gray-300">
                Bitten by a radioactive code-snippet, I transformed into a developer with the ability to traverse multiple frontend universes.
              </p>
              <div className="mt-auto flex justify-end">
                <div className="bg-spider-yellow text-black font-bangers text-2xl px-4 py-1 rotate-3">POP!</div>
              </div>
            </div>
          </motion.div>

          {/* Panel 2 - Character Silhouette */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="comic-border bg-spider-red/10 aspect-[3/4] relative overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-4/5 h-4/5 bg-spider-red clip-path-spider opacity-50 blur-xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-bangers text-8xl opacity-10 select-none">M.M.</div>
            </div>
            <div className="absolute top-4 left-4 font-bebas text-2xl text-spider-yellow">SUBJECT: 1610</div>
          </motion.div>

          {/* Panel 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="comic-border bg-spider-black aspect-[3/4] relative overflow-hidden"
          >
            <div className="p-8 h-full flex flex-col">
              <div className="font-bebas text-4xl text-spider-blue mb-4">TECH STACK</div>
              <div className="grid grid-cols-2 gap-4">
                {["NEXT.JS", "TYPESCRIPT", "GSAP", "TAILWIND", "REACT", "NODE.JS"].map((skill, i) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.1, x: 5 }}
                    className="border-b border-spider-red/50 py-1 font-bebas text-xl text-spider-red"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 relative h-20 bg-spider-purple/20 flex items-center justify-center">
                <span className="font-bangers text-3xl text-spider-blue animate-pulse">GLITCHING...</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, type: "spring" }}
        className="absolute bottom-10 right-[15%] z-50 hidden lg:block"
      >
        <div className="relative bg-white text-black p-6 rounded-[2rem] comic-border max-w-xs">
          <p className="font-bangers text-xl">"ANYONE CAN WEAR THE MASK. ANYONE CAN CODE."</p>
          <div className="absolute -bottom-4 left-10 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-white border-r-[20px] border-r-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
