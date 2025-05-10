import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { formatNumber } from "@/utils/formatNumber";

const AnimatedCounter = ({ end, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!inView) return;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * end);
      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  if (!isClient) return null;

  return <h2 ref={ref}>{formatNumber(count)}</h2>;
};

export default AnimatedCounter;
