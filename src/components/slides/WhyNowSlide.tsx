import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';

interface WhyNowSlideProps {
  slideNumber: number;
}

const WhyNowSlide: React.FC<WhyNowSlideProps> = ({ slideNumber }) => {
  const factors = [
    {
      title: 'AI Inflection Point',
      description: 'Voice AI finally indistinguishable from humans (2024 breakthrough)',
      icon: '🤖',
    },
    {
      title: 'NPL Crisis',
      description: 'Latin American NPLs at 15-year high, traditional methods failing',
      icon: '📈',
    },
    {
      title: 'Digital Banking Explosion',
      description: '93M new digital bank accounts in LATAM since 2020',
      icon: '💳',
    },
    {
      title: 'Labor Shortage',
      description: 'Cannot hire 400K collectors needed - physically impossible',
      icon: '👥',
    },
  ];

  return (
    <SlideLayout slideNumber={slideNumber} variant="dark">
      <div className="container mx-auto px-8 py-16 flex flex-col justify-center min-h-screen">
        <KlevaLogo variant="light" className="mb-8" />
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Why Now?
        </motion.h1>

        <motion.p
          className="text-xl text-white/80 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Four forces creating a once-in-a-generation opportunity
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {factors.map((factor, index) => (
            <motion.div
              key={factor.title}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{factor.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{factor.title}</h3>
                  <p className="text-white/80">{factor.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-8 rounded-xl mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">The Window is Now</h3>
          <div className="space-y-4 text-white/90">
            <p>
              <strong className="text-orange-400">2019:</strong> Voice AI too robotic - 8% contact rate
            </p>
            <p>
              <strong className="text-yellow-400">2022:</strong> Better but detectable - 31% contact rate
            </p>
            <p>
              <strong className="text-green-400">2024:</strong> Human-level quality - 67% contact rate
            </p>
            <p className="pt-2 border-t border-white/20">
              We have 18-24 months before this becomes commoditized. 
              First-mover advantage is everything.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-2xl font-bold text-white mb-2">
            Banks deploying AI collections today will dominate tomorrow
          </p>
          <p className="text-white/80">
            Those waiting will face insurmountable NPL rates and lose market share
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default WhyNowSlide;