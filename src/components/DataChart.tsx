import React, { useEffect, useRef, useState } from 'react';
import { SlideTransition } from './SlideTransition';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface DataChartProps {
  data: DataPoint[];
  type?: 'bar' | 'line' | 'pie';
  height?: number;
  showValues?: boolean;
  animated?: boolean;
  className?: string;
}

/**
 * Simple data visualization component
 */
export const DataChart: React.FC<DataChartProps> = ({
  data,
  type = 'bar',
  height = 300,
  showValues = true,
  animated = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const maxValue = Math.max(...data.map(d => d.value));

  if (type === 'bar') {
    return (
      <div ref={containerRef} className={`w-full ${className}`}>
        <div className="flex items-end justify-between gap-4" style={{ height }}>
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * 100;
            const delay = animated ? index * 100 : 0;
            
            return (
              <div
                key={item.label}
                className="flex-1 flex flex-col items-center justify-end"
              >
                {showValues && (
                  <span className="text-sm font-bold mb-2">
                    ${(item.value / 1000).toFixed(0)}K
                  </span>
                )}
                <div
                  className="w-full bg-black rounded-t-lg transition-all duration-700 ease-out"
                  style={{
                    height: isVisible ? `${barHeight}%` : '0%',
                    transitionDelay: `${delay}ms`,
                    backgroundColor: item.color || '#000000',
                  }}
                />
                <span className="text-xs text-gray-600 mt-2">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === 'line') {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.value / maxValue) * 100;
      return { x, y, ...item };
    });

    return (
      <div ref={containerRef} className={`w-full ${className}`}>
        <svg width="100%" height={height} viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              strokeDasharray: isVisible ? '0' : '1000',
              strokeDashoffset: isVisible ? '0' : '1000',
            }}
          />
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="1.5"
              fill="#000000"
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            />
          ))}
        </svg>
        <div className="flex justify-between mt-2">
          {data.map((item) => (
            <span key={item.label} className="text-xs text-gray-600">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90; // Start from top

    const slices = data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;

      const x1 = 50 + 40 * Math.cos(startAngleRad);
      const y1 = 50 + 40 * Math.sin(startAngleRad);
      const x2 = 50 + 40 * Math.cos(endAngleRad);
      const y2 = 50 + 40 * Math.sin(endAngleRad);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M 50 50`,
        `L ${x1} ${y1}`,
        `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`,
      ].join(' ');

      return {
        pathData,
        percentage,
        delay: index * 100,
        ...item,
      };
    });

    return (
      <div ref={containerRef} className={`w-full ${className}`}>
        <div className="flex items-center justify-center" style={{ height }}>
          <svg width="200" height="200" viewBox="0 0 100 100">
            {slices.map((slice, index) => (
              <path
                key={index}
                d={slice.pathData}
                fill={slice.color || `hsl(0, 0%, ${20 + index * 20}%)`}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transitionDelay: `${slice.delay}ms`,
                  transformOrigin: '50px 50px',
                  transform: isVisible ? 'scale(1)' : 'scale(0)',
                }}
              />
            ))}
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((item, index) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: item.color || `hsl(0, 0%, ${20 + index * 20}%)`,
                }}
              />
              <span className="text-xs">
                {item.label}: {((item.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

/**
 * Growth chart component for showing MRR progression
 */
export const GrowthChart: React.FC<{ className?: string }> = ({ className = '' }) => {
  const growthData = [
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 8000 },
    { label: 'Aug', value: 22000 },
    { label: 'Sep', value: 37000 },
    { label: 'Oct', value: 65000 },
    { label: 'Nov', value: 95000 },
    { label: 'Dec', value: 150000 },
  ];

  return (
    <SlideTransition direction="up" duration={800}>
      <div className={`bg-white rounded-xl p-6 border border-gray-100 shadow-sm ${className}`}>
        <h3 className="text-lg font-bold mb-4">MRR Growth Trajectory</h3>
        <DataChart data={growthData} type="line" height={200} />
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">$37K</p>
            <p className="text-xs text-gray-600">Current MRR</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">+305%</p>
            <p className="text-xs text-gray-600">3-Month Growth</p>
          </div>
          <div>
            <p className="text-2xl font-bold">$150K</p>
            <p className="text-xs text-gray-600">Dec 2025 Target</p>
          </div>
        </div>
      </div>
    </SlideTransition>
  );
};

/**
 * Market share visualization
 */
export const MarketShareChart: React.FC<{ className?: string }> = ({ className = '' }) => {
  const marketData = [
    { label: 'Collections', value: 67, color: '#000000' },
    { label: 'Call Centers', value: 53, color: '#666666' },
    { label: 'Our Target', value: 0.24, color: '#10B981' },
  ];

  return (
    <SlideTransition direction="up" duration={800}>
      <div className={`bg-white rounded-xl p-6 border border-gray-100 shadow-sm ${className}`}>
        <h3 className="text-lg font-bold mb-4">LATAM Market Opportunity</h3>
        <DataChart data={marketData} type="bar" height={200} />
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Total Addressable Market: <span className="font-bold text-black">$120B</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Our 0.2% target: <span className="font-bold text-green-600">$240M ARR</span>
          </p>
        </div>
      </div>
    </SlideTransition>
  );
};