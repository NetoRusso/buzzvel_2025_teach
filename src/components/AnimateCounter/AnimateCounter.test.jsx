import { render, screen, act } from '@testing-library/react';
import AnimatedCounter from './index';
import { useInView } from 'react-intersection-observer';
import { formatNumber } from '@/utils/formatNumber';

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

jest.mock('@/utils/formatNumber', () => ({
  formatNumber: jest.fn((num) => num.toString()),
}));

describe('AnimatedCounter Component', () => {
  let mockUseInView;
  let originalPerformanceNow;
  let mockPerformanceNowFn;
  let animationFrameCallbacks = [];

  beforeEach(() => {
    mockUseInView = {
      ref: jest.fn(),
      inView: false,
      entry: undefined,
    };
    useInView.mockReturnValue(mockUseInView);

    originalPerformanceNow = window.performance.now;
    mockPerformanceNowFn = jest.fn();
    window.performance.now = mockPerformanceNowFn;

    animationFrameCallbacks = [];
    window.requestAnimationFrame = jest.fn((cb) => {
      animationFrameCallbacks.push(cb);
      return animationFrameCallbacks.length;
    });
    window.cancelAnimationFrame = jest.fn(); // Mock simples para cancelAnimationFrame
  });

  afterEach(() => {
    window.performance.now = originalPerformanceNow;
    jest.restoreAllMocks();
  });

  const runAnimationFrames = (frameCount = 1) => {
    for (let i = 0; i < frameCount; i++) {
      const callback = animationFrameCallbacks.shift();
      if (callback) {
        callback(window.performance.now());
      }
    }
  };

  it('renders initial count of 0 when client-side but not in view', () => {
    render(<AnimatedCounter end={100} />);
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('0');
    expect(formatNumber).toHaveBeenCalledWith(0);
  });

  it('does not start animation if not in view and time passes', () => {
    render(<AnimatedCounter end={100} duration={100} />);
    act(() => {
      mockPerformanceNowFn.mockReturnValue(50);
      runAnimationFrames();
    });
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('0');
  });

  it('animates to the end value when it comes into view', () => {
    const { rerender } = render(<AnimatedCounter end={100} duration={100} />);
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('0');

    mockPerformanceNowFn.mockReturnValue(0); 

    mockUseInView.inView = true;
    useInView.mockReturnValue(mockUseInView);
    rerender(<AnimatedCounter end={100} duration={100} />);
    
    act(() => {
      mockPerformanceNowFn.mockReturnValue(10); 
      runAnimationFrames(1); 
    });
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('10');

    act(() => {
      mockPerformanceNowFn.mockReturnValue(50); 
      runAnimationFrames(1); 
    });
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('50');

    act(() => {
      mockPerformanceNowFn.mockReturnValue(100); 
      runAnimationFrames(1); 
    });
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('100');
    expect(formatNumber).toHaveBeenLastCalledWith(100);

    act(() => {
      mockPerformanceNowFn.mockReturnValue(150);
      runAnimationFrames(1); 
    });
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('100');
  });

  it('uses formatNumber utility for display', () => {
    mockUseInView.inView = true;
    useInView.mockReturnValue(mockUseInView);
    mockPerformanceNowFn.mockReturnValue(0);

    render(<AnimatedCounter end={1234} duration={10} />);
    
    act(() => {
      mockPerformanceNowFn.mockReturnValue(10); 
      runAnimationFrames(5); 
    });

    expect(formatNumber).toHaveBeenCalled();
    expect(formatNumber).toHaveBeenLastCalledWith(1234);
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('1234');
  });

  it('stops at "end" value even if duration is slightly off in calculation', () => {
    mockUseInView.inView = true;
    useInView.mockReturnValue(mockUseInView);
    mockPerformanceNowFn.mockReturnValue(0);

    render(<AnimatedCounter end={50} duration={50} />);

    act(() => {
      mockPerformanceNowFn.mockReturnValue(60); 
      runAnimationFrames(5); 
    });
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('50');
  });
});