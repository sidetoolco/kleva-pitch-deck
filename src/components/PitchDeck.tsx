import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown, ChevronUp, Mail, Linkedin, Globe, FileText } from 'lucide-react';

interface SlideProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

const Slide: React.FC<SlideProps> = ({ children, id, className = '' }) => {
  return (
    <section
      id={id}
      className={`min-h-screen flex items-center justify-center p-8 snap-start ${className}`}
      role="region"
      aria-label={`Slide ${id}`}
    >
      <div className="max-w-7xl w-full mx-auto">
        {children}
      </div>
    </section>
  );
};

interface MetricCardProps {
  value: string;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label, trend }) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-3xl font-bold text-black mb-2">{value}</div>
      <div className={`text-sm ${trend ? trendColors[trend] : 'text-gray-600'}`}>
        {label}
      </div>
    </div>
  );
};

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <div className="w-16 h-16 bg-black rounded-full mb-4 mx-auto" />
      <h4 className="text-lg font-semibold text-black">{name}</h4>
      <p className="text-sm text-gray-600 mb-2">{role}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
};

const PitchDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const slides = [
    'title', 'intro', 'problem', 'current-solution', 'what-if',
    'solution', 'dream', 'traction', 'different', 'wave',
    'why-now', 'why-us', 'milestone', 'vision', 'contact'
  ];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch(e.key) {
      case 'ArrowDown':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1);
        }
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1);
        }
        break;
      case 'Home':
        e.preventDefault();
        setCurrentSlide(0);
        break;
      case 'End':
        e.preventDefault();
        setCurrentSlide(slides.length - 1);
        break;
    }
  }, [currentSlide, slides.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const element = document.getElementById(slides[currentSlide]);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSlide, slides]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const scrollPosition = containerRef.current.scrollTop;
    const slideHeight = window.innerHeight;
    const newSlide = Math.round(scrollPosition / slideHeight);
    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide);
    }
  }, [currentSlide]);

  return (
    <div className="relative bg-white text-black">
      {/* Navigation Dots */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block" aria-label="Slide navigation">
        <ul className="space-y-2">
          {slides.map((slide, index) => (
            <li key={slide}>
              <button
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-black scale-150' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide ? 'true' : 'false'}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Slide Counter */}
      <div className="fixed bottom-4 right-4 text-sm text-gray-500 z-50" aria-live="polite">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Main Container */}
      <main 
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
        onScroll={handleScroll}
      >
        {/* Slide 1: Title */}
        <Slide id="title">
          <div className="text-center">
            <img 
              src="kleva-pitch-deck/kleva-logo-copy.png" 
              alt="Kleva" 
              className="h-20 max-w-xs mx-auto mb-8 object-contain"
              onLoad={() => setIsLogoLoaded(true)}
              onError={() => console.error('Logo failed to load')}
            />
            {!isLogoLoaded && (
              <h1 className="text-7xl font-bold mb-8 text-black">Kleva</h1>
            )}
            <p className="text-2xl text-gray-600">
              AI that collects debt better than humans in Latin America
            </p>
          </div>
        </Slide>

        {/* Slide 2: Quick Intro */}
        <Slide id="intro">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-12 text-black">Quick Intro</h2>
            <div className="space-y-6 text-xl max-w-2xl mx-auto">
              <p>Live with 3 paying clients ($37K MRR)</p>
              <p>150,000 minutes of collection calls monthly</p>
              <p>Team of 9 from Sidetool (AI agency)</p>
              <p>Invested $100K of our own money to build this</p>
            </div>
          </div>
        </Slide>

        {/* Slide 3: The Problem */}
        <Slide id="problem">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">The Problem</h2>
            <p className="text-3xl font-bold mb-8 text-orange-600">
              60% of Latin American fintech loans go bad
            </p>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Maria is a collections agent in Guatemala. She makes 80 calls a day. 
                Gets yelled at 40 times. Collects from maybe 5 people. 
                She'll quit in 3 months like everyone before her.
              </p>
              <p className="text-lg font-semibold">
                This is happening at every bank in Latin America.
              </p>
            </div>
          </div>
        </Slide>

        {/* Slide 4: Current Solution */}
        <Slide id="current-solution">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">How They Solve It Today</h2>
            <h3 className="text-3xl font-bold mb-8">Banks throw humans at the problem</h3>
            <div className="space-y-4 text-xl max-w-2xl mx-auto">
              <p>200+ agents at each bank just making calls</p>
              <p>75-100% annual turnover</p>
              <p>Excel spreadsheets to track everything</p>
              <p>Only recovering 20 cents per dollar</p>
            </div>
            <p className="text-2xl mt-8 font-semibold text-red-600">
              The system is completely broken.
            </p>
          </div>
        </Slide>

        {/* Slide 5: What If */}
        <Slide id="what-if">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">What If Instead...</h2>
            <p className="text-3xl font-bold mb-8">What if AI could make those calls?</p>
            <p className="text-xl leading-relaxed mb-8">
              Never gets tired. Never quits. Works 24/7.<br/>
              And debtors actually prefer talking to it.
            </p>
            <p className="text-4xl font-bold text-black">
              That's Kleva.
            </p>
          </div>
        </Slide>

        {/* Slide 6: Our Solution */}
        <Slide id="solution">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">Our Solution</h2>
            <h3 className="text-3xl font-bold mb-8">Kleva: AI Collections Agents</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <MetricCard value="5,000" label="Calls per day" trend="up" />
              <MetricCard value="20%" label="Higher recovery" trend="up" />
              <MetricCard value="60%" label="Lower cost" trend="down" />
              <MetricCard value="24/7" label="Availability" trend="neutral" />
              <MetricCard value="∞" label="Patience" trend="neutral" />
              <MetricCard value="2" label="Languages (ES/PT)" trend="neutral" />
            </div>
          </div>
        </Slide>

        {/* Slide 7: The Dream */}
        <Slide id="dream">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">The Dream</h2>
            <p className="text-2xl mb-8">
              We're building the AI workforce for Latin American finance
            </p>
            <p className="text-xl mb-8">
              Start with collections (the hardest problem)<br/>
              Then expand to every repetitive role in banking
            </p>
            <p className="text-3xl font-bold text-black">
              This is a $67B market in LATAM alone.
            </p>
          </div>
        </Slide>

        {/* Slide 8: Traction */}
        <Slide id="traction">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">Traction</h2>
            <p className="text-3xl font-bold mb-8">From $0 to $37K MRR in 3 months</p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-lg">Vana</h4>
                <p className="text-2xl font-bold my-2">$17K/mo</p>
                <p className="text-sm text-gray-600">Microloans</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-lg">ADT</h4>
                <p className="text-2xl font-bold my-2">$15K/mo</p>
                <p className="text-sm text-gray-600">Security subscriptions</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-lg">DirecTV</h4>
                <p className="text-2xl font-bold my-2">$5K/mo</p>
                <p className="text-sm text-gray-600">Satellite contracts</p>
              </div>
            </div>
            
            <p className="text-2xl font-bold text-black">
              Pipeline: $158K MRR closing September
            </p>
          </div>
        </Slide>

        {/* Slide 9: Why We're Different */}
        <Slide id="different">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">Why We're Different</h2>
            <p className="text-3xl font-bold mb-8">Others use chatbots. We make phone calls.</p>
            
            <div className="space-y-4 text-xl max-w-3xl mx-auto">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span>Colektia</span>
                <span className="text-gray-600">WhatsApp only</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span>Traditional centers</span>
                <span className="text-gray-600">$3/min (humans)</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-black text-white rounded-lg">
                <span className="font-bold">Kleva</span>
                <span className="font-bold">$0.17/min (AI)</span>
              </div>
            </div>
            
            <p className="text-xl mt-8 font-semibold">
              We handle the hardest channel (voice) with the best results.
            </p>
          </div>
        </Slide>

        {/* Slide 10: The Wave */}
        <Slide id="wave">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">The Wave We're Riding</h2>
            <p className="text-3xl font-bold mb-8">Delinquency is exploding globally</p>
            
            <div className="space-y-4 max-w-3xl mx-auto mb-8">
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-left">
                <span className="font-bold">Brazil:</span> 77.5% of families in debt
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-left">
                <span className="font-bold">Argentina:</span> Personal loans at 4%+ delinquency
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-left">
                <span className="font-bold">US:</span> Superprime borrowers defaulting 109% more YoY
              </div>
            </div>
            
            <p className="text-2xl font-semibold text-black">
              Collections is becoming THE critical function for every lender.
            </p>
          </div>
        </Slide>

        {/* Slide 11: Why Now */}
        <Slide id="why-now">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">Why Now?</h2>
            <p className="text-3xl font-bold mb-8">The perfect storm:</p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-green-700 mb-2">Tech finally works</h4>
                <p className="text-sm">GPT-4 speaks perfect Spanish/Portuguese</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-green-700 mb-2">Costs collapsed</h4>
                <p className="text-sm">What cost $1/minute now costs $0.06</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h4 className="font-bold text-orange-700 mb-2">Crisis accelerating</h4>
                <p className="text-sm">Banks can't hire collectors fast enough</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h4 className="font-bold text-orange-700 mb-2">LATAM ready</h4>
                <p className="text-sm">Lower regulatory barriers than US</p>
              </div>
            </div>
            
            <p className="text-2xl font-semibold">
              We couldn't have built this 2 years ago. Now we can.
            </p>
          </div>
        </Slide>

        {/* Slide 12: Why Us */}
        <Slide id="why-us">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">Why Us?</h2>
            <p className="text-3xl font-bold mb-8">We understand both AI and LATAM</p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <TeamMember
                name="Ed Escobar"
                role="CEO & Sales Lead"
                description="Built Sidetool, embedded in 20+ companies"
              />
              <TeamMember
                name="Nicolás Mencia"
                role="Collections Expert"
                description="10 years experience, ex-MercadoPago"
              />
              <TeamMember
                name="JM"
                role="Success Lead"
                description="Ex-Sirena, operations expert"
              />
            </div>
            
            <p className="text-xl font-semibold">
              We're not collections experts who learned AI.<br/>
              We're AI experts who fell in love with solving collections.
            </p>
          </div>
        </Slide>

        {/* Slide 13: Next Milestone */}
        <Slide id="milestone">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">Next Milestone</h2>
            <p className="text-3xl font-bold mb-8">With this funding, by December 2025:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <MetricCard value="$150K" label="MRR (from $37K)" trend="up" />
              <MetricCard value="1M" label="Minutes/month" trend="up" />
              <MetricCard value="10" label="Enterprise banks" trend="up" />
              <MetricCard value="5" label="Countries" trend="up" />
              <MetricCard value="15" label="Team members" trend="up" />
              <MetricCard value="<1mo" label="Payback period" trend="neutral" />
            </div>
          </div>
        </Slide>

        {/* Slide 14: Vision */}
        <Slide id="vision">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">The Bigger Vision</h2>
            
            <div className="space-y-6 max-w-3xl mx-auto mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-lg mb-2">Year 1</h4>
                <p>Master collections</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-lg mb-2">Year 2</h4>
                <p>Expand to dispute resolution, fraud detection</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-lg mb-2">Year 3</h4>
                <p>Full AI workforce for finance</p>
              </div>
            </div>
            
            <p className="text-2xl font-semibold mb-4">
              Every bank in LATAM will use Kleva agents.<br/>
              Then we go to the US with proven results.
            </p>
            
            <p className="text-xl text-gray-600">
              We handle the AI complexity. Banks focus on lending.
            </p>
          </div>
        </Slide>

        {/* Slide 15: Contact */}
        <Slide id="contact">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8 text-black">Contact</h2>
            <p className="text-2xl mb-12 text-gray-600">
              Let's fix collections in Latin America together
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-lg">
                <div className="w-24 h-24 bg-black rounded-full mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-2">Ed Escobar</h3>
                <p className="text-gray-600 mb-6">CEO & Cofounder</p>
                
                <div className="space-y-3">
                  <a
                    href="mailto:ed@kleva.co"
                    className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Mail size={20} />
                    <span>ed@kleva.co</span>
                  </a>
                  
                  <a
                    href="https://linkedin.com/in/edjescobar"
                    className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                  </a>
                  
                  <a
                    href="https://kleva.co"
                    className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Globe size={20} />
                    <span>kleva.co</span>
                  </a>
                  
                  <a
                    href="https://sdtl.io/46QLbsQ"
                    className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FileText size={20} />
                    <span>Financial Model</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      </main>

      {/* Keyboard Hints */}
      <div className="fixed bottom-4 left-4 text-xs text-gray-400 hidden lg:block">
        <kbd className="px-2 py-1 bg-gray-100 rounded">↑↓</kbd> Navigate • 
        <kbd className="px-2 py-1 bg-gray-100 rounded ml-2">Space</kbd> Next
      </div>
    </div>
  );
};

export default PitchDeck;