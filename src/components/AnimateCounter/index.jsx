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
    if (!inView || !isClient) {
      return;
    }

    const startTime = performance.now();
    let animationFrameId;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * end);
      
      setCount(value);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [inView, end, duration, isClient]);

  if (!isClient) {
    return null;
  }

  return <h2 ref={ref}>{formatNumber(count)}</h2>;
};

export default AnimatedCounter;