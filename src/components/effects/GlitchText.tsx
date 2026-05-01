"use client";

import { motion } from "framer-motion";

export default function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute inset-0 text-spider-red -translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-50 group-hover:animate-pulse transition-all">
        {text}
      </span>
      <span className="absolute inset-0 text-spider-blue translate-x-1 -translate-y-1 -z-10 opacity-0 group-hover:opacity-50 group-hover:animate-pulse transition-all">
        {text}
      </span>
    </div>
  );
}
