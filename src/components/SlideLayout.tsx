import React, { ReactNode } from 'react';
import { clsx } from 'clsx';
import { useInView } from 'react-intersection-observer';
import { usePitchDeck } from '../store/PitchDeckContext';

interface SlideLayoutProps {
  children: ReactNode;
  slideNumber: number;
  variant?: 'default' | 'dark' | 'gradient';
  className?: string;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({
  children,
  slideNumber,
  variant = 'default',
  className = '',
}) => {
  const { setCurrentSlide } = usePitchDeck();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (inView) {
      setCurrentSlide(slideNumber);
    }
  }, [inView, slideNumber, setCurrentSlide]);

  const baseClasses = 'min-h-screen snap-start relative flex flex-col';
  
  const variantClasses = {
    default: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-br from-blue-600 to-green-500 text-white',
  };

  return (
    <section
      ref={ref}
      className={clsx(baseClasses, variantClasses[variant], className)}
      role="region"
      aria-label={`Slide ${slideNumber}`}
      data-slide={slideNumber}
    >
      {children}
      
      <div 
        className={clsx(
          'absolute bottom-8 right-8 text-sm font-medium',
          variant === 'default' ? 'text-gray-500' : 'text-white/60'
        )}
        aria-hidden="true"
      >
        {slideNumber}
      </div>
    </section>
  );
};