import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';

interface HumanCostSlideProps {
  slideNumber: number;
}

const HumanCostSlide: React.FC<HumanCostSlideProps> = ({ slideNumber }) => {
  const costs = [
    { category: 'Salary & Benefits', amount: '$3,000', percentage: '60%' },
    { category: 'Training & Onboarding', amount: '$800', percentage: '16%' },
    { category: 'Infrastructure & Tools', amount: '$600', percentage: '12%' },
    { category: 'Management Overhead', amount: '$600', percentage: '12%' },
  ];

  return (
    <SlideLayout slideNumber={slideNumber} variant="default">
      <div className="container mx-auto px-8 py-16 flex flex-col justify-center min-h-screen">
        <KlevaLogo variant="dark" className="mb-8" />
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          The $5,000 Reality Check
        </motion.h1>

        <motion.p
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          True monthly cost per human collector in Latin America
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {costs.map((cost, index) => (
              <div key={cost.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{cost.category}</p>
                  <p className="text-2xl font-bold text-kleva-black">{cost.amount}</p>
                </div>
                <div className="text-right">
                  <div className="w-20 h-20 relative">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(parseInt(cost.percentage) * 226) / 100} 226`}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                      {cost.percentage}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Hidden Costs</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>50% annual turnover rate means constant retraining</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Collectors average only 20-30 meaningful calls per day</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Burnout leads to declining performance after 6 months</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Management overhead scales linearly with team size</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xl font-bold text-red-900 mb-2">
            Total: $5,000/month per collector
          </p>
          <p className="text-gray-700">
            For 400,000 collectors needed: <strong className="text-red-900">$24 billion annually</strong> - 
            more than the entire market cap of many Latin American banks.
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default HumanCostSlide;