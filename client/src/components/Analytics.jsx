import { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    // Track page views
    const trackPageView = () => {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: window.location.pathname,
        });
      }
    };

    // Track visitor analytics
    const trackVisitor = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        await fetch(`${API_URL}/api/analytics/visitor`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: window.location.pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
          })
        });
      } catch (error) {
        console.error('Analytics tracking failed:', error);
      }
    };

    trackPageView();
    trackVisitor();

    // Track scroll depth
    let maxScroll = 0;
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0 && typeof window.gtag !== 'undefined') {
          window.gtag('event', 'scroll', {
            event_category: 'engagement',
            event_label: `${maxScroll}%`,
            value: maxScroll
          });
        }
      }
    };

    window.addEventListener('scroll', trackScroll);
    return () => window.removeEventListener('scroll', trackScroll);
  }, []);

  return null; // This component doesn't render anything
};

export default Analytics;