import React, { useEffect, useRef, useState } from 'react';

interface SlideTransitionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
  delay?: number;
  className?: string;
}

/**
 * Animated slide transition component with intersection observer
 */
export const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  direction = 'up',
  duration = 500,
  delay = 0,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const transitions = {
    up: {
      initial: 'translate-y-10 opacity-0',
      visible: 'translate-y-0 opacity-100',
    },
    down: {
      initial: '-translate-y-10 opacity-0',
      visible: 'translate-y-0 opacity-100',
    },
    left: {
      initial: 'translate-x-10 opacity-0',
      visible: 'translate-x-0 opacity-100',
    },
    right: {
      initial: '-translate-x-10 opacity-0',
      visible: 'translate-x-0 opacity-100',
    },
    fade: {
      initial: 'opacity-0',
      visible: 'opacity-100',
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  const transition = transitions[direction];
  const transitionClasses = isVisible ? transition.visible : transition.initial;

  return (
    <div
      ref={elementRef}
      className={`transform transition-all ${transitionClasses} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
};