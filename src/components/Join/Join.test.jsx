import { render, screen, act, waitFor } from '@testing-library/react';
import Join from './index';
import { WindowWidthContext } from '@/context/WindowWidthContext';
import { useInView } from 'react-intersection-observer';

// Mocks para assets de imagem (PNG e SVG)
// É importante que os caminhos aqui correspondam exatamente a como são importados no componente Join.jsx
// Se você usa require('./assets/upl01.png').default, o mock deve refletir isso.
// Para simplificar, vamos assumir que o mock de next/image lida com o objeto src.
const mockImageSrc = (name) => ({ default: { src: `/mock/${name}.png`, height: 50, width: 50, blurDataURL: 'data:...' }});
jest.mock('./assets/upl01.png', () => mockImageSrc('upl01'));
jest.mock('./assets/upl02.png', () => mockImageSrc('upl02'));
jest.mock('./assets/upl03.png', () => mockImageSrc('upl03'));
jest.mock('./assets/upl04.png', () => mockImageSrc('upl04'));
jest.mock('./assets/upl05.png', () => mockImageSrc('upl05'));
jest.mock('./assets/upl06.png', () => mockImageSrc('upl06'));
jest.mock('./assets/upl07.png', () => mockImageSrc('upl07'));
jest.mock('./assets/upl08.png', () => mockImageSrc('upl08'));
jest.mock('./assets/upd01.png', () => mockImageSrc('upd01'));
jest.mock('./assets/upd02.png', () => mockImageSrc('upd02'));
jest.mock('./assets/upd03.png', () => mockImageSrc('upd03'));
jest.mock('./assets/upd04.png', () => mockImageSrc('upd04'));
jest.mock('./assets/upd05.png', () => mockImageSrc('upd05'));
jest.mock('./assets/upd06.png', () => mockImageSrc('upd06'));

jest.mock('./assets/il01.svg', () => 'il01.svg');
jest.mock('./assets/il02.svg', () => 'il02.svg');
jest.mock('./assets/il03.svg', () => 'il03.svg');
jest.mock('./assets/il04.svg', () => 'il04.svg');
jest.mock('./assets/il05.svg', () => 'il05.svg');
jest.mock('./assets/il06.svg', () => 'il06.svg');
jest.mock('./assets/id01.svg', () => 'id01.svg');
jest.mock('./assets/id02.svg', () => 'id02.svg');
jest.mock('./assets/id03.svg', () => 'id03.svg');
jest.mock('./assets/id04.svg', () => 'id04.svg');
jest.mock('./assets/id05.svg', () => 'id05.svg');

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    const { src, alt, width, height, ...rest } = props;
    const imgSrc = typeof src === 'string' ? src : (src && src.src);
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={imgSrc || 'mock-src'} alt={alt} width={width} height={height} {...rest} />;
  },
}));

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

const mockGsapTo = jest.fn();
const mockGsapSet = jest.fn();
const mockScrollTriggerKill = jest.fn();
const mockScrollTriggerGetAll = jest.fn(() => []);
const mockGsapKillTweensOf = jest.fn();
let mockGsapRegistered = false;

jest.mock('gsap', () => {
  const actualGsap = jest.requireActual('gsap');
  return {
    gsap: {
      registerPlugin: (...plugins) => {
        mockGsapRegistered = true;
      },
      to: (...args) => {
        mockGsapTo(...args);
        const stInstance = { kill: mockScrollTriggerKill, trigger: args[0] };
        return { scrollTrigger: stInstance };
      },
      set: mockGsapSet,
      killTweensOf: mockGsapKillTweensOf,
      utils: actualGsap.gsap.utils,
    },
  };
});

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    getAll: mockScrollTriggerGetAll,
    kill: mockScrollTriggerKill,
  }
}));

