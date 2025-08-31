import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';

interface NeobankCrisisSlideProps {
  slideNumber: number;
}

const NeobankCrisisSlide: React.FC<NeobankCrisisSlideProps> = ({ slideNumber }) => {
  const metrics = [
    { label: 'NPL Rate', value: '21%', change: '+400%', trend: 'up' },
    { label: 'Collection Efficiency', value: '62%', change: '-23%', trend: 'down' },
    { label: 'Human Collectors Needed', value: '400K+', change: '+850%', trend: 'up' },
  ];

  return (
    <SlideLayout slideNumber={slideNumber} variant="dark">
      <div className="container mx-auto px-8 py-16 flex flex-col justify-center min-h-screen">
        <KlevaLogo variant="light" className="mb-8" />
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Silent Crisis in Latin American Banking
        </motion.h1>

        <motion.div
          className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xl text-white/90">
            Post-pandemic NPLs have exploded 400%. Traditional collection methods are failing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <p className="text-sm text-white/60 mb-2">{metric.label}</p>
              <p className="text-3xl font-bold text-white mb-1">{metric.value}</p>
              <p className={`text-sm ${metric.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                {metric.change} vs 2019
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-3">The Human Bottleneck</h3>
          <p className="text-white/80">
            Banks need to hire 400,000+ collectors to match demand. At $3,000/month per collector, 
            that's $14.4 billion annually - making the problem economically impossible to solve with humans.
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default NeobankCrisisSlide;