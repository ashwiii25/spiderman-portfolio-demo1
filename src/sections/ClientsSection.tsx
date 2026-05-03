"use client";

import { motion } from "framer-motion";

const CLIENTS = [
  "DAILY BUGLE", "OSCORP", "STARK IND.", "PEXTER TECH", "FISK INT.", "WEB-CORP"
];

export default function ClientsSection() {
  return (
    <section className="relative z-10 py-24 bg-spider-black overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 halftone-red opacity-5 pointer-events-none" />
      
      {/* Spider Society Tech Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" className="stroke-spider-blue/20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
        <h2 className="font-bebas text-2xl tracking-[0.5em] text-spider-blue mb-12">
          TRUSTED BY THE MULTIVERSE
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-50 hover:opacity-100 transition-opacity duration-700">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.2, 
                color: "#00E5FF",
                filter: ["none", "hue-rotate(90deg)", "none"],
                transition: { duration: 0.2 }
              }}
              className="font-bangers text-3xl md:text-4xl cursor-default select-none"
            >
              {client}
            </motion.div>
          ))}
        </div>

        {/* Moving Lines */}
        <div className="absolute -left-full top-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-spider-red to-transparent opacity-30 animate-pulse" />
      </div>
    </section>
  );
}
