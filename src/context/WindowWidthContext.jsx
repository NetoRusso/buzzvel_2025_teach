'use client'
import { createContext, useState, useEffect } from "react";

const WindowWidthContext = createContext();

export const WindowWidthProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if(windowWidth < 840) {
      setIsMobile(true);

    } else if(windowWidth > 840) {
      setIsMobile(false);

    }
  }, [windowWidth]);

  return (
    <WindowWidthContext.Provider value={{ windowWidth, isMobile }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

export { WindowWidthContext };