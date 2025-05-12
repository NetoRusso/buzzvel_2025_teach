import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Menu from './index';
import { WindowWidthContext } from '@/context/WindowWidthContext';

jest.mock('next/image', () => {
  const ImageComponent = (props) => {
    let { src: srcProp, alt, ...rest } = props;
    let finalSrc = srcProp;
    if (typeof srcProp === 'object' && srcProp !== null && srcProp.src) {
      finalSrc = srcProp.src;
    }
    return <img src={finalSrc} alt={alt || ''} {...rest} />;
  };
  ImageComponent.displayName = 'NextImageMock';
  return {
    __esModule: true,
    default: ImageComponent,
  };
});

jest.mock('next/link', () => {
  const LinkComponent = ({ children, href, ...props }) => (
    <a href={href} {...props}>{children}</a>
  );
  LinkComponent.displayName = 'NextLinkMock';
  return {
    __esModule: true,
    default: LinkComponent,
  };
});

global.scrollTo = jest.fn();

const mockWindowWidthContext = (isMobileValue, windowWidthValue = isMobileValue ? 400 : 1024) => ({
  isMobile: isMobileValue,
  windowWidth: windowWidthValue,
  isResizing: false,
});

const renderWithContext = (ui, providerProps) => {
  return render(
    <WindowWidthContext.Provider value={providerProps}>
      {ui}
    </WindowWidthContext.Provider>
  );
};