describe('Join Component', () => {
  let mockUseInViewValue;
  const mockSetWindowWidth = jest.fn();

  const renderJoinComponent = (isMobileContext = false, inViewContext = false, customWindowWidth = isMobileContext ? 390 : 1024) => {
    mockUseInViewValue = {
      ref: jest.fn(),
      inView: inViewContext,
      entry: undefined,
    };
    useInView.mockReturnValue(mockUseInViewValue);

    return render(
      <WindowWidthContext.Provider value={{ windowWidth: customWindowWidth, isMobile: isMobileContext, setWindowWidth: mockSetWindowWidth }}>
        <Join />
      </WindowWidthContext.Provider>
    );
  };

  beforeEach(() => {
    mockGsapRegistered = false;
    mockGsapTo.mockClear();
    mockGsapSet.mockClear();
    mockScrollTriggerKill.mockClear();
    mockScrollTriggerGetAll.mockReturnValue([]);
    mockGsapKillTweensOf.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders static content correctly', () => {
    renderJoinComponent();
    expect(screen.getByRole('heading', { name: /Join a world of learning/i })).toBeInTheDocument();
    expect(screen.getByText(/Malesuada ut aliquam at ac est nisi/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up Now/i })).toBeInTheDocument();
  });

  it('renders all user photos and icons initially', () => {
    renderJoinComponent();
    const userPhotos = screen.getAllByAltText('User');
    expect(userPhotos.length).toBe(14);
    const icons = screen.getAllByAltText('Icon');
    expect(icons.length).toBe(11);
  });

  it('does not initialize GSAP animations if not in view', async () => {
    renderJoinComponent(false, false);
    // Pequena espera para garantir que nenhum import() assíncrono seja disparado
    await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(mockGsapRegistered).toBe(false);
    expect(mockGsapTo).not.toHaveBeenCalled();
  });

  it('initializes GSAP and sets desktop positions when in view and not mobile', async () => {
    renderJoinComponent(false, true); 

    await waitFor(() => expect(mockGsapRegistered).toBe(true));
    await waitFor(() => expect(mockGsapSet).toHaveBeenCalled());
    
    const upl01Element = screen.getByTestId('visual-item-upl01');
    expect(mockGsapSet).toHaveBeenCalledWith(upl01Element, expect.objectContaining({ top: '-15%', left: '26%', scale: 1 }));
    expect(mockGsapTo).toHaveBeenCalledWith(upl01Element, expect.objectContaining({ yPercent: -35 }));
  });

  it('initializes GSAP and sets mobile positions and animations when in view and mobile', async () => {
    renderJoinComponent(true, true);

    await waitFor(() => expect(mockGsapRegistered).toBe(true));
    await waitFor(() => expect(mockGsapSet).toHaveBeenCalled());

    const upl01Element = screen.getByTestId('visual-item-upl01');
    expect(mockGsapSet).toHaveBeenCalledWith(upl01Element, expect.objectContaining({ top: '-60%', left: '85%', scale: expect.any(Number) }));
    expect(mockGsapTo).toHaveBeenCalledWith(upl01Element, expect.objectContaining({ xPercent: -30 }));
  });
  
  it('cleans up GSAP animations when isMobile or windowWidth changes after GSAP is loaded', async () => {
    const { rerender } = renderJoinComponent(false, true); 

    await waitFor(() => expect(mockGsapTo).toHaveBeenCalled());
    mockGsapTo.mockClear(); 
    mockGsapSet.mockClear();
    mockScrollTriggerGetAll.mockReturnValue([{ trigger: document.createElement('div'), kill: mockScrollTriggerKill }]);

    const mobileContextValue = { windowWidth: 400, isMobile: true, setWindowWidth: mockSetWindowWidth };
    act(() => { 
      rerender(
        <WindowWidthContext.Provider value={mobileContextValue}>
          <Join />
        </WindowWidthContext.Provider>
      );
    });
    
    await waitFor(() => {
      expect(mockScrollTriggerKill).toHaveBeenCalled();
      expect(mockGsapKillTweensOf).toHaveBeenCalled();
    });
    await waitFor(() => expect(mockGsapTo).toHaveBeenCalled());
    if (mockGsapTo.mock.calls.length > 0) { 
        const firstGsapToCallArgs = mockGsapTo.mock.calls[0][1];
        expect(firstGsapToCallArgs).toHaveProperty('xPercent');
    } else {
        throw new Error("gsap.to was not called after re-render for mobile");
    }
  });

  it('matches snapshot on desktop when in view', async () => {
    const { container } = renderJoinComponent(false, true);
    await waitFor(() => expect(screen.getByTestId('visual-item-upl01')).toBeInTheDocument());
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot on mobile when in view', async () => {
    const { container } = renderJoinComponent(true, true);
    await waitFor(() => expect(screen.getByTestId('visual-item-upl01')).toBeInTheDocument());
    expect(container.firstChild).toMatchSnapshot();
  });
});