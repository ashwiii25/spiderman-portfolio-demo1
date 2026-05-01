"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (soundName: string) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("spider-verse-muted");
    if (saved !== null) {
      setIsMuted(JSON.parse(saved));
    }
  }, []);

  const toggleMute = () => {
    const newVal = !isMuted;
    setIsMuted(newVal);
    localStorage.setItem("spider-verse-muted", JSON.stringify(newVal));
  };

  const playSound = (soundName: string) => {
    if (isMuted) return;
    
    // Implementation for actual sound playing would go here
    // e.g. new Audio(`/sounds/${soundName}.mp3`).play();
    console.log(`Playing sound: ${soundName}`);
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
