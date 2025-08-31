import { useRef, useEffect } from 'react';
import { usePitchDeck } from '../store/PitchDeckContext';

export const useScrollSnap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentSlide, goToSlide } = usePitchDeck();
  const isScrolling = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling.current) return;

      const scrollPosition = container.scrollTop;
      const slideHeight = window.innerHeight;
      const newSlide = Math.round(scrollPosition / slideHeight) + 1;

      if (newSlide !== currentSlide && newSlide >= 1 && newSlide <= 14) {
        goToSlide(newSlide);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      // Smooth scroll for trackpad, snap for mouse wheel
      const isTrackpad = Math.abs(e.deltaY) < 50;
      
      if (!isTrackpad) {
        e.preventDefault();
        isScrolling.current = true;

        if (e.deltaY > 0) {
          // Scroll down
          const nextSlideNumber = Math.min(currentSlide + 1, 14);
          goToSlide(nextSlideNumber);
        } else {
          // Scroll up
          const prevSlideNumber = Math.max(currentSlide - 1, 1);
          goToSlide(prevSlideNumber);
        }

        setTimeout(() => {
          isScrolling.current = false;
        }, 500);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentSlide, goToSlide]);

  // Scroll to current slide when it changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slideElement = container.querySelector(`[data-slide="${currentSlide}"]`);
    if (slideElement) {
      slideElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSlide]);

  return containerRef;
};