import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../SlideLayout';
import { KlevaLogo } from '../KlevaLogo';
import { MetricCard } from '../MetricCard';

interface TitleSlideProps {
  slideNumber: number;
}

const TitleSlide: React.FC<TitleSlideProps> = ({ slideNumber }) => {
  const metrics = [
    { value: '$37K', label: 'MRR' },
    { value: '20%', label: 'better recovery' },
    { value: '60%', label: 'lower cost' },
  ];

  return (
    <SlideLayout 
      slideNumber={slideNumber}
      variant="gradient"
      className="flex items-center justify-center"
    >
      <div className="container mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <KlevaLogo variant="light" size="large" className="mx-auto mb-12" />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          AI Collections for
          <br />
          Latin American
          <br />
          Finance
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We enable neobanks to collect at impossible scale
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <MetricCard
                value={metric.value}
                label={metric.label}
                variant="light"
                size="large"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideLayout>
  );
};

export default TitleSlide;