import React, { createContext, useContext, ReactNode } from 'react';
import { create } from 'zustand';

interface PitchDeckState {
  currentSlide: number;
  totalSlides: number;
  isNavigating: boolean;
  setCurrentSlide: (slide: number) => void;
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (slide: number) => void;
  setIsNavigating: (navigating: boolean) => void;
}

const usePitchDeckStore = create<PitchDeckState>((set, get) => ({
  currentSlide: 1,
  totalSlides: 14,
  isNavigating: false,
  
  setCurrentSlide: (slide) => set({ currentSlide: slide }),
  
  nextSlide: () => {
    const { currentSlide, totalSlides } = get();
    if (currentSlide < totalSlides) {
      set({ currentSlide: currentSlide + 1, isNavigating: true });
      setTimeout(() => set({ isNavigating: false }), 500);
    }
  },
  
  previousSlide: () => {
    const { currentSlide } = get();
    if (currentSlide > 1) {
      set({ currentSlide: currentSlide - 1, isNavigating: true });
      setTimeout(() => set({ isNavigating: false }), 500);
    }
  },
  
  goToSlide: (slide) => {
    const { totalSlides } = get();
    if (slide >= 1 && slide <= totalSlides) {
      set({ currentSlide: slide, isNavigating: true });
      setTimeout(() => set({ isNavigating: false }), 500);
    }
  },
  
  setIsNavigating: (navigating) => set({ isNavigating: navigating }),
}));

const PitchDeckContext = createContext<PitchDeckState | null>(null);

export const PitchDeckProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = usePitchDeckStore();
  
  return (
    <PitchDeckContext.Provider value={store}>
      {children}
    </PitchDeckContext.Provider>
  );
};

export const usePitchDeck = () => {
  const context = useContext(PitchDeckContext);
  if (!context) {
    throw new Error('usePitchDeck must be used within PitchDeckProvider');
  }
  return context;
};