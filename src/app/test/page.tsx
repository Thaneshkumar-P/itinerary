'use client';

import { motion, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import TB from '@/assets/travel-bag.svg';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function TOC() {
  const items = [
    "TOC 1", "TOC 2", "TOC 3", "TOC 4", "TOC 5", "TOC 6", 
    "TOC 7", "TOC 8", "TOC 9", "TOC 10", "TOC 11", "TOC 12",
    "TOC 13", "TOC 14", "TOC 15", "TOC 16"
  ];
  const [radius, setRadius] = useState(250);
  const [innerRadius, setInnerRadius] = useState(150);
  const speed = 0.0001;

  const [time, setTime] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: .9,
  });

  useEffect(() => {
    // Dynamically adjust the radius based on the screen size
    const updateRadius = () => {
      if (window.innerWidth <= 768) {
        setRadius(120); // Smaller radius for mobile
        setInnerRadius(80); // Smaller inner circle for mobile
      } else {
        setRadius(250); // Default for larger screens
        setInnerRadius(150); // Default inner circle radius
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);

    return () => {
      window.removeEventListener('resize', updateRadius);
    };
  }, []);

  useAnimationFrame((delta) => {
    if (animationStarted) {
      setTime(() => delta * speed);
    }
  });

  useEffect(() => {
    if (inView) {
      setAnimationStarted(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative flex items-center justify-center h-screen">
      <div className="p-4 rounded-full shadow-xl" id="main-bag">
        <Image src={TB} alt="bag" width={radius / 2} height={radius / 2} />
      </div>

      {items.map((item, index) => {
        const circleIndex = index < 8 ? 1 : 2;
        const effectiveRadius = circleIndex === 1 ? radius : innerRadius;
        const angleOffset = ((index % 8) / 8) * (2 * Math.PI);
        const targetX = Math.cos(angleOffset) * effectiveRadius;
        const targetY = Math.sin(angleOffset) * effectiveRadius;

        const currentAngle = time + angleOffset;
        const xPos = Math.cos(currentAngle) * effectiveRadius;
        const yPos = Math.sin(currentAngle) * effectiveRadius;

        return (
          <motion.div
            key={index}
            className="absolute rounded-xl shadow-lg border p-2 w-fit"
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
            }}
            animate={{
              x: animationStarted ? targetX : 0,
              y: animationStarted ? targetY : 0,
              opacity: animationStarted ? 1 : 0,
            }}
            transition={{
              duration: 1.5,
              delay: animationStarted ? index * 0.2 : 0,
              ease: "easeInOut",
              onComplete: () => {
                if (index === items.length - 1 && animationStarted) {
                  setTime(0.0001);
                }
              },
            }}
            style={{
              position: "absolute",
              transform: `translate(${xPos}px, ${yPos}px)`,
            }}
          >
            <div className="flex flex-col items-center">
              <Image src={TB} alt="" className="rounded-xl" width={35} height={35} /> {/* Smaller for mobile */}
              <h4 className="text-sm">{item}</h4>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
