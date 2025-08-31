import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';

interface GoToMarketSlideProps {
  slideNumber: number;
}

const GoToMarketSlide: React.FC<GoToMarketSlideProps> = ({ slideNumber }) => {
  const phases = [
    {
      phase: 'Phase 1: Enterprise',
      timeline: 'Now - Q2 2025',
      focus: 'Top 20 banks & fintechs',
      strategy: 'Direct sales, white-glove onboarding',
      target: '20 clients, $38M ARR',
    },
    {
      phase: 'Phase 2: Mid-Market',
      timeline: 'Q3 2025 - Q4 2025',
      focus: 'Regional banks, large MFIs',
      strategy: 'Partner channel + inside sales',
      target: '100 clients, $65M ARR',
    },
    {
      phase: 'Phase 3: Self-Serve',
      timeline: 'Q1 2026+',
      focus: 'Small lenders, collection agencies',
      strategy: 'Product-led growth, API-first',
      target: '1000+ clients, $100M+ ARR',
    },
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
          Go-to-Market Strategy
        </motion.h1>

        <div className="space-y-6 mb-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-l-4 border-blue-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                <span className="text-sm text-gray-600 font-medium">{phase.timeline}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Focus</p>
                  <p className="text-gray-700 font-medium">{phase.focus}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Strategy</p>
                  <p className="text-gray-700">{phase.strategy}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Target</p>
                  <p className="text-green-600 font-bold">{phase.target}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gray-900 text-white p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Key Differentiators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold mb-2">2-Week Deployment</h4>
              <p className="text-gray-300 text-sm">
                From contract to first call in 14 days vs 6 months for competitors
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold mb-2">Success-Based Pricing</h4>
              <p className="text-gray-300 text-sm">
                No upfront costs, pay only for results - zero risk for clients
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold mb-2">Bank-Grade Security</h4>
              <p className="text-gray-300 text-sm">
                SOC2, ISO27001, PCI-DSS compliant with on-premise option
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default GoToMarketSlide;