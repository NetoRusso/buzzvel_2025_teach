import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Meeting from './index';

import testImageImport from '@/assets/picture_meeting_1.png';


jest.mock('next/image', () => {
  const ImageComponent = (props) => {
    let { src: srcProp, alt, width, height, style, className, loading, ...rest } = props;

    let finalSrc = srcProp;
    if (typeof srcProp === 'object' && srcProp !== null && srcProp.src) {
      finalSrc = srcProp.src;
    }

    return <img src={finalSrc} alt={alt || ''} width={width} height={height} style={style} className={className} loading={loading || 'lazy'} {...rest} />;
  };
  ImageComponent.displayName = 'NextImageMock';
  return {
    __esModule: true,
    default: ImageComponent,
  };
});

jest.mock('next/link', () => {
  const LinkComponent = ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>;
  LinkComponent.displayName = 'NextLinkMock';
  return {
    __esModule: true,
    default: LinkComponent,
  };
});


describe('Meeting Component', () => {
  let mockMath;
  const originalMath = global.Math;

  beforeEach(() => {
    jest.useFakeTimers();
    mockMath = Object.create(originalMath);
    global.Math = mockMath;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    global.Math = originalMath;
    jest.restoreAllMocks();
  });

  test('renders static content correctly', () => {
    render(<Meeting />);
    expect(screen.getByRole('heading', { name: /Meet international\s+plane\s+students & teachers/i })).toBeInTheDocument();
    expect(screen.getByText(/Morbi sit egestas dignissim pharetra/i)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Explore teachers and students/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');

    const planeIcon = screen.getByAltText('plane');
    expect(planeIcon).toBeInTheDocument();
    expect(planeIcon).toHaveAttribute('src', '/img.jpg');

    const arrowIcon = screen.getByAltText('arrow');
    expect(arrowIcon).toBeInTheDocument();
    expect(arrowIcon).toHaveAttribute('src', '/img.jpg');

    expect(screen.getByRole('region', { name: 'Meeting with teachers' })).toBeInTheDocument();
  });

  test('renders all 10 photos initially with correct attributes and styles', () => {
    render(<Meeting />);
    for (let i = 1; i <= 10; i++) {
      const photo = screen.getByAltText(`photo_${i}`);
      expect(photo).toBeInTheDocument();
      expect(photo).toHaveAttribute('src', '/img.jpg');
      if (i === 1) {
        expect(photo).toHaveStyle('transform: scale(0.95)');
        expect(photo).toHaveStyle('opacity: 0.95');
      } else {
        expect(photo).toHaveStyle('transform: scale(0.95)');
        expect(photo).toHaveStyle('opacity: 0.8');
      }
      expect(photo).toHaveStyle('z-index: 0');
    }
  });

  test('focuses a photo after interval and applies correct styles', () => {
    mockMath.random = () => 0;
    render(<Meeting />);
    const photo1 = screen.getByAltText('photo_1');
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(photo1).toHaveStyle('transform: scale(1.1)');
    expect(photo1).toHaveStyle('opacity: 1');
    expect(photo1).toHaveStyle('z-index: 1');
  });

  test('changes focused photo over multiple intervals', () => {
    let randomCounter = 0;
    const randomValues = [0, 0.1, 0.2];
    mockMath.random = () => {
      const val = randomValues[randomCounter % randomValues.length];
      randomCounter++;
      return val;
    };
    render(<Meeting />);
    const photo1 = screen.getByAltText('photo_1');
    const photo2 = screen.getByAltText('photo_2');

    act(() => { jest.advanceTimersByTime(1500); });
    expect(photo1).toHaveStyle('transform: scale(1.1)');

    act(() => { jest.advanceTimersByTime(1500); });
    expect(photo1).toHaveStyle('transform: scale(0.95)');
    expect(photo2).toHaveStyle('transform: scale(1.05)');
  });

  test('clears interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = render(<Meeting />);
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });

  test('matches snapshot on initial render', () => {
    const { container } = render(<Meeting />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('matches snapshot when a photo is focused', () => {
    mockMath.random = () => 0.4;
    const { container } = render(<Meeting />);
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});