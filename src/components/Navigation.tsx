import React from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { usePitchDeck } from '../store/PitchDeckContext';

export const Navigation: React.FC = () => {
  const { currentSlide, totalSlides, goToSlide } = usePitchDeck();

  return (
    <>
      {/* Navigation dots */}
      <nav
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block"
        role="navigation"
        aria-label="Slide navigation"
      >
        <ul className="space-y-3">
          {Array.from({ length: totalSlides }, (_, i) => i + 1).map((slide) => (
            <li key={slide}>
              <button
                onClick={() => goToSlide(slide)}
                className={clsx(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  'hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  currentSlide === slide
                    ? 'bg-blue-600 scale-150 focus:ring-blue-500'
                    : 'bg-gray-300 hover:bg-gray-400 focus:ring-gray-400'
                )}
                aria-label={`Go to slide ${slide}`}
                aria-current={currentSlide === slide ? 'true' : 'false'}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile slide indicator */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="bg-gray-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
          {currentSlide} / {totalSlides}
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50"
        role="progressbar"
        aria-valuenow={currentSlide}
        aria-valuemin={1}
        aria-valuemax={totalSlides}
        aria-label="Presentation progress"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-green-500"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentSlide / totalSlides) * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </div>

      {/* Skip links for accessibility */}
      <AnimatePresence>
        <div className="sr-only">
          <a href="#main" className="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">
            Skip to main content
          </a>
        </div>
      </AnimatePresence>
    </>
  );
};