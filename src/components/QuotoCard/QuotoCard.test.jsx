import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuotoCard from './index';

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

describe('QuotoCard Component', () => {
  test('renders static text content correctly', () => {
    render(<QuotoCard />);
    expect(screen.getByText(/Id urna, nisl, ut quam\. Diam suspendisse fringilla quam arcu mattis est velit in\./i)).toBeInTheDocument();
    expect(screen.getByText(/Marie Poirot,/i)).toBeInTheDocument();
    expect(screen.getByText(/Bigapp/i)).toBeInTheDocument();
  });

  test('renders all images with correct alt texts and src attributes', () => {
    render(<QuotoCard />);
    const expectedImageSrc = '/img.jpg';

    const arrowLeft = screen.getByAltText('arrow left');
    expect(arrowLeft).toBeInTheDocument();
    expect(arrowLeft).toHaveAttribute('src', expectedImageSrc);
    expect(arrowLeft).toHaveAttribute('width', '18');

    const arrowRight = screen.getByAltText('arrow right');
    expect(arrowRight).toBeInTheDocument();
    expect(arrowRight).toHaveAttribute('src', expectedImageSrc);
    expect(arrowRight).toHaveAttribute('width', '18');

    const photo = screen.getByAltText('photo');
    expect(photo).toBeInTheDocument();
    expect(photo).toHaveAttribute('src', expectedImageSrc);
    expect(photo).toHaveAttribute('width', '528');

    const chatQuotes = screen.getByAltText('chat quotes');
    expect(chatQuotes).toBeInTheDocument();
    expect(chatQuotes).toHaveAttribute('src', expectedImageSrc);
    expect(chatQuotes).toHaveAttribute('width', '48');

    const squares = screen.getByAltText('squares');
    expect(squares).toBeInTheDocument();
    expect(squares).toHaveAttribute('src', expectedImageSrc);
    expect(squares).toHaveAttribute('width', '155');
  });

  test('renders decorative elements', () => {
    render(<QuotoCard />);
  });

  test('has correct aria-label for accessibility', () => {
    render(<QuotoCard />);
    expect(screen.getByRole('region', { name: 'Quotes slider' })).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<QuotoCard />);
    expect(container.firstChild).toMatchSnapshot();
  });
});