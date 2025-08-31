import React, { Suspense, lazy } from 'react';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
import './styles/globals.css';

// Lazy load the pitch deck for better initial load performance
const PitchDeck = lazy(() => import('./components/PitchDeck'));

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600">Loading presentation...</p>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Pitch deck error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex items-center justify-center bg-white">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              Unable to load the presentation. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  // Monitor performance metrics
  usePerformanceMonitor(true);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <PitchDeck />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;