import { render, screen } from '@testing-library/react';
import Count from './index';
import AnimatedCounter from '../AnimateCounter';

jest.mock('../AnimateCounter', () => {
  return jest.fn(({ end }) => <div data-testid="animated-counter" data-end={end}>{end}</div>);
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

describe('Count Component', () => {
  beforeEach(() => {
    if (AnimatedCounter.mockClear) {
      AnimatedCounter.mockClear();
    }
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders all static text content correctly', () => {
    render(<Count />);
    expect(screen.getByText('user countries')).toBeInTheDocument();
    expect(screen.getByText('valued teachers')).toBeInTheDocument();
    expect(screen.getByText('happy students')).toBeInTheDocument();
  });

  it('renders all icons with correct alt text', () => {
    render(<Count />);
    expect(screen.getByAltText('countries')).toBeInTheDocument();
    expect(screen.getByAltText('teachers')).toBeInTheDocument();
    expect(screen.getByAltText('students')).toBeInTheDocument();
  });

  it('renders AnimatedCounter three times', () => {
    render(<Count />);
    const counters = screen.getAllByTestId('animated-counter');
    expect(counters).toHaveLength(3);
  });

  it('passes correct "end" props to each AnimatedCounter', () => {
    render(<Count />);
    
    expect(AnimatedCounter).toHaveBeenCalledTimes(3);

    expect(AnimatedCounter).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ end: 195 }),
      {}
    );
    expect(AnimatedCounter).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ end: 1000 }),
      {}
    );
    expect(AnimatedCounter).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ end: 17000 }),
      {}
    );

    const counters = screen.getAllByTestId('animated-counter');
    expect(counters[0]).toHaveAttribute('data-end', '195');
    expect(counters[1]).toHaveAttribute('data-end', '1000');
    expect(counters[2]).toHaveAttribute('data-end', '17000');
  });

  it('has the correct aria-label for the section', () => {
    render(<Count />);
    expect(screen.getByRole('region', { name: /Our platform reaches 195 countries/i })).toBeInTheDocument();
  });
});