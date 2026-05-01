"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 1000); // Wait for exit animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 2,
            filter: "blur(20px) contrast(200%)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[10000] bg-spider-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Halftone BG Flicker */}
          <div className="absolute inset-0 halftone opacity-20 animate-flicker" />
          
          {/* Spider Logo SVG */}
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full fill-none stroke-spider-red stroke-[0.5]"
            >
              <motion.path
                d="M50 10 L45 30 L30 35 L45 45 L40 65 L50 55 L60 65 L55 45 L70 35 L55 30 Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M50 20 L48 40 L35 45 L48 52 L45 75 L50 65 L55 75 L52 52 L65 45 L52 40 Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                className="stroke-spider-blue"
              />
            </svg>
            
            {/* Inner Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0.5, 1], scale: 1 }}
              transition={{ delay: 1.5, duration: 1, repeat: Infinity }}
              className="absolute inset-0 bg-spider-red rounded-full blur-[40px] opacity-20"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 font-bebas text-2xl tracking-[0.2em] text-spider-blue"
          >
            INITIALIZING MULTIVERSE...
          </motion.div>

          {/* Glitch Bars */}
          <div className="absolute bottom-10 left-0 w-full h-1 bg-spider-red/20">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "linear" }}
              className="h-full bg-spider-red origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
