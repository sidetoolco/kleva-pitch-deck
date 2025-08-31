import { useEffect } from 'react';
import { usePitchDeck } from '../store/PitchDeckContext';

export const useKeyboardNavigation = () => {
  const { nextSlide, previousSlide, currentSlide, goToSlide } = usePitchDeck();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for navigation keys
      if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' ', 'PageDown', 'PageUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case ' ': // Spacebar
        case 'PageDown':
          nextSlide();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'PageUp':
          previousSlide();
          break;
        case 'Home':
          goToSlide(1);
          break;
        case 'End':
          goToSlide(14); // Total slides
          break;
        default:
          break;
      }

      // Number keys for direct navigation
      const numberKey = parseInt(event.key);
      if (!isNaN(numberKey) && numberKey >= 1 && numberKey <= 9) {
        goToSlide(numberKey);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Announce keyboard navigation to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Slide ${currentSlide} loaded. Use arrow keys to navigate.`;
    document.body.appendChild(announcement);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    };
  }, [nextSlide, previousSlide, goToSlide, currentSlide]);
};