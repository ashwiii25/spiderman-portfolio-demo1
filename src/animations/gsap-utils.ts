import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Creates a glitch animation on a target element
 */
export const glitchElement = (target: string | Element) => {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
  
  tl.to(target, { duration: 0.1, skewX: 20, ease: "power4.inOut" })
    .to(target, { duration: 0.1, skewX: -20, ease: "power4.inOut" })
    .to(target, { duration: 0.1, skewX: 0, ease: "power4.inOut" })
    .to(target, { duration: 0.05, opacity: 0.5 })
    .to(target, { duration: 0.05, opacity: 1 });
    
  return tl;
};

/**
 * Creates a split text reveal animation
 */
export const revealText = (target: string | Element) => {
  return gsap.from(target, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    stagger: 0.1,
  });
};

/**
 * Setup parallax layer
 */
export const setupParallax = (target: string | Element, speed: number = 0.1) => {
  gsap.to(target, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: target,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });
};
