import { render, screen, act, fireEvent } from '@testing-library/react';
import Blob, { paths as blobPaths } from './index';
import { useInView } from 'react-intersection-observer';
import * as flubber from 'flubber';
import { motion, useAnimationFrame } from 'framer-motion';

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

jest.mock('flubber', () => ({
  ...jest.requireActual('flubber'),
  interpolate: jest.fn((pathA, pathB, options) => 
    jest.fn(t => `interpolated(${pathA ? pathA.substring(1, 5) : 'pA'}..., ${pathB ? pathB.substring(1, 5) : 'pB'}..., t=${t.toFixed(2)})`)
  ),
}));

let useAnimationFrameCallback = null;
const mockMotionPathComponent = jest.fn();

jest.mock('framer-motion', () => {
  const actualFramerMotion = jest.requireActual('framer-motion');
  return {
    ...actualFramerMotion,
    useAnimationFrame: (callback) => {
      useAnimationFrameCallback = callback;
    },
    motion: {
      ...actualFramerMotion.motion,
      path: (props) => mockMotionPathComponent(props),
    },
  };
});

describe('Blob Component', () => {
  let mockUseInView;

  beforeEach(() => {
    mockUseInView = {
      ref: jest.fn(),
      inView: false,
      entry: undefined,
    };
    useInView.mockReturnValue(mockUseInView);
    useAnimationFrameCallback = null;
    
    flubber.interpolate.mockClear();
    mockMotionPathComponent.mockClear();
    
    mockMotionPathComponent.mockImplementation(({ d, fill, animate, transition, onMouseEnter, onMouseLeave, ...rest }) => (
      <path
        data-testid="motion-path"
        d={d}
        fill={fill}
        data-animateprop={JSON.stringify(animate)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...rest}
      />
    ));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders static placeholder path when not in view (shouldAnimate is false)', () => {
    useInView.mockReturnValue({ ref: jest.fn(), inView: false, entry: undefined });
    
    render(<Blob />);

    expect(screen.getByTestId('static-placeholder-path')).toBeInTheDocument();
    expect(screen.getByTestId('static-placeholder-path')).toHaveAttribute('d', blobPaths[0]);
    expect(screen.queryByTestId('motion-path')).toBeNull();
    
    expect(flubber.interpolate).not.toHaveBeenCalled();
    expect(useAnimationFrameCallback).toBeInstanceOf(Function); 

    const initialD = screen.getByTestId('static-placeholder-path').getAttribute('d');
    act(() => {
      if(useAnimationFrameCallback) {
        useAnimationFrameCallback(100);
      }
    });
    expect(screen.getByTestId('static-placeholder-path')).toHaveAttribute('d', initialD);
    expect(screen.queryByTestId('motion-path')).toBeNull();
  });

  it('calculates interpolators and starts animation when it comes into view', () => {
    const { rerender } = render(<Blob />);
    
    mockUseInView.inView = true;
    useInView.mockReturnValue({ ...mockUseInView, inView: true });
    
    act(() => {
      rerender(<Blob />); 
    });

    expect(flubber.interpolate).toHaveBeenCalledTimes(blobPaths.length);
    expect(flubber.interpolate).toHaveBeenCalledWith(blobPaths[0], blobPaths[1], { maxSegmentLength: 20 });
    expect(screen.getByTestId('motion-path')).toBeInTheDocument();
    expect(screen.queryByTestId('static-placeholder-path')).toBeNull(); 
    expect(useAnimationFrameCallback).toBeInstanceOf(Function);

    act(() => {
      if (useAnimationFrameCallback) {
        useAnimationFrameCallback(100); 
      }
    });
    expect(screen.getByTestId('motion-path')).toHaveAttribute('d', expect.stringContaining('interpolated('));
  });

  it('renders animated motion.path when shouldAnimate is true from the start', () => {
    mockUseInView.inView = true;
    useInView.mockReturnValue({ ...mockUseInView, inView: true });

    render(<Blob />);

    expect(flubber.interpolate).toHaveBeenCalledTimes(blobPaths.length);
    expect(screen.getByTestId('motion-path')).toBeInTheDocument();
    expect(screen.queryByTestId('static-placeholder-path')).toBeNull();
    expect(useAnimationFrameCallback).toBeInstanceOf(Function);
  });

  it('updates motion.path animate prop on mouse enter/leave', () => {
    mockUseInView.inView = true; 
    useInView.mockReturnValue({ ...mockUseInView, inView: true });
    render(<Blob />);

    const animatedPath = screen.getByTestId('motion-path');

    let animateProp = JSON.parse(animatedPath.dataset.animateprop);
    expect(animateProp.scale).toBe(0.9);

    act(() => {
        fireEvent.mouseEnter(animatedPath);
    });
    animateProp = JSON.parse(screen.getByTestId('motion-path').dataset.animateprop);
    expect(animateProp.scale).toBe(0.8);

    act(() => {
        fireEvent.mouseLeave(animatedPath);
    });
    animateProp = JSON.parse(screen.getByTestId('motion-path').dataset.animateprop);
    expect(animateProp.scale).toBe(0.9);
  });
});