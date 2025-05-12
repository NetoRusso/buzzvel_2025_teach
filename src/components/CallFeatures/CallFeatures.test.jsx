import { render, screen, act, waitFor } from '@testing-library/react';
import CallFeatures from './index';
import { useInView } from 'react-intersection-observer';

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

jest.mock('../Blob', () => {
  // eslint-disable-next-line react/display-name
  return jest.fn((props) => <div data-testid="mocked-blob" style={props.style} data-fill={props.fill}>Mocked Blob</div>);
});

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line react/display-name, jsx-a11y/alt-text
  default: (props) => <img {...props} />,
}));

jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return ({ children, href, ...rest }) => <a href={href} {...rest}>{children}</a>;
});

describe('CallFeatures Component', () => {
  let mockUseInView;

  beforeEach(() => {
    mockUseInView = {
      ref: jest.fn(),
      inView: false,
      entry: undefined,
    };
    useInView.mockReturnValue(mockUseInView);
    const MockedBlob = require('../Blob').default;
    if (MockedBlob && MockedBlob.mockClear) {
        MockedBlob.mockClear();
    }
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders static content correctly', () => {
    render(<CallFeatures />);
    expect(screen.getByRole('heading', { name: /All the cool features/i })).toBeInTheDocument();
    expect(screen.getByText(/Mauris consequat, cursus pharetra et/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View all the features/i })).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Design for how people think/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Take Lesson/i })).toBeInTheDocument();
    expect(screen.getByAltText('Trace')).toBeInTheDocument();
    expect(screen.getByAltText('arrow')).toBeInTheDocument();
    expect(screen.getByAltText('picture01')).toBeInTheDocument();
  });

  it('does not render DynamicBlob initially when not in view', () => {
    useInView.mockReturnValue({ ref: jest.fn(), inView: false, entry: undefined });
    render(<CallFeatures />);
    expect(screen.queryByTestId('mocked-blob')).not.toBeInTheDocument();
  });

  it('renders DynamicBlob when it comes into view', async () => {
    const { rerender } = render(<CallFeatures />);
    expect(screen.queryByTestId('mocked-blob')).not.toBeInTheDocument();

    useInView.mockReturnValue({ ref: jest.fn(), inView: true, entry: undefined });
    
    act(() => {
      rerender(<CallFeatures />);
    });

    await waitFor(() => {
      expect(screen.getByTestId('mocked-blob')).toBeInTheDocument();
    });

    const blobElement = screen.getByTestId('mocked-blob');
    expect(blobElement).toHaveStyle('position: absolute');
    expect(blobElement).toHaveStyle('z-index: -1');
    expect(blobElement).toHaveAttribute('data-fill', '#FB923C');
  });
});