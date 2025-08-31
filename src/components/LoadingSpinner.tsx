import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-green-500"
      role="status"
      aria-label="Loading slide"
    >
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <div className="mt-6 text-white text-center">
          <p className="text-lg font-semibold">Loading...</p>
          <p className="text-sm opacity-80 mt-1">Preparing your presentation</p>
        </div>
      </motion.div>
      <span className="sr-only">Loading slide content</span>
    </div>
  );
};