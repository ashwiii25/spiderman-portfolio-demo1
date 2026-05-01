"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null; // Don't show on touch devices
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 45 : 0,
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 border-2 border-spider-red rounded-full opacity-50" />
        
        {/* Spider Web Symbol (Simple SVG) */}
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-spider-blue"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
        </svg>

        {/* RGB Split Glitch Effect for Cursor */}
        {isHovering && (
          <>
            <div className="absolute inset-0 border-2 border-spider-blue rounded-full opacity-30 animate-pulse translate-x-1" />
            <div className="absolute inset-0 border-2 border-spider-purple rounded-full opacity-30 animate-pulse -translate-x-1" />
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
