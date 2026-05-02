"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 168;
const WORDS = ["THWIP!", "SENSATIONAL!", "AMAZING!", "SPECTACULAR!", "WEB-HEAD", "SPIDER-SENSE", "WALL-CRAWLER", "BEYOND", "MULTIVERSE", "RESPONSIBILITY"];

export default function ScrollSequenceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeWord, setActiveWord] = useState<{ text: string, x: number, y: number, rotation: number } | null>(null);

  // Frame path helper
  const getFramePath = (index: number) => {
    const frameNumber = index.toString().padStart(3, "0");
    return `/hero_images/ezgif-623403e6f3adb24d-png-split/ezgif-frame-${frameNumber}.png`;
  };

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (loadedCount === TOTAL_FRAMES) {
            setImages(loadedImages);
            setIsLoading(false);
          }
        };
        loadedImages[i] = img;
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (isLoading || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(1);
    };

    const renderFrame = (index: number) => {
      const img = images[Math.floor(index)];
      if (!img) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const sequence = { frame: 1 };
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          // Trigger random words
          if (self.progress > 0.1 && self.progress < 0.9 && Math.random() < 0.05 && !activeWord) {
            setActiveWord({
              text: WORDS[Math.floor(Math.random() * WORDS.length)],
              x: 20 + Math.random() * 60, // 20% to 80%
              y: 20 + Math.random() * 60,
              rotation: -20 + Math.random() * 40
            });
            setTimeout(() => setActiveWord(null), 1000);
          }
        }
      }
    });

    tl.to(sequence, {
      frame: TOTAL_FRAMES,
      snap: "frame",
      ease: "none",
      onUpdate: () => {
        renderFrame(sequence.frame);
      }
    });

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isLoading, images]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-spider-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_100%)]" />

      {/* Comic Text Overlay */}
      <AnimatePresence>
        {activeWord && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: activeWord.rotation - 10 }}
            animate={{ scale: 1, opacity: 1, rotate: activeWord.rotation }}
            exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
            className="absolute z-20 pointer-events-none"
            style={{ left: `${activeWord.x}%`, top: `${activeWord.y}%` }}
          >
            <h2 className="font-bangers text-6xl md:text-8xl text-spider-yellow drop-shadow-[0_0_15px_rgba(255,213,0,0.5)] italic select-none">
              {activeWord.text}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Progress */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-spider-black">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-spider-red font-bebas text-4xl mb-4 tracking-widest"
          >
            SYNCING MULTIVERSE... {progress}%
          </motion.div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-spider-red"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Subtle Scroll Indication */}
      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
        >
          <span className="font-bebas text-white/40 text-sm tracking-[0.3em] mb-2">SCROLL TO EXPLORE</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-spider-red to-transparent"
          />
        </motion.div>
      )}
    </section>
  );
}
