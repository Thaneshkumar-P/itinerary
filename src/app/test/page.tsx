// 'use client';

// import { motion } from "framer-motion";
// import Image from "next/image";
// import TB from '@/assets/travel-bag.svg';
// import { useState, useEffect } from 'react';
// import { useInView } from 'react-intersection-observer';

// export default function TOC() {
//   const items = [
//     "TOC 1", "TOC 2", "TOC 3", "TOC 4", "TOC 5", "TOC 6", 
//     "TOC 7", "TOC 8", "TOC 9", "TOC 10", "TOC 11", "TOC 12",
//     "TOC 13", "TOC 14", "TOC 15", "TOC 16"
//   ];

//   const [isMobile, SetIsMobile] = useState(false)
//   // const speed = 0.0001;

//   // const [time, setTime] = useState(0);
//   const [animationStarted, setAnimationStarted] = useState(false);
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: .5,
//   });

//   useEffect(() => {
//     // Dynamically adjust the radius based on the screen size
//     const updateRadius = () => {
//       if (window.innerWidth <= 768) {
//         SetIsMobile(true)
//       }
//     };

//     updateRadius();
//     window.addEventListener('resize', updateRadius);

//     return () => {
//       window.removeEventListener('resize', updateRadius);
//     };
//   }, []);

//   // useAnimationFrame((delta) => {
//   //   if (animationStarted) {
//   //     setTime(() => delta * speed);
//   //   }
//   // });
  

//   useEffect(() => {
//     if (inView) {
//       setAnimationStarted(true);
//     }
//   }, [inView]);

//   return (
//     <>
//     <div className="h-[100vh]">

//     </div>
//     <div ref={ref} className={`relative items-center justify-center h-screen ${ isMobile ? 'grid grid-cols-3 gap-5 justify-items-center' : 'flex'}`}>
//       <div className={`p-4 rounded-full shadow-xl ${ isMobile ? 'absolute bottom-1' : ''}`}id="main-bag">
//         <Image src={TB} alt="bag" width={(isMobile ? 120 : 250) / 2} height={(isMobile ? 120 : 250) / 2} />
//       </div>

//       {items.map((item, index) => {
//         const circleIndex = index < 8 ? 1 : 2;
//         const effectiveRadius = circleIndex === 1 ? 250 : 150;
//         const angleOffset = ((index % 8) / 8) * (2 * Math.PI);
//         const targetX = Math.cos(angleOffset) * effectiveRadius;
//         const targetY = Math.sin(angleOffset) * effectiveRadius;

//         const animationProperties = {
//           opacity: animationStarted ? 1 : 0,
//           ...(!isMobile && { x: targetX, y: targetY })
//         };

//         return (
//           <motion.div
//             key={index}
//             className={`rounded-xl shadow-lg border p-2 w-fit ${ isMobile ? '' : 'absolute'}`}
//             initial={{
//               x: 0,
//               y: 0,
//               opacity: 0,
//             }}
//             animate={animationProperties}
//             transition={{
//               duration: 1.5,
//               delay: animationStarted ? index * 0.2 : 0,
//               ease: "easeInOut",
//             }}
//           >
//             <div className="flex flex-col items-center">
//               <Image src={TB} alt="" className="rounded-xl" width={35} height={35} /> {/* Smaller for mobile */}
//               <h4 className="text-sm">{item}</h4>
//             </div>
//           </motion.div>
//         );
//       })}
//     </div>
//     </>
//   );
// }

'use client';

import { motion } from "framer-motion";
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

  const [isMobile, SetIsMobile] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    // Dynamically adjust the radius based on the screen size
    const updateRadius = () => {
      if (window.innerWidth <= 768) {
        SetIsMobile(true);
      } else {
        SetIsMobile(false);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);

    return () => {
      window.removeEventListener('resize', updateRadius);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      setAnimationStarted(true);
    }
  }, [inView]);

  return (
    <>
      <div ref={ref} className={`relative items-center justify-center h-screen ${isMobile ? 'grid grid-cols-3 gap-5 justify-items-center' : 'flex'}`}>
        <div className={`p-4 rounded-full shadow-xl ${isMobile ? 'hidden' : ''}`} id="main-bag">
          <Image src={TB} alt="bag" width={(isMobile ? 120 : 250) / 2} height={(isMobile ? 120 : 250) / 2} />
        </div>

        {items.map((item, index) => {
        const circleIndex = index < 8 ? 1 : 2;
        const effectiveRadius = circleIndex === 1 ? 250 : 150;
        const angleOffset = ((index % 8) / 8) * (2 * Math.PI);
        const targetX = Math.cos(angleOffset) * effectiveRadius;
        const targetY = Math.sin(angleOffset) * effectiveRadius;

        // const animationProperties = {
        //   opacity: animationStarted ? 1 : 0,
        //   ...(!isMobile && { x: targetX, y: targetY })
        // };

          const animationProperties = isMobile
            ? {
                y: animationStarted ? 0 : -150,
                opacity: animationStarted ? 1 : 0,
              }
            : {
                opacity: animationStarted ? 1 : 0,
                x: targetX,
                y: targetY,
              };

          return (
            <motion.div
              key={index}
              className={`rounded-xl shadow-lg border p-2 w-fit ${isMobile ? '' : 'absolute'}`}
              initial={{
                x: 0,
                y: 0,
                opacity: 0
              }}
              animate={animationProperties}
              transition={{
                duration: 1.5,
                delay: animationStarted ? index * 0.2 : 0,
                ease: "easeInOut",
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
    </>
  );
}



