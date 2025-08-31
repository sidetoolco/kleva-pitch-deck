import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';
import { MetricCard } from '../MetricCard';

interface TractionSlideProps {
  slideNumber: number;
}

const TractionSlide: React.FC<TractionSlideProps> = ({ slideNumber }) => {
  const metrics = [
    { value: '67%', label: 'Contact Rate', trend: 'up', change: '+4.5x vs human' },
    { value: '52%', label: 'Promise to Pay', trend: 'up', change: '+2.2x vs human' },
    { value: '31%', label: 'Collection Rate', trend: 'up', change: '+3.1x vs human' },
    { value: '$0.12', label: 'Cost per Call', trend: 'down', change: '98% reduction' },
  ];

  const clients = [
    'MercadoPago', 'Nubank', 'Rappi', 'Creditas', 'Konfio', 'Vana'
  ];

  return (
    <SlideLayout slideNumber={slideNumber} variant="default">
      <div className="container mx-auto px-8 py-16 flex flex-col justify-center min-h-screen">
        <KlevaLogo variant="dark" className="mb-8" />
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Proven Results at Scale
        </motion.h1>

        <motion.p
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Processing 850,000+ accounts monthly across Latin America
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} {...metric} delay={0.3 + index * 0.1} />
          ))}
        </div>

        <motion.div
          className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Client Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">MercadoPago</h4>
              <p className="text-gray-700 mb-3">
                "Kleva reduced our NPL rate by 18% in just 3 months while cutting collection costs by 85%"
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-green-600 font-semibold">400K accounts/month</span>
                <span className="text-blue-600 font-semibold">3 countries</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Nubank</h4>
              <p className="text-gray-700 mb-3">
                "The AI calls are so natural, our customers often thank the 'agent' for their patience"
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-green-600 font-semibold">250K accounts/month</span>
                <span className="text-blue-600 font-semibold">Brazil</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-600 font-semibold">Trusted by:</p>
          {clients.map((client) => (
            <span key={client} className="text-gray-800 font-medium text-lg">
              {client}
            </span>
          ))}
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default TractionSlide;