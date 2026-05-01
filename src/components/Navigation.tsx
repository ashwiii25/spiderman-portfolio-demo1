"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { name: "ABOUT", href: "#about" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[1000] p-6 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="font-bangers text-4xl text-white group">
          <span className="group-hover:text-spider-red transition-colors">S</span>
          <span className="group-hover:text-spider-blue transition-colors">V</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {LINKS.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className="font-bebas text-2xl text-white hover:text-spider-red transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-spider-blue group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden font-bangers text-2xl text-white z-[1100]"
        >
          {isOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-spider-black z-[1050] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="absolute inset-0 halftone-red opacity-10" />
            {LINKS.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-bangers text-6xl text-white hover:text-spider-red hover:skew-x-6 transition-all inline-block"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <div className="mt-12 font-bebas text-spider-blue text-xl tracking-widest">
              DIMENSION 1610
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
