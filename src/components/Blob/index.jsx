'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import * as flubber from 'flubber';
import { useInView } from 'react-intersection-observer';

const paths = [
  "M307.44,77.84c-14.03,74.3-44.79,81.86,17.59,144.24C542.13,439.18,0,514.97,0,251.07,0,4.94,336.32-75.08,307.44,77.84Z",
  "M330.62,48.13c72.73,72.73,26.71,407.6-30.4,294.4C121.02-12.67-.58,668.93,0,265.45.36,19.33,220.57-61.92,330.62,48.13Z",
  "M330.61,48.13c72.73,72.73-92.09,162.16,8,240C410.61,344.13-.59,668.93,0,265.45.36,19.33,220.57-61.92,330.61,48.13Z",
  "M101.12,148.18C51.52-23.02,223.7-31.01,342.72,48.98c97.6,65.6,118.86,584.41-300.8,396.8-136-60.8,106.61-133.98,59.2-297.6Z",
  "M315.00,85.00c-20.00,80.00,-50.00,90.00,25.00,155.00C550.00,450.00,10.00,520.00,10.00,260.00,10.00,15.00,345.00,-65.00,315.00,85.00Z",
  "M340.00,55.00c80.00,80.00,35.00,420.00,-40.00,300.00C130.00,-5.00,5.00,680.00,5.00,270.00,1.00,25.00,230.00,-55.00,340.00,55.00Z",
  "M320.00,40.00c65.00,65.00,-85.00,170.00,15.00,250.00C400.00,350.00,5.00,670.00,5.00,260.00,1.00,15.00,210.00,-70.00,320.00,40.00Z",
  "M110.00,155.00C60.00,-15.00,235.00,-20.00,355.00,55.00c105.00,70.00,125.00,600.00,-310.00,410.00,-145.00,-55.00,115.00,-125.00,65.00,-285.00Z"
];

const Blob = ({ fill = "#FB923C", style }) => {
  const [d, setD] = useState(paths[0]);
  const [hover, setHover] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px',
  });

  useEffect(() => {
    if (inView) {
      setShouldAnimate(true);
    }
  }, [inView]);

  const interpolators = useMemo(() => {
    if (!shouldAnimate) return [];

    const result = [];
    for (let i = 0; i < paths.length; i++) {
      const next = (i + 1) % paths.length;
      result.push(flubber.interpolate(paths[i], paths[next], { maxSegmentLength: 5 }));
    }
    return result;
  }, [shouldAnimate]); 

  useAnimationFrame((t) => {
    if (!shouldAnimate || interpolators.length === 0) return;

    const total = interpolators.length;
    const loopTime = 10000; // 10 segundos por ciclo
    const progress = (t % loopTime) / loopTime;
    const index = Math.floor(progress * total);
    const localT = (progress * total) - index;
    const newPath = interpolators[index](localT);
    setD(newPath);
  });

  return (
    <svg
      ref={viewRef} 
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 500 600"
      fill="none"
      style={style}
    >
      {shouldAnimate ? (
        <motion.path
          fill={fill}
          d={d}
          animate={{ scale: hover ? 0.8 : 0.9 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      ) : (

        <path fill={fill} d={paths[0]} style={{transform: 'scale(0.9)'}} />
      )}
    </svg>
  );
};

export default Blob;