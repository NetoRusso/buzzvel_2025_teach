import "@/styles/globals.css";
import { WindowWidthProvider } from "@/context/WindowWidthContext"; 
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default function App({ Component, pageProps }) {
  return (
    <WindowWidthProvider>
      <div className={roboto.className}>
      <Component {...pageProps} />
      </div>
    </WindowWidthProvider>
  );
}