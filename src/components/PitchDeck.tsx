import React, { Suspense, lazy } from 'react';
import { PitchDeckProvider } from '../store/PitchDeckContext';
import { Navigation } from './Navigation';
import { LoadingSpinner } from './LoadingSpinner';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useScrollSnap } from '../hooks/useScrollSnap';

// Lazy load all slide components for better performance
const TitleSlide = lazy(() => import('./slides/TitleSlide'));
const DiscoverySlide = lazy(() => import('./slides/DiscoverySlide'));
const NeobankCrisisSlide = lazy(() => import('./slides/NeobankCrisisSlide'));
const HumanCostSlide = lazy(() => import('./slides/HumanCostSlide'));
const BreakthroughSlide = lazy(() => import('./slides/BreakthroughSlide'));
const SimultaneitySlide = lazy(() => import('./slides/SimultaneitySlide'));
const TractionSlide = lazy(() => import('./slides/TractionSlide'));
const BusinessModelSlide = lazy(() => import('./slides/BusinessModelSlide'));
const MarketOpportunitySlide = lazy(() => import('./slides/MarketOpportunitySlide'));
const GoToMarketSlide = lazy(() => import('./slides/GoToMarketSlide'));
const WhyNowSlide = lazy(() => import('./slides/WhyNowSlide'));
const TeamSlide = lazy(() => import('./slides/TeamSlide'));
const PrioritiesSlide = lazy(() => import('./slides/PrioritiesSlide'));
const ContactSlide = lazy(() => import('./slides/ContactSlide'));

const PitchDeckContent: React.FC = () => {
  const containerRef = useScrollSnap();
  useKeyboardNavigation();

  const slides = [
    { Component: TitleSlide, slideNumber: 1 },
    { Component: DiscoverySlide, slideNumber: 2 },
    { Component: NeobankCrisisSlide, slideNumber: 3 },
    { Component: HumanCostSlide, slideNumber: 4 },
    { Component: BreakthroughSlide, slideNumber: 5 },
    { Component: SimultaneitySlide, slideNumber: 6 },
    { Component: TractionSlide, slideNumber: 7 },
    { Component: BusinessModelSlide, slideNumber: 8 },
    { Component: MarketOpportunitySlide, slideNumber: 9 },
    { Component: GoToMarketSlide, slideNumber: 10 },
    { Component: WhyNowSlide, slideNumber: 11 },
    { Component: TeamSlide, slideNumber: 12 },
    { Component: PrioritiesSlide, slideNumber: 13 },
    { Component: ContactSlide, slideNumber: 14 },
  ];

  return (
    <div className="relative h-screen overflow-hidden bg-kleva-black">
      <Navigation />
      
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {slides.map(({ Component, slideNumber }) => (
          <div
            key={slideNumber}
            data-slide={slideNumber}
            className="h-screen snap-start"
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Component slideNumber={slideNumber} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

const PitchDeck: React.FC = () => {
  return (
    <PitchDeckProvider>
      <PitchDeckContent />
    </PitchDeckProvider>
  );
};

export default PitchDeck;