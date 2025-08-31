import React from 'react';
import { clsx } from 'clsx';

interface KlevaLogoProps {
  variant?: 'dark' | 'light';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const KlevaLogo: React.FC<KlevaLogoProps> = ({
  variant = 'dark',
  size = 'medium',
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-10 h-10 text-2xl',
    medium: 'w-14 h-14 text-3xl',
    large: 'w-20 h-20 text-5xl',
  };

  const textSizeClasses = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-4xl',
  };

  const markBg = variant === 'dark' ? 'bg-gray-900' : 'bg-white';
  const markText = variant === 'dark' ? 'text-white' : 'text-gray-900';
  const logoText = variant === 'dark' ? 'text-gray-900' : 'text-white';

  return (
    <div className={clsx('inline-flex items-center gap-3', className)}>
      <div
        className={clsx(
          'rounded-xl flex items-center justify-center font-black',
          sizeClasses[size],
          markBg,
          markText
        )}
        role="img"
        aria-label="Kleva logo mark"
      >
        K
      </div>
      <span
        className={clsx(
          'font-extrabold tracking-tight',
          textSizeClasses[size],
          logoText
        )}
      >
        KLEVA
      </span>
    </div>
  );
};