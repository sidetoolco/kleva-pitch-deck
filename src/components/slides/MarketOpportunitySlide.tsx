import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';

interface MarketOpportunitySlideProps {
  slideNumber: number;
}

const MarketOpportunitySlide: React.FC<MarketOpportunitySlideProps> = ({ slideNumber }) => {
  const markets = [
    { region: 'Brazil', tam: '$8.2B', sam: '$2.4B', growth: '+32%' },
    { region: 'Mexico', tam: '$4.1B', sam: '$1.2B', growth: '+28%' },
    { region: 'Colombia', tam: '$1.8B', sam: '$540M', growth: '+35%' },
    { region: 'Rest of LATAM', tam: '$3.9B', sam: '$1.1B', growth: '+30%' },
  ];

  return (
    <SlideLayout slideNumber={slideNumber} variant="gradient">
      <div className="container mx-auto px-8 py-16 flex flex-col justify-center min-h-screen">
        <KlevaLogo variant="light" className="mb-8" />
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          $18B Market Opportunity
        </motion.h1>

        <motion.p
          className="text-xl text-white/90 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Latin America's debt collection market is exploding
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {markets.map((market, index) => (
            <motion.div
              key={market.region}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <h3 className="font-bold text-white mb-3">{market.region}</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-white/60">TAM</p>
                  <p className="text-2xl font-bold text-white">{market.tam}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60">SAM</p>
                  <p className="text-xl font-semibold text-green-400">{market.sam}</p>
                </div>
                <div className="pt-2 border-t border-white/20">
                  <p className="text-sm text-white/80">YoY Growth: <span className="text-green-400 font-bold">{market.growth}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm p-8 rounded-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Market Drivers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Digital Lending Boom</h4>
              <p className="text-white/80 text-sm">
                500+ fintechs launched in last 3 years, creating $300B in new loans
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Rising NPLs</h4>
              <p className="text-white/80 text-sm">
                Post-pandemic defaults up 400%, creating urgent need for collection
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Regulatory Push</h4>
              <p className="text-white/80 text-sm">
                New regulations require banks to modernize collection practices
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Our Market Share Goal</h3>
              <p className="text-white/80">Capture 3% of SAM by 2026 = $150M ARR</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-green-400">$5.2B</p>
              <p className="text-sm text-white/60">Serviceable Available Market</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default MarketOpportunitySlide;