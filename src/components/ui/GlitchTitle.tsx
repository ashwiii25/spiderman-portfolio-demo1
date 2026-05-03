import { motion, HTMLMotionProps } from "framer-motion";

interface GlitchTitleProps extends HTMLMotionProps<"div"> {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  colorClass?: string;
}

export default function GlitchTitle({ 
  text, 
  className = "", 
  as: Component = "h2",
  colorClass = "text-white",
  ...props 
}: GlitchTitleProps) {
  // Using a stroke to synthetically make the Bangers font bolder
  const baseClasses = `font-bangers font-bold [-webkit-text-stroke:2px_currentColor] md:[-webkit-text-stroke:4px_currentColor] ${className}`;
  
  return (
    <motion.div className="relative flex justify-center" {...props}>
      <div className="relative inline-block text-center">
        <Component className={`${baseClasses} ${colorClass} relative z-10`}>
          {text}
        </Component>
        <Component 
          className={`${baseClasses} text-spider-blue absolute top-0 left-0 w-full opacity-70 animate-glitch-1 mix-blend-screen pointer-events-none -ml-1 z-20 select-none`}
          aria-hidden="true"
        >
          {text}
        </Component>
        <Component 
          className={`${baseClasses} text-spider-red absolute top-0 left-0 w-full opacity-70 animate-glitch-2 mix-blend-screen pointer-events-none ml-1 z-20 select-none`}
          aria-hidden="true"
        >
          {text}
        </Component>
      </div>
    </motion.div>
  );
}
