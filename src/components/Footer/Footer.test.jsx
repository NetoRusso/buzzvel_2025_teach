import { render, screen } from '@testing-library/react';
import Footer from './index';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return ({children, href, ...rest}) => {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a href={href} {...rest}>{children}</a>;
  }
});

describe('Footer Component', () => {
  const RealDate = Date;
  const MOCK_YEAR = 2023;

  beforeEach(() => {
    const mockDate = new Date(MOCK_YEAR, 0, 1);
    // @ts-ignore
    global.Date = class extends RealDate {
      constructor(...args) {
        if (args.length) {
          // @ts-ignore
          return new RealDate(...args);
        }
        return mockDate;
      }
      static now() {
        return mockDate.getTime();
      }
    };
    jest.spyOn(global.Date.prototype, 'getFullYear').mockReturnValue(MOCK_YEAR);
  });

  afterEach(() => {
    global.Date = RealDate;
    jest.restoreAllMocks();
  });

  it('renders the logo', () => {
    render(<Footer />);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  it('renders all section titles (as p tags)', () => {
    render(<Footer />);
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('renders specific link items as text', () => {
    render(<Footer />);
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText((content, element) => element.tagName.toLowerCase() === 'p' && content.startsWith('Accessibility'))).toBeInTheDocument();
    expect(screen.getByText('Brainstorming')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.startsWith('Request Demo'))).toBeInTheDocument();
  });

  it('renders the BETA tag for Accessibility', () => {
    render(<Footer />);
    const accessibilityItem = screen.getByText((content, element) => element.tagName.toLowerCase() === 'p' && content.startsWith('Accessibility'));
    expect(accessibilityItem.querySelector('span')).toHaveTextContent('BETA');
  });

  it('renders the "Request Demo" item with its arrow icon', () => {
    render(<Footer />);
    const requestDemoItem = screen.getByText((content, element) => content.startsWith('Request Demo'));
    expect(requestDemoItem).toBeInTheDocument();
    const arrowImage = requestDemoItem.querySelector('img[alt="arrow"]');
    expect(arrowImage).toBeInTheDocument();
  });

  it('renders copyright text with the mocked year', () => {
    render(<Footer />);
    expect(screen.getByText(`uteach © ${MOCK_YEAR}. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders accessibility links/items in the copyright section', () => {
    render(<Footer />);
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument(); 
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByAltText('world')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByAltText('euro')).toBeInTheDocument();
    expect(screen.getByAltText('accessibility')).toBeInTheDocument();
  });

  it('matches snapshot with mocked year', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});