describe('Menu Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.scrollTo.mockClear();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('Desktop View', () => {
    const desktopContextValue = mockWindowWidthContext(false);

    test('renders desktop menu items and logo correctly', () => {
      renderWithContext(<Menu />, desktopContextValue);
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Solutions')).toBeInTheDocument();
      expect(screen.getByText('Pricing')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-resources-trigger')).toBeInTheDocument();
      expect(screen.getByText('Log In')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sing Up Now/i })).toBeInTheDocument();
      expect(screen.queryByTestId('mobile-menu-trigger')).not.toBeInTheDocument();
    });

    test('toggles Resources dropdown on click', async () => {
      renderWithContext(<Menu />, desktopContextValue);
      const resourcesTrigger = screen.getByTestId('desktop-resources-trigger');
      const resourcesDropdown = screen.getByTestId('desktop-resources-dropdown');

      expect(resourcesDropdown).not.toHaveClass('active');

      fireEvent.click(resourcesTrigger);
      expect(resourcesDropdown).toHaveClass('active');
      await waitFor(() => {
        expect(screen.getByText('Help Center')).toBeVisible();
      });
      expect(screen.getByText('Blog')).toBeVisible();

      fireEvent.click(resourcesTrigger);
      await waitFor(() => {
        expect(resourcesDropdown).not.toHaveClass('active');
      });
    });

    test('logo click scrolls to top', () => {
      renderWithContext(<Menu />, desktopContextValue);
      fireEvent.click(screen.getByAltText('Logo'));
      expect(global.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    test('matches snapshot on desktop', () => {
      const { container } = renderWithContext(<Menu />, desktopContextValue);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot on desktop with dropdown open', async () => {
      const { container } = renderWithContext(<Menu />, desktopContextValue);
      const resourcesTrigger = screen.getByTestId('desktop-resources-trigger');
      fireEvent.click(resourcesTrigger);
      await waitFor(() => {
        expect(screen.getByTestId('desktop-resources-dropdown')).toHaveClass('active');
      });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Mobile View', () => {
    const mobileContextValue = mockWindowWidthContext(true);

    test('renders mobile menu trigger and logo correctly', () => {
      renderWithContext(<Menu />, mobileContextValue);
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
      expect(screen.getByTestId('mobile-menu-trigger')).toBeInTheDocument();
      expect(screen.queryByText('Products')).not.toBeInTheDocument();
    });

    test('opens and closes mobile menu', async () => {
      renderWithContext(<Menu />, mobileContextValue);
      const openMenuButton = screen.getByTestId('mobile-menu-trigger');

      expect(screen.queryByTestId('mobile-menu-box')).not.toBeInTheDocument();

      fireEvent.click(openMenuButton);
      const menuBox = await screen.findByTestId('mobile-menu-box');
      expect(menuBox).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();

      const closeButton = screen.getByTestId('mobile-menu-close-button');
      fireEvent.click(closeButton);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => {
        expect(screen.queryByTestId('mobile-menu-box')).not.toBeInTheDocument();
      });
    });

    test('toggles Resources dropdown in mobile menu', async () => {
      renderWithContext(<Menu />, mobileContextValue);
      const openMenuButton = screen.getByTestId('mobile-menu-trigger');
      fireEvent.click(openMenuButton);

      await screen.findByTestId('mobile-menu-box');

      const resourcesTriggerMobile = screen.getByTestId('mobile-resources-trigger');
      expect(screen.queryByTestId('mobile-resources-dropdown')).not.toBeInTheDocument();

      fireEvent.click(resourcesTriggerMobile);
      const resourcesDropdownMobile = await screen.findByTestId('mobile-resources-dropdown');
      expect(resourcesDropdownMobile).toBeInTheDocument();
      expect(screen.getByText('Help Center')).toBeInTheDocument();

      const closeDropdownButton = screen.getByTestId('mobile-resources-dropdown-close-button');
      fireEvent.click(closeDropdownButton);
      expect(screen.queryByTestId('mobile-resources-dropdown')).not.toBeInTheDocument();
    });

    test('closes mobile menu and dropdowns when windowWidth changes (mobile to desktop)', async () => {
      const initialMobileContext = mockWindowWidthContext(true, 400);
      const { rerender } = renderWithContext(<Menu />, initialMobileContext);

      const openMenuButton = screen.getByTestId('mobile-menu-trigger');
      fireEvent.click(openMenuButton);
      await screen.findByTestId('mobile-menu-box');
      const resourcesTriggerMobile = screen.getByTestId('mobile-resources-trigger');
      fireEvent.click(resourcesTriggerMobile);
      await screen.findByTestId('mobile-resources-dropdown');

      expect(screen.getByTestId('mobile-menu-box')).toBeInTheDocument();
      expect(screen.getByTestId('mobile-resources-dropdown')).toBeInTheDocument();

      const newDesktopContext = mockWindowWidthContext(false, 1200);
      rerender(
        <WindowWidthContext.Provider value={newDesktopContext}>
          <Menu />
        </WindowWidthContext.Provider>
      );
      
      await waitFor(() => {
        expect(screen.queryByTestId('mobile-menu-box')).not.toBeInTheDocument();
        expect(screen.queryByTestId('mobile-resources-dropdown')).not.toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
        expect(screen.getByTestId('desktop-resources-trigger')).toBeInTheDocument();
      });
    });

    test('matches snapshot on mobile (menu closed)', () => {
      const { container } = renderWithContext(<Menu />, mobileContextValue);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot on mobile (menu open)', async () => {
      const { container } = renderWithContext(<Menu />, mobileContextValue);
      const openMenuButton = screen.getByTestId('mobile-menu-trigger');
      fireEvent.click(openMenuButton);
      await screen.findByTestId('mobile-menu-box');
      expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot on mobile (menu and resources dropdown open)', async () => {
        const { container } = renderWithContext(<Menu />, mobileContextValue);
        const openMenuButton = screen.getByTestId('mobile-menu-trigger');
        fireEvent.click(openMenuButton);
        await screen.findByTestId('mobile-menu-box');

        const resourcesTriggerMobile = screen.getByTestId('mobile-resources-trigger');
        fireEvent.click(resourcesTriggerMobile);
        await screen.findByTestId('mobile-resources-dropdown');

        expect(container.firstChild).toMatchSnapshot();
      });
  });
});