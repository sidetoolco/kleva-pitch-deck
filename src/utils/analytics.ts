/**
 * Analytics tracking utilities for presentation engagement
 */

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private startTime: number;
  private slideTimings: Map<number, { enterTime: number; duration: number }> = new Map();

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Track slide view
   */
  trackSlideView(slideNumber: number, slideTitle?: string) {
    const now = Date.now();
    
    // Update duration for previous slide
    const prevSlide = Array.from(this.slideTimings.keys()).pop();
    if (prevSlide !== undefined && this.slideTimings.has(prevSlide)) {
      const timing = this.slideTimings.get(prevSlide)!;
      timing.duration = now - timing.enterTime;
    }
    
    // Start timing for new slide
    this.slideTimings.set(slideNumber, {
      enterTime: now,
      duration: 0,
    });
    
    this.track({
      category: 'Slide',
      action: 'View',
      label: slideTitle || `Slide ${slideNumber + 1}`,
      value: slideNumber,
      timestamp: now,
    });
  }

  /**
   * Track user interaction
   */
  trackInteraction(action: string, label?: string, value?: number) {
    this.track({
      category: 'Interaction',
      action,
      label,
      value,
      timestamp: Date.now(),
    });
  }

  /**
   * Track navigation method
   */
  trackNavigation(method: 'keyboard' | 'mouse' | 'touch' | 'auto', from: number, to: number) {
    this.track({
      category: 'Navigation',
      action: method,
      label: `${from} → ${to}`,
      value: to - from,
      timestamp: Date.now(),
    });
  }

  /**
   * Track engagement metrics
   */
  trackEngagement(metric: string, value: number) {
    this.track({
      category: 'Engagement',
      action: metric,
      value,
      timestamp: Date.now(),
    });
  }

  /**
   * Track link clicks
   */
  trackLinkClick(url: string, type: 'internal' | 'external') {
    this.track({
      category: 'Link',
      action: 'Click',
      label: url,
      value: type === 'external' ? 1 : 0,
      timestamp: Date.now(),
    });
  }

  /**
   * Core tracking method
   */
  private track(event: AnalyticsEvent) {
    this.events.push(event);
    
    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event);
    }
  }

  /**
   * Get session summary
   */
  getSessionSummary() {
    const now = Date.now();
    const sessionDuration = (now - this.startTime) / 1000; // in seconds
    
    // Calculate average time per slide
    const slideDurations = Array.from(this.slideTimings.values())
      .map(t => t.duration / 1000)
      .filter(d => d > 0);
    
    const avgTimePerSlide = slideDurations.length > 0
      ? slideDurations.reduce((a, b) => a + b, 0) / slideDurations.length
      : 0;
    
    // Find most viewed slide
    const slideViews = new Map<number, number>();
    this.events
      .filter(e => e.category === 'Slide' && e.action === 'View')
      .forEach(e => {
        const slide = e.value || 0;
        slideViews.set(slide, (slideViews.get(slide) || 0) + 1);
      });
    
    const mostViewedSlide = Array.from(slideViews.entries())
      .sort((a, b) => b[1] - a[1])[0];
    
    // Count interactions
    const interactions = this.events.filter(e => e.category === 'Interaction').length;
    
    return {
      sessionId: this.sessionId,
      duration: sessionDuration,
      slidesViewed: this.slideTimings.size,
      avgTimePerSlide,
      mostViewedSlide: mostViewedSlide ? mostViewedSlide[0] : null,
      totalInteractions: interactions,
      events: this.events.length,
    };
  }

  /**
   * Export analytics data
   */
  exportData() {
    const summary = this.getSessionSummary();
    const data = {
      session: summary,
      events: this.events,
      slideTimings: Array.from(this.slideTimings.entries()).map(([slide, timing]) => ({
        slide,
        enterTime: timing.enterTime,
        duration: timing.duration,
      })),
    };
    
    return data;
  }

  /**
   * Send beacon on page unload
   */
  sendBeacon() {
    if ('sendBeacon' in navigator) {
      const data = JSON.stringify(this.exportData());
      navigator.sendBeacon('/api/analytics', data);
    }
  }
}

// Create singleton instance
let analyticsInstance: Analytics | null = null;

export const getAnalytics = () => {
  if (!analyticsInstance) {
    analyticsInstance = new Analytics();
    
    // Send beacon on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        analyticsInstance?.sendBeacon();
      });
    }
  }
  
  return analyticsInstance;
};

/**
 * React hook for analytics
 */
export const useAnalytics = () => {
  const analytics = getAnalytics();
  
  return {
    trackSlideView: analytics.trackSlideView.bind(analytics),
    trackInteraction: analytics.trackInteraction.bind(analytics),
    trackNavigation: analytics.trackNavigation.bind(analytics),
    trackEngagement: analytics.trackEngagement.bind(analytics),
    trackLinkClick: analytics.trackLinkClick.bind(analytics),
    getSessionSummary: analytics.getSessionSummary.bind(analytics),
  };
};