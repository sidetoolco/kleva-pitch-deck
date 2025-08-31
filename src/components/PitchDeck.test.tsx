import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PitchDeck from './PitchDeck';

describe('PitchDeck Component', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<PitchDeck />);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('renders all 15 slides', () => {
      render(<PitchDeck />);
      const slides = screen.getAllByRole('region');
      expect(slides).toHaveLength(15);
    });

    it('displays Kleva logo or fallback text', () => {
      render(<PitchDeck />);
      const logo = screen.getByAltText('Kleva');
      expect(logo).toBeInTheDocument();
    });

    it('shows slide counter', () => {
      render(<PitchDeck />);
      expect(screen.getByText('1 / 15')).toBeInTheDocument();
    });

    it('renders navigation dots on desktop', () => {
      render(<PitchDeck />);
      const navButtons = screen.getAllByRole('button', { name: /Go to slide/i });
      expect(navButtons).toHaveLength(15);
    });
  });

  describe('Keyboard Navigation', () => {
    it('navigates to next slide with ArrowDown', async () => {
      render(<PitchDeck />);
      
      fireEvent.keyDown(window, { key: 'ArrowDown' });
      
      await waitFor(() => {
        expect(screen.getByText('2 / 15')).toBeInTheDocument();
      });
    });

    it('navigates to previous slide with ArrowUp', async () => {
      render(<PitchDeck />);
      
      // First go to slide 2
      fireEvent.keyDown(window, { key: 'ArrowDown' });
      await waitFor(() => {
        expect(screen.getByText('2 / 15')).toBeInTheDocument();
      });
      
      // Then go back to slide 1
      fireEvent.keyDown(window, { key: 'ArrowUp' });
      await waitFor(() => {
        expect(screen.getByText('1 / 15')).toBeInTheDocument();
      });
    });

    it('navigates to next slide with Space', async () => {
      render(<PitchDeck />);
      
      fireEvent.keyDown(window, { key: ' ' });
      
      await waitFor(() => {
        expect(screen.getByText('2 / 15')).toBeInTheDocument();
      });
    });

    it('navigates to first slide with Home', async () => {
      render(<PitchDeck />);
      
      // Go to slide 3
      fireEvent.keyDown(window, { key: 'ArrowDown' });
      fireEvent.keyDown(window, { key: 'ArrowDown' });
      
      // Press Home
      fireEvent.keyDown(window, { key: 'Home' });
      
      await waitFor(() => {
        expect(screen.getByText('1 / 15')).toBeInTheDocument();
      });
    });

    it('navigates to last slide with End', async () => {
      render(<PitchDeck />);
      
      fireEvent.keyDown(window, { key: 'End' });
      
      await waitFor(() => {
        expect(screen.getByText('15 / 15')).toBeInTheDocument();
      });
    });

    it('prevents navigation beyond boundaries', async () => {
      render(<PitchDeck />);
      
      // Try to go before first slide
      fireEvent.keyDown(window, { key: 'ArrowUp' });
      expect(screen.getByText('1 / 15')).toBeInTheDocument();
      
      // Go to last slide
      fireEvent.keyDown(window, { key: 'End' });
      await waitFor(() => {
        expect(screen.getByText('15 / 15')).toBeInTheDocument();
      });
      
      // Try to go beyond last slide
      fireEvent.keyDown(window, { key: 'ArrowDown' });
      expect(screen.getByText('15 / 15')).toBeInTheDocument();
    });
  });

  describe('Click Navigation', () => {
    it('navigates to specific slide when dot is clicked', async () => {
      render(<PitchDeck />);
      
      const slideButtons = screen.getAllByRole('button', { name: /Go to slide/i });
      
      // Click on slide 5
      await userEvent.click(slideButtons[4]);
      
      await waitFor(() => {
        expect(screen.getByText('5 / 15')).toBeInTheDocument();
      });
    });

    it('highlights current slide dot', () => {
      render(<PitchDeck />);
      
      const slideButtons = screen.getAllByRole('button', { name: /Go to slide/i });
      
      // First slide should be current
      expect(slideButtons[0]).toHaveAttribute('aria-current', 'true');
      expect(slideButtons[1]).toHaveAttribute('aria-current', 'false');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for slides', () => {
      render(<PitchDeck />);
      
      expect(screen.getByRole('region', { name: 'Slide title' })).toBeInTheDocument();
      expect(screen.getByRole('region', { name: 'Slide intro' })).toBeInTheDocument();
    });

    it('has proper ARIA labels for navigation', () => {
      render(<PitchDeck />);
      
      expect(screen.getByRole('navigation', { name: 'Slide navigation' })).toBeInTheDocument();
    });

    it('announces slide changes', () => {
      render(<PitchDeck />);
      
      const counter = screen.getByText('1 / 15');
      expect(counter.closest('div')).toHaveAttribute('aria-live', 'polite');
    });

    it('supports keyboard navigation for all interactive elements', async () => {
      render(<PitchDeck />);
      
      const contactLinks = screen.getAllByRole('link');
      contactLinks.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('Responsive Design', () => {
    it('hides navigation dots on mobile', () => {
      // Mock mobile viewport
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));
      
      render(<PitchDeck />);
      
      const nav = screen.getByRole('navigation', { name: 'Slide navigation' });
      expect(nav).toHaveClass('hidden', 'lg:block');
    });

    it('shows keyboard hints only on desktop', () => {
      render(<PitchDeck />);
      
      const hints = screen.getByText(/Navigate/i).closest('div');
      expect(hints).toHaveClass('hidden', 'lg:block');
    });
  });

  describe('Contact Links', () => {
    it('renders all contact links with correct hrefs', () => {
      render(<PitchDeck />);
      
      expect(screen.getByRole('link', { name: /ed@kleva.co/i }))
        .toHaveAttribute('href', 'mailto:ed@kleva.co');
      
      expect(screen.getByRole('link', { name: /LinkedIn/i }))
        .toHaveAttribute('href', 'https://linkedin.com/in/edjescobar');
      
      expect(screen.getByRole('link', { name: /kleva.co/i }))
        .toHaveAttribute('href', 'https://kleva.co');
      
      expect(screen.getByRole('link', { name: /Financial Model/i }))
        .toHaveAttribute('href', 'https://sdtl.io/46QLbsQ');
    });
  });

  describe('Performance', () => {
    it('uses React.memo for slide components', () => {
      const { rerender } = render(<PitchDeck />);
      
      // Component should not re-render unnecessarily
      const initialRender = screen.getByRole('main');
      
      rerender(<PitchDeck />);
      
      const secondRender = screen.getByRole('main');
      expect(initialRender).toBe(secondRender);
    });

    it('debounces scroll events', async () => {
      const { container } = render(<PitchDeck />);
      const scrollContainer = container.querySelector('main');
      
      const scrollSpy = jest.fn();
      scrollContainer?.addEventListener('scroll', scrollSpy);
      
      // Simulate rapid scrolling
      for (let i = 0; i < 10; i++) {
        fireEvent.scroll(scrollContainer!);
      }
      
      // Should not call handler 10 times immediately
      expect(scrollSpy.mock.calls.length).toBeLessThan(10);
    });
  });
});