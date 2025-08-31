import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';

interface DiscoverySlideProps {
  slideNumber: number;
}

const DiscoverySlide: React.FC<DiscoverySlideProps> = ({ slideNumber }) => {
  const stats = [
    { value: '$1.8B', label: 'Nubank needs to collect TODAY' },
    { value: '45,000', label: 'New customers daily' },
    { value: '400,000', label: 'Human collectors needed' },
  ];

  return (
    <SlideLayout slideNumber={slideNumber} variant="default">
      <div className="container mx-auto px-8 py-16 flex flex-col justify-center min-h-screen">
        <KlevaLogo variant="dark" className="mb-8" />
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          The $1.8 Billion Discovery
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-gray-100 border-l-4 border-blue-600 p-8 rounded-lg mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xl md:text-2xl italic text-gray-800 mb-4">
            "Half my company, 200 people, does nothing but make collection calls all day. And we're drowning."
          </p>
          <p className="text-gray-600">
            - Tito, CEO of Vana (Guatemalan microfinance)
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-xl font-bold text-blue-600 mb-4">The Timing Secret</h3>
          <p className="text-gray-700 leading-relaxed">
            Unlike order-taking where success is binary, collections has a secret: 
            <strong className="text-gray-900"> timing is everything.</strong> The difference between calling at 2 PM vs 6 PM 
            can mean 3x higher collection rates. Only AI can call everyone at their optimal time simultaneously.
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default DiscoverySlide;