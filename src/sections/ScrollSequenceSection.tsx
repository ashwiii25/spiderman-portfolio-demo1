"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 168;
const WORDS = ["CODE!", "DESIGN!", "BUILD!", "DEPLOY!"];

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
    return `/pixluca-images/ezgif-frame-${frameNumber}.webp`;
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
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          // Trigger random words
          if (self.progress > 0.1 && self.progress < 0.9 && Math.random() < 0.05 && !activeWord) {
            setActiveWord({
              text: WORDS[Math.floor(Math.random() * WORDS.length)],
              x: 50,
              y: 50,
              rotation: 0
            });
            setTimeout(() => setActiveWord(null), 2000);
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
    <section ref={containerRef} className="relative w-full h-[400vh]">
      <div className="fixed top-0 left-0 w-full h-screen z-0 bg-spider-black pointer-events-none">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="sticky top-0 w-full h-screen pointer-events-none z-10 overflow-hidden">
        {/* Comic Text Overlay */}
        <AnimatePresence>
          {activeWord && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 0.4, y: 0 }}
              exit={{ scale: 1.1, opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute z-20 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center"
            >
              <h2 className="font-bangers font-bold text-[8rem] md:text-[15rem] leading-none text-spider-yellow drop-shadow-[0_0_30px_rgba(255,213,0,0.5)] italic select-none text-center">
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
      </div>
    </section>
  );
}
