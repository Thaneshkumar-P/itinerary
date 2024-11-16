'use client';

import { motion, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import TB from '@/assets/travel-bag.svg';
import TB1 from '@/assets/Asset 1.svg'
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';


export default function TOC() {
  const items = [
    "TOC 1", "TOC 2", "TOC 3", "TOC 4", "TOC 5", "TOC 6", 
    "TOC 7", "TOC 8", "TOC 9", "TOC 10", "TOC 11", "TOC 12"
  ];
  const radius = 250
  const innerRadius = 150
  const speed = 0.0001;

  const [time, setTime] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: .9,
  });

  useEffect(() => {
    
    const updateRadius = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
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
    <>
      { isMobile && 
        <div className="relative flex flex-col items-center justify-center h-screen gap-8">
          {/* TOC Items in a Grid */}
          <div className="grid grid-cols-3 gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 border rounded-xl shadow-md"
              >
                <Image src={TB} alt={`Item ${index + 1}`} width={35} height={35} />
                <h4 className="text-sm mt-2">{item}</h4>
              </div>
            ))}
          </div>
            </div>

      }
      { !isMobile && 
        <div ref={ref} className="relative flex items-center justify-center h-screen">
          <div className="p-4" id="main-bag">
            <Image src={TB1} alt="bag" width={radius / 2} height={radius / 2} />
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
      }    
    </>
  );
}
