import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';

interface BusinessModelSlideProps {
  slideNumber: number;
}

const BusinessModelSlide: React.FC<BusinessModelSlideProps> = ({ slideNumber }) => {
  const pricing = [
    { tier: 'Pay per Success', price: '8-12%', desc: 'of amount collected', ideal: 'Small portfolios' },
    { tier: 'Per Account', price: '$0.50-2', desc: 'per account/month', ideal: 'Mid-size banks' },
    { tier: 'Enterprise', price: 'Custom', desc: 'Flat fee + success', ideal: 'Large banks' },
  ];

  const economics = [
    { metric: 'Gross Margin', value: '87%' },
    { metric: 'CAC Payback', value: '3 months' },
    { metric: 'Net Revenue Retention', value: '142%' },
    { metric: 'LTV/CAC', value: '8.5x' },
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
          Business Model That Scales
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible Pricing</h3>
            <div className="space-y-4">
              {pricing.map((tier, index) => (
                <div key={tier.tier} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900">{tier.tier}</h4>
                    <span className="text-2xl font-bold text-blue-600">{tier.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{tier.desc}</p>
                  <p className="text-gray-500 text-xs">Ideal for: {tier.ideal}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Unit Economics</h3>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {economics.map((item) => (
                  <div key={item.metric} className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{item.value}</p>
                    <p className="text-sm text-gray-600">{item.metric}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <p className="text-gray-700 mb-2">
                  <strong>Revenue per Account:</strong> $2-15/month
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Cost per Account:</strong> $0.25/month
                </p>
                <p className="text-green-600 font-bold">
                  Contribution Margin: 87-98%
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bg-blue-600 text-white p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4">Path to $100M ARR</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold">2024</p>
              <p className="text-xl">$12M ARR</p>
              <p className="text-blue-200">6 enterprise clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold">2025</p>
              <p className="text-xl">$38M ARR</p>
              <p className="text-blue-200">20 enterprise clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold">2026</p>
              <p className="text-xl">$108M ARR</p>
              <p className="text-blue-200">50+ enterprise clients</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default BusinessModelSlide;