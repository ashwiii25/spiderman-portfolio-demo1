"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative z-10 py-24 bg-spider-black overflow-hidden">
      {/* Web Strands Background (Simple CSS implementation) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-[1px] bg-white w-full"
            style={{ 
              top: `${20 * i}%`, 
              left: 0, 
              rotate: `${(i - 2) * 15}deg`,
              transformOrigin: "center"
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="comic-border bg-spider-black p-8 md:p-12 relative">
          <div className="absolute -top-6 -left-6 bg-spider-yellow text-black font-bangers text-3xl px-6 py-2 rotate-[-4deg]">
            SEND A SIGNAL!
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8 mt-4">
              <div className="relative group">
                <input 
                  type="text" 
                  required 
                  className="w-full bg-transparent border-b-2 border-white/20 py-4 px-2 font-modern text-xl focus:outline-none focus:border-spider-blue transition-colors peer"
                  placeholder=" "
                />
                <label className="absolute left-2 top-4 font-bebas text-2xl text-gray-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-lg peer-focus:text-spider-blue peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-lg">
                  CODENAME / NAME
                </label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-spider-red w-0 group-focus-within:w-full transition-all duration-500" />
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  required 
                  className="w-full bg-transparent border-b-2 border-white/20 py-4 px-2 font-modern text-xl focus:outline-none focus:border-spider-blue transition-colors peer"
                  placeholder=" "
                />
                <label className="absolute left-2 top-4 font-bebas text-2xl text-gray-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-lg peer-focus:text-spider-blue peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-lg">
                  FREQUENCY / EMAIL
                </label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-spider-red w-0 group-focus-within:w-full transition-all duration-500" />
              </div>

              <div className="relative group">
                <textarea 
                  required 
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-white/20 py-4 px-2 font-modern text-xl focus:outline-none focus:border-spider-blue transition-colors peer resize-none"
                  placeholder=" "
                />
                <label className="absolute left-2 top-4 font-bebas text-2xl text-gray-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-lg peer-focus:text-spider-blue peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-lg">
                  TRANSMISSION / MESSAGE
                </label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-spider-red w-0 group-focus-within:w-full transition-all duration-500" />
              </div>

              <button 
                type="submit"
                className="w-full bg-spider-red py-6 font-bangers text-3xl tracking-widest hover:bg-spider-blue hover:text-black transition-all active:scale-95 flex items-center justify-center gap-4 group"
              >
                FIRE WEB-SIGNAL
                <span className="inline-block group-hover:translate-x-4 transition-transform">🕸️</span>
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center"
            >
              <div className="font-bangers text-6xl text-spider-blue mb-4">THWIP!</div>
              <p className="font-bebas text-3xl">TRANSMISSION RECEIVED.</p>
              <p className="font-modern text-gray-400 mt-4">I'll get back to your dimension soon.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-spider-red font-bebas text-xl hover:underline"
              >
                SEND ANOTHER?
              </button>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Bottom Text Decor */}
      <div className="absolute bottom-4 right-4 font-bangers text-spider-red text-9xl opacity-5 select-none pointer-events-none">
        CONTACT
      </div>
    </section>
  );
}
