import { render, screen } from '@testing-library/react';
import Hero from './index';
import { WindowWidthContext } from '@/context/WindowWidthContext';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    const { priority, ...rest } = props;
    return <img {...rest} data-priority={priority ? 'true' : 'false'} />;
  },
}));

jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return ({children, href, ...rest}) => {
    return <a href={href} {...rest}>{children}</a>;
  }
});

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <WindowWidthContext.Provider value={providerProps}>{ui}</WindowWidthContext.Provider>,
    renderOptions
  );
};

describe('Hero Component', () => {
  const desktopContext = { windowWidth: 1024, isMobile: false, setWindowWidth: jest.fn() };
  const mobileContext = { windowWidth: 400, isMobile: true, setWindowWidth: jest.fn() };

  it('renders the main title and paragraph', () => {
    renderWithContext(<Hero />, { providerProps: desktopContext });
    expect(screen.getByRole('heading', { name: /Teach students worldwide/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Amet nunc diam orci duis ut sit diam arcu, nec./i)).toBeInTheDocument();
  });

  it('renders the action buttons', () => {
    renderWithContext(<Hero />, { providerProps: desktopContext });
    expect(screen.getByRole('button', { name: /Sign Up Now/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Demo/i })).toBeInTheDocument();
    expect(screen.getByAltText('Play')).toBeInTheDocument();
  });

  it('renders the main hero image with priority', () => {
    renderWithContext(<Hero />, { providerProps: desktopContext });
    const heroImage = screen.getByAltText('image_hero');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('data-priority', 'true');
  });

  it('renders company logos', () => {
    renderWithContext(<Hero />, { providerProps: desktopContext });
    expect(screen.getByAltText('companies01')).toBeInTheDocument();
    expect(screen.getByAltText('companies02')).toBeInTheDocument();
    expect(screen.getByAltText('companies03')).toBeInTheDocument();
    expect(screen.getByAltText('companies04')).toBeInTheDocument();
    expect(screen.getByAltText('companies05')).toBeInTheDocument();
  });

  describe('Trusted by companies text', () => {
    it('renders desktop version of "Trusted by" text when not mobile', () => {
      renderWithContext(<Hero />, { providerProps: desktopContext });
      const trustedTextElement = screen.getByText((content, node) => {
        const hasText = (node) => node.textContent === "Trusted byleading companies";
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDontHaveText;
      });
      expect(trustedTextElement).toBeInTheDocument();
      expect(trustedTextElement.querySelector('br')).toBeInTheDocument();
    });

    it('renders mobile version of "Trusted by" text when mobile', () => {
      renderWithContext(<Hero />, { providerProps: mobileContext });
      expect(screen.getByText('Trusted by leading companies')).toBeInTheDocument();
      const trustedTextElement = screen.getByText('Trusted by leading companies');
      expect(trustedTextElement.querySelector('br')).not.toBeInTheDocument();
    });
  });
  
  it('renders the decorative trace image for the title', () => {
    renderWithContext(<Hero />, { providerProps: desktopContext });
    expect(screen.getByAltText('Trace')).toBeInTheDocument();
  });

  it('matches snapshot on desktop', () => {
    const { container } = renderWithContext(<Hero />, { providerProps: desktopContext });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot on mobile', () => {
    const { container } = renderWithContext(<Hero />, { providerProps: mobileContext });
    expect(container.firstChild).toMatchSnapshot();
  });
});