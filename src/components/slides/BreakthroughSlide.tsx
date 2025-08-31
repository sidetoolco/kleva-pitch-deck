import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';

interface BreakthroughSlideProps {
  slideNumber: number;
}

const BreakthroughSlide: React.FC<BreakthroughSlideProps> = ({ slideNumber }) => {
  const capabilities = [
    { icon: '🎯', title: 'Perfect Timing', desc: 'Calls each customer at their optimal time' },
    { icon: '🌍', title: '7 Languages', desc: 'Native fluency in all LATAM languages' },
    { icon: '💬', title: 'Infinite Patience', desc: 'Never frustrated, always empathetic' },
    { icon: '📊', title: 'Real-time Learning', desc: 'Improves with every interaction' },
  ];

  return (
    <SlideLayout slideNumber={slideNumber} variant="gradient">
      <div className="container mx-auto px-8 py-16 flex flex-col justify-center min-h-screen">
        <KlevaLogo variant="light" className="mb-8" />
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          The AI Breakthrough
        </motion.h1>

        <motion.div
          className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Voice AI That Sounds Human</h2>
          <p className="text-white/90 text-lg">
            For the first time, AI can conduct full collection conversations that debtors can't distinguish 
            from human collectors - but with superhuman capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="text-4xl mb-3">{cap.icon}</div>
              <h3 className="font-bold text-white mb-2">{cap.title}</h3>
              <p className="text-white/80 text-sm">{cap.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-3">The Economics Revolution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90">
            <div>
              <p className="text-3xl font-bold text-green-400">$0.12</p>
              <p className="text-sm">per call vs $5 human</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">24/7</p>
              <p className="text-sm">availability</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">∞</p>
              <p className="text-sm">scalability</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default BreakthroughSlide;