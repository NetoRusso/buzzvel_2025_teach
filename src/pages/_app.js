import "@/styles/globals.css";
import { WindowWidthProvider } from "@/context/WindowWidthContext"; 
export default function App({ Component, pageProps }) {
  return (
    <WindowWidthProvider>
      <Component {...pageProps} />
    </WindowWidthProvider>
  );
}