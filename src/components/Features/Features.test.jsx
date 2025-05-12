import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Features from './index';
import { WindowWidthContext } from '@/context/WindowWidthContext';
import { useInView } from 'react-intersection-observer';

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

jest.mock('../Blob', () => {
  // eslint-disable-next-line react/display-name
  return jest.fn((props) => <div data-testid="mocked-blob" style={props.style}>Mocked Blob</div>);
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

describe('Features Component', () => {
  let mockUseInView;
  const mockSetWindowWidth = jest.fn();

  const renderFeatures = (isMobileContext = false, blobIsVisibleContext = false) => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: blobIsVisibleContext,
      entry: undefined,
    });
    return render(
      <WindowWidthContext.Provider value={{ windowWidth: isMobileContext ? 400 : 1024, isMobile: isMobileContext, setWindowWidth: mockSetWindowWidth }}>
        <Features />
      </WindowWidthContext.Provider>
    );
  };

  beforeEach(() => {
    mockUseInView = jest.fn().mockReturnValue({
      ref: jest.fn(),
      inView: false,
      entry: undefined,
    });
    useInView.mockImplementation(mockUseInView);

    const MockedBlob = require('../Blob').default;
    if (MockedBlob && MockedBlob.mockClear) {
        MockedBlob.mockClear();
    }
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the main title and topics', () => {
    renderFeatures();
    expect(screen.getByRole('heading', { name: /An all-in-one app that makes it easier/i })).toBeInTheDocument();
    expect(screen.getByText('Est et in pharetra magna adipiscing ornare aliquam.')).toBeInTheDocument();
    expect(screen.getByText('Tellus arcu sed consequat ac velit ut eu blandit.')).toBeInTheDocument();
    expect(screen.getByText('Ullamcorper ornare in et egestas dolor orci.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Find more about the app/i })).toBeInTheDocument();
  });

  it('renders mobile paragraph when isMobile is true', () => {
    renderFeatures(true);
    expect(screen.getByText(/Sit elit feugiat turpis sed integer integer accumsan turpis./i)).toBeInTheDocument();
  });

  it('does not render mobile paragraph when isMobile is false', () => {
    renderFeatures(false);
    expect(screen.queryByText(/Sit elit feugiat turpis sed integer integer accumsan turpis./i)).not.toBeInTheDocument();
  });

  it('renders all feature cards correctly', () => {
    renderFeatures();
    expect(screen.getByText('The map of mathematics')).toBeInTheDocument();
    expect(screen.getByText('Design for how people think')).toBeInTheDocument();
    expect(screen.getByText('International & commercial law')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Take Lesson/i })).toHaveLength(3);
  });

  it('does not render DynamicBlob initially', () => {
    renderFeatures(false, false);
    expect(screen.queryByTestId('mocked-blob')).not.toBeInTheDocument();
  });

  it('renders DynamicBlob when blobSectionIsVisible is true', async () => {
    renderFeatures(false, false);
    expect(screen.queryByTestId('mocked-blob')).not.toBeInTheDocument();

    mockUseInView.mockReturnValue({ ref: jest.fn(), inView: true, entry: undefined });
    
    act(() => {
      render(
        <WindowWidthContext.Provider value={{ windowWidth: 1024, isMobile: false, setWindowWidth: mockSetWindowWidth }}>
          <Features />
        </WindowWidthContext.Provider>
      );
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('mocked-blob')).toBeInTheDocument();
    });
  });

  describe('Card dragging functionality', () => {
    it('should change cursor on mousedown and mouseup on cards container', () => {
      renderFeatures();
      const cardsContainer = screen.getByTestId('features-cards-container');
      
      expect(cardsContainer).toHaveStyle('cursor: grab');
      fireEvent.mouseDown(cardsContainer);
      expect(cardsContainer).toHaveStyle('cursor: grabbing');
      fireEvent.mouseUp(document);
      expect(cardsContainer).toHaveStyle('cursor: grab');
    });

    it('should attempt to scroll on drag', () => {
      renderFeatures();
      const cardsContainer = screen.getByTestId('features-cards-container');
      
      Object.defineProperty(cardsContainer, 'offsetLeft', { configurable: true, value: 50 });
      
      fireEvent.mouseDown(cardsContainer, { pageX: 100 });
      fireEvent.mouseMove(document, { pageX: 80 });
      fireEvent.mouseUp(document);
      expect(cardsContainer).toHaveStyle('cursor: grab');
    });
  });
});