import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface MetricCardProps {
  value: string | number;
  label: string;
  variant?: 'default' | 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  animate?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  variant = 'default',
  size = 'medium',
  className = '',
  animate = false,
}) => {
  const sizeClasses = {
    small: {
      value: 'text-3xl md:text-4xl',
      label: 'text-xs',
      padding: 'p-4',
    },
    medium: {
      value: 'text-4xl md:text-5xl lg:text-6xl',
      label: 'text-sm',
      padding: 'p-6',
    },
    large: {
      value: 'text-5xl md:text-6xl lg:text-7xl',
      label: 'text-base md:text-lg',
      padding: 'p-8',
    },
  };

  const variantClasses = {
    default: {
      bg: 'bg-gray-100',
      text: 'text-gray-900',
      label: 'text-gray-600',
    },
    light: {
      bg: 'bg-white/10 backdrop-blur-sm',
      text: 'text-white',
      label: 'text-white/80',
    },
    dark: {
      bg: 'bg-gray-800',
      text: 'text-white',
      label: 'text-gray-400',
    },
  };

  const Component = animate ? motion.div : 'div';
  const animationProps = animate
    ? {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: { type: 'spring', stiffness: 400, damping: 17 },
      }
    : {};

  return (
    <Component
      className={clsx(
        'rounded-2xl text-center transition-transform',
        sizeClasses[size].padding,
        variantClasses[variant].bg,
        className
      )}
      {...animationProps}
    >
      <div
        className={clsx(
          'font-black tracking-tight',
          sizeClasses[size].value,
          variantClasses[variant].text
        )}
      >
        {value}
      </div>
      <div
        className={clsx(
          'mt-2 font-medium uppercase tracking-wider',
          sizeClasses[size].label,
          variantClasses[variant].label
        )}
      >
        {label}
      </div>
    </Component>
  );
};