import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';

interface ContactSlideProps {
  slideNumber: number;
}

const ContactSlide: React.FC<ContactSlideProps> = ({ slideNumber }) => {
  const nextSteps = [
    'Deep dive session with our team',
    'Customer reference calls',
    'Live product demonstration',
    'Financial model review',
  ];

  return (
    <SlideLayout slideNumber={slideNumber} variant="dark">
      <div className="container mx-auto px-8 py-16 flex flex-col justify-center min-h-screen">
        <KlevaLogo variant="light" className="mb-12" />
        
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Let's Build the Future of Collections
          </h1>
          <p className="text-xl text-white/80">
            Join us in solving Latin America's $1.8 trillion debt crisis
          </p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm p-8 rounded-xl mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
          <div className="space-y-3 text-lg">
            <p className="text-white/90">
              <span className="text-white/60">CEO:</span>{' '}
              <a href="mailto:luis@kleva.co" className="text-green-400 hover:text-green-300">
                luis@kleva.co
              </a>
            </p>
            <p className="text-white/90">
              <span className="text-white/60">Web:</span>{' '}
              <a href="https://kleva.co" className="text-green-400 hover:text-green-300">
                kleva.co
              </a>
            </p>
            <p className="text-white/90">
              <span className="text-white/60">Phone:</span>{' '}
              <span className="text-white">+1 (415) 555-0100</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-xl mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-center text-white/90">
                <span className="text-green-400 mr-3">✓</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-2xl font-bold text-green-400 mb-2">
            Currently raising $25M Series A
          </p>
          <p className="text-white/80">
            $10M already committed • Closing March 2025
          </p>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-white/60 text-sm">
            Thank you for your time and consideration
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default ContactSlide;