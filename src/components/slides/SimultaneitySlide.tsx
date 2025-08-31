import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';

interface SimultaneitySlideProps {
  slideNumber: number;
}

const SimultaneitySlide: React.FC<SimultaneitySlideProps> = ({ slideNumber }) => {
  return (
    <SlideLayout slideNumber={slideNumber} variant="default">
      <div className="container mx-auto px-8 py-16 flex flex-col justify-center min-h-screen">
        <KlevaLogo variant="dark" className="mb-8" />
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Power of Simultaneity
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-red-50 p-8 rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-red-900 mb-4">Human Collectors</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-red-200">
                <span className="text-gray-700">Calls per day</span>
                <span className="font-bold text-red-900">20-30</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-red-200">
                <span className="text-gray-700">Contact rate</span>
                <span className="font-bold text-red-900">15%</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-red-200">
                <span className="text-gray-700">Optimal timing</span>
                <span className="font-bold text-red-900">Random</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-700">Scale limit</span>
                <span className="font-bold text-red-900">Linear hiring</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-green-50 p-8 rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-green-900 mb-4">Kleva AI</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-green-200">
                <span className="text-gray-700">Calls per day</span>
                <span className="font-bold text-green-900">1,000,000+</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-green-200">
                <span className="text-gray-700">Contact rate</span>
                <span className="font-bold text-green-900">67%</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-green-200">
                <span className="text-gray-700">Optimal timing</span>
                <span className="font-bold text-green-900">AI-optimized</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-700">Scale limit</span>
                <span className="font-bold text-green-900">Infinite</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 bg-gradient-to-r from-blue-600 to-green-500 p-8 rounded-xl text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4">The Game Changer</h3>
          <p className="text-lg mb-4">
            Kleva can call your entire delinquent portfolio simultaneously, each at their optimal time.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="font-bold">Morning:</span> Retirees
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="font-bold">Lunch:</span> Office workers
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="font-bold">Evening:</span> Service workers
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="font-bold">Weekend:</span> Busy professionals
            </div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default SimultaneitySlide;