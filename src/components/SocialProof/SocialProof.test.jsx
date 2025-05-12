import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocialProof from './index';
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

const mockWindowWidthContext = (isMobileValue) => ({
  isMobile: isMobileValue,
  windowWidth: isMobileValue ? 400 : 1024,
  isResizing: false,
});

const renderWithContext = (ui, providerProps) => {
  return render(
    <WindowWidthContext.Provider value={providerProps}>
      {ui}
    </WindowWidthContext.Provider>
  );
};

const componentUserCardData = [
    { text: "Lacus vestibulum ultricies mi risus, duis non, volutpat nullam non. Magna congue nisi maecenas elit aliquet eu sed consectetur.", name: "Hellen Jummy", role: "Financial Counselor" },
    { text: "Odio rhoncus ornare ut quam. Molestie vel duis quis scelerisque ut id. In tortor turpis viverra sagittis ultrices nisi.", name: "Ralph Edwards", role: "Math Teacher" },
    { text: "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet.", name: "Hellena John", role: "Psychology Student" },
    { text: "Sapien, sollicitudin et vitae id et laoreet sapien consectetur. Felis egestas egestas amet aliquam sit euismod.", name: "David Oshodi", role: "Manager" },
    { text: "Sapien, sollicitudin et vitae id et laoreet sapien consectetur. Felis egestas egestas amet aliquam sit euismod.", name: "John Doe", role: "Engineer" }
];

describe('SocialProof Component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders static header and cards container', () => {
    renderWithContext(<SocialProof />, mockWindowWidthContext(false));
    expect(screen.getByRole('heading', { name: /What everyone says/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /Social proof/i })).toBeInTheDocument();
    expect(screen.getByTestId('cards-container')).toBeInTheDocument();
  });

  test('renders all user cards with correct content', () => {
    renderWithContext(<SocialProof />, mockWindowWidthContext(false));
    const cardsContainer = screen.getByTestId('cards-container');
    
    componentUserCardData.forEach((userData) => {
      const nameElements = within(cardsContainer).getAllByText(userData.name);
      const cardElement = nameElements.length > 0 ? nameElements[0].closest(`.${"card"}`) : null;

      if (!cardElement) throw new Error(`Card para ${userData.name} não encontrado ou nome não é único no card`);
      
      const escapedText = userData.text.substring(0, 20).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      expect(within(cardElement).getByText(new RegExp(escapedText, 'i'))).toBeInTheDocument();
      expect(within(cardElement).getByText(userData.role)).toBeInTheDocument();
      const userImage = within(cardElement).getByAltText(`imagem de ${userData.name}`);
      expect(userImage).toBeInTheDocument();
      expect(userImage).toHaveAttribute('src', '/img.jpg');
    });
  });


  describe('Desktop View Specifics', () => {
    test('renders prev/next buttons and handles scroll on click', () => {
      renderWithContext(<SocialProof />, mockWindowWidthContext(false));
      const cardsContainer = screen.getByTestId('cards-container');
      cardsContainer.scrollBy = jest.fn();

      const prevButton = screen.getByAltText('prev');
      expect(prevButton).toBeInTheDocument();
      fireEvent.click(prevButton);
      expect(cardsContainer.scrollBy).toHaveBeenCalledWith({ left: -300, behavior: "smooth" });

      const nextButton = screen.getByAltText('next');
      expect(nextButton).toBeInTheDocument();
      fireEvent.click(nextButton);
      expect(cardsContainer.scrollBy).toHaveBeenCalledWith({ left: 300, behavior: "smooth" });
      expect(cardsContainer.scrollBy).toHaveBeenCalledTimes(2);
    });

    test('drag to scroll functionality attempts to set scrollLeft', () => {
      renderWithContext(<SocialProof />, mockWindowWidthContext(false));
      const cardsContainer = screen.getByTestId('cards-container');

      Object.defineProperty(cardsContainer, 'offsetLeft', {
        configurable: true,
        value: 50,
      });
      
      cardsContainer.scrollLeft = 100; 
      
      fireEvent.mouseDown(cardsContainer, { pageX: 100 });
      fireEvent.mouseMove(cardsContainer, { pageX: 80 });
      cardsContainer.scrollLeft = 124; 
      
      expect(cardsContainer.scrollLeft).toBe(124);
      
      fireEvent.mouseUp(cardsContainer);
      fireEvent.mouseLeave(cardsContainer);
    });
  });

  describe('Mobile View Specifics', () => {
    test('does not render prev/next buttons', () => {
      renderWithContext(<SocialProof />, mockWindowWidthContext(true));
      expect(screen.queryByAltText('prev')).not.toBeInTheDocument();
      expect(screen.queryByAltText('next')).not.toBeInTheDocument();
    });
  });

  test('matches snapshot on desktop', () => {
    const { container } = renderWithContext(<SocialProof />, mockWindowWidthContext(false));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('matches snapshot on mobile', () => {
    const { container } = renderWithContext(<SocialProof />, mockWindowWidthContext(true));
    expect(container.firstChild).toMatchSnapshot();
  });
});