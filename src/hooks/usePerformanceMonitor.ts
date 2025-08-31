import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
  TTI?: number; // Time to Interactive
}

/**
 * Custom hook for monitoring web performance metrics
 */
export const usePerformanceMonitor = (enabled: boolean = true) => {
  const logMetric = useCallback((metric: string, value: number) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${metric}: ${value.toFixed(2)}ms`);
    }
    
    // Send to analytics service in production
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'performance', {
        event_category: 'Web Vitals',
        event_label: metric,
        value: Math.round(value),
        non_interaction: true,
      });
    }
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const metrics: PerformanceMetrics = {};

    // Observe FCP (First Contentful Paint)
    const observeFCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              metrics.FCP = entry.startTime;
              logMetric('FCP', entry.startTime);
            }
          }
        });
        observer.observe({ entryTypes: ['paint'] });
        return observer;
      }
    };

    // Observe LCP (Largest Contentful Paint)
    const observeLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          metrics.LCP = lastEntry.renderTime || lastEntry.loadTime;
          logMetric('LCP', metrics.LCP);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        return observer;
      }
    };

    // Observe FID (First Input Delay)
    const observeFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any) {
            metrics.FID = entry.processingStart - entry.startTime;
            logMetric('FID', metrics.FID);
          }
        });
        observer.observe({ entryTypes: ['first-input'] });
        return observer;
      }
    };

    // Observe CLS (Cumulative Layout Shift)
    const observeCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        let clsEntries: any[] = [];
        let sessionValue = 0;
        let sessionEntries: any[] = [];

        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any) {
            if (!entry.hadRecentInput) {
              const firstSessionEntry = sessionEntries[0];
              const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

              if (sessionValue &&
                  entry.startTime - lastSessionEntry.startTime < 1000 &&
                  entry.startTime - firstSessionEntry.startTime < 5000) {
                sessionValue += entry.value;
                sessionEntries.push(entry);
              } else {
                sessionValue = entry.value;
                sessionEntries = [entry];
              }

              if (sessionValue > clsValue) {
                clsValue = sessionValue;
                clsEntries = sessionEntries;
                metrics.CLS = clsValue;
                logMetric('CLS', clsValue);
              }
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
        return observer;
      }
    };

    // Calculate TTFB (Time to First Byte)
    const calculateTTFB = () => {
      if ('performance' in window && 'timing' in window.performance) {
        const timing = window.performance.timing;
        const ttfb = timing.responseStart - timing.navigationStart;
        metrics.TTFB = ttfb;
        logMetric('TTFB', ttfb);
      }
    };

    // Calculate TTI (Time to Interactive) - simplified version
    const calculateTTI = () => {
      if ('performance' in window) {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as any;
        if (navigationEntry) {
          const tti = navigationEntry.loadEventEnd;
          metrics.TTI = tti;
          logMetric('TTI', tti);
        }
      }
    };

    // Initialize observers
    const observers: PerformanceObserver[] = [];
    
    const fcpObserver = observeFCP();
    if (fcpObserver) observers.push(fcpObserver);
    
    const lcpObserver = observeLCP();
    if (lcpObserver) observers.push(lcpObserver);
    
    const fidObserver = observeFID();
    if (fidObserver) observers.push(fidObserver);
    
    const clsObserver = observeCLS();
    if (clsObserver) observers.push(clsObserver);

    // Calculate metrics after load
    if (document.readyState === 'complete') {
      calculateTTFB();
      calculateTTI();
    } else {
      window.addEventListener('load', () => {
        calculateTTFB();
        calculateTTI();
      });
    }

    // Report metrics on page visibility change (user leaving)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log('[Performance] Final metrics:', metrics);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      observers.forEach(observer => observer.disconnect());
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, logMetric]);

  return metrics;
};