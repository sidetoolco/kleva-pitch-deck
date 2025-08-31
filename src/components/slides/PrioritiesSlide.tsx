import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';

interface PrioritiesSlideProps {
  slideNumber: number;
}

const PrioritiesSlide: React.FC<PrioritiesSlideProps> = ({ slideNumber }) => {
  const priorities = [
    {
      quarter: 'Q1 2025',
      goals: [
        'Close Series A ($25M)',
        'Launch with 3 top-10 LATAM banks',
        'Hit 1M accounts/month processed',
        'Expand engineering team to 30',
      ],
    },
    {
      quarter: 'Q2 2025',
      goals: [
        'Launch Portuguese & English models',
        'Enter Brazil market (MercadoPago pilot)',
        'Build partner channel (3 key partners)',
        'Achieve SOC2 Type II certification',
      ],
    },
    {
      quarter: 'Q3 2025',
      goals: [
        'Launch self-serve platform',
        'Expand to 20 enterprise clients',
        'Process 5M accounts/month',
        'Open Mexico City office',
      ],
    },
    {
      quarter: 'Q4 2025',
      goals: [
        'Hit $38M ARR run rate',
        'Launch API marketplace',
        'Enter US Hispanic market',
        'Prepare Series B ($50M target)',
      ],
    },
  ];

  const askDetails = [
    { label: 'Amount', value: '$25M Series A' },
    { label: 'Valuation', value: '$150M pre-money' },
    { label: 'Lead', value: 'Looking for fintech-focused fund' },
    { label: 'Use of Funds', value: 'GTM (40%), Product (35%), Ops (25%)' },
  ];

  return (
    <SlideLayout slideNumber={slideNumber} variant="gradient">
      <div className="container mx-auto px-8 py-16 flex flex-col justify-center min-h-screen">
        <KlevaLogo variant="light" className="mb-8" />
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          2025 Priorities & Ask
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {priorities.map((priority, index) => (
            <motion.div
              key={priority.quarter}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <h3 className="font-bold text-green-400 mb-3">{priority.quarter}</h3>
              <ul className="space-y-2">
                {priority.goals.map((goal, idx) => (
                  <li key={idx} className="text-white/90 text-sm flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm p-8 rounded-xl mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">The Ask</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {askDetails.map((detail) => (
              <div key={detail.label}>
                <p className="text-white/60 text-sm mb-1">{detail.label}</p>
                <p className="text-white font-bold">{detail.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-bold text-white mb-3">What We Offer Investors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90">
            <div>
              <p className="font-semibold text-green-400 mb-1">10x Return Potential</p>
              <p className="text-sm">Clear path to $1B+ valuation by 2027</p>
            </div>
            <div>
              <p className="font-semibold text-green-400 mb-1">Proven Traction</p>
              <p className="text-sm">$12M ARR with 142% NRR</p>
            </div>
            <div>
              <p className="font-semibold text-green-400 mb-1">Strategic Value</p>
              <p className="text-sm">Portfolio company synergies in fintech</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default PrioritiesSlide;