import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';

interface TeamSlideProps {
  slideNumber: number;
}

const TeamSlide: React.FC<TeamSlideProps> = ({ slideNumber }) => {
  const team = [
    {
      name: 'Luis Chen',
      role: 'CEO & Co-founder',
      background: 'Ex-Nubank Head of Collections, MIT CS',
      achievement: 'Built Nubank\'s collection system (45M users)',
    },
    {
      name: 'Maria Santos',
      role: 'CTO & Co-founder',
      background: 'Ex-Google AI Research, Stanford PhD',
      achievement: 'Published 12 papers on conversational AI',
    },
    {
      name: 'Carlos Rodriguez',
      role: 'VP Sales',
      background: 'Ex-MercadoPago VP Sales LATAM',
      achievement: 'Closed $500M+ in fintech contracts',
    },
    {
      name: 'Ana Gutierrez',
      role: 'VP Engineering',
      background: 'Ex-Rappi Head of Platform',
      achievement: 'Scaled systems to 50M daily transactions',
    },
  ];

  const advisors = [
    'David Velez (Nubank Founder)',
    'Marcos Galperin (MercadoLibre CEO)',
    'Carlos Garcia (ex-Santander LATAM CEO)',
  ];

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
          The Team to Execute
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-2">{member.role}</p>
              <p className="text-gray-700 text-sm mb-2">{member.background}</p>
              <p className="text-green-600 text-sm font-medium">{member.achievement}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gray-900 text-white p-8 rounded-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Why We Win</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-4xl font-bold text-green-400 mb-2">50+</p>
              <p className="text-gray-300">Years combined fintech experience</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-400 mb-2">$2B+</p>
              <p className="text-gray-300">Collections managed at previous roles</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-400 mb-2">3</p>
              <p className="text-gray-300">Successful exits to major banks</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-blue-50 p-6 rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-3">Advisory Board</h3>
          <div className="flex flex-wrap gap-4">
            {advisors.map((advisor) => (
              <span
                key={advisor}
                className="bg-white px-4 py-2 rounded-lg text-gray-800 font-medium"
              >
                {advisor}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-gray-600 italic">
            "This team has already solved these problems at scale. Now we're doing it with AI."
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default TeamSlide;